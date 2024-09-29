import React from 'react';
import axios from 'axios';
import { setAuthToken,allApiClient ,adminApiClient} from '../utils/token';
export const fetchAllPlans = async () => {
    setAuthToken()
    try {
        const response = await allApiClient.get('/getAllPlans');
        // return response.data;
        console.log('API Response:', response.data);  // Log the response to inspect the data structure
        return response.data.content; // Assuming the data you need is inside the 'content' field
    } catch (error) {
        console.error('Error fetching insurance plans:', error);
        throw error;
    }
};

export const fetchAllPlan = async () => {
    setAuthToken()
    try {
        const response = await adminApiClient.get('/getAllPlans');
        return response.data;
    } catch (error) {
        console.error('Error fetching insurance plans:', error);
        throw error;
    }
};