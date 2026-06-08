<script lang="ts">
	import { House, Menu, Moon, NotebookText, Sun, X } from '@lucide/svelte'
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
		class="scale-100 rounded-full bg-transparent text-neutral-e8 hover:scale-100
			hover:bg-transparent focus-visible:ring-0"
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
		class="bg-neutral-e8/5 fixed inset-0 z-[55]"
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
		<a
			role="menuitem"
			class="flex w-full min-w-[10rem] items-center gap-3
				rounded-none p-2 text-sm font-medium text-neutral-e8 transition-colors
				hover:bg-neutral-e8/10 hover:text-neutral-e8"
			href="/"
			onclick={closeMenu}
		>
			<House class="size-4" />
			<span>Home</span>
		</a>
		<a
			role="menuitem"
			class="flex w-full min-w-[10rem] items-center gap-3
				rounded-none p-2 text-sm font-medium text-neutral-e8 transition-colors
				hover:bg-neutral-e8/10 hover:text-neutral-e8"
			href="/blog"
			onclick={closeMenu}
		>
			<NotebookText class="size-4" />
			<span>Blog</span>
		</a>

		<div class="my-1 border-t border-[var(--glass-edge)]"></div>

		<button
			type="button"
			role="menuitem"
			class="flex w-full min-w-[10rem] items-center gap-3
				rounded-none p-2 text-sm font-medium text-neutral-e8 transition-colors
				hover:bg-neutral-e8/10 hover:text-neutral-e8"
			onclick={toggleMode}
		>
			{#if mode.current === 'dark'}
				<Moon class="size-4" />
			{:else}
				<Sun class="size-4" />
			{/if}
			<span>Toggle Theme</span>
		</button>
	</div>
{/if}
