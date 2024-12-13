import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { SpendingGoalButton } from "../../components/SpendingGoalButton";

export function Dashboard() {

    return (
        <>
        <NavBar />
        <div className="home">
            <h1>WELCOME TO YOUR DASHBOARD</h1>

            <SpendingGoalButton />
            <Link to="/new-diary-entry">
                <button>Add a diary entry</button>
                </Link>
            <Link to="/new-savings-goal">
                <button>Add a new saving goal</button>
            </Link>
        </div>
        </>
    );
}