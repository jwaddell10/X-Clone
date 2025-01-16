import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ComposePostComponent from "../components/HomePage/ComposePostComponent.jsx";

describe("ComposePost component", () => {
	it("renders correct items on the page", () => {
		// const user = userEvent.setup();

		render(<ComposePostComponent />);

		const input = screen.getByPlaceholderText("What is happening?!");
		
		fireEvent.change(input, { target: { value: "Testing post input" } });
		expect(input.value).toBe("Testing post input");

		fireEvent.change(input, { target: { value: "$#!$*#&fssdkljfsdfhs" } });
		expect(input.value).toBe("$#!$*#&fssdkljfsdfhs");

		fireEvent.change(input, { target: { value: "F!nal te@#@st" } });
		expect(input.value).toBe("F!nal te@#@st");
	});
});
