import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiaryEntry } from "../services/diary_entry";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../src/FormStyling.css"


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
        
        if (value.startsWith('-')) {
            toast.error("Amount must be a positive number", {
                role: "alert",
                ariaLive: "assertive"
            });
            return;
        }
        let currencyValue = value.replace(/[^0-9.]/g, '');

        const decimalParts = currencyValue.split('.');
        if (decimalParts.length > 2) {
            currencyValue = decimalParts[0] + '.' + decimalParts.slice(1).join('');
        }
        if (decimalParts.length === 2 && decimalParts[1].length > 2) {
            currencyValue = parseFloat(currencyValue).toFixed(2);
        }
        if (parseFloat(currencyValue) === 0) {
            toast.error("Amount must be greater than zero", {
                role: "alert",
                ariaLive: "assertive"
            });
            return;
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
            toast.error('Session timed out. Please log in again.', {
                role: "alert",
                ariaLive: "assertive"
            });
            navigate("/login");
            return;
        }
        const { amount, date, businessName, category } = formData;
        if (!amount || !date || !businessName || !category) {
            toast.error('Please fill in all required fields', {
        role: "alert",
        ariaLive: "assertive"
    });
            return;
        }
try {
    const response = await createDiaryEntry(token, formData);
    console.log('yeee');
    console.log(response);
    // localStorage.setItem("token", response.token);
                toast.success('Diary entry saved successfully!', {
                role: "alert", 
                ariaLive: "assertive"
                });
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1100);
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
            <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={true}
                  closeOnClick
                  pauseOnHover
              />
            <div className = "form-container">
            <h2 className = "form-title">New Diary Entry</h2>
            <form onSubmit={handleSubmit} className = "form">
                <div className ="form-group">
                    <br></br>
                    <input
                        type="text"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Amount (£) - enter what you spent"
                        required
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date" className="form-label">Date: </label>
                    <br></br>
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
                    <br></br>
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
                    className="form-button"
                >
                    Save Diary Entry
                </button>
            </form>
        </div>
    </div>
    );
};
export default DiaryEntryForm;