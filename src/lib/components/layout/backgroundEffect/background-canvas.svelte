<script lang="ts">
	import { drawRandomDrops } from '$lib/effects/random-drops'

	let canvas: HTMLCanvasElement
	let frame = 0
	let width = 0
	let height = 0

	function resize() {
		if (!canvas) return
		width = window.innerWidth
		height = window.innerHeight
		const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
		canvas.width = Math.floor(width * dpr)
		canvas.height = Math.floor(height * dpr)
		canvas.style.width = `${width}px`
		canvas.style.height = `${height}px`
		const ctx = canvas.getContext('2d')
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
	}

	function accent(alpha: number) {
		return `rgba(25, 126, 128, ${alpha})`
	}

	function tick() {
		if (!canvas) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		ctx.clearRect(0, 0, width, height)
		drawRandomDrops(ctx, width, height, frame, accent)
		frame++
	}

	$effect(() => {
		resize()
		let raf = 0
		const loop = () => {
			tick()
			raf = requestAnimationFrame(loop)
		}
		raf = requestAnimationFrame(loop)
		window.addEventListener('resize', resize)

		return () => {
			cancelAnimationFrame(raf)
			window.removeEventListener('resize', resize)
			frame = 0
		}
	})
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed inset-0 z-0 opacity-[0.43] dark:opacity-[0.58]"
	aria-hidden="true"
></canvas>
