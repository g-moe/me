<script lang="ts">
	import { page } from '$app/stores'
	import BackgroundCanvas from '$lib/components/layout/backgroundEffect/background-canvas.svelte'
	import Footer from '$lib/components/layout/footer/footer.svelte'
	import MouseGlow from '$lib/components/layout/mouseGlow/mouse-glow.svelte'
	import Sidebar from '$lib/components/layout/sidebar/sidebar.svelte'
	import SidebarMobile from '$lib/components/layout/sidebar/sidebar-mobile.svelte'
	import { ModeWatcher } from 'mode-watcher'

	import '../app.css'

	let { children } = $props()

	let isBlogRoute = $derived($page.url.pathname.startsWith('/blog'))
</script>

<ModeWatcher defaultMode="dark" />
<BackgroundCanvas />
<MouseGlow />

{#if isBlogRoute}
	<div
		class="bg-neutral-e1/85 dark:bg-neutral-e1/75 relative z-20 min-h-screen select-none"
		data-sveltekit-preload-code="eager"
		data-sveltekit-preload-data="hover"
	>
		<SidebarMobile />

		<main class="mx-auto w-full max-w-5xl px-6 pb-16 pt-14 md:px-10">
			{@render children()}
		</main>
	</div>
{:else}
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
{/if}
