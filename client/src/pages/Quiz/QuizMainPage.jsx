// file: pages/Quiz/QuizMainPage.jsx
import React from "react";
import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import "../../FormStyling.css"



export function QuizMainPage() {
    return (
        <>
        <NavBar />
        <div className="form-container" style={{width: "80%"}}>
        <div className="form-container" style={{width: "80%"}}>
            <h2 className="form-title">Spending Personality Quiz</h2>
            <h5 style={{textAlign: "center", marginBottom: "30px", color: "#1C319C"}}>Welcome to the Mean Money quiz which will analyse your spending habits and determine your spending personality!</h5>

            <ol className="instructions" style={{marginBottom: "32px"}}>
                <li style={{marginBottom: "12px"}}>You will be asked ten multiple choice questions - pick the answer that most suits you, even if it isn't spot on. This will give us an idea of where your priorities lie when it comes to spending your hard-earned cash.</li>
                <li style={{marginBottom: "12px"}}>Each question will have five answers available to choose from - and don't worry, you can go back and change your answers before the quiz is submitted if you're on the fence.</li>
                <li style={{marginBottom: "12px"}}>Submit your final answers to find out your main spending vice!</li>
            </ol>

            <div>
                <Link to="/quizquestions" style={{textDecoration: "none",}}><button className="form-button">Let's Dive In!</button></Link>

            </div>
            <div style={{justifyContent: "center", textAlign: "left", marginTop: "30px", marginLeft: "-22px", marginBottom: "8px"}}>
                    <Link className="next-button" to="/dashboard">◀ Return To Dashboard</Link>
                </div>
        </div>
        </div>
        </>
    );
};