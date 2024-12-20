import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { describe, it, vi, expect } from "vitest";
import { LoginPage } from "../../src/pages/Login/LoginPage";

vi.mock("../../src/services/authentication", () => ({
    login: vi.fn(),
}));

vi.mock("../../src/services/users", () => ({
    getMyUserDetails: vi.fn(),
}));

describe("LoginPage", () => {
    it("renders the login form", () => {
        render(
            <BrowserRouter>
                <LoginPage />
            </BrowserRouter>
        );

        expect(screen.getByLabelText("Email")).toBeInTheDocument();
        expect(screen.getByLabelText("Password")).toBeInTheDocument();
    });

    it("shows error toast on incorrect credentials", async () => {
        const { login } = await import("../../src/services/authentication");
        login.mockRejectedValueOnce(new Error("Invalid credentials"));

        render(
            <BrowserRouter>
                <ToastContainer />
                <LoginPage />
            </BrowserRouter>
        );

        const emailInput = screen.getByLabelText("Email");
        const passwordInput = screen.getByLabelText("Password");
        const submitButton = screen.getByText(/Submit/i);

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
        fireEvent.click(submitButton);

        const errorToast = await screen.findByText("Incorrect email or password. Please try again.");
        expect(errorToast).toBeInTheDocument();
    });
});
