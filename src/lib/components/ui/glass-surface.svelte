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
	class={`group relative flex flex-col overflow-hidden rounded-[1.125rem] border border-(--glass-edge)
		bg-(--glass-fill) shadow-(--glass-shadow) [backdrop-filter:blur(var(--glass-blur))]
		[-webkit-backdrop-filter:blur(var(--glass-blur))]
		hover:border-[color-mix(in_srgb,var(--glass-edge)_86%,rgb(var(--glass-teal)))]
		hover:bg-[color-mix(in_srgb,rgb(var(--glass-teal))_2%,var(--glass-fill-hover))]
		hover:shadow-[0_12px_34px_rgba(16,19,30,0.08)]
		dark:hover:bg-[color-mix(in_srgb,rgb(var(--glass-teal))_2%,var(--glass-fill-hover))]
		dark:hover:shadow-[0_14px_36px_rgba(0,0,0,0.24)] ${className}`}
	{href}
	{rel}
	{target}
>
	{@render children()}
</svelte:element>
