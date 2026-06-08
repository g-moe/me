import { error } from '@sveltejs/kit'
import type { Component } from 'svelte'

import { getBlogPosts } from '$lib/content/blog'

type BlogModule = {
	default: Component
	metadata: {
		title: string
		description: string
		date: string
		tags: string[]
		published: boolean
	}
}

const modules = import.meta.glob<BlogModule>('$lib/content/blog/*.md')

export function entries() {
	return getBlogPosts().map((post) => {
		return { slug: post.slug }
	})
}

export async function load({ params }) {
	const match = Object.entries(modules).find(([path]) => {
		return path.endsWith(`/${params.slug}.md`)
	})

	if (!match) {
		error(404, 'Post not found')
	}

	const post = await match[1]()

	if (!post.metadata.published) {
		error(404, 'Post not found')
	}

	return {
		component: post.default,
		post: {
			...post.metadata,
			slug: params.slug
		}
	}
}
