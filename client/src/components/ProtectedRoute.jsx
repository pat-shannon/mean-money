import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [checkingLoginStatus, setCheckingLoginStatus] = useState(true);
    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) {
            //if no valid token
            navigate("/login");
        }
        else {
            setCheckingLoginStatus(false);
        }
    }, []);
    
    // if token not yet confirmed/unconfirmed
    if (checkingLoginStatus) {
        return(<div><h1>Loading...</h1></div>)
    }
    // if valid token
    return children;
}