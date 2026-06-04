type Accent = (a: number) => string

/** Scattered glyphs — random X, short falling trails */
export function drawRandomDrops(
	ctx: CanvasRenderingContext2D,
	width: number,
	height: number,
	frame: number,
	accent: Accent
) {
	const fontSize = 12
	const dropCount = Math.floor((width * height) / 14000)
	const glyphs = '|/\\<>[]{}g'

	ctx.font = `${fontSize}px ui-monospace, Menlo, monospace`
	ctx.textBaseline = 'top'

	for (let d = 0; d < dropCount; d++) {
		const seed = d * 7919
		const x = ((seed * 13) % 1000) / 1000 * width
		const speed = 0.6 + (d % 9) * 0.15
		const phase = (seed % 500) + frame * speed
		const headY = (phase % (height + 60)) - 30
		const trail = 3 + (d % 5)

		for (let t = 0; t < trail; t++) {
			const ch = glyphs[(seed + t + frame) % glyphs.length]
			ctx.fillStyle = accent(t === 0 ? 0.65 : 0.2 - t * 0.04)
			ctx.fillText(ch, x + Math.sin(d + frame * 0.05) * 2, headY - t * (fontSize + 2))
		}
	}
}
