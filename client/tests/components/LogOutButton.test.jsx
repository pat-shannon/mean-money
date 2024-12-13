// // file: LogOutButton.test.jsx

import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { LogOutButton } from "../../src/components/LogOutButton";


// create mock 

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});


// tests here:

describe("LogOutButton component", () => {
    // Clear mocks
    beforeEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    });


// log out button shows on nav bar

    it("shows a log out button on the nav bar", () => {
        render(
            <MemoryRouter>
                <LogOutButton />
            </MemoryRouter>
        );

        expect(screen.getByText(/Log Out/i)).toBeInTheDocument();
    });


// token is removed from user after clicking button and navigaates user to landing page

    it("removes user token upon button click and naviagtes to landing", () => {

        // mock localStorage
        localStorage.setItem("userToken", "test-token");
        localStorage.setItem("userPreferences", "some-preferences");

        const localStorageClearSpy = vi.spyOn(Storage.prototype, 'clear');

        const { getByText } = render(
            <MemoryRouter>
                <LogOutButton />
            </MemoryRouter>
        );

        const logOutButton = getByText("Log Out");
        fireEvent.click(logOutButton);

        expect(localStorageClearSpy).toHaveBeenCalled();
        expect(localStorage.length).toBe(0);
        expect(mockNavigate).toHaveBeenCalledWith("/");
    });
});