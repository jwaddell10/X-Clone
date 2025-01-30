import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DisplayPost from "../components/HomePage/DisplayPost";

describe("Display post items render", () => {
    it('renders correct items', () => {
        render(<DisplayPost />)
    })
})