export type BlogPostMetadata = {
	title: string
	description: string
	date: string
	tags: string[]
	published: boolean
}

export type BlogPost = BlogPostMetadata & {
	slug: string
}

type BlogModule = {
	default: unknown
	metadata: BlogPostMetadata
}

const modules = import.meta.glob<BlogModule>('./blog/*.md', { eager: true })

function slugFromPath(path: string) {
	return path.split('/').pop()?.replace(/\.md$/, '') ?? ''
}

export function getBlogPosts() {
	return Object.entries(modules)
		.map(([path, post]) => {
			return {
				...post.metadata,
				slug: slugFromPath(path)
			}
		})
		.filter((post) => {
			return post.published
		})
		.sort((a, b) => {
			return new Date(b.date).getTime() - new Date(a.date).getTime()
		})
}
