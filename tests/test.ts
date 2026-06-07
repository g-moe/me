import { expect, test } from '@playwright/test'

test('home page renders main sections', async ({ page }) => {
	await page.goto('/')
	await expect(page.getByRole('heading', { name: 'About' })).toBeVisible()
	await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible()
})
