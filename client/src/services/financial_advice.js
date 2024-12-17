const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function getFinancialAdvice(token) {
    const requestOptions = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };

    const response = await fetch(`${BACKEND_URL}/financial-advice`, requestOptions);

    if (response.ok) {
        const data = await response.json();
        return data.advice;
    } else {
        const errorText = await response.text();
        console.error("Error response", errorText)
        throw new Error('Failed to fetch financial advice');
    }
}