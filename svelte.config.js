import adapter from '@sveltejs/adapter-static'
import { mdsvex } from 'mdsvex'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	kit: {
		adapter: adapter()
	},
	preprocess: [
		vitePreprocess(),
		mdsvex({ extensions: ['.md'], highlight: true })
	]
}

export default config
