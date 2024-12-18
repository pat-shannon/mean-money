import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { MonthlySpending } from "../../components/MonthlySpending";
import SavingsGoalPost from "../../components/SavingsGoalPost";
import { SpendingGoalButton } from "../../components/SpendingGoalButton";
import AllDiaryEntries from "../../components/AllDiaryEntries";
import FinancialAdviceComponent from "../../components/FinancialAdvice";

export function Dashboard() {
    return (
        <>
            <NavBar />
            <div className="dashboard-bg">
                <div className="dashboard-container">
                    <div className="left-section">
                        <div className="profile-card">
                            <div className="profile-avatar"></div>
                            <h3 className="dashboard-h3">Your Dashbaord</h3>
                            <Link to="/new-diary-entry">
                                <button className="card-btn">Add a Diary Entry</button>
                            </Link>
                            <SpendingGoalButton />
                            <Link to="/new-savings-goal">
                                <button className="card-btn">Add a New Saving Goal</button>
                            </Link>
                            <Link to="/quizstart">
                                <button className="card-btn">Spending Personality Quiz</button>
                            </Link>
                            <div className="financial-insights">
                                <FinancialAdviceComponent />
                            </div>
                        </div>
                    </div>

                    <div className="right-section">
                        <div className="progress-bar">
                            <div className="progress"></div>
                        </div>

                        <div className="center-content">
                            <div className="graph-placeholder">
                                <h1>Graph Placeholder</h1>
                            </div>
                            
                        </div>

                        <div className="savings-goal-post">
                            
                        </div>

                        <div className="bottom-section">
                            <div className="savings-goals">
                                <h1>Savings Goals</h1>
                                <MonthlySpending />
                                <SavingsGoalPost />
                            </div>
                            <div className="diary-entries">
                                <AllDiaryEntries />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
