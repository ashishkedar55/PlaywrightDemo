import { test, expect } from '@playwright/test';

test('Saucedemo lab login', async ({ page }) => {
  const webURL= await page.goto('https://www.saucedemo.com/');
 const userName = await page.fill('//input[@placeholder="Username"]', 'standard_user');
  const passWord = await page.fill('#password', 'secret_sauce');
  const loginButton = await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');   

const items=await page.locator('//div[@class="inventory_list"]//div[@class="inventory_item_name "]').allTextContents()
const button =await page.locator('//button[text()="Add to cart"]')
for(let i=0; i<items.length;i++){
console.log(items[i])

if(items[i].includes('Sauce Labs Backpack')){
  console.log('Item found: ' + items[i])
  await button.nth(i).click() 
  break;      
}
}
const cartLinkicon = await page.locator('//a[@class="shopping_cart_link"]')
await cartLinkicon.click()
const cartItems = await page.locator('.cart_item .inventory_item_name').allTextContents()
expect(cartItems).toContain('Sauce Labs Backpack')

const checkoutButton =await page.locator('//button[text()="Checkout"]')
checkoutButton.click()
await page.fill('#first-name', 'Ashish')
await page.fill('#last-name', 'Kedar')
await page.fill('#postal-code', '12345')
const continueButton = await page.locator('//input[@value="Continue"]')
continueButton.click()
const finishButton = await page.locator('//button[text()="Finish"]')
finishButton.click()
const confirmationMessage = await page.locator('.complete-header').textContent()
expect(confirmationMessage).toBe('Thank you for your order!')  

}); 


