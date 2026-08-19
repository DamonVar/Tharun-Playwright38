import { test, expect } from '@playwright/test';

test('Text Box', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Elements' }).click();
  await page.getByRole('link', { name: 'Text Box' }).click();
  //await page.goto('https://demoqa.com/text-box');
  await page.getByRole('link', { name: 'Text Box' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).click();
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Tharun');
  await page.getByRole('textbox', { name: 'name@example.com' }).click();
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('kelly@gmail.com');
  await page.getByRole('textbox', { name: 'Current Address' }).click();
  await page.getByRole('textbox', { name: 'Current Address' }).fill('Denni Denver, California');
  await page.locator('#permanentAddress').click();
  await page.locator('#permanentAddress').fill('Hellcat32, UB, Britan');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByText('Name:Tharun')).toBeVisible();
  await expect(page.getByText('Email:kelly@gmail.com')).toBeVisible();
  await expect(page.getByText('Current Address :Denni Denver')).toBeVisible();
  await expect(page.getByText('Permananet Address :Hellcat32')).toBeVisible();
});


test('Check Box', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Elements' }).click();
  await page.getByRole('link', { name: 'Check Box' }).click();
  await page.getByRole('checkbox', { name: 'Select Home' }).click();
  await expect(page.locator('#result')).toBeVisible();
  await page.locator('.rc-tree-switcher').click();
  await page.locator('.rc-tree-treenode.rc-tree-treenode-switcher-close.rc-tree-treenode-checkbox-checked.rc-tree-treenode-leaf-last > .rc-tree-switcher').click();
  await expect(page.getByRole('checkbox', { name: 'Select Word File.doc' })).toBeVisible();
});


test('Radio Button', async ({ page }) => {
  await page.goto('https://demoqa.com/checkbox');
  await page.getByRole('link', { name: 'Radio Button' }).click();
  await page.getByRole('radio', { name: 'Yes' }).check();
  await expect(page.getByText('You have selected Yes')).toBeVisible();
  await expect(page.getByRole('paragraph').getByText('Yes')).toBeVisible();
  await expect(page.getByRole('radio', { name: 'Impressive' })).toBeVisible();
  await page.getByRole('radio', { name: 'Impressive' }).check();
  await expect(page.getByText('You have selected Impressive')).toBeVisible();
  await expect(page.getByRole('paragraph').getByText('Impressive')).toBeVisible();
});


test('Webtables', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables');
  //await page.getByRole('textbox', { name: 'Type to search' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'First Name' }).fill('Tharun');
  await page.getByRole('textbox', { name: 'Last Name' }).fill('Var');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('Thar@gmail.com');
  await page.getByRole('textbox', { name: 'Age' }).fill('22');
  await page.getByRole('textbox', { name: 'Salary' }).fill('90000');
  await page.getByRole('textbox', { name: 'Department' }).fill('QA');
  await page.getByRole('button', { name: 'Submit' }).click();
  await expect(page.getByRole('cell', { name: 'Tharun' })).toBeVisible();
  await page.getByRole('textbox', { name: 'Type to search' }).fill('Tharun');
  await expect(page.getByRole('cell', { name: 'Tharun' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Add' })).toBeVisible();
});

test('linktext', async ({ page }) => {
  await page.goto('https://demoqa.com/links');
  await page.getByRole('paragraph').filter({ hasText: 'Created' }).click();
  await expect(page.getByRole('link', { name: 'Created' })).toBeVisible();
  await page.getByRole('link', { name: 'Created' }).click();
  await page.getByRole('link', { name: 'Created' }).click();
  await page.getByRole('link', { name: 'Created' }).click();
});



test('New Tab', async ({ page }) => {
  await page.goto('https://demoqa.com/');
  await page.getByRole('link', { name: 'Elements' }).click();
  await page.getByText('Alerts, Frame & Windows').click();
  await page.getByRole('link', { name: 'Browser Windows' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'New Tab' }).click();
  const page1 = await page1Promise;
  await expect(page1.getByRole('heading', { name: 'This is a sample page' })).toBeVisible();
});