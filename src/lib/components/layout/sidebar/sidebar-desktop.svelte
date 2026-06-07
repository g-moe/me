<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import SocialLinks from '$lib/components/layout/sidebar/icon-links.svelte'
	import { onDestroy, onMount, tick } from 'svelte'

	import ThemeMode from '../themeMode/theme-mode.svelte'

	let activeSection = $state('about')
	let isNavigating = false
	let unsubscribe: () => void
	let unsubscribePage: () => void

	let isProjectsRoute = $state($page.url.pathname.startsWith('/projects'))

	function isActiveSection(section: string) {
		return (
			activeSection === section.toLowerCase() ||
			(section === 'PROJECTS' && isProjectsRoute)
		)
	}

	async function navigateOrScroll(event: MouseEvent, sectionId: string) {
		event.preventDefault()
		const isHome = $page.url.pathname === '/'

		async function scrollToSection() {
			const el = document.getElementById(sectionId)

			if (el) {
				const y = el.getBoundingClientRect().top + window.scrollY - 50
				isNavigating = true
				window.scrollTo({ behavior: 'smooth', top: y })
				activeSection = sectionId

				setTimeout(() => {
					return (isNavigating = false)
				}, 600)
			}
		}

		if (isHome) {
			scrollToSection()
		} else {
			await goto(`/#${sectionId}`)
			await tick()
			scrollToSection()
		}
	}

	function setupObserver() {
		const sectionIds = ['about', 'projects']

		const sections = sectionIds
			.map(id => {
				return document.getElementById(id)
			})
			.filter(Boolean) as HTMLElement[]

		if (!sections.length) return

		const observer = new IntersectionObserver(
			entries => {
				if (isNavigating) return

				entries.forEach(entry => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id
					}
				})
			},
			{
				root: null,
				rootMargin: '0px 0px -25% 0px',
				threshold: 0.1
			}
		)

		sections.forEach(section => {
			return observer.observe(section)
		})

		return () => {
			return observer.disconnect()
		}
	}

	onMount(async () => {
		unsubscribePage = page.subscribe(async $page => {
			isProjectsRoute = $page.url.pathname.startsWith('/projects')

			if ($page.url.pathname === '/' || isProjectsRoute) {
				await tick()
				if (unsubscribe) unsubscribe()
				const cleanup = setupObserver()
				unsubscribe = cleanup || (() => {})
			} else if (unsubscribe) unsubscribe()
		})
	})

	onDestroy(() => {
		if (unsubscribe) unsubscribe()
		if (unsubscribePage) unsubscribePage()
	})
</script>

<div class="fixed right-8 top-8 z-[60]">
	<ThemeMode />
</div>

<div class="sticky top-0 z-50 flex h-screen w-2/5 flex-col p-12 px-24 py-20">
	<div>
		<nav class="mt-24">
			<ul class="flex flex-col space-y-2 px-0">
				{#each ['ABOUT', 'PROJECTS'] as section}
					<li>
						<a
							class="group relative block px-2 py-1.5 text-left text-lg font-medium transition-all duration-300"
							class:active-section={isActiveSection(section)}
							href={`/#${section.toLowerCase()}`}
							onclick={e => {
								return navigateOrScroll(e, section.toLowerCase())
							}}
						>
							<span
								class="absolute left-0 transition-all duration-300"
								class:opacity-0={!isActiveSection(section)}
								class:opacity-100={isActiveSection(section)}
							>
								{isActiveSection(section) ? '📈' : ''}
							</span>
							<span
								class="relative z-10 text-neutral-e8 transition-all duration-300 group-hover:text-mint"
								class:font-bold={isActiveSection(section)}
								class:pl-6={isActiveSection(section)}
								class:translate-x-4={isActiveSection(section)}
							>
								{section}
							</span>
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div class="mb-12 mt-auto flex space-x-4">
		<SocialLinks />
	</div>
</div>
