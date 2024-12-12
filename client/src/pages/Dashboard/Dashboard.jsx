import { Link } from "react-router-dom";

export function Dashboard() {


    return (
        <div className="home">
            <h1>WELCOME TO YOUR DASHBOARD</h1>


            
            <Link to="/new-diary-entry">
                <button>Add a diary entry</button>
            </Link>
        </div>
    );
}
