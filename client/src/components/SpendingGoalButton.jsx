import { Link } from "react-router-dom"
import "./SpendingGoalButton.css"

export function SpendingGoalButton () {
    return(
        <>
        <Link to="/spending-goals">
            <button className="spending-goal-btn">Set Spending Goals</button>
        </Link>
        </>
    )
}