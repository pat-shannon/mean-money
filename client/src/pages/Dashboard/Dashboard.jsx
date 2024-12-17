import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";

import { MonthlySpending } from "../../components/MonthlySpending";

import SavingsGoalPost from "../../components/SavingsGoalPost";

import { SpendingGoalButton } from "../../components/SpendingGoalButton";

import AllDiaryEntries from "../../components/AllDiaryEntries";
import FinancialAdviceComponent from "../../components/FinancialAdvice";

export function Dashboard() {

    const userData = JSON.parse(localStorage.getItem("userData"));

    return (
        <>
        <NavBar />
        <div className="container">
            <div>
            <h1>Welcome {userData?.name || "to your dashboard" }</h1>
            <h2>What's on the agenda for today?</h2>
            </div>
            <SavingsGoalPost />
            <br></br>
            <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <p>one half</p>
                    <SpendingGoalButton />
                </div>
                <div className="col-md-9">
                    <p>other half</p>
            <MonthlySpending />
            <Link to="/new-diary-entry">
                <button>Add a diary entry</button>
            </Link>
            <br></br>
            <Link to="/new-savings-goal">
                <button>Add a new saving goal</button>
            </Link>
                </div>
            </div>

            <AllDiaryEntries/>


            < FinancialAdviceComponent />

        </div>
        </div>

        
    
        
        </>
    );
}