// file: LogOutButton.jsx
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import "./LogOutButton.css"
import "./NavBar.css"

export const LogOutButton = () => {
    const navigate = useNavigate();

    function logOut() {
        localStorage.clear()
        navigate("/");
    };

    return (
        <Link className="nav-link" onClick={logOut}>Log Out</Link>
    );
};

