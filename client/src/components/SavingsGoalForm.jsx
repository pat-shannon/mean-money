import { useState } from "react";
import { createSavingsGoal } from "../services/savings_goal";
import { ToastContainer, toast } from 'react-toastify';
import "../FormStyling.css"
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SavingsGoalForm = () => {
    const [formData, setFormData] = useState({
        savingsTitle: "",
        savingsTarget: "",
        savingsCategory: "",
        startDate: new Date().toISOString().split('T')[0],
        endDate: new Date().toISOString().split('T')[0]
    })
    const navigate = useNavigate();
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

        if (name === 'startDate' || name === 'endDate') {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            const selectedDate = new Date(value);
            selectedDate.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                toast.error("Date cannot be in the past", {
                    role: "alert",
                    ariaLive: "assertive"
                });
                return;
            }

        if (name === 'endDate') {
            if (new Date(value) < new Date(formData.startDate)) {
                toast.error("End date cannot be before start date", {
                    role: "alert",
                    ariaLive: "assertive"
                });
                return;
            }
        }
    }

        if (name === 'savingsTarget') {
            if (value.startsWith('-')) {
                toast.error("Savings target must be a positive number", {
                    role: "alert",
                    ariaLive: "assertive"
                });
                return;
            }

        if (parseFloat(value) === 0) {
                toast.error("Savings target must be greater than zero", {
                    role: "alert",
                    ariaLive: "assertive"
                });
                return;
            }
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Session expired. Please log in again.", {
                role: "alert",
                ariaLive: "assertive"
            });
            return;
        }
    
        const { savingsTitle, savingsTarget, savingsCategory, startDate, endDate } = formData;

        if (!savingsTitle || !savingsTarget || !savingsCategory || !startDate || !endDate) {
            toast.error('Please fill in all fields', {
                role: "alert",
                ariaLive: "assertive"
            });
            return;
        }

        if (new Date(endDate) < new Date(startDate)) {
            toast.error('End date must be after start date', {
                role: "alert",
                ariaLive: "assertive"
            });
            return;
        }
        try {
            const response = await createSavingsGoal(token, formData);
            const responseText = await response.text();
    
            if (response.ok) {
                try {
                    const data = JSON.parse(responseText);
                    toast.success('Savings goal added successfully', {
                        role: "alert",
                        ariaLive: "polite"
                    });

                    setTimeout(() => {
                        navigate("/dashboard");
                    }, 2000);

                    setFormData({
                        savingsTitle: "",
                        savingsTarget: "",
                        savingsCategory: "",
                        startDate: new Date().toISOString().split('T')[0],
                        endDate: new Date().toISOString().split('T')[0]
                    });

                } catch (parseError) {
                    console.error('Parsing error', parseError);
                         toast.error('Received invalid response from server', {
                        role: "alert",
                        ariaLive: "assertive"
                    });
                }
            } else {
                toast.error(`Error: ${responseText}`, {
                    role: "alert",
                    ariaLive: "assertive"
                });
            }
        } catch (error) {
            console.error('Submission error:', error);
            toast.error('Failed to submit savings goal. Please try again.', {
                role: "alert",
                ariaLive: "assertive"
            });
        }
    };

    return (
        <div className="form-container">
            <div className="form-container">
              <ToastContainer 
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnHover
            />
            <h2 className = "form-title">Create a new saving goal</h2>
            <form onSubmit={handleSubmit}>
            <label htmlFor="savingsTitle" className="form-label">I'm saving for</label>
                <input
                    style={{marginBottom: "12px"}}
                    type="text"
                    name="savingsTitle"  
                    value={formData.savingsTitle}
                    onChange={handleChange}
                    placeholder="Give your goal a title (e.g. a boat)"
                    required
                />
                <label htmlFor="savingsTarget" className="form-label">Target</label>
                <input
                    style={{marginBottom: "12px"}}
                    type="number"
                    name="savingsTarget"  
                    value={formData.savingsTarget}
                    onChange={handleChange}
                    placeholder="Savings Goal Target (£)"
                    required
                />
                <div className="form-label">
                    <select
                        style={{marginBottom: "12px"}}
                        name="savingsCategory"  
                        value={formData.savingsCategory} 
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
                <label htmlFor="amount" className="form-label">Start date:</label>
                <input
                    style={{marginBottom: "12px"}}
                    type="date"
                    name="startDate" 
                    value={formData.startDate}
                    onChange={handleChange}
                    min={new Date().toISOString().split('T')[0]}
                />
                    <label htmlFor="amount" className="form-label">
                        End date:
                    </label>
                <input
                    style={{marginBottom: "12px"}}
                    type="date"
                    name="endDate"  
                    value={formData.endDate}
                    onChange={handleChange}
                />
                <button className="form-button" type="submit">Create Savings Goal</button>
                <div style={{justifyContent: "center", textAlign: "left", marginTop: "30px", marginLeft: "-22px", marginBottom: "8px"}}>
                    <Link className="next-button" to="/dashboard">◀ Return To Dashboard</Link>
                </div>
            </form>
        </div>
        </div>
    )
};

export default SavingsGoalForm;
