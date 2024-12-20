import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { Homepage } from "../../src/pages/Homepage/Homepage";

describe("Homepage", () => {
    it("renders the hero section and buttons", () => {
        render(
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>
        );

        expect(screen.getByText("Welcome to Mean Money")).toBeInTheDocument();
        expect(
            screen.getByText(
                "The truly free money management app that keeps you afloat, with advice that bites."
            )
        ).toBeInTheDocument();

        const loginButton = screen.getByRole("link", { name: /Log In/i });
        const signupButton = screen.getByText(/Sign Up/i, {selector: ".home-btn.signup-btn"})

        expect(loginButton).toHaveAttribute("href", "/login");
        expect(signupButton).toHaveAttribute("href", "/signup");
    });

    it("navigates when buttons are clicked", async () => {
        render(
            <BrowserRouter>
                <Homepage />
            </BrowserRouter>
        );

        const loginButton = screen.getByText(/Log In/i );
        const signupButton = screen.getByText(/Sign Up/i, {selector: ".home-btn.signup-btn"})

        await fireEvent.click(loginButton);
        expect(window.location.pathname).toBe("/login");

        await fireEvent.click(signupButton);
        expect(window.location.pathname).toBe("/signup");
    });
});
