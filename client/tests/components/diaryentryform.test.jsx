import { render, screen } from "@testing-library/react";
import {DiaryEntryForm} from "'"

describe("Navbar", () => {
    test("Navbar displays buttons", () => {
        render(<NavBar />);
        const navLinks = screen.getAllByRole("link");
        expect(navLinks[0].textContent).toBe("Dashboard");
        expect(navLinks[1].textContent).toBe("Logout");
    });

    test("Navbar displays logo image", () => {
        render(<NavBar />);
        const image = screen.getByRole("img");
        expect(image).toBeInTheDocument();
    })
    // Since routes do not exist at the time of writing,
    // more tests for button functionality need to be
    // added at a later date:
});
