import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { SavingsGoalPage } from "../../src/pages/SavingsGoal/SavingsGoalPage";

describe("SavingsGoalPage", () => {
    it("renders the navigation bar and savings goal form", () => {
        render(
            <BrowserRouter>
                <SavingsGoalPage />
            </BrowserRouter>
        );

        expect(screen.getByText("Create Savings Goal")).toBeInTheDocument();
    });
});
