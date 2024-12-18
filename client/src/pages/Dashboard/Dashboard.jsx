import { NavBar } from "../../components/NavBar";
import { Link } from "react-router-dom";
import { MonthlySpending } from "../../components/MonthlySpending";
import SavingsGoalPost from "../../components/SavingsGoalPost";
import { SpendingGoalButton } from "../../components/SpendingGoalButton";
import SavingsProgressBar from '../../components/SavingsProgressBar';
import AllDiaryEntries from "../../components/AllDiaryEntries";
import FinancialAdviceComponent from "../../components/FinancialAdvice";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);


    // const userData = JSON.parse(localStorage.getItem("userData"));

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            const storedUserData = JSON.parse(localStorage.getItem("userData"));
            if (storedUserData) {
                setUserData(storedUserData);
            }
        }
        setLoading(false);
    }, [navigate]);

    if (loading) {
        return <div>Loading Dashboard...</div>;
    }

    return (
        <>
        <NavBar />

        <div className="container">
            <div>
            <h1>Welcome {userData?.name || "to your dashboard" }</h1>
            <h2>What's on the agenda for today?</h2>
            </div>
            <SavingsGoalPost />
            <SavingsProgressBar 
                currentSavings={5000} 
                savingsTarget={1000} 
                goal="Emergency Fund"
            />
            <br></br>
            <MonthlySpending />
            <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <p>one half</p>
                    <SpendingGoalButton />
                </div>
                <div className="col-md-9">
                    <p>other half</p>
            
            <Link to="/new-diary-entry">
                <button>Add a diary entry</button>
            </Link>
            <br></br>
            <Link to="/new-savings-goal">
                <button>Add a new saving goal</button>
            </Link>
                </div>
            </div>

            <AllDiaryEntries/>


            < FinancialAdviceComponent />

        </div>
        </div>

        
    
        
        </>
    );
}