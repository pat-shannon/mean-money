const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export async function createDiaryEntry(token, formData) {
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData),
  };

  try {
    const response = await fetch(`${BACKEND_URL}/diary/diary-entry`, requestOptions);
    const responseText = await response.text();

    if (!response.ok) {
      throw new Error(responseText);
    }

    try {
      return JSON.parse(responseText);
    } catch {
      return responseText;
    }
  } catch (error) {
    console.error('Create diary entry error:', error);
    throw error;
  }
}

export async function getDiaryEntries(token) {
  if (!token) {
    throw new Error("Authentication token is required");
}

const url = `${BACKEND_URL}/diary/diary-entry`;

try {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.log('Error response:', errorText);
        throw new Error(errorText || "Unable to get diary entries");
    }

    const data = await response.json();
    console.log('Received data:', data);
    return data;
} catch (error) {
    console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
        url: url,
        token: token ? 'Present' : 'Missing'
    });
    throw error;
}
}

export async function deleteDiaryEntry(token, entryId) {
  try {
      const response = await fetch(`${BACKEND_URL}/diary/diary-entry/${entryId}`, {
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
  
export async function getLastMonthSpending(token, formData) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
  
    const response = await fetch(`${BACKEND_URL}/diary/get-last-month-spending`, requestOptions);
    const data = await response.json()
    
    if (response.status !== 200) {
      throw new Error("Unable to get monthly spending");
    }
  
    return data.spendingValues;
  }
