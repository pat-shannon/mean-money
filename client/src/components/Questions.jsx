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
            <h5 className="questions-text" style={{color: "#1C319C", marginBottom: "30px", textAlign: "center"}}>{question.question}</h5>
            <p key={question.id}>
                {question.options.map((option, i) => (
                        <p key={i}>
                        <input type="radio" value={i} name="options" id={`q${currentQuestion}-${i}-option`} onChange={() => {onSelectAnswer(i)}} checked={selectedAnswers[currentQuestion] === i}/>
                            <label className={`text-body ${selectedAnswers[currentQuestion] === i ? "selected" : ""}`} htmlFor={`q${currentQuestion}-${i}-option`} style={{ marginLeft: "10px" }}>{option}</label>
                            <div className="check checked"></div>
                        </p>
                    ))
                }

            </p>
        </div>
    );
};