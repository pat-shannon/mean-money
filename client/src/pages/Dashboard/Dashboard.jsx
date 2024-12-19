import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { MonthlySpending } from "../../components/MonthlySpending";
import SavingsGoalPost from "../../components/SavingsGoalPost";
import { SpendingGoalButton } from "../../components/SpendingGoalButton";
import SavingsProgressBar from '../../components/SavingsProgressBar';
import AllDiaryEntries from "../../components/AllDiaryEntries";
import FinancialAdviceComponent from "../../components/FinancialAdvice";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);


    // const userData = JSON.parse(localStorage.getItem("userData"));

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const storedUserData = JSON.parse(localStorage.getItem("userData"));
            console.log("StoredUserData:", storedUserData);
            if (storedUserData) {
                setUserData(storedUserData);
            }
        }
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return <div>Loading Dashboard...</div>;
    }

    return (
        <>
        <NavBar />
        <div style={{padding: "1rem"}}>
            <div className="dashboard-bg" >
                <div className="dashboard-container">
                    <div className="left-section">
                        <div className="profile-card">
                            <div className="profile-avatar"></div>
                            <h3 className="dashboard-h3">Welcome {userData?.name || "to your dashboard"}</h3>
                            <p>What do you want to do today?</p>
                            <Link to="/new-diary-entry">
                                <button className="card-btn">Add a Diary Entry</button>
                            </Link>
                            <Link to="/new-savings-goal">
                                <button className="card-btn">Add a Saving Goal</button>
                            </Link>
                            <SpendingGoalButton />
                            
                            {userData?.quizResult ? (
    <p style={{marginTop: "20px"}}>
        Your spending personality is...<br/>
        <h3>{userData.quizResult}</h3>
        <Link to="/quizstart">
            <button className="card-btn">Take the test again</button>
        </Link>
    </p>
) : (
    <>
        <p className="dashboard-h3">Take the Spending Personality Quiz</p>
        <Link to="/quizstart">
            <button className="card-btn">Spending Personality Quiz</button>
        </Link>
    </>
)}
                            <div className="financial-insights">
                                <FinancialAdviceComponent />
                            </div>
                        </div>
                    </div>


                    <div className="right-section">
                        <div className="center-content">
                            <div className="graph-placeholder">
                                <MonthlySpending />
                            </div>

                        </div>

                        <div className="savings-goal-post">

                        </div>

                        <div className="bottom-section">
                            <div className="savings-goals">
                            <img src="../src/assets/angel-shark-2.png" style={{height: "125px"}}></img>
                                <h1>Savings Goals</h1>
                                <SavingsGoalPost />
                            </div>
                            
                            <div className="diary-entries">
                            <img src="../src/assets/devil-shark-2.png" style={{height: "125px"}}></img>
                                <AllDiaryEntries />
                            </div>
                        </div>
                        <div className="progress-bar">
                            <SavingsProgressBar 
                                    currentSavings={5000} 
                                    savingsTarget={1000} 
                                    goal="Emergency Fund"
                                />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
