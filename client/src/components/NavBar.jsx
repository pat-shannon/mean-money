import { Link } from "react-router-dom";
import placeholderImg from '../assets/placeholder_img.png'

import "./NavBar.css"
import { LogOutButton } from "../components/LogOutButton.jsx"

export function NavBar() {
    const isLoggedIn = localStorage.getItem('token');

    return(

            <nav className="navbar">
                <Link><img width="140rem" height="70rem" src={placeholderImg} ></img></Link>
                {isLoggedIn ? (<Link className="nav-link" to="/dashboard">Dashboard</Link>
                   ) : (
                    <>
                        <Link className="nav-link" to="/login">Login</Link>
                        <Link className="nav-link" to="/signup">Sign Up</Link>
                    </>
                )}
                <LogOutButton/>
            </nav>

    )
}
