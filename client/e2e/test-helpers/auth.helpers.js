import { expect } from "@playwright/test";

export default async function Login(page, username, password) {
	await page.goto("/");

	await page.getByRole("button", { name: "Log In" }).click();
	await page.getByPlaceholder("Username").fill(username);
	await page.getByPlaceholder("Password").fill(password);

	await page.getByRole("button", { name: "Sign in" }).click();

	const responsePromise = page.waitForResponse(
		"http://localhost:3000/auth/login"
	);

	const response = await responsePromise;

	expect(response.status()).toBe(200);

	const responseBody = await response.json();
	expect(responseBody).toStrictEqual({
		id: expect.any(Number),
		message: "User logged in successfully",
		token: expect.any(String),
	});
}
