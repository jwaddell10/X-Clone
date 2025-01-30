import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import DisplayPost from "../components/HomePage/DisplayPost";

export const handlers = [
	// Intercept "GET https://example.com/user" requests...
	http.get("https://example.com/user", () => {
		console.log(HttpResponse.json(), "http response");
		// ...and respond to them using this JSON response.
		return HttpResponse.json({
			id: "c7b3d8e0-5e0b-4b0f-8b3a-3b9f4b3d3b3d",
			firstName: "John12312",
			lastName: "Maverick",
		});
	}),
];

export const server = setupServer(...handlers);

async function app() {
	const response = await fetch("https://example.com/user");
	const user = await response.json();
	console.log(user);
}

app();

// describe("Display post items render", () => {
// 	it("renders correct items", () => {
// 		render(<DisplayPost />);

// 		expect();
// 	});
// });
