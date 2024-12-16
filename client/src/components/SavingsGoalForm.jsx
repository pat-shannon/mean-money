import { useState } from "react";
import { createSavingsGoal } from "../services/savings_goal";

const SavingsGoalForm = () => {
    const [formData, setFormData] = useState({
        savingsTitle: "",
        savingsTarget: "",
        savingsCategory: "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    })

    const categories = [
        'Holiday',
        'House',
        'Emergency Funds',
        'Education',
        'Wedding',
        'Family',
        'Business',
        'Miscellaneous'
    ]

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        const { savingsTitle, savingsTarget, savingsCategory, startDate, endDate } = formData;
        if (!savingsTitle || !savingsTarget || !savingsCategory || !startDate || !endDate) {
            alert('Please fill in all fields');
            return;
        }
    
        try {
            createSavingsGoal();
            // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/savings-goal`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({
            //         savingsTitle,
            //         savingsTarget: parseFloat(savingsTarget),
            //         savingsCategory,
            //         startDate,
            //         endDate
            //     })
            // });


    
            const responseText = await response.text();
    
            if (response.ok) {
                try {
                    const data = JSON.parse(responseText);
                    alert('Savings Goal Added Successfully')
                } catch (parseError) {
                    console.error('Parsing error', parseError);
                    alert('Received non-JSON response');
                }
            } else {
                alert(`Error: ${responseText}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit savings goal');
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="savingsTitle"  // Add name attribute
                    value={formData.savingsTitle}
                    onChange={handleChange}
                    placeholder="Savings Goal Title"
                    required
                />
                <input
                    type="number"
                    name="savingsTarget"  // Add name attribute
                    value={formData.savingsTarget}
                    onChange={handleChange}
                    placeholder="Savings Goal Target"
                    required
                />
                <div className="form-label">
                    <label className="form-label">Category: </label>
                    <select
                        name="savingsCategory"  // Change to match state key
                        value={formData.savingsCategory}  // Change to match state key
                        onChange={handleChange}
                        required
                        className="form-input"
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>
                <input
                    type="date"
                    name="startDate"  // Add name attribute
                    value={formData.startDate}
                    onChange={handleChange}
                />
                <input
                    type="date"
                    name="endDate"  // Add name attribute
                    value={formData.endDate}
                    onChange={handleChange}
                />
                <button type="submit">Create Savings Goal</button>
            </form>
        </div>
    )
};

export default SavingsGoalForm;


    // const [savingsTitle, setSavingsTitle] = useState('');
    // const [savingsTarget, setSavingsTarget] = useState('');
    // const [savingsCategory, setSavingsCategory] = useState('');
    // const [startDate, setStartDate] = useState('');
    // const [endDate, setEndDate] = useState('')

    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     const token = localStorage.getItem('token');

    //     const savingsGoalData = {
    //         savingsTitle,
    //         savingsTarget: parseFloat(savingsTarget),
    //         savingsCategory,
    //         startDate,
    //         endDate,
    //     };

    //     try {
    //         const result = await createSavingsGoal(token, savingsGoalData);
    //         console.log('Savings Goal Created:', result)
    //     } catch (error) {
    //         console.error('Error creating savings goal:', error.message);
    //     }
    // };