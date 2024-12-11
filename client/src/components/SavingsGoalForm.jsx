import { useState } from "react";
import { createSavingsGoal } from "../services/savings_goal";



const SavingsGoalForm = () => {
    const [savingsTitle, setSavingsTitle] = useState('');
    const [savingsTarget, setSavingsTarget] = useState('');
    const [savingsCategory, setSavingsCategory] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('token');

        const savingsGoalData = {
            savingsTitle,
            savingsTarget: parseFloat(savingsTarget),
            savingsCategory,
            startDate,
            endDate,
        };

        try {
            const result = await createSavingsGoal(token, savingsGoalData);
            console.log('Savings Goal Created:', result)
        } catch (error) {
            console.error('Error creating savings goal:', error.message);
        }
    };


return (
    <>
    <form onSubmit={handleSubmit}>
        <input
        type="text"
        value={savingsTitle}
        onChange={(e) => setSavingsTitle(e.target.value)}
        placeholder="Savings Goal Title"
        required/>
        <input
        type="number"
        value={savingsTarget}
        onChange={(e) => setSavingsTarget(e.target.value)}
        placeholder="Savings Goal Target"
        required/>
        <select
        value={savingsCategory}
        onChange={(e) => setSavingsCategory(e.target.value)}>
        <option value="Holiday">Holiday</option>
        <option value="House">House</option>
        <option value="Emergency Funds">Emergency Funds</option>
        <option value="Education">Education</option>
        <option value="Wedding">Wedding</option>
        <option value="Family">Family</option>
        <option value="Business">Business</option>
        <option value="Miscellaneous">Miscellaneous</option>
        </select>
        <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        />
        <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        />
        <button type="submit">Create Savings Goal</button>
    </form>
    </>
)

};

export default SavingsGoalForm;
