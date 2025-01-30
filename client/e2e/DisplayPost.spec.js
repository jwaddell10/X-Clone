// import { test, expect } from "@playwright/test";

// test('login form works', () => {
//     async function login(page) {

//         await page.goto('http://localhost:5173'); // Navigate to login page [1, 2, 5]
    
//         await page.getByRole('button', { name: 'Log In'}).click();
    
//         await page.getByRole('form', {name: 'Log In'}).toBeVisible();
      
//         // await page.fill('input[name="username"]', 'your_username'); [1, 2, 5]
      
//         // await page.fill('input[name="password"]', 'your_password'); [1, 2, 5]
      
//         // await page.click('button[type="submit"]'); [1, 2, 5]
      
//       }
//       login()
// })




// test("posts display correctly", async ({ page }) => {
//     await login(page); [1, 2, 5]

//     await page.goto('http://localhost:5173');

//     const allButton = page.locator('button')
//     await expect(allButton).toBeVisible();
// })