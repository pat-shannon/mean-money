import { render, screen } from "@testing-library/react";
import { NavBar } from "../../src/components/NavBar";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../src/components/LogOutButton", () => ({
        LogOutButton: () => <button>Log Out</button>,
}));

describe("Navbar", () => {
    test("Navbar displays buttons", () => {
        
        render(<MemoryRouter><NavBar /></MemoryRouter>);
        const navLinks = screen.getAllByRole("link");
        const logOutButton = screen.getByRole("button");
        expect(navLinks[1].textContent).toBe("Dashboard");
        expect(logOutButton.textContent).toBe("Log Out");
    });

    test("Navbar displays logo image", () => {
        render(<MemoryRouter><NavBar /></MemoryRouter>);
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
    })
    // Since routes do not exist at the time of writing,
    // more tests for button functionality need to be
    // added at a later date:
});
