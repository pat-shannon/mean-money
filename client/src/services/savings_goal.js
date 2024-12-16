const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createSavingsGoal(token, body) {

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
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
