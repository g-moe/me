<script lang="ts">
	import type { Snippet } from 'svelte'

	let { children }: { children: Snippet } = $props()
</script>

<div class="blog-content leading-7 text-neutral-e5">
	{@render children()}
</div>

<style>
	.blog-content :global(h2),
	.blog-content :global(h3) {
		color: var(--neutral-e8);
		font-weight: 700;
		line-height: 1.25;
	}

	.blog-content :global(h2) {
		margin: 2rem 0 0.75rem;
		font-size: 1.5rem;
	}

	.blog-content :global(h3) {
		margin: 1.5rem 0 0.5rem;
		font-size: 1.25rem;
	}

	.blog-content :global(p),
	.blog-content :global(ul),
	.blog-content :global(ol),
	.blog-content :global(blockquote),
	.blog-content :global(pre) {
		margin: 1rem 0;
	}

	.blog-content :global(ul),
	.blog-content :global(ol) {
		padding-left: 1.5rem;
	}

	.blog-content :global(ul) {
		list-style: disc;
	}

	.blog-content :global(ol) {
		list-style: decimal;
	}

	.blog-content :global(a) {
		color: var(--mint);
		font-weight: 600;
		text-decoration: underline;
		text-underline-offset: 0.2em;
	}

	.blog-content :global(blockquote) {
		border-left: 3px solid var(--mint);
		color: var(--neutral-e6);
		padding-left: 1rem;
	}

	.blog-content :global(pre) {
		background: color-mix(in srgb, var(--neutral-e8) 7%, transparent);
		border: 1px solid var(--glass-edge);
		color: var(--neutral-e8);
		overflow-x: auto;
		padding: 1rem;
	}

	.blog-content :global(code) {
		background: color-mix(in srgb, var(--neutral-e8) 7%, transparent);
		color: var(--neutral-e8);
		padding: 0.125rem 0.25rem;
	}

	.blog-content :global(pre code) {
		background: transparent;
		padding: 0;
	}
</style>
