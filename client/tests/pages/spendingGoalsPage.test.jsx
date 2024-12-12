import { render, screen } from "@testing-library/react";
import { SpendingGoalsPage } from "../../src/pages/SpendingGoals/SpendingGoalsPage";
import { MemoryRouter } from "react-router-dom";

describe("Spending Goals Page", () => {
    test("All text displays", async () => {
        render(
            <MemoryRouter>
            <SpendingGoalsPage />
            </MemoryRouter>
        );
        const h1 = await screen.findByRole("heading", {level:1});
        expect(h1.textContent).toBe("Spending Goals")

        const h3List = screen.getAllByRole("heading", {level:3});
        expect(h3List[0].textContent).toBe("Let's see what we're working with");
        expect(h3List[1].textContent).toBe("How much would you like to try and spend per month on the following categories?");
    })
    test("Input labels display", async () => {
        render(
            <MemoryRouter>
            <SpendingGoalsPage />
            </MemoryRouter>
        );
        const expectedLabelTexts= ["Current savings", "Monthly disposable income", "Food & Drink", "Social Outings", "Entertainment & Apps", "Holiday & Travel", "Health & Beauty", "Miscellaneous"]
        expectedLabelTexts.forEach(async (text) => {
            const label = await screen.getByText(text);
            expect(label).toBeInTheDocument();
        });
        
    })
    // test("Can type values for all input", async () => {
    //     render(
    //         <MemoryRouter>
    //         <SpendingGoalsPage />
    //         </MemoryRouter>
    //     );
    //     const expectedInputs = await screen.getAllBy
    // })
})