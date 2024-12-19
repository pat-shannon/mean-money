import "./SavingProgressBar.css";

import React, { useState, useEffect } from 'react';

const SavingsProgressBar = ({ currentSavings, savingsTarget, goal }) => {
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        if (savingsTarget > 0) {
            const percentage = Math.min((currentSavings / savingsTarget) * 100, 100);
            setProgressPercentage(percentage);
        }
    }, [currentSavings, savingsTarget]);

    const getProgressBarColor = () => {
        if (progressPercentage < 25) return 'bg-red-500';
        if (progressPercentage < 50) return 'bg-orange-500';
        if (progressPercentage < 75) return 'bg-yellow-500';
        return 'bg-green-500';
    };

    return (
        <div className="savings-progress-container">
            <h2>Savings Goal: {goal}</h2>
            <div className="progress-details mb-4">
                <div className="flex justify-between">
                    <span>Current Savings: £{currentSavings}</span>
                </div>
            </div>
            <div className="progress-bar-container">
                <div
                    className={`progress-bar ${getProgressBarColor()}`}
                    style={{ width: `${progressPercentage}%` }}
                >
                    {progressPercentage.toFixed(1)}%
                </div>
            </div>
        </div>
    );
};

export default SavingsProgressBar;
