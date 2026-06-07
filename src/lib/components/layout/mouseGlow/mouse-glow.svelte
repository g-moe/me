<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	// Glow colors (identical across light/dark themes in app.css)
	const E1 = { r: 77, g: 168, b: 170 } // --secondary-e1 #4da8aa
	const CORE = { r: 25, g: 126, b: 128 } // --secondary    #197e80

	// Offscreen sprite dimensions (the full footprint of the glow).
	const SPRITE_W = 1400
	const SPRITE_H = 1150
	// How much per-pixel noise to bake in. This dithers the gradient so the
	// 8-bit alpha banding reads as a smooth, continuous falloff.
	const DITHER = 16

	let canvas: HTMLCanvasElement
	let sprite: HTMLCanvasElement | null = null
	let mouseX = 0
	let mouseY = 0
	let rafPending = 0

	function isMobile() {
		return window.innerWidth <= 768
	}

	function rgba(c: { r: number; g: number; b: number }, a: number) {
		return `rgba(${c.r}, ${c.g}, ${c.b}, ${a})`
	}

	function drawEllipse(
		ctx: CanvasRenderingContext2D,
		cx: number,
		cy: number,
		rx: number,
		ry: number,
		stops: [number, string][],
		composite: GlobalCompositeOperation
	) {
		ctx.save()
		ctx.globalCompositeOperation = composite
		ctx.translate(cx, cy)
		ctx.scale(1, ry / rx)
		const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rx)
		for (const [offset, color] of stops) grad.addColorStop(offset, color)
		ctx.fillStyle = grad
		ctx.fillRect(-rx, -rx, rx * 2, rx * 2)
		ctx.restore()
	}

	// Builds the dithered glow once. Returns an offscreen canvas we can stamp.
	function buildSprite() {
		const off = document.createElement('canvas')
		off.width = SPRITE_W
		off.height = SPRITE_H
		const ctx = off.getContext('2d')
		if (!ctx) return off

		const cx = SPRITE_W / 2
		const cy = SPRITE_H / 2

		// Outer wash
		drawEllipse(
			ctx,
			cx,
			cy,
			SPRITE_W / 2,
			SPRITE_H / 2,
			[
				[0, rgba(E1, 0.42)],
				[1, rgba(E1, 0)]
			],
			'source-over'
		)

		// Brighter core, added on top
		drawEllipse(
			ctx,
			cx,
			cy,
			SPRITE_W * 0.37,
			SPRITE_H * 0.38,
			[
				[0, rgba(CORE, 0.34)],
				[1, rgba(CORE, 0)]
			],
			'lighter'
		)

		// Bake noise into the alpha channel to dither away the banding.
		const img = ctx.getImageData(0, 0, SPRITE_W, SPRITE_H)
		const data = img.data
		for (let i = 3; i < data.length; i += 4) {
			const a = data[i]
			if (a === 0) continue
			const noisy = a + (Math.random() - 0.5) * DITHER
			data[i] = noisy < 0 ? 0 : noisy > 255 ? 255 : noisy
		}
		ctx.putImageData(img, 0, 0)

		return off
	}

	function resize() {
		if (!canvas) return
		const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
		canvas.width = Math.floor(window.innerWidth * dpr)
		canvas.height = Math.floor(window.innerHeight * dpr)
		canvas.style.width = `${window.innerWidth}px`
		canvas.style.height = `${window.innerHeight}px`
		const ctx = canvas.getContext('2d')
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
		render()
	}

	function render() {
		rafPending = 0
		if (!canvas || !sprite) return
		const ctx = canvas.getContext('2d')
		if (!ctx) return
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
		ctx.drawImage(
			sprite,
			mouseX - SPRITE_W / 2,
			mouseY - SPRITE_H / 2,
			SPRITE_W,
			SPRITE_H
		)
	}

	function scheduleRender() {
		if (rafPending) return
		rafPending = requestAnimationFrame(render)
	}

	function handleMouseMove(event: MouseEvent) {
		if (isMobile()) return
		mouseX = event.clientX
		mouseY = event.clientY
		scheduleRender()
	}

	function center() {
		mouseX = window.innerWidth / 2
		mouseY = window.innerHeight / 2
		scheduleRender()
	}

	onMount(() => {
		sprite = buildSprite()
		center()
		resize()
		document.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('resize', resize)
	})

	onDestroy(() => {
		if (rafPending) cancelAnimationFrame(rafPending)
		document.removeEventListener('mousemove', handleMouseMove)
		window.removeEventListener('resize', resize)
	})
</script>

<canvas
	bind:this={canvas}
	class="pointer-events-none fixed inset-0 z-10 mix-blend-screen dark:mix-blend-plus-lighter"
	style:opacity={isMobile() ? 0.15 : 0.2}
	aria-hidden="true"
>
</canvas>
