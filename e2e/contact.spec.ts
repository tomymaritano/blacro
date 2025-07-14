import { test, expect } from '@playwright/test';

test.describe('Contact Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('displays contact form correctly', async ({ page }) => {
    await expect(page.getByLabel('NOMBRE *')).toBeVisible();
    await expect(page.getByLabel('EMAIL *')).toBeVisible();
    await expect(page.getByLabel('COMPAÑÍA *')).toBeVisible();
    await expect(page.getByLabel('WEBSITE - SOCIAL MEDIA')).toBeVisible();
    await expect(page.getByLabel('TELÉFONO *')).toBeVisible();
    await expect(page.getByLabel('PAÍS *')).toBeVisible();
    await expect(page.getByLabel('CONTANOS SOBRE TU PROYECTO *')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enviar Mensaje' })).toBeVisible();
  });

  test('shows validation errors for empty form', async ({ page }) => {
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();
    
    // Wait for validation errors to appear
    await expect(page.locator('text=Tu nombre debe tener al menos')).toBeVisible();
    await expect(page.locator('text=El email es requerido')).toBeVisible();
    await expect(page.locator('text=La compañía es requerida')).toBeVisible();
    await expect(page.locator('text=El teléfono es requerido')).toBeVisible();
    await expect(page.locator('text=El país es requerido')).toBeVisible();
    await expect(page.locator('text=La descripción del proyecto es requerida')).toBeVisible();
  });

  test('shows validation error for invalid email', async ({ page }) => {
    await page.getByLabel('NOMBRE *').fill('Juan Pérez');
    await page.getByLabel('EMAIL *').fill('invalid-email');
    await page.getByLabel('COMPAÑÍA *').fill('Mi Empresa');
    await page.getByLabel('TELÉFONO *').fill('+54 11 1234-5678');
    await page.getByLabel('PAÍS *').selectOption('AR');
    await page.getByLabel('CONTANOS SOBRE TU PROYECTO *').fill('Este es un mensaje de prueba.');
    
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();
    
    await expect(page.locator('text=El email debe tener un formato válido')).toBeVisible();
  });

  test('shows validation error for short name', async ({ page }) => {
    await page.getByLabel('NOMBRE *').fill('A');
    await page.getByLabel('EMAIL *').fill('test@example.com');
    await page.getByLabel('COMPAÑÍA *').fill('Mi Empresa');
    await page.getByLabel('TELÉFONO *').fill('+54 11 1234-5678');
    await page.getByLabel('PAÍS *').selectOption('AR');
    await page.getByLabel('CONTANOS SOBRE TU PROYECTO *').fill('Este es un mensaje de prueba.');
    
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();
    
    await expect(page.locator('text=Tu nombre debe tener al menos')).toBeVisible();
  });

  test('shows validation error for short project description', async ({ page }) => {
    await page.getByLabel('NOMBRE *').fill('Juan Pérez');
    await page.getByLabel('EMAIL *').fill('test@example.com');
    await page.getByLabel('COMPAÑÍA *').fill('Mi Empresa');
    await page.getByLabel('TELÉFONO *').fill('+54 11 1234-5678');
    await page.getByLabel('PAÍS *').selectOption('AR');
    await page.getByLabel('CONTANOS SOBRE TU PROYECTO *').fill('Corto');
    
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();
    
    await expect(page.locator('text=La descripción debe tener al menos')).toBeVisible();
  });

  test('form submission shows loading state', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel('NOMBRE *').fill('Juan Pérez');
    await page.getByLabel('EMAIL *').fill('test@example.com');
    await page.getByLabel('COMPAÑÍA *').fill('Mi Empresa');
    await page.getByLabel('TELÉFONO *').fill('+54 11 1234-5678');
    await page.getByLabel('PAÍS *').selectOption('AR');
    await page.getByLabel('CONTANOS SOBRE TU PROYECTO *').fill('Este es un mensaje de prueba para el formulario de contacto.');
    
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
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();
    
    // Check loading state
    await expect(page.getByText('Enviando...')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Enviando...' })).toBeDisabled();
    
    // Wait for success message
    await expect(page.getByText('¡Mensaje enviado exitosamente!')).toBeVisible();
  });

  test('handles API error gracefully', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel('NOMBRE *').fill('Juan Pérez');
    await page.getByLabel('EMAIL *').fill('test@example.com');
    await page.getByLabel('COMPAÑÍA *').fill('Mi Empresa');
    await page.getByLabel('TELÉFONO *').fill('+54 11 1234-5678');
    await page.getByLabel('PAÍS *').selectOption('AR');
    await page.getByLabel('CONTANOS SOBRE TU PROYECTO *').fill('Este es un mensaje de prueba para el formulario de contacto.');
    
    // Intercept the API call to return error
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Rate limit exceeded' }),
      });
    });
    
    // Submit form
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();
    
    // Check error message
    await expect(page.getByText('Rate limit exceeded')).toBeVisible();
  });

  test('form clears after successful submission', async ({ page }) => {
    // Fill form with valid data
    await page.getByLabel('NOMBRE *').fill('Juan Pérez');
    await page.getByLabel('EMAIL *').fill('test@example.com');
    await page.getByLabel('COMPAÑÍA *').fill('Mi Empresa');
    await page.getByLabel('TELÉFONO *').fill('+54 11 1234-5678');
    await page.getByLabel('PAÍS *').selectOption('AR');
    await page.getByLabel('CONTANOS SOBRE TU PROYECTO *').fill('Este es un mensaje de prueba para el formulario de contacto.');
    
    // Intercept the API call to return success
    await page.route('/api/contact', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    });
    
    // Submit form
    await page.getByRole('button', { name: 'Enviar Mensaje' }).click();
    
    // Wait for success message
    await expect(page.getByText('¡Mensaje enviado exitosamente!')).toBeVisible();
    
    // Check that form is cleared
    await expect(page.getByLabel('NOMBRE *')).toHaveValue('');
    await expect(page.getByLabel('EMAIL *')).toHaveValue('');
    await expect(page.getByLabel('COMPAÑÍA *')).toHaveValue('');
    await expect(page.getByLabel('TELÉFONO *')).toHaveValue('');
    await expect(page.getByLabel('PAÍS *')).toHaveValue('');
    await expect(page.getByLabel('CONTANOS SOBRE TU PROYECTO *')).toHaveValue('');
  });

  test('form is accessible', async ({ page }) => {
    // Check that form fields have proper labels
    const nameInput = page.getByLabel('NOMBRE *');
    const emailInput = page.getByLabel('EMAIL *');
    const companyInput = page.getByLabel('COMPAÑÍA *');
    const phoneInput = page.getByLabel('TELÉFONO *');
    const countryInput = page.getByLabel('PAÍS *');
    const projectInput = page.getByLabel('CONTANOS SOBRE TU PROYECTO *');
    
    await expect(nameInput).toHaveAttribute('id', 'name');
    await expect(emailInput).toHaveAttribute('id', 'email');
    await expect(companyInput).toHaveAttribute('id', 'company');
    await expect(phoneInput).toHaveAttribute('id', 'phone');
    await expect(countryInput).toHaveAttribute('id', 'country');
    await expect(projectInput).toHaveAttribute('id', 'projectDescription');
    
    // Check that labels are properly associated
    const nameLabel = page.locator('label[for="name"]');
    const emailLabel = page.locator('label[for="email"]');
    const companyLabel = page.locator('label[for="company"]');
    
    await expect(nameLabel).toBeVisible();
    await expect(emailLabel).toBeVisible();
    await expect(companyLabel).toBeVisible();
    
    // Check tab navigation
    await nameInput.focus();
    await page.keyboard.press('Tab');
    await expect(emailInput).toBeFocused();
    
    await page.keyboard.press('Tab');
    await expect(companyInput).toBeFocused();
    
    // Skip to submit button (tab order varies)
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: 'Enviar Mensaje' })).toBeFocused();
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
    await expect(page.getByLabel('NOMBRE *')).toBeVisible();
    await expect(page.getByLabel('EMAIL *')).toBeVisible();
    await expect(page.getByLabel('CONTANOS SOBRE TU PROYECTO *')).toBeVisible();
    
    // Fill and submit form on mobile
    await page.getByLabel('NOMBRE *').fill('Usuario Móvil');
    await page.getByLabel('EMAIL *').fill('mobile@example.com');
    await page.getByLabel('COMPAÑÍA *').fill('Empresa Móvil');
    await page.getByLabel('TELÉFONO *').fill('+54 11 1234-5678');
    await page.getByLabel('PAÍS *').selectOption('AR');
    await page.getByLabel('CONTANOS SOBRE TU PROYECTO *').fill('Probando formulario de contacto móvil.');
    
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