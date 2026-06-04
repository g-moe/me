<script lang="ts">
	import GlassProjectCard from '$lib/components/cards/glass-project-card.svelte'

	let {
		title,
		description,
		imageUrl,
		newTab = false,
		route,
		tags
	} = $props<{
		title: string
		description: string
		route: string
		imageUrl?: string
		newTab?: boolean
		tags?: string[]
	}>()
</script>

<GlassProjectCard {title} {description} {imageUrl} {newTab} {route} {tags} />
