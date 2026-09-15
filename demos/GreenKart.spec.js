import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/');

  const Products = ['Brocolli', 'Carrot'];   // User can add and test multiple products into the cart through this array
  
  let Total_Price = 0;
  for(const product of Products){   
    let Product_Price = await page.locator(`//h4[contains(., "${product}")]/following-sibling::p[@class='product-price']`).textContent();
    console.log(product  + " :" + Product_Price);
    Total_Price = Total_Price + Number(Product_Price);
    await page.locator(`//h4[contains(., "${product}")]/following-sibling::div[@class="product-action"]/button`).click();
  }

  console.log("Expected Total Price :" + Total_Price);
  await page.locator(`//a[@class="cart-icon"]/img`).click();
  await page.locator(`//button[contains(., 'PROCEED')]`).click();

  let Cart_Total_price = Number(await page.locator(`//span[@class="discountAmt"]`).textContent());
  console.log("Actual Total price in cart: " + Cart_Total_price);

  expect(Total_Price).toBe(Cart_Total_price);
  
});

