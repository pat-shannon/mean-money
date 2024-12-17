// file: client/src/components/Quiz.jsx

import React from "react";
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
        <div className="container">
            <h1 className="title-text">Spending Habits Quiz</h1>

            {/* display questions: */}
            <Questions />

            <div className="grid">
                <button className="back-button" onClick={onBack}>Back</button>
                <button className="next-button" onClick={onNext}>Next</button>
            </div>

        </div>
    );
};

