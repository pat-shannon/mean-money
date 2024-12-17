// file: LogOutButton.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./LogOutButton.css"
import "./NavBar.css"

export const LogOutButton = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token') !== null;

    function logOut() {
        localStorage.clear()
        navigate("/");
    };

    return isLoggedIn ? (
        <Link className="nav-link" onClick={logOut}>Log Out</Link>
    ) : null;
};

