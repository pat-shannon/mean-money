// file: LogOutButton.jsx

import { useNavigate } from "react-router-dom";
import "./LogOutButton.css"

export const LogOutButton = () => {
    const navigate = useNavigate();

    function logOut() {
        localStorage.clear()
        navigate("/");
    };

    return (
        <button onClick={logOut}>Log Out</button>
    );
};

