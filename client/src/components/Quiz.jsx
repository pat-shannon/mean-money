// file: client/src/components/Quiz.jsx

import { NavBar } from "./NavBar";
import "../FormStyling.css"

import { saveQuizResult } from "../services/users";

import { useState, useEffect } from "react";

import Questions from "./Questions";
import { useNavigate } from "react-router-dom";
import data from "../quizData/data";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

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
            toast.error("Please select an answer.", {
                role: "alert",
                ariaLive: "assertive"
                });
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

    const result = personalities[mostFrequentOptionIndex];
    const userData = JSON.parse(localStorage.getItem("userData")) || {};
    userData.quizResult = result;
    localStorage.setItem("userData", JSON.stringify(userData));

    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // Call the saveQuizResult service
    async function submitQuizResult() {
        try {
            await saveQuizResult(token, result);
            navigate("/result");
        } catch (error) {
            console.error("Error submitting quiz result:", error);
            toast.error("Failed to save quiz result", { role: "alert", ariaLive: "assertive" });
        }
    }

    submitQuizResult();

}
// quiz page body:
    return (

        <>
                <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
        <NavBar />
        <div className="form-container" style={{width: "80%"}}>
            <div className="form-container" style={{width: "80%"}}>
            <h2 className="form-title">Spending Personality Quiz</h2>


            {/* display questions: */}
            <Questions
                currentQuestion={currentQuestion}
                onSelectAnswer={onSelectAnswer}
                selectedAnswers={selectedAnswers}
            />
            <div style={{display: "flex", justifyContent: "center"}}>
                <button className="back-button" onClick={onBack} disabled={currentQuestion === 0}>◀ Back</button>
                <button className="next-button" onClick={onNext}>{currentQuestion === data.length - 1 ? "Submit" : "Next ▶"}</button>
            </div>

            </div>
        </div>
        </>
    );
};