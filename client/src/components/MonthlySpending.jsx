import { getSpendingForPeriod } from "../services/diary_entry";
import { useEffect, useState } from "react";
import { getMyUserDetails } from "../services/users";
import { BarChart } from "./BarChart";
import ("./MonthlySpending.css")

export function MonthlySpending() {
    const [formData, setFormData] = useState({
        // default start date - first day of current month
        startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
        // default end date - today
        endDate: new Date().toISOString().split('T')[0],
        isChanged: false
    });
    const [spendingData, setSpendingData] = useState({
        'Food and Drink': 0,
        'Social and Entertainment': 0,
        'Shopping': 0,
        'Holiday and Travel': 0,
        'Health and Beauty': 0,
        'Miscellaneous': 0,
    })
    const [spendingGoals, setSpendingGoals] = useState({
        'Food and Drink': 0,
        'Social and Entertainment': 0,
        'Shopping': 0,
        'Holiday and Travel': 0,
        'Health and Beauty': 0,
        'Miscellaneous': 0,
    })
    async function fetchMonthlySpending(formData) {
        try {
            const token = localStorage.getItem('token');
            const newSpendingData = await getSpendingForPeriod(token, formData);
            setSpendingData({
                'Food and Drink': newSpendingData['Food and Drink'].toFixed(2),
                'Social and Entertainment': newSpendingData['Social and Entertainment'].toFixed(2),
                'Shopping': newSpendingData['Shopping'].toFixed(2),
                'Holiday and Travel': newSpendingData['Holiday and Travel'].toFixed(2),
                'Health and Beauty': newSpendingData['Health and Beauty'].toFixed(2),
                'Miscellaneous': newSpendingData['Miscellaneous'].toFixed(2),
            })
            const returnedUserDetails = await getMyUserDetails(token);
            localStorage.setItem("token", returnedUserDetails.token);
            const userDetails = returnedUserDetails.userData;
            setSpendingGoals({
                'Food and Drink': userDetails['foodAndDrinkGoal'].toFixed(2),
                'Social and Entertainment': userDetails['socialAndEntertainmentGoal'].toFixed(2),
                'Shopping': userDetails['shoppingGoal'].toFixed(2),
                'Holiday and Travel': userDetails['holidayAndTravelGoal'].toFixed(2),
                'Health and Beauty': userDetails['healthAndBeautyGoal'].toFixed(2),
                'Miscellaneous': userDetails['miscGoal'].toFixed(2),
            })
        } catch (error) {
            console.error('Failed to retrieve monthly spending data', error);
        }
    }
    useEffect(() => {
        fetchMonthlySpending(formData);
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.startDate || !formData.endDate) {
            alert('Please fill in all fields');
            return;
        }
        setFormData(prev => ({
            ...prev,
            isChanged: true,
        }))
        fetchMonthlySpending(formData);

    }
    return (
        <div className="monthly-spend-container">
            <div className="monthly-spend-left-section">
            <h2>Spending data for {formData.isChanged ? 'custom period' : 'this month'} (£)</h2>
            <BarChart realSpendingData={spendingData} goalData={spendingGoals} />
            {/* <p>Food and drink: £{spendingData['Food and Drink']} while your monthly goal is £{spendingGoals['Food and Drink']}</p>
            <p>Social and Entertainment: £{spendingData['Social and Entertainment']} while your monthly goal is £{spendingGoals['Social and Entertainment']}</p>
            <p>Shopping: £{spendingData['Shopping']} while your monthly goal is £{spendingGoals['Shopping']}</p>
            <p>Holiday and Travel: £{spendingData['Holiday and Travel']} while your monthly goal is £{spendingGoals['Holiday and Travel']}</p>
            <p>Health and Beauty: £{spendingData['Health and Beauty']} while your monthly goal is £{spendingGoals['Health and Beauty']}</p>
            <p>Miscellaneous: £{spendingData['Miscellaneous']} while your monthly goal is £{spendingGoals['Miscellaneous']}</p> */}
            </div>
        <div className="monthly-spend-right-section">
            <h2>Filter by date</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="startDate" className="form-label">Start date</label>
                <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <label htmlFor="endDate" className="form-label">End date</label>
                <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="form-input"
                />
                <button
                    type="submit"
                    className="submit-btn"
                >
                    Submit
                </button>
            </form>
            <br />
            <br />
        </div>
        </div>
    )
}