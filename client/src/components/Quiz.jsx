// file: client/src/components/Quiz.jsx
import { NavBar } from "./NavBar";
import React from "react";
import "../FormStyling.css"
import Questions from "./Questions";

export default function Quiz() {

//next button event handler:
    function onNext() {
        console.log("On next click")
    };

//back button event handler:
    function onBack() {
        console.log("On back click")
    };


// quiz page body:
    return (
        <>
        <NavBar />
        <div className="form-container" style={{width: "75%"}}>
            <div className="form-container" style={{width: "75%"}}>
            <h2 className="form-title">Spending Habits Quiz</h2>

            {/* display questions: */}
            <Questions />

            <div style={{display: "flex", justifyContent: "center"}}>
                <button className="back-button" onClick={onBack}>◀ Back</button>
                <button className="next-button" onClick={onNext}>Next ▶</button>
            </div>
            </div>
        </div>
        </>
    );
};

