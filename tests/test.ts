import { expect, test } from '@playwright/test'

test('home page renders main sections and desktop navigation', async ({
	page
}) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
	await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
	await expect(page.getByRole('link', { name: 'ABOUT' })).toBeVisible()
	await expect(page.getByRole('link', { name: 'PROJECTS' })).toBeVisible()
	await expect(page.getByRole('link', { name: 'BLOG' })).toBeVisible()
})

test('desktop blog navigation opens the separate blog layout', async ({
	page
}) => {
	await page.goto('/')
	await page.getByRole('link', { name: 'BLOG' }).click()

	await expect(page).toHaveURL('/blog')
	await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
	await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible()
	await page.getByRole('button', { name: 'Open menu' }).click()
	await expect(page.getByRole('menuitem', { name: 'Home' })).toBeVisible()
	await expect(page.getByRole('menuitem', { name: 'Blog' })).toBeVisible()
	await expect(
		page.getByRole('link', { exact: true, name: 'ABOUT' })
	).not.toBeVisible()
	await expect(
		page.getByRole('link', { exact: true, name: 'PROJECTS' })
	).not.toBeVisible()
})

test('blog page lists posts and filters by title', async ({ page }) => {
	await page.goto('/blog')
	await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
	await expect(page.getByPlaceholder('Search blog titles')).toBeVisible()
	await expect(
		page.getByRole('heading', { name: 'Building Small Tools That Last' })
	).toBeVisible()
	await expect(
		page.getByRole('heading', { name: 'Notes On Trading Software' })
	).toBeVisible()

	await page.getByPlaceholder('Search blog titles').fill('trading')

	await expect(
		page.getByRole('heading', { name: 'Notes On Trading Software' })
	).toBeVisible()
	await expect(
		page.getByRole('heading', { name: 'Building Small Tools That Last' })
	).not.toBeVisible()
})

test('blog post renders markdown content', async ({ page }) => {
	await page.goto('/blog/building-small-tools')
	await expect(
		page.getByRole('heading', { name: 'Building Small Tools That Last' })
	).toBeVisible()
	await expect(
		page.getByRole('heading', { name: 'Practical defaults' })
	).toBeVisible()
	await expect(
		page.getByText('A small tool should feel like a shortcut')
	).toBeVisible()
})

test('theme stays dark when opening a blog post', async ({ page }) => {
	await page.addInitScript(() => {
		window.localStorage.setItem('mode-watcher-mode', 'dark')
	})

	await page.goto('/')
	await expect(page.locator('html')).toHaveClass(/dark/)

	await page.goto('/blog/building-small-tools')
	await expect(page.locator('html')).toHaveClass(/dark/)
	await expect(
		page.getByRole('heading', { name: 'Building Small Tools That Last' })
	).toBeVisible()
})

test('blog cards link to individual post pages', async ({ page }) => {
	await page.goto('/blog')
	await page
		.getByRole('link', { name: /Building Small Tools That Last/ })
		.click()

	await expect(page).toHaveURL('/blog/building-small-tools')
	await expect(
		page.getByRole('heading', { name: 'Building Small Tools That Last' })
	).toBeVisible()
})

test('blog navigation stays client-side', async ({ page }) => {
	await page.goto('/blog')
	await page.evaluate(() => {
		;(
			window as Window & { blogClientNavigationMarker?: string }
		).blogClientNavigationMarker = 'kept'
	})

	await page
		.getByRole('link', { name: /Building Small Tools That Last/ })
		.click()

	await expect(page).toHaveURL('/blog/building-small-tools')
	await expect
		.poll(async () => {
			return page.evaluate(() => {
				return (window as Window & { blogClientNavigationMarker?: string })
					.blogClientNavigationMarker
			})
		})
		.toBe('kept')
})

test('mobile menu exposes blog navigation', async ({ page }) => {
	await page.setViewportSize({ width: 390, height: 844 })
	await page.goto('/')

	await page.getByRole('button', { name: 'Open menu' }).click()
	await expect(page.getByRole('menuitem', { name: 'Blog' })).toBeVisible()

	await page.getByRole('menuitem', { name: 'Blog' }).click()
	await expect(page).toHaveURL('/blog')
	await expect(page.getByRole('heading', { name: 'Blog' })).toBeVisible()
})

test('project detail routes redirect back to projects section', async ({
	page
}) => {
	await page.goto('/projects/tradingview')

	await expect(page).toHaveURL('/#projects')
	await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
})
