import { describe, expect, it } from 'vitest'

import { getBlogPosts } from './blog'

describe('getBlogPosts', () => {
	it('returns published posts sorted newest first', () => {
		const posts = getBlogPosts()

		expect(posts).toHaveLength(3)
		expect(posts.map((post) => post.slug)).toEqual([
			'building-small-tools',
			'notes-on-trading-software',
			'why-static-sites-work'
		])
		expect(
			posts.every((post) => {
				return post.published
			})
		).toBe(true)
	})
})
