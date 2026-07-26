<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import SocialLinks from "$lib/components/layout/sidebar/icon-links.svelte";
  import { onDestroy, onMount, tick } from "svelte";

  import ThemeMode from "../themeMode/theme-mode.svelte";

  let activeSection = $state("about");
  let isNavigating = false;
  let unsubscribe: () => void;
  let unsubscribePage: () => void;

  let isBlogRoute = $state($page.url.pathname.startsWith("/blog"));
  let isProjectsRoute = $state($page.url.pathname.startsWith("/projects"));

  function isActiveSection(section: string) {
    return (
      activeSection === section.toLowerCase() ||
      (section === "PROJECTS" && isProjectsRoute) ||
      (section === "BLOG" && isBlogRoute)
    );
  }

  async function navigateOrScroll(event: MouseEvent, sectionId: string) {
    event.preventDefault();

    if (sectionId === "blog") {
      await goto("/blog");
      return;
    }

    const isHome = $page.url.pathname === "/";

    async function scrollToSection() {
      const el = document.getElementById(sectionId);

      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 50;
        isNavigating = true;
        window.scrollTo({ top: y });
        activeSection = sectionId;

        setTimeout(() => {
          return (isNavigating = false);
        }, 600);
      }
    }

    if (isHome) {
      scrollToSection();
    } else {
      await goto(`/#${sectionId}`);
      await tick();
      scrollToSection();
    }
  }

  function setupObserver() {
    const sectionIds = ["about", "projects"];

    const sections = sectionIds
      .map((id) => {
        return document.getElementById(id);
      })
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigating) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -25% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      return observer.observe(section);
    });

    return () => {
      return observer.disconnect();
    };
  }

  onMount(async () => {
    unsubscribePage = page.subscribe(async ($page) => {
      isBlogRoute = $page.url.pathname.startsWith("/blog");
      isProjectsRoute = $page.url.pathname.startsWith("/projects");

      if ($page.url.pathname === "/" || isProjectsRoute || isBlogRoute) {
        await tick();
        if (unsubscribe) unsubscribe();
        const cleanup = setupObserver();
        unsubscribe = cleanup || (() => {});
      } else if (unsubscribe) unsubscribe();
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
    if (unsubscribePage) unsubscribePage();
  });
</script>

<div class="fixed right-6 top-5 z-60 md:right-8">
  <ThemeMode />
</div>

<div
  class="sticky top-0 z-50 flex h-screen w-2/5 flex-col border-r border-(--glass-edge) px-12 py-16 lg:px-24"
>
  <div>
    <div class="mb-16">
      <a
        href="/"
        class="font-display text-2xl font-bold tracking-tight text-neutral-e8"
      >
        g<span class="text-primary">.moe</span><span
          class="animate-[cursor-blink_1s_steps(1)_infinite] text-mint">_</span
        >
      </a>
      <p class="mt-2 text-xs text-neutral-e4">builder</p>
    </div>
    <nav>
      <p class="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-e4">
        ~/navigation
      </p>
      <ul class="flex flex-col space-y-2 px-0">
        {#each ["ABOUT", "PROJECTS", "BLOG"] as section}
          <li>
            <a
              aria-label={section}
              class="group relative block border-l-2 border-transparent px-4 py-2.5 text-left text-base font-medium transition"
              class:border-primary={isActiveSection(section)}
              class:bg-neutral-e2={isActiveSection(section)}
              class:active-section={isActiveSection(section)}
              href={section === "BLOG" ? "/blog" : `/#${section.toLowerCase()}`}
              onclick={(e) => {
                return navigateOrScroll(e, section.toLowerCase());
              }}
            >
              <span
                class="relative z-10 text-neutral-e7 group-hover:text-primary"
                class:font-bold={isActiveSection(section)}
              >
                <span class="mr-3 text-neutral-e4"
                  >{String(
                    ["ABOUT", "PROJECTS", "BLOG"].indexOf(section) + 1,
                  ).padStart(2, "0")}</span
                >{section.toLowerCase()}
              </span>
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  </div>

  <div class="mb-4 mt-auto border-t border-(--glass-edge) pt-6">
    <p class="mb-3 text-[10px] uppercase tracking-[0.2em] text-neutral-e4">
      Links
    </p>
    <div class="flex space-x-2">
      <SocialLinks />
    </div>
  </div>
</div>
