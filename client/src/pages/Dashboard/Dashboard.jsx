import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";

import SavingsGoalPost from "../../components/SavingsGoalPost";

import { SpendingGoalButton } from "../../components/SpendingGoalButton";
import FinancialAdviceComponent from "../../components/FinancialAdvice";


export function Dashboard() {

    return (
        <>
        <NavBar />
        <div className="home">
            <h1>WELCOME TO YOUR DASHBOARD</h1>

            <SavingsGoalPost />


            <SpendingGoalButton />

            <Link to="/new-diary-entry">
                <button>Add a diary entry</button>
            </Link>

            <Link to="/new-savings-goal">
                <button>Add a new saving goal</button>
            </Link>

            < FinancialAdviceComponent />
        </div>
        </>
    );
}