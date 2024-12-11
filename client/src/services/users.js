const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export async function getUserByEmail(token, email) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(`${BACKEND_URL}/users/find/${email}`, requestOptions);

    if (!response.ok) {
        throw new Error(`User not found or error: ${response.statusText}`);
    }

    const user = await response.json();
    return user;
}


export async function getUserByUsername(token, username) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(`${BACKEND_URL}/users/find/${username}`, requestOptions);

    if (!response.ok) {
        throw new Error(`User not found or error: ${response.statusText}`);
    }
    const user = await response.json();
    return user;
}


export const submitNewUser = async (formData) => {
    try {
        const response = await fetch('http://localhost:3000/users', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || 'Signup failed');
        }
    } catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};