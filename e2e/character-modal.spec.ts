import { test, expect } from '@playwright/test';

test.describe('Star Wars Character App', () => {
  test('should login and open character modal with correct data', async ({ page }) => {
    // 1. Navigate to the app
    await page.goto('/');

    // 2. Should see the login form
    await expect(page.locator('text=Jedi Archives')).toBeVisible();

    // 3. Login
    await page.fill('input[type="text"]', 'admin');
    await page.fill('input[type="password"]', 'admin');
    await page.click('button[type="submit"]');

    // 4. Wait for characters to load (Luke Skywalker should be there on page 1)
    await expect(page.locator('text=Luke Skywalker')).toBeVisible({ timeout: 15000 });

    // 5. Click on Luke Skywalker card
    await page.locator('text=Luke Skywalker').click();

    // 6. Verify Modal opens with correct person's information
    // We expect the modal header to contain 'Luke Skywalker'
    await expect(page.locator('h2:has-text("Luke Skywalker")')).toBeVisible();
    
    // Check height (Luke is 172cm -> 1.72m)
    await expect(page.locator('text=1.72 m')).toBeVisible();
    
    // Check mass (Luke is 77kg)
    await expect(page.locator('text=77 kg')).toBeVisible();

    // Check homeworld details (Tatooine)
    await expect(page.locator('text=Tatooine')).toBeVisible({ timeout: 10000 });
  });
});
