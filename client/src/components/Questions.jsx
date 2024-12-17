// file: client/src/components/Questions.jsx

import React, { useEffect, useState } from "react";
import data from "../quizData/data.jsx";

export default function Questions() {

    const [checked, setCheck] = useState(undefined)

    const question = data[0]

    useEffect(() => {
        console.log(question)
    });

    function onSelect() {
        setCheck(true)
        console.log("radio button change")
    };

    return (
        <div className="questions">
            <h2 className="questions-text">{question.question}</h2>

            <ul key={question.id}>
                {
                    question.options.map((q, i) => (
                        <li key={i}>
                            <label className="text-body" htmlFor={`q${i}-option`}>{q}</label>
                            <input type="radio" value={false} name="options" id={`q${i}-option`} onChange={onSelect} />
                            <div className="check checked"></div>
                        </li>
                    ))
                }

            </ul>
        </div>
    );
};