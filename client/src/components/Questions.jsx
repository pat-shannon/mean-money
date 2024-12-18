// file: client/src/components/Questions.jsx

import React, { useEffect, useState } from "react";
import data from "../quizData/data.jsx";

export default function Questions({
    currentQuestion,
    onSelectAnswer,
    selectedAnswers
}) {

    const question = data[currentQuestion];

    return (
        <div className="questions">
            <h2 className="questions-text">{question.question}</h2>

            <ul>
                {question.options.map((option, i) => (
                        <li key={i}>
                            <label className={`text-body ${selectedAnswers[currentQuestion] === i ? "selected" : ""}`} htmlFor={`q${currentQuestion}-${i}-option`}>{option}</label>
                            <input type="radio" value={i} name="options" id={`q${currentQuestion}-${i}-option`} onChange={() => {onSelectAnswer(i)}} checked={selectedAnswers[currentQuestion] === i}/>
                            <div className="check checked"></div>
                        </li>
                    ))
                }

            </ul>
        </div>
    );
};