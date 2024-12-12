import { Link } from "react-router-dom";
import { NavBar } from "../../components/NavBar";
export function Homepage() {


    return (
        <>
        <NavBar />
        <div className="home">
            <h1>WELCOME TO MEAN MONEY</h1>
            <div className="user-auth">
                <Link to="/login">Log In</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
        </>
    );
}
