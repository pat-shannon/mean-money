const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function CreateEntry(token, body) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: body }),
    };
  
    const response = await fetch(`${BACKEND_URL}/diary-entry`, requestOptions);
  
    if (response.status !== 201) {
      throw new Error("Unable to create diary entry");
    }
  
    return response;
  }
  
export async function getLastMonthSpending(token) {
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
  
    const response = await fetch(`${BACKEND_URL}/get-last-month-spending`, requestOptions);
  
    if (response.status !== 200) {
      throw new Error("Unable to get monthly spending");
    }
  
    return response;
  }