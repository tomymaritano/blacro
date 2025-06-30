import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays contact form correctly', async ({ page }) => {
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Your Message')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Send' })).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Send' }).click();
    
    await expect(page.getByText('Your name is too short')).toBeVisible();
    await expect(page.getByText('Invalid email address')).toBeVisible();
    await expect(page.getByText('Your message is too short')).toBeVisible();
  });

  test('shows validation error for invalid email', async ({ page }) => {
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('invalid-email');
    await page.getByLabel('Your Message').fill('This is a test message.');
    
    await page.getByRole('button', { name: 'Send' }).click();
    
    await expect(page.getByText('Invalid email address')).toBeVisible();
  });

  test('shows validation error for short name', async ({ page }) => {
    await page.getByLabel('Name').fill('A');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Your Message').fill('This is a test message.');
    
    await page.getByRole('button', { name: 'Send' }).click();
    
    await expect(page.getByText('Your name is too short')).toBeVisible();
  });

  test('shows validation error for short message', async ({ page }) => {
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Your Message').fill('Short');
    
    await page.getByRole('button', { name: 'Send' }).click();
    
    await expect(page.getByText('Your message is too short')).toBeVisible();
  });

  test('form submission shows loading state', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Your Message').fill('This is a test message for the contact form.');
    
    // Intercept the API call to control timing
    await page.route('/api/contact', async route => {
      // Delay response to see loading state
      await new Promise(resolve => setTimeout(resolve, 1000));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    
    // Submit form
    await page.getByRole('button', { name: 'Send' }).click();
    
    // Check loading state
    await expect(page.getByText('Sending...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled();
    
    // Wait for success message
    await expect(page.getByText('Message sent successfully!')).toBeVisible();
  });

  test('handles API error gracefully', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Your Message').fill('This is a test message for the contact form.');
    
    // Intercept the API call to return error
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Rate limit exceeded' }),
      });
    });
    
    // Submit form
    await page.getByRole('button', { name: 'Send' }).click();
    
    // Check error message
    await expect(page.getByText('Rate limit exceeded')).toBeVisible();
  });

  test('form clears after successful submission', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('test@example.com');
    await page.getByLabel('Your Message').fill('This is a test message for the contact form.');
    
    // Intercept the API call to return success
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    
    // Submit form
    await page.getByRole('button', { name: 'Send' }).click();
    
    // Wait for success message
    await expect(page.getByText('Message sent successfully!')).toBeVisible();
    
    // Check that form is cleared
    await expect(page.getByLabel('Name')).toHaveValue('');
    await expect(page.getByLabel('Email')).toHaveValue('');
    await expect(page.getByLabel('Your Message')).toHaveValue('');
  });

  test('form is accessible', async ({ page }) => {
    // Check that form fields have proper labels
    const nameInput = page.getByLabel('Name');
    const emailInput = page.getByLabel('Email');
    const messageInput = page.getByLabel('Your Message');
    
    await expect(nameInput).toHaveAttribute('id', 'name');
    await expect(emailInput).toHaveAttribute('id', 'email');
    await expect(messageInput).toHaveAttribute('id', 'message');
    
    // Check that labels are properly associated
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const messageLabel = page.locator('label[for="message"]');
    
    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(messageLabel).toBeVisible();
    
    // Check tab navigation
    await nameInput.focus();
    await page.keyboard.press('Tab');
    await expect(emailInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(messageInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Send' })).toBeFocused();
  });

  test('contact page loads without errors', async ({ page }) => {
    const errors: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    page.on('pageerror', (error) => {
      errors.push(error.message);
    });
    
    await page.goto('/contact');
    await page.waitForLoadState('networkidle');
    
    // Filter out known acceptable errors
    const significantErrors = errors.filter(error => 
      !error.includes('favicon') &&
      !error.includes('analytics') &&
      !error.includes('Third-party')
    );
    
    expect(significantErrors).toHaveLength(0);
  });

  test('contact form works on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check that form is visible and usable on mobile
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Your Message')).toBeVisible();
    
    // Fill and submit form on mobile
    await page.getByLabel('Name').fill('Mobile User');
    await page.getByLabel('Email').fill('mobile@example.com');
    await page.getByLabel('Your Message').fill('Testing mobile contact form.');
    
    // Intercept API call
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    
    await page.getByRole('button', { name: 'Send' }).click();
    await expect(page.getByText('Message sent successfully!')).toBeVisible();
  });
});