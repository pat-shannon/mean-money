import { Link } from "react-router-dom";
import placeholderImg from '../assets/placeholder_img.png'

import "./NavBar.css"
import { LogOutButton } from "../components/LogOutButton.jsx"

export function NavBar() {

    return(

            <nav className="navbar">
                <Link><img width="140rem" height="70rem" src={placeholderImg} ></img></Link>
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
                <LogOutButton/>
            </nav>

    )
}
