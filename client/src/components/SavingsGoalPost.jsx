import React, { useState, useEffect } from "react";
import { fetchUserSavingsGoal } from "../services/savings_goal";
import "../pages/Dashboard/Dashboard.css"

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
                <div className="container">
                    {savingsGoal.map((goal) => (
                        <div key={goal._id}>
                            
                            

                            <div className="row">
                            <div className="col-md-4"><h2>My Savings Goal</h2></div>
                            <div className="col-md-2">Title: <h4>{goal.savingsTitle}</h4></div>
                            <div className="col-md-2">Category: <h4>{goal.savingsCategory}</h4></div>
                            <div className="col-md-2">Target: <h1>£{goal.savingsTarget.toLocaleString()}</h1></div>
                            <div className="col-md-2">Target Date: {new Date(goal.endDate).toLocaleDateString()}</div>

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