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
            <h5 className="questions-text" style={{color: "#1C319C", marginBottom: "30px", textAlign: "center"}}>{question.question}</h5>

            <p key={question.id}>
                {
                    question.options.map((q, i) => (
                        <p key={i}>
                            <input type="radio" value={false} name="options" id={`q${i}-option`} onChange={onSelect} />
                            <label className="text-body" htmlFor={`q${i}-option`} style={{ marginLeft: "10px" }}>{q}</label>
                            <div className="check checked"></div>
                        </p>
                    ))
                }

            </p>
        </div>
    );
};