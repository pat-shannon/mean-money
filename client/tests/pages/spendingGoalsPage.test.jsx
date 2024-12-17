import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SpendingGoalsPage } from "../../src/pages/SpendingGoals/SpendingGoalsPage";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../src/services/users", () => ({
  getMyUserDetails: vi.fn().mockResolvedValue({
    userData: {
      currentSavings: 1,
      disposableIncome: 2,
      foodAndDrinkGoal: 3,
      socialAndEntertainmentGoal: 4,
      shoppingGoal: 5,
      holidayAndTravelGoal: 6,
      healthAndBeautyGoal: 7,
      miscGoal: 8,
    },
  }),
}));

describe("Spending Goals Page", () => {
  test("All text displays", async () => {
    render(
      <MemoryRouter>
        <SpendingGoalsPage />
      </MemoryRouter>
    );
    const h1 = await screen.findByRole("heading", { level: 1 });
    expect(h1.textContent).toBe("Spending Goals");
    // v used to be getAllByRole - needs to be find as find is asynchronous (so will always run after the render is complete)
    const h3List = await screen.findAllByRole("heading", { level: 3 });
    await waitFor(() => {
      expect(
        screen.getByText("Let's see what we're working with")
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "How much would you like to try and spend per month on the following categories?"
        )
      ).toBeInTheDocument();
    });
    expect(h3List[0].textContent).toBe("Let's see what we're working with");
    expect(h3List[1].textContent).toBe(
      "How much would you like to try and spend per month on the following categories?"
    );
  });
  test("Input labels display", async () => {
    render(
      <MemoryRouter>
        <SpendingGoalsPage />
      </MemoryRouter>
    );

    // expect(screen.getByText('loading...')).toBeInTheDocument();

    // await waitFor(() => expect(screen.queryByText('loading...')).not.toBeInTheDocument());
    const expectedLabelTexts = [
      "Current savings",
      "Monthly disposable income",
      "Food & Drink",
      "Social and Entertainment",
      "Entertainment & Apps",
      "Holiday & Travel",
      "Health & Beauty",
      "Miscellaneous",
    ];
    for (const text of expectedLabelTexts) {
      const label = await screen.findByText(text);
      expect(label).toBeInTheDocument();
    }
  });
  test("Can change all values by typing in input box", async () => {
    render(
      <MemoryRouter>
        <SpendingGoalsPage />
      </MemoryRouter>
    );
    const expectedLabelTexts = [
      "Current savings",
      "Monthly disposable income",
      "Food & Drink",
      "Social and Entertainment",
      "Entertainment & Apps",
      "Holiday & Travel",
      "Health & Beauty",
      "Miscellaneous",
    ];
    expectedLabelTexts.forEach(async (text) => {
      const inputBox = await screen.getByLabelText(text);
      expect(inputBox).toBeInTheDocument();
      expect(inputBox.value).toBe("");
      fireEvent.change(inputBox, { target: { value: 101 } });
      expect(inputBox.value).toBe("101");
    });
  });
});
