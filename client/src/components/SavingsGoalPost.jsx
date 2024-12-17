import React, { useState, useEffect } from "react";
import { fetchUserSavingsGoal } from "../services/savings_goal";

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
            <h2>Your Savings Goals</h2>
            {savingsGoal.length === 0 ? (
                <p>No savings goals found.</p>
            ) : (
                <div>
                    {savingsGoal.map((goal) => (
                        <div key={goal._id}>
                            <h3>{goal.savingsTitle}</h3>
                            <p>Category: {goal.savingsCategory}</p>
                            <p>Target: £{goal.savingsTarget.toLocaleString()}</p>
                            {/* <p>Progress: {calculateProgress(goal)}%</p> */}
                            <p>Start Date: {new Date(goal.startDate).toLocaleDateString()}</p>
                            <p>End Date: {new Date(goal.endDate).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SavingsGoalPost;