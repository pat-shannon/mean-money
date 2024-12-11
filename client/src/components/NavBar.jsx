import { Link } from "react-router-dom";
import "./NavBar.css"
import { BrowserRouter } from 'react-router-dom';
export function NavBar() {

    return(
        <BrowserRouter>
            <nav className="navbar">
                <Link className="nav-link">Dashboard</Link>
                <Link className="nav-link">Dashboard</Link>
                <Link className="nav-link">Dashboard</Link>
            </nav>
        </BrowserRouter>
    )
}