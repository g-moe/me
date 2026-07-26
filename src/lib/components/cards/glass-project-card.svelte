<script lang="ts">
	import GlassSurface from '$lib/components/ui/glass-surface.svelte'

	interface Props {
		description: string
		imageUrl?: string
		newTab?: boolean
		route: string
		tags?: string[]
		title: string
	}

	let {
		description,
		imageUrl,
		newTab = false,
		route,
		tags,
		title
	}: Props = $props()
</script>

<GlassSurface
	aria-label={title}
	href={route}
	rel={newTab ? 'noopener noreferrer' : undefined}
	target={newTab ? '_blank' : undefined}
>
	<div class="window-title">
		<span class="size-2 bg-system-error"></span>
		<span class="size-2 bg-primary"></span>
		<span class="size-2 bg-mint"></span>
		<span class="ml-1 truncate">~/projects/{title.toLowerCase().replaceAll(' ', '-')}</span>
	</div>
	<div class="flex flex-1 flex-col md:flex-row md:items-stretch">
		{#if imageUrl}
			<figure
				class="m-0 aspect-4/3 w-full shrink-0 overflow-hidden border-b border-(--glass-edge)
					p-4 md:w-[34%] md:border-b-0 md:border-r"
			>
				<img
					alt={title}
					class="block h-full w-full border border-(--glass-edge) object-cover grayscale-20
						transition duration-300 group-hover:grayscale-0 group-hover:saturate-125"
					loading="lazy"
					src={imageUrl}
				/>
			</figure>
		{/if}
		<div class="min-w-0 flex-1 px-6 pb-4 pt-5 md:py-7 md:pl-5 md:pr-6">
			<h3 class="terminal-prompt mb-2 font-semibold leading-[1.3] text-neutral-e8">{title}</h3>
			<p class="leading-relaxed text-neutral-e4">{description}</p>
		</div>
	</div>

	{#if tags && tags.length > 0}
		<ul
			class="m-0 flex list-none flex-wrap items-center gap-2 border-t
				border-[color-mix(in_srgb,var(--neutral-e8)_7%,transparent)] px-6 py-4"
			aria-label="Technologies"
		>
			{#each tags as tag}
				<li class="flex items-center">
					<span
						class="inline-block border border-(--glass-edge) bg-neutral-e2 px-2 py-1
							text-[10px] font-semibold uppercase tracking-wide text-neutral-e6"
					>
						{tag}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</GlassSurface>
