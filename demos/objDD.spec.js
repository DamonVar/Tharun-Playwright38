import { test, expect } from '@playwright/test';

let Employee = {
    employee1: { firstName: 'Atharv', lastName: 'Kumar' , Empid : 234},
    employee2: { firstName: 'Hellen', lastName: 'Kelle' , Empid : 345},
    employee3: { firstName: 'Jhon', lastName: 'Cena' , Empid : 456},
    employee4: { firstName: 'Under', lastName: 'Taker' , Empid : 567}  
};



for (let employee in Employee){
  test(`Testing add employee Feature with ${Employee[employee].firstName}`, async ({ page }) => {
  
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('link', { name: 'PIM' }).click();

    await page.getByRole('link', { name: 'Add Employee' }).click();

    await page.getByRole('textbox', { name: 'First Name' }).fill(Employee[employee].firstName);
    await page.getByRole('textbox', { name: 'Last Name' }).fill(Employee[employee].lastName);
    await page.getByRole("textbox").nth(4).fill(Employee[employee].Empid.toString());

    await page.getByRole('button', { name: 'Save' }).click();
    
    //await expect(page.getByRole('heading', { name: 'Personal Details' })).toBeVisible();

    
  });

}
