import { test, expect } from '@playwright/test';

test('title correct', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('Loft 7 Esquinas · Miraflores, Cali');
});

test('meta description mentions 7 Esquinas', async ({ page }) => {
  await page.goto('/');
  const content = await page.locator('meta[name="description"]').getAttribute('content');
  expect(content).toContain('7 Esquinas');
});

test('hero H1 and reserve button link to WhatsApp', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Loft 7 Esquinas');
  const btn = page.locator('a:has-text("Reservar ahora")');
  await expect(btn).toBeVisible();
  expect(await btn.getAttribute('href')).toContain('wa.me');
});

test('nav links present', async ({ page }) => {
  await page.goto('/');
  for (const anchor of ['#galeria', '#descripcion', '#ubicacion', '#resenas']) {
    await expect(page.locator(`a[href="${anchor}"]`)).toBeVisible();
  }
});

test('gallery has 7 visible images', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#galeria img:visible')).toHaveCount(7);
});

test('reviews section shows 4.5 rating', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#resenas h2')).toContainText('4.5');
});

test('sticky WhatsApp CTA links to wa.me', async ({ page }) => {
  await page.goto('/');
  expect(await page.locator('#sticky-wa').getAttribute('href')).toContain('wa.me');
});

test('nightly price shows $130.000', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.sticky-cta-price strong')).toContainText('130.000');
});

test('mobile: sticky CTA visible, wa-float hidden', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await expect(page.locator('.sticky-cta')).toBeVisible();
  await expect(page.locator('.wa-float')).toBeHidden();
});

test('desktop: wa-float visible, sticky CTA hidden', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await expect(page.locator('.wa-float')).toBeVisible();
  await expect(page.locator('.sticky-cta')).toBeHidden();
});
