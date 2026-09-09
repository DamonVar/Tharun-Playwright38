import { test, expect } from '@playwright/test';

test('OrangeHRM PIM Module Login and Navigation', async ({ page }) => {
  // Step 1: Navigate to the login page
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  
  // Step 2: Fill in the login credentials
  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  
  // Step 3: Click the Login button
  await page.click('button:has-text("Login")');
  
  // Step 4: Wait for navigation to complete
  await page.waitForURL('**/dashboard/**');
  
  // Step 5: Navigate to the PIM Module
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewPimModule');
  
  // Step 6: Verify the URL contains /pim/
  expect(page.url()).toContain('/pim/');
  
  // Step 7: Verify the page has loaded by checking for PIM heading content
  await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();
});
