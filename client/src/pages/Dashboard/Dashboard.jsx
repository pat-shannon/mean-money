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
        <div className="home">
            <h1>Welcome {userData?.name || "to your dashboard" }</h1>
            <h2>What's on the agenda for today?</h2>
            <SavingsGoalPost />
            <MonthlySpending />

            <SpendingGoalButton />

            <Link to="/new-diary-entry">
                <button>Add a diary entry</button>
            </Link>

            <Link to="/new-savings-goal">
                <button>Add a new saving goal</button>
            </Link>

            <AllDiaryEntries/>


            < FinancialAdviceComponent />

        </div>
        </>
    );
}