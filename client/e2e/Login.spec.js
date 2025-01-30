import { test, expect } from "@playwright/test";

test("Login form displays on page when user clicks Login button", async ({ page }) => {
	await page.goto("/");
	await page.getByRole("button", { name: "Log In" }).click();
	await expect(page.getByRole("heading", { name: "Login" })).toBeVisible();

	await expect(page.getByPlaceholder("Username")).toBeVisible();
	await expect(page.getByPlaceholder("Password")).toBeVisible();

	await expect(page.getByRole("button", { name: "Log in" })).toBeVisible();

	await page.getByPlaceholder("Username").fill("testing");
	await page.getByPlaceholder("Password").fill("testing");
});

test("User is logged in when information is submitted to login form", async({page}) => {
    await page.goto("/")

    await page.getByRole("button", { name: "Log In"}).click();
    await page.getByPlaceholder("Username").fill('testing')
    await page.getByPlaceholder("Password").fill('testing')
    
    await page.getByRole("button", { name: "Sign in"}).click();

    const responsePromise = page.waitForResponse("http://localhost:3000/auth/login")

    const response = await responsePromise;

    expect(response.status()).toBe(200);

    const responseBody = await response.json();
    expect(responseBody).toStrictEqual({
        id: expect.any(Number),
        message: "User logged in successfully",
        token: expect.any(String)
    })
})
