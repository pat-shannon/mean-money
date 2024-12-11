import { Link } from "react-router-dom";
import placeholderImg from '../assets/placeholder_img.png'
import "./NavBar.css"
import { BrowserRouter } from 'react-router-dom';
export function NavBar() {

    return(
        <BrowserRouter>
            <nav className="navbar">
                <Link><img width="140rem" height="70rem" src={placeholderImg} ></img></Link>
                <Link className="nav-link">Dashboard</Link>
                <Link className="nav-link">Logout</Link>
            </nav>
        </BrowserRouter>
    )
}