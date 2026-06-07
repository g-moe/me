<style>
	:global(body) {
		--mouse-x: 50%;
		--mouse-y: 50%;
	}
</style>

<script lang="ts">
	import { onDestroy, onMount } from 'svelte'

	let spotlight: HTMLElement | null = null

	const spotlightBg = `
		radial-gradient(ellipse 115% 78% at var(--mouse-x) var(--mouse-y),
			color-mix(in srgb, var(--secondary-e1) 48%, transparent) 0%, transparent 52%),
		radial-gradient(ellipse 340px 280px at var(--mouse-x) var(--mouse-y),
			color-mix(in srgb, var(--secondary) 42%, transparent) 0%, transparent 46%)
	`
		.replace(/\s+/g, ' ')
		.trim()

	function isMobile() {
		return window.innerWidth <= 768
	}

	function setPosition(x: number, y: number) {
		if (!spotlight) return
		spotlight.style.setProperty('--mouse-x', `${x}px`)
		spotlight.style.setProperty('--mouse-y', `${y}px`)
	}

	function centerSpotlight() {
		if (!isMobile()) return
		setPosition(window.innerWidth / 2, window.innerHeight / 2)
	}

	function handleMouseMove(event: MouseEvent) {
		if (isMobile()) return
		setPosition(event.clientX, event.clientY)
	}

	onMount(() => {
		document.addEventListener('mousemove', handleMouseMove)
		window.addEventListener('resize', centerSpotlight)
		centerSpotlight()
	})

	onDestroy(() => {
		document.removeEventListener('mousemove', handleMouseMove)
		window.removeEventListener('resize', centerSpotlight)
	})
</script>

<div
	bind:this={spotlight}
	class="pointer-events-none fixed inset-0 z-10 mix-blend-screen dark:mix-blend-plus-lighter"
	style:background={spotlightBg}
	style:opacity={isMobile() ? 0.15 : 0.2}
	aria-hidden="true"
></div>
