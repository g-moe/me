<script lang="ts">
	import GlassProjectCard from '$lib/components/cards/glass-project-card.svelte'

	let {
		description,
		imageUrl,
		newTab = false,
		route,
		tags,
		title
	} = $props<{
		description: string
		imageUrl?: string
		newTab?: boolean
		route: string
		tags?: string[]
		title: string
	}>()
</script>

<GlassProjectCard
	title={title}
	description={description}
	imageUrl={imageUrl}
	newTab={newTab}
	route={route}
	tags={tags}
/>
