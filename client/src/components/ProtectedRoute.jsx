import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {

    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token){
            setIsLoggedIn(true);
        } else{
            setIsLoggedIn(false);
        }
    }, []);
    
    // if token not yet confirmed/unconfirmed
    if (isLoggedIn === null) {
        return(<div><h2>Loading...</h2></div>)
    }
    // if no valid token
    if (!isLoggedIn){
        return <Navigate to="/login" replace />
    }
    // if valid token
    return children;
}