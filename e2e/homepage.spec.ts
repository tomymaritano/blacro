import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('has correct title and meta description', async ({ page }) => {
    await expect(page).toHaveTitle(/Blacro Studio/);
    
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /creative studio/i);
  });

  test('displays main navigation', async ({ page }) => {
    // Check desktop navigation
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.getByText('Portfolio')).toBeVisible();
    await expect(page.getByText('About')).toBeVisible();
    
    // Check logo is present
    await expect(page.locator('img[alt="logo"]')).toBeVisible();
  });

  test('mobile navigation works correctly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Mobile menu button should be visible
    const menuButton = page.getByRole('button', { name: 'Toggle menu' });
    await expect(menuButton).toBeVisible();
    
    // Click to open mobile menu
    await menuButton.click();
    
    // Check mobile menu content
    await expect(page.getByText('Projects')).toBeVisible();
    await expect(page.getByText('About')).toBeVisible();
    
    // Close mobile menu
    const closeButton = page.getByRole('button', { name: 'Close' });
    await closeButton.click();
    
    // Menu should be closed
    await expect(page.getByText('Projects')).not.toBeVisible();
  });

  test('hero section is displayed', async ({ page }) => {
    // Check if hero content exists
    await expect(page.locator('main')).toBeVisible();
    
    // Check for key hero elements (adjust selectors based on your actual hero section)
    await expect(page.locator('h1, h2, [data-testid="hero-title"]')).toBeVisible();
  });

  test('navigation links work correctly', async ({ page }) => {
    // Test Portfolio link
    await page.getByText('Portfolio').click();
    await expect(page).toHaveURL(/.*portfolio/);
    
    // Go back to home
    await page.goto('/');
    
    // Test About link
    await page.getByText('About').click();
    await expect(page).toHaveURL(/.*about/);
  });

  test('contact link works', async ({ page }) => {
    // Look for contact button/link (adjust selector based on your actual implementation)
    const contactLink = page.getByText(/let's talk|contact/i).first();
    await contactLink.click();
    
    await expect(page).toHaveURL(/.*contact/);
  });

  test('page loads without JavaScript errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // Filter out known acceptable errors (e.g., from external scripts)
    const significantErrors = errors.filter(error => 
      !error.includes('favicon') &&
      !error.includes('analytics') &&
      !error.includes('Third-party')
    );
    
    expect(significantErrors).toHaveLength(0);
  });

  test('page is responsive', async ({ page }) => {
    const viewports = [
      { width: 320, height: 568 }, // Mobile
      { width: 768, height: 1024 }, // Tablet
      { width: 1920, height: 1080 }, // Desktop
    ];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.reload();
      
      // Check that main elements are visible at all viewport sizes
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
      
      // Check that content doesn't overflow
      const body = page.locator('body');
      const boundingBox = await body.boundingBox();
      
      if (boundingBox) {
        expect(boundingBox.width).toBeLessThanOrEqual(viewport.width + 20); // Allow small tolerance
      }
    }
  });

  test('images load correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for images to load
    await page.waitForLoadState('networkidle');
    
    // Check that key images are loaded
    const images = page.locator('img');
    const imageCount = await images.count();
    
    expect(imageCount).toBeGreaterThan(0);
    
    // Check that images have loaded successfully
    for (let i = 0; i < Math.min(imageCount, 5); i++) { // Check first 5 images
      const img = images.nth(i);
      await expect(img).toBeVisible();
      
      // Check that image has loaded (naturalWidth > 0)
      const naturalWidth = await img.evaluate(el => (el as HTMLImageElement).naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    }
  });

  test('performance metrics are reasonable', async ({ page }) => {
    await page.goto('/');
    
    // Measure page load time
    const performanceEntries = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      return {
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.navigationStart,
        loadComplete: navigation.loadEventEnd - navigation.navigationStart,
      };
    });
    
    // Assert reasonable load times (adjust thresholds as needed)
    expect(performanceEntries.domContentLoaded).toBeLessThan(5000); // 5 seconds
    expect(performanceEntries.loadComplete).toBeLessThan(10000); // 10 seconds
  });
});