<script lang="ts">
  import GlassSurface from "$lib/components/ui/glass-surface.svelte";
  import { onMount } from "svelte";
  import type { PageData } from "./$types";
  import type { BlogPost } from "$lib/content/blog";

  let { data } = $props<{ data: PageData }>();

  const pageSize = 8;

  let search = $state("");
  let visibleCount = $state(pageSize);

  let filteredPosts = $derived(
    data.posts.filter((post: BlogPost) => {
      return post.title.toLowerCase().includes(search.trim().toLowerCase());
    }),
  );

  let visiblePosts = $derived(filteredPosts.slice(0, visibleCount));
  let hasMorePosts = $derived(visibleCount < filteredPosts.length);

  function updateSearch(event: Event) {
    search = (event.currentTarget as HTMLInputElement).value;
    visibleCount = pageSize;
  }

  function loadMorePosts() {
    if (!hasMorePosts) return;
    visibleCount = Math.min(visibleCount + pageSize, filteredPosts.length);
  }

  onMount(() => {
    function handleScroll() {
      const distanceFromBottom =
        document.documentElement.scrollHeight -
        window.scrollY -
        window.innerHeight;

      if (distanceFromBottom < 400) loadMorePosts();
    }

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
</script>

<svelte:head>
  <title>Blog | garrett</title>
  <meta
    name="description"
    content="Thoughts on programming, trading software, projects, and the web."
  />
</svelte:head>

<section class="space-y-8 py-4 md:py-6 animate-[boot-in_500ms_ease-out]">
  <div class="space-y-5">
    <div class="border-b border-(--glass-edge) pb-4">
      <h1 class="font-display text-3xl font-bold text-neutral-e8">
        <span class="text-primary">03.</span> Blog
      </h1>
    </div>

    <label class="block">
      <span class="sr-only">Search posts</span>
      <input
        class="w-full border border-(--glass-edge) bg-(--glass-fill)
					px-4 py-3 text-base text-neutral-e8 outline-none
					placeholder:text-neutral-e4 focus:border-mint"
        type="search"
        value={search}
        oninput={updateSearch}
        placeholder="Search blog titles"
      />
    </label>
  </div>

  <div class="space-y-5" aria-live="polite">
    {#each visiblePosts as post}
      <GlassSurface element="article">
        <div class="window-title">
          <span class="size-2 bg-primary"></span> ~/blog/{post.slug}.md
        </div>
        <a class="block space-y-3 p-5" href={`/blog/${post.slug}`}>
          <div
            class="flex flex-wrap items-center gap-2 text-sm text-neutral-e4"
          >
            <time datetime={post.date}>
              {new Date(`${post.date}T00:00:00`).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            {#if post.tags.length}
              <span aria-hidden="true">/</span>
              <span>{post.tags.join(", ")}</span>
            {/if}
          </div>

          <h2 class="text-xl font-semibold text-neutral-e8">{post.title}</h2>
          <p class="leading-relaxed text-neutral-e5">{post.description}</p>
        </a>
      </GlassSurface>
    {:else}
      <p class="text-neutral-e5">No posts match that search.</p>
    {/each}
  </div>

  {#if hasMorePosts}
    <div class="flex justify-center">
      <button
        class="border border-(--glass-edge) bg-(--glass-fill)
					px-4 py-2 text-sm font-medium text-neutral-e8
					hover:border-mint hover:text-mint"
        type="button"
        onclick={loadMorePosts}
      >
        Load more
      </button>
    </div>
  {/if}
</section>
