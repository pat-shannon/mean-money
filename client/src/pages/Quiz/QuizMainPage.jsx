// file: pages/Quiz/QuizMainPage.jsx

import React from "react";
import { Link } from "react-router-dom";
import "./QuizMainPage.css"


export function QuizMainPage() {
    return (
        <div className="container">
            <h1 className="title-text">Spending Habits Quiz</h1>

            <ol className="instructions">
                <li>Welcome to the Mean Money quiz which will analyse your spending habits and determine your spending personality!</li>
                <li>You will be asked ten multiple choice questions - pick the answer that most suits you, even if it isn't spot on. This will give us an idea of where your priorities lie when it comes to spending your hard-earned cash.</li>
                <li>Each question will have five answers available to choose from - and don't worry, you can go back and change your answers before the quiz is submitted if you're on the fence.</li>
                <li>Submit your final answers to find out your main spending vice!</li>
            </ol>

            <div className="submit">
                <Link className="submit-button" to="/quiz">Let's Dive In!</Link>
            </div>
        </div>
    );
};