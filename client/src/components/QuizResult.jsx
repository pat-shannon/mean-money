// file: client/src/components/QuizResult.jsx

import React from "react";
import { NavBar } from "./NavBar.jsx";
import "../FormStyling.css"
import { Link } from "react-router-dom";

import QuizResultTable from "./QuizResultTable.jsx";

export default function QuizResult() {

    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    const result = userData.quizResult || "We Don't Know Your Personality - Take The Quiz Now!";


    return (
        <>
        <NavBar />
        <div className="form-container" style={{width: "80%"}}>
            <div className="form-container" style={{width: "80%"}}>
            <h1 className="form-title">Spending Personality Quiz</h1>

            <div className="result">
                <div>
                    <h5 className="user-result" style={{textAlign: "center", marginBottom: "50px"}}>The results are in! Your spending personality is...</h5>
                </div>
            </div>

            <div className="container" style={{marginBottom: "50px"}}>
                <QuizResultTable result={result}/>
            </div>

            <div className="link-dashboard" style={{justifyContent: "center", textAlign: "center"}}>
                    <Link className="next-button" to="/dashboard">Return To Dashboard</Link>
                </div>
                </div>
        </div>
        </>
    );
};
