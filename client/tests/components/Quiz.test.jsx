// file: Quiz.test.jsx

import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Quiz from "../../src/components/Quiz";




// build mock questions

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate
    };
});

vi.mock("../../src/quizData/data", () => ({
    default: [
        {
            id: 1,
            question: "What are you up to on your ideal friday night?",
            options: [
                "Hitting the pub with my mates",
                "Trying that new menu at my favourite restaurant",
                "Jumping on that plane to my weekend escape",
                "Pampering myself with a facemask and a mani-pedi",
                "Marathoning a TV series with some popcorn"
            ]
        },
        {
            id: 2,
            question: "You really don't fancy going to your friend's cat's 5th birthday party - what's your number one worry?",
            options: [
                "Will I know anyone to talk to?",
                "Will there be refreshments or just cat treats?",
                "Where is it? What's the weather like?",
                "Will I have time to go to the gym still?",
                "Can I pet the cat?"
            ]
        }
    ]
}));


// tests start

describe("Quiz Component", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    const renderQuiz = () => {
        return render(
            <BrowserRouter>
                <Quiz />
            </BrowserRouter>
        );
    };

//title renders

    it("renders the quiz title", () => {
        renderQuiz();
        expect(screen.getByText("Spending Personality Quiz")).toBeInTheDocument();
    });

// question one appears first

    it("shows question one first", () => {
        renderQuiz();
        expect(screen.getByText("What are you up to on your ideal friday night?")).toBeInTheDocument();
    });

// back button is disabled on first question

    it("you cannot use the back button on the first question", () => {
        renderQuiz();
        const backButton = screen.getByText("◀ Back");
        expect(backButton).toBeDisabled();
    });

// alert appears if user doesn't select an answer and presses next button

    it("alert triggers when user doesn't select an answer and presses next", () => {
        renderQuiz();
        
        const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
        fireEvent.click(screen.getByText("Next ▶"));
        
        expect(alertMock).toHaveBeenCalledWith("Please select an answer.");
        alertMock.mockRestore();
    });

// navigates to the next question with the next button

    it("navigates to the next question using the next button", () => {
        renderQuiz();
        
        const option = screen.getByLabelText("Hitting the pub with my mates");
        fireEvent.click(option);
        fireEvent.click(screen.getByText("Next ▶"));
        
        expect(screen.getByText("You really don't fancy going to your friend's cat's 5th birthday party - what's your number one worry?")).toBeInTheDocument();
    });

// can use the back button from the second question onwards

    it("enables the back button after the first question", () => {
        renderQuiz();
        
        const option = screen.getByLabelText("Hitting the pub with my mates");
        fireEvent.click(option);
        fireEvent.click(screen.getByText("Next ▶"));
        
        const backButton = screen.getByText("◀ Back");
        expect(backButton).not.toBeDisabled();
    });

// quiz remembers the answers the user selects so they can be changed before submit

    it("remembers user answers when navigating with back and next", () => {
        renderQuiz();
        
        fireEvent.click(screen.getByLabelText("Hitting the pub with my mates"));
        fireEvent.click(screen.getByText("Next ▶"));
    
        fireEvent.click(screen.getByLabelText("Will I know anyone to talk to?"));
        fireEvent.click(screen.getByText("◀ Back"));
        
        expect(screen.getByLabelText("Hitting the pub with my mates")).toBeChecked();
    });
});