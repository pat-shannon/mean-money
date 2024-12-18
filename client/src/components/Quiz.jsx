// file: client/src/components/Quiz.jsx

import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import { useNavigate } from "react-router-dom";
import data from "../quizData/data";

export default function Quiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState(new Array(data.length).fill(undefined));
    const navigate = useNavigate();

// debugging
    useEffect(() => {
        console.log("Current Question:", currentQuestion);
        console.log("Total Questions:", data.length);
        console.log("Selected Answers:", selectedAnswers);
    }, [currentQuestion, selectedAnswers]);

 // select an answer
    function onSelectAnswer(answerIndex) {
        console.log(`Selected answer ${answerIndex} for question ${currentQuestion}`);
        const newSelectedAnswers = [...selectedAnswers];
        newSelectedAnswers[currentQuestion] = answerIndex;
        setSelectedAnswers(newSelectedAnswers);
    }

// next button event handler
    function onNext() {
        console.log("clicked next button");
        console.log("Current Selected Answer:", selectedAnswers[currentQuestion]);

        if (selectedAnswers[currentQuestion] !== undefined) {
            if (currentQuestion < data.length - 1) {
                setCurrentQuestion(prev => prev + 1);
            } else {
                calculateResult();
            }
        } else {
            alert("Please select an answer.");
        }
    }

    // back button event handler
    function onBack() {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
        }
    };

// track total of points for each option and find result
    function calculateResult() {
        const optionCounts = [0, 0, 0, 0, 0];
        selectedAnswers.forEach(answer => {
            if (answer !== undefined) {
                optionCounts[answer]++;
            }
        });

        const mostFrequentOptionIndex = optionCounts.indexOf(Math.max(...optionCounts));

        const personalities = [
            "Life of the Party",
            "Fine Diner",
            "Jet Setter",
            "Self-Care Guru",
            "Fun Seeker"
        ];

        localStorage.setItem("quizResult", personalities[mostFrequentOptionIndex]);

        navigate("/result");
    }

// quiz page body:
    return (
        <div className="container">
            <h1 className="title-text">Spending Personality Quiz</h1>

            {/* display questions: */}
            <Questions
                currentQuestion={currentQuestion}
                onSelectAnswer={onSelectAnswer}
                selectedAnswers={selectedAnswers}
            />

            <div className="grid">
                <button className="back-button" onClick={onBack} disabled={currentQuestion === 0}>Back</button>
                <button className="next-button" onClick={onNext}>{currentQuestion === data.length - 1 ? "Submit" : "Next"}</button>
            </div>

        </div>
    );
};