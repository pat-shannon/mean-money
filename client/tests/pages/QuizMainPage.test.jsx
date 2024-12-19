// file: QuizMainPage.test.jsx

import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { QuizMainPage } from "../../src/pages/Quiz/QuizMainPage";


// tests begin 

describe("QuizMainPage Component", () => {
    const renderQuizMainPage = () => {
        return render(
            <BrowserRouter>
                <QuizMainPage />
            </BrowserRouter>
        );
    };

// shows quiz title

    it("shows the quiz title", () => {
        renderQuizMainPage();
        expect(screen.getByText("Spending Personality Quiz")).toBeInTheDocument();
    });

// shows intro text

    it("shows introduction text", () => {
        renderQuizMainPage();
        expect(screen.getByText(/Welcome to the Mean Money quiz/)).toBeInTheDocument();
    });

// shows instructions for the quiz

    it("shows instructions", () => {
        renderQuizMainPage();
        expect(screen.getByText(/You will be asked ten multiple choice questions/)).toBeInTheDocument();
        expect(screen.getByText(/Each question will have five answers available/)).toBeInTheDocument();
        expect(screen.getByText(/Submit your final answers/)).toBeInTheDocument();
    });

// renders start button linking to /quizquestions

    it("renders start button with questions link", () => {
        renderQuizMainPage();
        const startButton = screen.getByText("Let's Dive In!");
        expect(startButton.closest("a")).toHaveAttribute("href", "/quizquestions");
    });

// renders exit link to dashboard

    it("renders dashboard link", () => {
        renderQuizMainPage();
        const dashboardLink = screen.getByText("◀ Return To Dashboard");
        expect(dashboardLink).toHaveAttribute("href", "/dashboard");
    });
});