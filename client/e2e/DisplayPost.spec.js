import { test, expect } from "@playwright/test";
import Login from "./test-helpers/auth.helpers";

test("Correct items display on homepage when user logs in", async ({
	page,
}) => {
	await Login(page, "testing", "testing");

	await page.goto("/");

	const buttons = page.getByRole("button", { name: "Post" });
	await expect(buttons).toHaveCount(2);
	await expect(page.getByRole("button", { name: "All" })).toBeVisible();
	await expect(page.getByRole("button", { name: "Following" })).toBeVisible();
	await expect(page.getByPlaceholder("What is happening?!")).toBeVisible();
});

test("Posts display when user is logged in", async ({ page }) => {
	await Login(page, "testing", "testing");
    const response = await page.request.get('http://localhost:3000/post');

	expect(response).toBeOK();
});
