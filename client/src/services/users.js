const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getMyUserDetails(token) {
    const requestOptions = {
        method: "GET",
        headers:{
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    }
    // THAT LINE: ?
    const response = await fetch(`${BACKEND_URL}/users/find`, requestOptions);
    if (response.status !== 200) {
        throw new Error("Unable to fetch user details");
    }

    const data = await response.json();
    return data;
}

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

export async function getUserByName(token, name) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    };
    const response = await fetch(`${BACKEND_URL}/users/find/${name}`, requestOptions);

    if (!response.ok) {
        throw new Error(`User not found or error: ${response.statusText}`);
    }
    const user = await response.json();
    return user;
}


export const submitNewUser = async ( name, email, password ) => {
    try {
        const response = await fetch('http://localhost:9000/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
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

export async function setSpendingGoals(token, currentSavings, disposableIncome, foodAndDrinkGoal, socialAndEntertainmentGoal, shoppingGoal, holidayAndTravelGoal, healthAndBeautyGoal, miscGoal) {
    const payload = {
        currentSavings: currentSavings,
        disposableIncome: disposableIncome,
        foodAndDrinkGoal: foodAndDrinkGoal,
        socialAndEntertainmentGoal: socialAndEntertainmentGoal,
        shoppingGoal: shoppingGoal,
        holidayAndTravelGoal: holidayAndTravelGoal,
        healthAndBeautyGoal: healthAndBeautyGoal,
        miscGoal: miscGoal
    }
    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
    
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload)
    };
    const response = await fetch(`${BACKEND_URL}/users/set-spending-goals`, requestOptions)

    if (response.status === 201){
        return await response.json();
        
    } else{
        throw new Error(
            `Received status ${response.status} when attempting to set spending goals. Expected 201`
        )
    }
}