<script lang="ts">
	import BlogContent from '$lib/components/blog/blog-content.svelte'
	import type { PageData } from './$types'

	let { data } = $props<{ data: PageData }>()
	let Post = $derived(data.component)
</script>

<svelte:head>
	<title>{data.post.title} | Garrett Moe</title>
	<meta name="description" content={data.post.description} />
</svelte:head>

<article class="space-y-8">
	<header class="space-y-8">
		<a
			class="inline-flex text-xl font-medium text-mint transition-colors hover:text-secondary"
			href="/blog"
		>
			← Back
		</a>

		<div class="space-y-3">
			<h1 class="font-display text-3xl font-semibold text-neutral-e8">
				{data.post.title}
			</h1>

			<div class="flex flex-wrap items-center gap-2 text-sm text-neutral-e4">
				<time datetime={data.post.date}>
					{new Date(`${data.post.date}T00:00:00`).toLocaleDateString('en-US', {
						day: 'numeric',
						month: 'long',
						year: 'numeric'
					})}
				</time>
				{#if data.post.tags.length}
					<span aria-hidden="true">/</span>
					<span>{data.post.tags.join(', ')}</span>
				{/if}
			</div>

			<p class="max-w-2xl leading-relaxed text-neutral-e5">
				{data.post.description}
			</p>
		</div>
	</header>

	<BlogContent>
		<Post />
	</BlogContent>
</article>
