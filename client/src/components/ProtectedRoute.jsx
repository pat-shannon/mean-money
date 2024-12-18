import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem("token")
        setIsLoggedIn(token !== null);
    }, []);
    
    // if token not yet confirmed/unconfirmed
    if (isLoggedIn === null) {
        return(<div><h2>Loading...</h2></div>)
    }
    // if no valid token
    if (!isLoggedIn){
        navigate("/login");
    }
    // if valid token
    return children;
}