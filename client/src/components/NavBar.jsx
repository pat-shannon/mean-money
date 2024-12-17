import { Link } from "react-router-dom";

import "./NavBar.css"
import { LogOutButton } from "../components/LogOutButton.jsx"

export function NavBar() {
    const isLoggedIn = localStorage.getItem('token');

    return (

        <nav className="navbar">
            <div style={{ margin: "0 100px", display: "flex", gap: "20px" }}>
                <Link><img width="100%" height="70rem" to="/dashboard" src="../src/assets/mean-money-logo.png" ></img></Link>
            </div>
            {isLoggedIn ? (
                <div style={{ margin: "0 100px", display: "flex", gap: "20px" }}>
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                    <LogOutButton />
                </div>
            ) : (
                <>
                    <div style={{ margin: "0 100px", display: "flex", gap: "20px" }}>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </div>
                </>
            )}
        </nav>

    )
}
