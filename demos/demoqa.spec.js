import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import testData from '../testdata/demoqa-testdata.json';

test('fill the form', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  await page.getByRole('textbox', { name: 'Full Name' }).fill('Tharun V');
  await page.getByRole('textbox', { name: 'name@example.com' }).fill('tharv2026@gmail.com');
  await page.getByRole('textbox', { name: 'Current Address' }).fill('24, MG Road, Bangalore, KA, 560001');
  await page.locator('#permanentAddress').fill('15, Mahadevpura, Bangalore, 560037');
  await page.getByRole('button', { name: 'Submit' }).click();
});


test('fill the form - JSon ', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  await page.getByRole('textbox', { name: 'Full Name' }).fill(testData.fullname);
  await page.getByRole('textbox', { name: 'name@example.com' }).fill(testData.useremail);
  await page.getByRole('textbox', { name: 'Current Address' }).fill(testData.currentaddress);
  await page.locator('#permanentAddress').fill(testData.permanentadress);
  await page.getByRole('button', { name: 'Submit' }).click();
});


test('fill the form - .env ', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');
  await page.getByRole('textbox', { name: 'Full Name' }).fill(process.env.USER_FULLNAME);
  await page.getByRole('textbox', { name: 'name@example.com' }).fill(process.env.USER_EMAIL);
  await page.getByRole('textbox', { name: 'Current Address' }).fill(process.env.USER_CURRENTADDRESS);
  await page.locator('#permanentAddress').fill(process.env.USER_PERMANENTADDRESS);
  await page.getByRole('button', { name: 'Submit' }).click();
});


test('fill the form - fakerjs  ', async ({ page }) => {
  const FullName = faker.person.fullName();
  console.log(FullName)
  const randomEmail = faker.internet.email(); 
  console.log(randomEmail)
  const CurrentAddress = faker.location.city();
  console.log(CurrentAddress)
  const PermanentAddress = faker.location.city();
  console.log(PermanentAddress)

  await page.goto('https://demoqa.com/text-box');
  await page.getByRole('textbox', { name: 'Full Name' }).fill(FullName);
  await page.getByRole('textbox', { name: 'name@example.com' }).fill(randomEmail);
  await page.getByRole('textbox', { name: 'Current Address' }).fill(CurrentAddress);
  await page.locator('#permanentAddress').fill(PermanentAddress);

  await page.getByText('Submit', { exact: true }).click();
});


test('fill the form - JS  ', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  let fullname = (Math.random() + 1).toString(36).substring(7);
  await page.getByRole('textbox', { name: 'Full Name' }).fill(fullname);
  await page.getByRole('textbox', { name: 'name@example.com' }).fill(fullname +"gmail.com");
  await page.getByRole('textbox', { name: 'Current Address' }).fill('Bangalore');
  await page.locator('#permanentAddress').fill('Bangalore');
  await page.getByRole('button', { name: 'Submit' }).click();
});

test('fill the form - CLI', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  let fullname = (Math.random() + 1).toString(36).substring(7);
  await page.getByRole('textbox', { name: 'Full Name' }).fill(process.env.PWUsername);
  await page.getByRole('textbox', { name: 'name@example.com' }).fill(process.env.PWEmail);
  await page.getByRole('textbox', { name: 'Current Address' }).fill(process.env.PWCurrentAddress);
  await page.locator('#permanentAddress').fill(process.env.PWPermanentAddress);
  await page.getByRole('button', { name: 'Submit' }).click();

  //$env:PWUsername="john_doe"; $env:PWEmail="john@example.com"; $env:PWCurrentAddress="123 Main St"; $env:PWPermanentAddress="456 Elm St"; npx playwright test -g "fill the form - CLI" --project="chromium" --headed
});

