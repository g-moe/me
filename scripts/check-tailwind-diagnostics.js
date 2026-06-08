import { spawn, spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { basename, resolve, sep } from 'node:path'

const root = process.cwd()
const files = getSvelteFiles()
const diagnostics = new Map()
const pending = new Map()
let buffer = Buffer.alloc(0)
let nextId = 1

const server = spawn(
	'tailwindcss-language-server',
	['--stdio'],
	{ cwd: root, stdio: ['pipe', 'pipe', 'pipe'] }
)

server.stderr.on('data', (data) => {
	process.stderr.write(data)
})

server.stdout.on('data', (chunk) => {
	buffer = Buffer.concat([buffer, chunk])
	readMessages()
})

try {
	await request('initialize', {
		processId: null,
		rootUri: toUri('.'),
		workspaceFolders: [{ uri: toUri('.'), name: basename(root) }],
		capabilities: {
			workspace: {
				configuration: true,
				workspaceFolders: true
			},
			textDocument: {
				publishDiagnostics: {}
			}
		},
		initializationOptions: {
			userLanguages: { svelte: 'html' }
		}
	})

	notify('initialized', {})

	for (const file of files) {
		notify('textDocument/didOpen', {
			textDocument: {
				uri: toUri(file),
				languageId: 'svelte',
				version: 1,
				text: readFileSync(resolve(root, file), 'utf8')
			}
		})
	}

	await wait(6000)

	const canonicalDiagnostics = collectCanonicalDiagnostics()

	if (canonicalDiagnostics.length > 0) {
		console.error('Tailwind canonical class diagnostics found:')
		for (const diagnostic of canonicalDiagnostics) {
			console.error(
				`${diagnostic.file}:${diagnostic.line}:${diagnostic.character} ${diagnostic.message}`
			)
		}
		process.exitCode = 1
	} else {
		console.log('Tailwind diagnostics passed.')
	}
} finally {
	server.kill()
}

function getSvelteFiles() {
	const result = spawnSync('rg', ['--files', 'src', '-g', '*.svelte'], {
		cwd: root,
		encoding: 'utf8'
	})

	if (result.status !== 0) {
		return []
	}

	return result.stdout.trim().split('\n').filter(Boolean)
}

function send(message) {
	const json = JSON.stringify(message)
	server.stdin.write(
		`Content-Length: ${Buffer.byteLength(json)}\r\n\r\n${json}`
	)
}

function request(method, params) {
	const id = nextId++
	send({ jsonrpc: '2.0', id, method, params })

	return new Promise((resolvePromise, reject) => {
		const timeout = setTimeout(() => {
			pending.delete(id)
			reject(new Error(`Timed out waiting for ${method}`))
		}, 15000)

		pending.set(id, {
			resolve: (result) => {
				clearTimeout(timeout)
				resolvePromise(result)
			},
			reject,
			method
		})
	})
}

function notify(method, params) {
	send({ jsonrpc: '2.0', method, params })
}

function readMessages() {
	while (true) {
		const headerEnd = buffer.indexOf('\r\n\r\n')
		if (headerEnd === -1) return

		const header = buffer.slice(0, headerEnd).toString()
		const lengthMatch = /Content-Length: (\d+)/i.exec(header)
		if (!lengthMatch) {
			throw new Error(`Invalid LSP header: ${header}`)
		}

		const contentLength = Number(lengthMatch[1])
		const messageEnd = headerEnd + 4 + contentLength
		if (buffer.length < messageEnd) return

		const body = buffer.slice(headerEnd + 4, messageEnd).toString()
		buffer = buffer.slice(messageEnd)
		handleMessage(JSON.parse(body))
	}
}

function handleMessage(message) {
	if (message.id && pending.has(message.id)) {
		const pendingRequest = pending.get(message.id)
		pending.delete(message.id)
		pendingRequest.resolve(message.result)
		return
	}

	if (message.method === 'textDocument/publishDiagnostics') {
		diagnostics.set(message.params.uri, message.params.diagnostics ?? [])
		return
	}

	if (message.method === 'workspace/configuration') {
		send({
			jsonrpc: '2.0',
			id: message.id,
			result: message.params.items.map(() => ({
				includeLanguages: { svelte: 'html' },
				experimental: { configFile: resolve(root, 'src/app.css') },
				lint: { suggestCanonicalClasses: 'warning' }
			}))
		})
		return
	}

	if (message.method === 'workspace/workspaceFolders') {
		send({
			jsonrpc: '2.0',
			id: message.id,
			result: [{ uri: toUri('.'), name: basename(root) }]
		})
		return
	}

	if (message.id) {
		send({ jsonrpc: '2.0', id: message.id, result: null })
	}
}

function collectCanonicalDiagnostics() {
	const results = []

	for (const file of files) {
		for (const diagnostic of diagnostics.get(toUri(file)) ?? []) {
			const code = String(diagnostic.code ?? '')
			if (
				!code.includes('suggestCanonicalClasses') &&
				!/canonical/i.test(diagnostic.message)
			) {
				continue
			}

			results.push({
				file,
				line: diagnostic.range.start.line + 1,
				character: diagnostic.range.start.character + 1,
				message: diagnostic.message
			})
		}
	}

	return results
}

function toUri(filePath) {
	const absolutePath = resolve(root, filePath)
	return `file://${absolutePath
		.split(sep)
		.map(encodeURIComponent)
		.join('/')}`
}

function wait(ms) {
	return new Promise((resolvePromise) => setTimeout(resolvePromise, ms))
}
