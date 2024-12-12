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
  