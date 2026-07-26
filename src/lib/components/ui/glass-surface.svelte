<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		'aria-label'?: string
		children: Snippet
		class?: string
		element?: 'article' | 'div' | 'section'
		href?: string
		rel?: string
		target?: string
	}

	let {
		'aria-label': ariaLabel,
		children,
		class: className = '',
		element = 'div',
		href,
		rel,
		target
	}: Props = $props()
</script>

<svelte:element
	this={href ? 'a' : element}
	class={`group relative flex flex-col overflow-hidden border border-(--glass-edge)
		bg-(--glass-fill) shadow-(--glass-shadow)
		transition-[transform,box-shadow,border-color,background] duration-200
		hover:-translate-x-0.5 hover:-translate-y-0.5 hover:border-primary
		hover:bg-(--glass-fill-hover) hover:shadow-[7px_7px_0_var(--neutral)]
		dark:hover:shadow-[7px_7px_0_#1d2021] ${className}`}
	{href}
	{rel}
	{target}
	aria-label={ariaLabel}
>
	{@render children()}
</svelte:element>
