import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDiaryEntry } from "../services/diary_entry";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../src/FormStyling.css"
import { Link } from "react-router-dom";


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
            const safeBusinessName = value
                .replace(/[<>;'"]/g, '')
                .slice(0, 50);
            setFormData(prev => ({
                ...prev,
                [name]: safeBusinessName
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
            await createDiaryEntry(token, formData);
            // console.log('yeee');
            // console.log(response);
            // localStorage.setItem("token", response.token);
            toast.success('Diary entry saved successfully!', {
                role: "alert",
                ariaLive: "polite"
            });
            setTimeout(() => {
                navigate("/dashboard");
            }, 2000);
            setFormData({
                amount: '',
                date: new Date().toISOString().split('T')[0],
                businessName: '',
                category: ''
            });
        } catch (error) {
            console.error('Submission error:', error);
            
            if (error.message === 'UNAUTHORIZED' || 
                error.message.includes('please log in') || 
                error.message.includes('401')) {
                
                console.log('Auth error detected - redirecting to login');
                toast.error('Session expired. Please log in again.', {
                    role: "alert",
                    ariaLive: "assertive"
                });
                localStorage.removeItem('token');
                navigate("/login");
            } else {
                toast.error('Failed to submit diary entry: ' + error.message, {
                    role: "alert",
                    ariaLive: "assertive"
                });
            }
        }
    };
    return (
        <div className="form-container">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
            <div className="form-container">
                <h2 className="form-title">New Diary Entry</h2>
                <form onSubmit={handleSubmit} className="form">
                    <div className="form-group">
                        <label htmlFor="amount" className="form-label">Amount (£) </label>
                        <input
                            type="text"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="Enter what you spent"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date" className="form-label">Date</label>
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
                        <label htmlFor="businessName" className="form-label">Business Name</label>
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
                    <label htmlFor="category" className="form-label">Category </label>
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
                    <div style={{ justifyContent: "center", textAlign: "left", marginTop: "30px", marginLeft: "-22px", marginBottom: "8px" }}>
                        <Link className="next-button" to="/dashboard">◀ Return To Dashboard</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default DiaryEntryForm;