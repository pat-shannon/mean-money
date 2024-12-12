const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createSavingsGoal(token, body) {

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: body }),
    };

    const response = await fetch(`${BACKEND_URL}/savings-goal`, requestOptions);

    if (!response.ok) {
        throw new Error("Failed to create savings goal");
    }

    return response;
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


    //     savingsTitle: savingsGoalData.savingsTitle,
    //     savingsTarget: savingsGoalData.savingsTarget,
    //     savingsCategory: savingsGoalData.savingsCategory,
    //     startDate: savingsGoalData.startDate,
    //     endDate: savingsGoalData.endDate,
    //     isComplete: false,
    // };