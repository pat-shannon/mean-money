const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createSavingsGoal(token, formData) {

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    };

    const response = await fetch(`${BACKEND_URL}/savings-goal`, requestOptions);

    if (!response.ok) {
        throw new Error("Failed to create savings goal");
    }

    return response;
}

export async function fetchUserSavingsGoal(token) {
    const response = await fetch(`${BACKEND_URL}/savings-goal`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }
    })

    if (!response.ok) {
        throw new Error('Failed to fetch savings goal')
    }

    return response.json();
}

export async function deleteSavingGoal(token, goalId) {
    try {
        const response = await fetch(`${BACKEND_URL}/savings-goal/${goalId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || "Unable to delete diary entry");
        }

        return true;
    } catch (error) {
        console.error('Delete diary entry error:', error);
        throw error;
    }
}