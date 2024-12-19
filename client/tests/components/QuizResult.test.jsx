// file: QuizResult.test.jsx

import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import QuizResult from "../../src/components/QuizResult";


// tests begin 

describe("QuizResult Component", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    const renderQuizResult = () => {
        return render(
            <BrowserRouter>
                <QuizResult />
            </BrowserRouter>
        );
    };


// shows default message when quiz not completed

    it("shows default message when quiz has not been completed", () => {
        renderQuizResult();
        expect(screen.getByText("We Don't Know Your Personality - Take The Quiz Now!")).toBeInTheDocument();
    });

// shows result and personality info when answers are submitted

    it("shows result and personality info upon completion", () => {
        localStorage.setItem("quizResult", "Life of the Party");
        renderQuizResult();
        
        expect(screen.getByText("Life of the Party")).toBeInTheDocument();
        expect(screen.getByText(/You love nothing more than meeting up with family and friends/)).toBeInTheDocument();
    });

// shows intro text to result

    it("shows the result intro test", () => {
        renderQuizResult();
        expect(screen.getByText("The results are in! Your spending personality is...")).toBeInTheDocument();
    });

// shows different personality types depending on result

    it("shows different personality types depending on result", () => {
        const personalities = [
            "Life of the Party",
            "Fine Diner",
            "Jet Setter",
            "Self-Care Guru",
            "Fun Seeker"
        ];

        personalities.forEach(personality => {
            localStorage.setItem("quizResult", personality);
            const { unmount } = renderQuizResult();
            expect(screen.getByText(personality)).toBeInTheDocument();
            unmount();
        });
    });
});