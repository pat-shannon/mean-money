const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createSavingsGoal(token, savingsGoalData) {
    const payload = {
        savingsTitle: savingsGoalData.savingsTitle,
        savingsTarget: savingsGoalData.savingsTarget,
        savingsCategory: savingsGoalData.savingsCategory,
        startDate: savingsGoalData.startDate,
        endDate: savingsGoalData.endDate,
        isComplete: false,
    };

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    };

    const response = await fetch(`${BACKEND_URL}/savings-goal`, requestOptions);

    if (!response.ok) {
        throw new Error("Failed to create savings goal");
    }

    return await response.json();
}

// export async function getSavingsGoal(token) {
//     const requestOptions = {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     }

//     const response = await fetch(`${BACKEND_URL}/savings-goal`, requestOptions);

//     if (response.status !== 200) {
//         throw new Error("Unable to fetch savings goal");
//     }

//     const data = await response.json();
//     return data;
// }
