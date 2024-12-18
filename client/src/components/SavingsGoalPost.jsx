import React, { useState, useEffect } from "react";
import { fetchUserSavingsGoal, deleteSavingGoal } from "../services/savings_goal";
import "../pages/Dashboard/Dashboard.css"
import "./SavingsGoalPost.css"
import { Link } from "react-router-dom";
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ConfirmToast from "./ConfirmationToast";



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

    const handleDelete = async (goalId) => {
        const confirmDeletion = () => {
            return new Promise((resolve) => {
                toast.warn(
                    ({ closeToast }) => (
                        <ConfirmToast 
                            closeToast={closeToast}
                            onConfirm={() => resolve(true)}
                        />
                    ),
                    {
                        autoClose: false,
                        closeOnClick: false,
                        draggable: false,
                        closeButton: false
                    }
                );
            });
        };
        try {
            const confirmed = await confirmDeletion();
            if (!confirmed) return;

            const token = localStorage.getItem('token');
            if (!token) {
                toast.error("No authentication token found. Please log in again,", { 
                    role: "alert",
                    ariaLive: "assertive"});
                return;
            }

            await deleteSavingGoal(token, goalId);
            setSavingsGoal(prevGoals => 
                prevGoals.filter(goal => goal._id !== goalId)
            );
            
            toast.success("Goal deleted successfully", { 
                role: "alert",
                ariaLive: "polite"});
  
                

        } catch (error) {
            toast.error("Failed to delete goal" + error, {
                role: "alert",
                ariaLive: "assertive"
            });
        }
};

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
                        <div className="empty-state">
                        <p>No saving goal found.</p>
                        <p className="empty-state-subtitle">Dreams can come true when you set a goal and make a plan.</p>
                        <Link to="/new-savings-goal">
                        <button>Add a saving goal</button>
                    </Link>
                    </div>
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
                                    <div className="entry-actions">
                                        <button onClick={() => handleDelete(goal._id)} className="delete-button">
                                            Delete goal
                                        </button>
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