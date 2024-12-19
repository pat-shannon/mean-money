import { useState, useEffect } from 'react';
import { getFinancialAdvice } from '../services/financial_advice';
import ("./FinancialAdvice.css") 

function FinancialAdviceComponent() {
    const [advice, setAdvice] = useState([]);


    useEffect(() => {
        async function fetchAdvice() {
            try {
                const token = localStorage.getItem('token'); 
                const financialAdvice = await getFinancialAdvice(token);
                setAdvice(financialAdvice);
            } catch (error) {
                console.error("Failed to fetch financial advice:", error);
                setAdvice([]);
            }
        }

        fetchAdvice();
    }, []);


    return (
        <div className="financial-advice">
            <h1 className="financial-advice" style={{color: "#1C319C"}}>Your Financial Insights</h1>
            {advice.length > 0 ? (
                <ul>
                    {advice.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            ) : (
                <p>Looking good! Your finances are on point.</p>
            )}
        </div>
    );
}

export default FinancialAdviceComponent;
