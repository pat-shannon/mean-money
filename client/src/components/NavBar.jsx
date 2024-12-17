import { Link } from "react-router-dom";

import "./NavBar.css"
import { LogOutButton } from "../components/LogOutButton.jsx"

export function NavBar() {

    return(

            <nav className="navbar">
                <div style={{margin: "0 100px", display: "flex", gap: "20px"}}>
                <Link><img width="100%" height="70rem" to="/dashboard" src="../src/assets/mean-money-logo.png" ></img></Link>
                </div>
                <div style={{margin: "0 100px", display: "flex", gap: "20px"}}>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <LogOutButton/>
                </div>
            </nav>

    )
}
