import { Link } from "react-router-dom";
export function Homepage() {


    return (
        <div className="home">
            <h1>WELCOME TO MEAN MONEY</h1>
            <div className="user-auth">
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}
