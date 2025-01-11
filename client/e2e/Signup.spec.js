import { test, expect } from "@playwright/test";

test('signup form appears with correct elements when "Create Account" button is clicked', async ({
	page,
}) => {
	await page.goto("http://localhost:5173");

	// Click the "Create Account" button
	await page.getByRole("button", { name: "Create Account" }).click();

	// Check if the signup form is visible
	await expect(
		page.getByRole("heading", { name: "Create your account" })
	).toBeVisible();

	// Check for input fields
	await expect(page.getByPlaceholder("Username")).toBeVisible();

	// Use nth() to select the first password field
	await expect(page.getByPlaceholder("Password").nth(0)).toBeVisible();

	await expect(page.getByPlaceholder("Confirm Password")).toBeVisible();

	// Check for the submit button
	await expect(page.getByRole("button", { name: "Sign up" })).toBeVisible();

	// Check for the close icon (optional, if you want to test it)
	await expect(page.locator('svg[data-testid="CloseIcon"]')).toBeVisible();
});

test("signup form submits correct items", async ({ page, request }) => {
    await page.goto("http://localhost:5173");
  
    // Click the "Create Account" button
    await page.getByRole("button", { name: "Create Account" }).click();
  
    // Fill in the form
    await page.getByPlaceholder("Username").fill("testuser23");
    await page.getByPlaceholder("Password").nth(0).fill("testpassword");
    await page.getByPlaceholder("Confirm Password").fill("testpassword");
  
    // Intercept the POST request
    const responsePromise = page.waitForResponse(response => 
      response.url().includes(`http://localhost:3000/auth/signup`) && 
      response.request().method() === 'POST'
    );
  
    // Click the submit button
    await page.getByRole("button", { name: "Sign up" }).click();
  
    // Wait for the response
    const response = await responsePromise;
  console.log(response, 'this is response')
    // Check the response status
    expect(response.status()).toBe(200);
  
    // Check the response body
    const responseBody = await response.json();
    expect(responseBody).toEqual(expect.objectContaining({
      success: true,
      message: "User created successfully"
    }));
  });
