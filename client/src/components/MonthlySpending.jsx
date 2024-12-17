import { getLastMonthSpending } from "../services/diary_entry";
import { useEffect } from "react";
export function MonthlySpending(){
    useEffect(() => {
        async function fetchMonthlySpending(){
            try{
                const token = localStorage.getItem('token');
                const spendingData = await getLastMonthSpending(token);
                console.log(spendingData);
            } catch(error) {
                console.error('Failed to retrieve monthly spending data', error);
            }
        }
        fetchMonthlySpending();
    }, []);
    return(
        <div>

        </div>
    )
}