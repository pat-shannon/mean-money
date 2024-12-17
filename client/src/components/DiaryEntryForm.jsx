import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiaryEntry } from "../services/diary_entry";
// const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const DiaryEntryForm = () => {
    const [formData, setFormData] = useState({
        amount: "",
        date: new Date().toISOString().split('T')[0],
        businessName: "",
        category: ""
    });
    const navigate = useNavigate();
    const categories = [
        'Food and Drink',
        'Social and Entertainment',
        'Shopping',
        'Holiday and Travel',
        'Health and Beauty',
        'Miscellaneous'
    ];
    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name === "amount") {
        let currencyValue = value.replace(/[^0-9.]/g, '');
        if (currencyValue.startsWith('-')) {
            alert("Amount must be a positive number")
            return;
        }
        const decimalParts = currencyValue.split('.');
        if (decimalParts.length > 2) {
            currencyValue = decimalParts[0] + '.' + decimalParts.slice(1).join('');
        }
        if (decimalParts.length === 2 && decimalParts[1].length > 2) {
            currencyValue = parseFloat(currencyValue).toFixed(2);
        }
        setFormData(prev => ({
            ...prev,
            [name]: currencyValue
        }));
        } else if (name === "businessName") {
        const safebusinessName = value
        .replace(/[<>;&'"]/g, '')
        .trim()
        .slice(0, 50);
        setFormData(prev => ({
            ...prev,
            [name]: safebusinessName
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
};
    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");
        if (!token) {
            alert('No authentication token found. Please log in again.');
            navigate("/login");
            return;
        }
        const { amount, date, businessName, category } = formData;
        if (!amount || !date || !businessName || !category) {
            alert('Please fill in all required fields');
            return;
        }
try {
    const response = await createDiaryEntry(token, formData);
                alert('Diary entry saved successfully!');
                navigate("/dashboard");
                setFormData({
                    amount: '',
                    date: new Date().toISOString().split('T')[0],
                    businessName: '',
                    category: ''
                });
        } catch (error) {
            console.error('Submission error:', error);
            if (error.message.includes('401')) {
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token');
                navigate("/login");
            } else {
                alert('Failed to submit diary entry: ' + error.message);
            }
        }
    };
    return (
        <div className = "form-container">
            <div className = "form-container">
            <h2 className = "form-title">New Diary Entry</h2>
            <form onSubmit={handleSubmit} className = "form">
                <div className ="form-group">
                    <label htmlFor="amount" className="form-label">
                        Amount (£):
                    </label>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter what you spent"
                        step="0.01"
                        min="0"
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date" className="form-label">Date: </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="businessName" className="form-label">Business Name: </label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Max 50 characters"
                        required
                        maxLength={50}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="category" className="form-label">Category: </label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
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
                <button
                    type="submit"
                    className="submit-btn"
                >
                    Save Diary Entry
                </button>
            </form>
        </div>
    </div>
    );
};
export default DiaryEntryForm;