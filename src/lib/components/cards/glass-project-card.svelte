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
	href={route}
	rel={newTab ? 'noopener noreferrer' : undefined}
	target={newTab ? '_blank' : undefined}
>
	<div class="flex flex-1 flex-col md:flex-row md:items-stretch">
		{#if imageUrl}
			<figure
				class="m-0 aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[0.875rem]
					p-5 pb-0 md:w-[34%] md:p-6 md:pr-0"
			>
				<img
					alt={title}
					class="block h-full w-full rounded-xl object-cover transition-transform duration-500
						ease-out group-hover:scale-[1.02]"
					loading="lazy"
					src={imageUrl}
				/>
			</figure>
		{/if}
		<div class="min-w-0 flex-1 px-6 pb-4 pt-5 md:py-7 md:pl-5 md:pr-6">
			<h3 class="mb-2 font-semibold leading-[1.3] text-neutral-e8">{title}</h3>
			<p class="leading-relaxed text-neutral-e4">{description}</p>
		</div>
	</div>

	{#if tags && tags.length > 0}
		<ul
			class="m-0 flex list-none flex-wrap items-center gap-x-2 gap-y-1.5 border-t
				border-[color-mix(in_srgb,var(--neutral-e8)_7%,transparent)] px-6 py-4"
			aria-label="Technologies"
		>
			{#each tags as tag}
				<li class="flex items-center">
					<span
						class="inline-block rounded-full border
							border-[color-mix(in_srgb,var(--neutral-e4)_28%,transparent)]
							bg-[color-mix(in_srgb,var(--neutral-e4)_18%,transparent)] px-2 py-1
							text-xs font-medium leading-tight text-neutral-e5 [backdrop-filter:blur(6px)]
							[-webkit-backdrop-filter:blur(6px)] dark:border-[color-mix(in_srgb,var(--neutral-e4)_14%,transparent)]
							dark:bg-[color-mix(in_srgb,var(--neutral-e4)_10%,transparent)]
							dark:text-neutral-e4"
					>
						{tag}
					</span>
				</li>
			{/each}
		</ul>
	{/if}
</GlassSurface>
