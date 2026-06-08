<script lang="ts">
	import type { Snippet } from 'svelte'

	interface Props {
		children: Snippet
		class?: string
		element?: 'article' | 'div' | 'section'
		href?: string
		rel?: string
		target?: string
	}

	let {
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
	class={`group relative flex flex-col overflow-hidden rounded-[1.125rem] border border-[var(--glass-edge)]
		bg-[var(--glass-fill)] shadow-[var(--glass-shadow)] [backdrop-filter:blur(var(--glass-blur))]
		transition-[background,border-color,box-shadow,transform] duration-300 ease-out
		[-webkit-backdrop-filter:blur(var(--glass-blur))] hover:-translate-y-0.5
		hover:border-[color-mix(in_srgb,var(--glass-edge)_70%,rgb(var(--glass-cool)))]
		hover:bg-[color-mix(in_srgb,rgb(var(--glass-teal))_7%,var(--glass-fill-hover))]
		hover:shadow-[0_14px_40px_rgba(16,19,30,0.1)]
		dark:hover:bg-[color-mix(in_srgb,rgb(var(--glass-teal))_9%,var(--glass-fill-hover))]
		dark:hover:shadow-[0_16px_44px_rgba(0,0,0,0.35)] ${className}`}
	{href}
	{rel}
	{target}
>
	{@render children()}
</svelte:element>
