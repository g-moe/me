<script lang="ts">
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

<a
	class="glass-card"
	href={route}
	rel={newTab ? 'noopener noreferrer' : undefined}
	target={newTab ? '_blank' : undefined}
>
	<div class="glass-card__body">
		{#if imageUrl}
			<figure class="glass-card__media">
				<img
					alt={title}
					class="glass-card__image"
					loading="lazy"
					src={imageUrl}
				/>
			</figure>
		{/if}
		<div class="glass-card__copy">
			<h3 class="glass-card__title">{title}</h3>
			<p class="glass-card__description">{description}</p>
		</div>
	</div>

	{#if tags && tags.length > 0}
		<ul class="glass-card__tags" aria-label="Technologies">
			{#each tags as tag}
				<li><span class="glass-card__tag">{tag}</span></li>
			{/each}
		</ul>
	{/if}
</a>
