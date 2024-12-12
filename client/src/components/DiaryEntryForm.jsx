import { useState } from "react";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const DiaryEntryForm = () => {

    const [formData, setFormData] = useState({
        amount: "",
        date: new Date().toISOString().split('T')[0], //this is going to default to today's date- do we need to change this?
        businessName: "",
        category: ""
    });

    const categories = [
        'Food and Drink',
        'Social Outings',
        'Entertainment and Apps',
        'Holiday and Travel',
        'Health and Beauty',
        'Miscellaneous'
    ];
    //this handles changes to the input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        //check what is entered in the form is valid
        const { amount, date, businessName, category } = formData;
        if (!amount || !date || !businessName || !category) {
            alert('Please fill in all required fields');
            return;
        }
console.log(formData)
        try {
            // Sending the data to the server backend
            const response = await fetch(`${BACKEND_URL}/server/diary-entry`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(amount) // Ensure amount is a number
                })
            });

            console.log('Response status:', response.status);

            const responseText = await response.text();
            console.log('Response text:', responseText);

            if (response.ok) {
                alert('Diary entry saved successfully!');
                // Reset form or navigate away???
                setFormData({
                    amount: '',
                    date: new Date().toISOString().split('T')[0],
                    businessName: '',
                    category: ''
                });
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Failed to submit diary entry');
        }
    };


    return (
        <div className = "form-container">
            <div className = "form-container">
            <h2 className = "form-title"> New Diary Entry</h2>
            <form onSubmit={handleSubmit} className = "form">
                <div className ="form-group">
                    <label htmlFor="amount" className="form-label">
                        Amount: 
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        step="1"
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
                        placeholder="Enter business name"
                        required
                        maxLength={100}
                        className="form-input"
                    />
                </div>

                <div className="form-label">
                    <label className="form-label">Category: </label>
                    <select
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
