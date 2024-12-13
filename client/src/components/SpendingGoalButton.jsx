import { Link } from "react-router-dom"

export function SpendingGoalButton () {
    return(
        <>
        <Link to="/spending-goals">
            <button>Set Spending Goals</button>
        </Link>
        </>
    )
}