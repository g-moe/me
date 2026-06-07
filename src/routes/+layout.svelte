<script lang="ts">
	import BackgroundCanvas from '$lib/components/layout/backgroundEffect/background-canvas.svelte'
	import Footer from '$lib/components/layout/footer/footer.svelte'
	import MouseGlow from '$lib/components/layout/mouseGlow/mouse-glow.svelte'
	import Sidebar from '$lib/components/layout/sidebar/sidebar.svelte'

	import '../app.css'

	let { children } = $props()
</script>

<BackgroundCanvas />
<MouseGlow />

<div
	class="bg-neutral-e1/85 dark:bg-neutral-e1/75 relative z-20 min-h-screen select-none md:flex"
>
	<Sidebar />

	<div class="flex flex-col md:w-3/5 md:pt-12">
		<div class="w-full flex-grow px-8 pt-20 pb-2 md:px-14 md:py-8">
			{@render children()}
		</div>

		<Footer />
	</div>
</div>
