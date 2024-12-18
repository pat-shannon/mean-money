// file: client/src/components/SavingsProgressBar.jsx

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
            <h2 className="text-xl font-bold mb-4">Savings Goal: {goal}</h2>
            <div className="progress-details mb-4">
                <div className="flex justify-between">
                    <span>Current Savings: £{currentSavings.toLocaleString()}</span>
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
            <style jsx>{`
                .savings-progress-container {
                    background-color: #f4f4f4;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                .progress-details {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .progress-bar-container {
                    width: 100%;
                    height: 30px;
                    background-color: #e0e0e0;
                    border-radius: 15px;
                    overflow: hidden;
                }

                .progress-bar {
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: white;
                    font-weight: bold;
                    transition: width 0.5s ease-in-out;
                }

                .bg-red-500 { background-color: #ef4444; }
                .bg-orange-500 { background-color: #f97316; }
                .bg-yellow-500 { background-color: #eab308; }
                .bg-green-500 { background-color: #22c55e; }
            `}</style>
        </div>
    );
};

export default SavingsProgressBar;
