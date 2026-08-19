import { test, expect } from '@playwright/test';

let page;
test.beforeAll(async ({browser}) => {
    page = await browser.newPage();
    await page.goto('https://qademo.com/');
    await page.getByTestId('hero-signin-button').click();
    await page.getByTestId('username-input').click();
    await page.getByTestId('username-input').fill('standard_user');
    await page.getByTestId('password-input').click();
    await page.getByTestId('password-input').fill('standard123');
    await page.getByTestId('login-submit-button').click();
    await expect(page.getByTestId('navbar-logo')).toBeVisible();
    await expect(page.getByTestId('catalog-heading')).toBeVisible();

}
)

test('test', async ({}) => {
  await expect(page.getByTestId('navbar-logo')).toBeVisible();
  await expect(page.getByTestId('catalog-heading')).toBeVisible();
});


