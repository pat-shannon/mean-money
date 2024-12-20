

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
      if (response.status === 401) {
        throw new Error('UNAUTHORIZED');
      }
      throw new Error(responseText);
    }

  
    
    return response;
  } catch (error) {
    console.error('Create diary entry error:', error);
    throw error;
  }
}

export async function getDiaryEntries(token) {
  if (!token) {
    throw new Error("Authentication token is required");
}

try {
    const response = await fetch(`${BACKEND_URL}/diary/diary-entry`, {
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
    return data;
} catch (error) {
    console.error('Detailed error:', {
        message: error.message,
        stack: error.stack,
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
      const deleteResponse = await response.json();
      return deleteResponse;
  } catch (error) {
      console.error('Delete diary entry error:', error);
      throw error;
  }
}
  
export async function getSpendingForPeriod(token, formData) {
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
  
    const response = await fetch(`${BACKEND_URL}/diary/get-spending-for-period`, requestOptions);
    const data = await response.json()
    
    if (response.status !== 200) {
      throw new Error("Unable to get spending for period");
    }
  
    return data.spendingValues;
  }

  export async function getSavingsContributions(token) {
    const url = `${BACKEND_URL}/diary/savings-contributions`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorisation: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Unable to get savings contributions.");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("savings contribution error", error);
      throw error;
    }
  }
