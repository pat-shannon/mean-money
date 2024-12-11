import { useState } from "react";


const DiaryEntryForm = ({token, setUpdateForm }) => {

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

        try {
            // Sending the data to the server backend
            const response = await fetch('/server/diary-entries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    amount: parseFloat(amount) // Ensure amount is a number
                })
            });

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
        <div style={{
            maxWidth: '400px',
            margin: '0 auto',
            padding: '20px',
            border: '1px solid #ddd',
            borderRadius: '8px'
        }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>
                New Diary Entry
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div>
                    <label htmlFor="amount" style={{ marginBottom: '5px', display: 'block' }}>
                        Amount
                    </label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleChange}
                        placeholder="Enter amount"
                        step="0.01"
                        min="0"
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="date" style={{ marginBottom: '5px', display: 'block' }}>
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <div>
                    <label htmlFor="businessName" style={{ marginBottom: '5px', display: 'block' }}>
                        Business Name
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="Enter business name"
                        required
                        maxLength={100}
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
                    />
                </div>

                <div>
                    <label style={{ marginBottom: '5px', display: 'block' }}>
                        Category
                    </label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        style={{
                            width: '100%',
                            padding: '8px',
                            borderRadius: '4px',
                            border: '1px solid #ddd'
                        }}
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
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Save Diary Entry
                </button>
            </form>
        </div>
    );
};

export default DiaryEntryForm;
