import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
export function Dashboard() {


    return (
        <>
        <NavBar />
        <div className="home">
            <h1>WELCOME TO YOUR DASHBOARD</h1>
            <Link to="/new-savings-goal">
                <button>Add a new saving goal</button>
            </Link>
        </div>
        </>
    );
}
