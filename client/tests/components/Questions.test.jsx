// file: Questions.test.jsx

import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import Questions from "../../src/components/Questions";


// mock questions

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
        }
    ]
}));

// tests begin

describe("Questions Component", () => {
    const mockOnSelectAnswer = vi.fn();
    const defaultProps = {
        currentQuestion: 0,
        onSelectAnswer: mockOnSelectAnswer,
        selectedAnswers: new Array(1).fill(undefined)
    };

    const renderQuestions = (props = {}) => {
        return render(
            <Questions {...defaultProps} {...props} />
        );
    };

// first question is displayed

    it("displays the first question", () => {
        renderQuestions();
        expect(screen.getByText("What are you up to on your ideal friday night?")).toBeInTheDocument();
    });

// all five options are on screen

    it("displays five answer choices", () => {
        renderQuestions();
        expect(screen.getByLabelText("Hitting the pub with my mates")).toBeInTheDocument();
        expect(screen.getByLabelText("Trying that new menu at my favourite restaurant")).toBeInTheDocument();
        expect(screen.getByLabelText("Jumping on that plane to my weekend escape")).toBeInTheDocument();
        expect(screen.getByLabelText("Pampering myself with a facemask and a mani-pedi")).toBeInTheDocument();
        expect(screen.getByLabelText("Marathoning a TV series with some popcorn")).toBeInTheDocument();
    });

// chosen answer is selected

    it("shows chosen answer as selected/checked", () => {
        renderQuestions({
            selectedAnswers: [2]
        });
        
        expect(screen.getByLabelText("Jumping on that plane to my weekend escape")).toBeChecked();
        expect(screen.getByLabelText("Hitting the pub with my mates")).not.toBeChecked();
    });

// class changes on selected answer to track input

    it("changes selected class to label when option is selected", () => {
        renderQuestions({
            selectedAnswers: [2]
        });
        
        const selectedLabel = screen.getByLabelText("Jumping on that plane to my weekend escape").nextElementSibling;
        expect(selectedLabel).toHaveClass("selected");
    });
});