// file: client/src/components/QuizResult.jsx

import React from "react";
import "../pages/Quiz/QuizResult.css"
import { Link } from "react-router-dom";

import QuizResultTable from "./QuizResultTable.jsx";

export default function QuizResult() {

    const result = localStorage.getItem("quizResult") || "We Don't Know Your Personality - Take The Quiz Now!";

    return (
        <div className="container">
            <h1 className="title-text">Spending Personality Quiz</h1>

            <div className="result">
                <div>
                    <span>The results are in!</span>
                    <br />
                    <span className="user-result">Your spending personality is...</span>
                </div>
            </div>

            <div className="container">
                <QuizResultTable result={result}/>
            </div>

            <div className="link-dashboard">
                    <Link className="nav-link" to="/dashboard">Return To Dashboard</Link>
                </div>

        </div>
    );
};
