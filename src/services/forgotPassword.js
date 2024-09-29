// src/services/authService.js

import axios from 'axios';
import { otpApiClient,setAuthToken } from '../utils/token';
// Define the base URL if needed or use absolute URLs
//const BASE_URL = 'http://localhost:8080/E-Insurance/auth';

// Function to request OTP
export const requestOtp = async (email) => {
    setAuthToken()
    try {
        await otpApiClient.post('/forgot-password', null, {
            params: { email }
        });
    } catch (error) {
        throw new Error('Failed to send OTP. Please try again.');
    }
};
