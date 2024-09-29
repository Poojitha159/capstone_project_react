import { loginApiClient } from "../utils/token";
// Login function using the configured axios instance
export const login = async (usernameOrEmail, password) => {
    try {
        // Make the API call using the loginApiClient instance
        const response = await loginApiClient.post('', { usernameOrEmail, password });
        return response.data;
    } catch (error) {
        // Handle or rethrow the error to be caught by the calling function
        throw error;
    }
};

// registerationnn 

const API_BASE_URL = 'http://localhost:8080/E-Insurance';

export const registerUser = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        return await response.json();
    } catch (error) {
        throw new Error(`Error during registration: ${error.message}`);
    }
};