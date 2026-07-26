<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte'
	import { Button } from '$lib/components/ui/button'
	import { mode, toggleMode } from 'mode-watcher'
</script>

<Button
	aria-label="Switch theme"
	class="border border-(--glass-edge) bg-neutral-e1 text-neutral-e8 shadow-[3px_3px_0_var(--neutral)] hover:border-primary hover:text-primary"
	onclick={toggleMode}
	variant="ghost"
>
	{#if mode.current === 'dark'}
		<Moon />
	{:else}
		<Sun />
	{/if}
</Button>
