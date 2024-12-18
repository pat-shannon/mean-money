import React, { useState, useEffect } from "react";
import { fetchUserSavingsGoal } from "../services/savings_goal";
import "../pages/Dashboard/Dashboard.css"
import "./SavingsGoalPost.css"

function SavingsGoalPost() {
    const [savingsGoal, setSavingsGoal] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadSavingsGoals = async () => {
            try {
                const token = localStorage.getItem('token');
                const goal = await fetchUserSavingsGoal(token);
                setSavingsGoal(goal);
                setIsLoading(false);
            } catch (error) {
                setError(error.message);
                setIsLoading(false);
            }
        };

        loadSavingsGoals();
    }, []);

    // const calculateProgress = (goal) => {
    //     // Assuming currentSavings is added to the model
    //     return goal.currentSavings 
    //         ? ((goal.currentSavings / goal.savingsTarget) * 100).toFixed(2)
    //         : 0;
    // };

    if (isLoading) return <div>Loading savings goals...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div>
                <div>
                    <div className="col-md-12">{savingsGoal.length === 0 ? (
                <p>No savings goals found.</p>
            ) : (
                <div className="savings-container">
                    {savingsGoal.map((goal) => (
                        <div key={goal._id} className="saving-goal-card">
                            <div className="savings-row">
                            {/* <div className="col-md-4"><h2>My Savings Goal</h2></div> */}
                            <div className="savings-title"><h4>{goal.savingsTitle}</h4></div>
                            <div className="savings-category">Category: <p>{goal.savingsCategory}</p></div>
                            <div className="savings-target">Target: <p>£{goal.savingsTarget.toLocaleString()}</p></div>
                            <div className="savings-date"><p>Target Date: {new Date(goal.endDate).toLocaleDateString()}</p></div>
                            {/* <p>Progress: {calculateProgress(goal)}%</p> */}
                            {/* <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            </div>
            </div>
            </div>
        </div>
    );
}

export default SavingsGoalPost;