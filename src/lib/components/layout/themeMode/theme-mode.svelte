<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button'
	import { mode, toggleMode } from 'mode-watcher'
</script>

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
