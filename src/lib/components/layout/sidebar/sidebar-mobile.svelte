<script lang="ts">
	import { Menu, Moon, Sun, X } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button'
	import { mode, toggleMode } from 'mode-watcher'
	import { onMount } from 'svelte'

	let isOpen = $state(false)
	let isScrolled = $state(false)

	let showHeaderBg = $derived(isScrolled || isOpen)

	function toggleMenu() {
		isOpen = !isOpen
	}

	function closeMenu() {
		isOpen = false
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') closeMenu()
	}

	onMount(() => {
		const updateScroll = () => {
			isScrolled = window.scrollY > 0
		}

		updateScroll()
		window.addEventListener('scroll', updateScroll, { passive: true })

		return () => {
			window.removeEventListener('scroll', updateScroll)
		}
	})
</script>

<svelte:window onkeydown={handleKeydown} />

<header
	class="fixed inset-x-0 top-0 z-[60] flex h-14 items-center justify-end
		px-4 transition-[background-color,box-shadow,border-color,backdrop-filter]
		duration-300"
	style={showHeaderBg
		? `
			background: var(--glass-fill);
			border-bottom: 1px solid var(--glass-edge);
			box-shadow: var(--glass-shadow);
			backdrop-filter: blur(var(--glass-blur));
			-webkit-backdrop-filter: blur(var(--glass-blur));
		`
		: `
			background: transparent;
			border-bottom: 1px solid transparent;
			box-shadow: none;
			backdrop-filter: none;
			-webkit-backdrop-filter: none;
		`}
>
	<Button
		class="scale-100 rounded-full bg-transparent text-neutral-e8 hover:scale-100 hover:bg-transparent"
		aria-expanded={isOpen}
		aria-label={isOpen ? 'Close menu' : 'Open menu'}
		onclick={toggleMenu}
		variant="ghost"
	>
		{#if isOpen}
			<X />
		{:else}
			<Menu />
		{/if}
	</Button>
</header>

{#if isOpen}
	<button
		class="bg-neutral-e8/20 fixed inset-0 z-[55] backdrop-blur-sm"
		aria-label="Close menu"
		onclick={closeMenu}
	></button>

	<div
		class="fixed right-0 top-14 z-[60] min-w-[10rem] border border-r-0 border-t-0 p-1"
		style="
			background: var(--glass-fill);
			border-color: var(--glass-edge);
			box-shadow: var(--glass-shadow);
			backdrop-filter: blur(var(--glass-blur));
			-webkit-backdrop-filter: blur(var(--glass-blur));
		"
		role="menu"
	>
		<button
			type="button"
			role="menuitem"
			class="flex w-full min-w-[10rem] items-center justify-between gap-4
				rounded-none p-2 text-sm font-medium text-neutral-e8 transition-colors
				hover:bg-secondary hover:text-[var(--text-white)]"
			onclick={toggleMode}
		>
			Theme
			{#if mode.current === 'dark'}
				<Moon class="size-5" />
			{:else}
				<Sun class="size-5" />
			{/if}
		</button>
	</div>
{/if}
