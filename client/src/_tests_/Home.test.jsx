import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import WelcomePage from "../components/WelcomePage/WelcomePage";

describe("home page renders correct elements", () => {
	it("renders all items on the page", () => {
		render(<WelcomePage />);

		//X logo renders
		expect(screen.getByAltText("X logo"));

		//headers render
		expect(screen.getByText("Happening now"));
		expect(screen.getByText("Join today."));

		//links render
		expect(screen.getByText("Continue with Google"));
		expect(screen.getByText("Create Account"));
		expect(screen.getByText("Log In"));
		expect(screen.getByText("Sign In as Guest"));
	});
});
