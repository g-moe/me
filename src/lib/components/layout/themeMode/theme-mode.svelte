<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button'
	import { mode, ModeWatcher, setMode, toggleMode } from 'mode-watcher'
	import { onMount } from 'svelte'

	onMount(() => {
		setMode(mode.current ?? 'dark')
	})
</script>

<ModeWatcher />

<Button
	aria-label="Switch theme"
	class="text-neutral-e8 rounded-full bg-transparent"
	onclick={toggleMode}
	variant="ghost"
>
	{#if mode.current === 'dark'}
		<Moon />
	{:else}
		<Sun />
	{/if}
</Button>
