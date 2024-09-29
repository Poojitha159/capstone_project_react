import axios from 'axios'; 
import { adminApiClient,setAuthToken } from '../utils/token';

 
const API_BASE_URL = 'http://localhost:8085/E-Insurance/admin'; 
 
const getAuthToken = () => { 
    // Retrieve your token from local storage, context, or any other method you're using 
    return localStorage.getItem('authToken'); 
}; 
 
// const axiosInstance = axios.create({ 
//     baseURL: API_BASE_URL, 
//     headers: { 
//         'Authorization': Bearer ${getAuthToken()}, 
//         'Content-Type': 'application/json' 
//     } 
// }); 
 
// Fetch all agents with pagination and sorting 
// export const fetchAgents = async (page, size, sortBy = 'agentId', direction = 'asc') => { 
//     try { 
//         const response = await axiosInstance.get('/getAllAgents', { 
//             params: { 
//                 page, 
//                 size, 
//                 sortBy, 
//                 direction 
//             } 
//         }); 
//         return response.data; 
//     } catch (error) { 
//         throw new Error(error.response?.data?.message || 'Error fetching agents'); 
//     } 
// }; 
 
// Add a new agent 
// export const addAgent = async (agentData) => { 
//     try { 
//         const response = await axiosInstance.post('/addAgent', agentData); 
//         return response.data; 
//     } catch (error) { 
//         throw new Error(error.response?.data?.message || 'Error adding agent'); 
//     } 
// }; 
 
// // Update an existing agent 
// export const updateAgent = async (agentId, agentData) => { 
//     try { 
//         const response = await axiosInstance.put(`/updateAgent/${agentId}`, agentData); 
//         return response.data; 
//     } catch (error) { 
//         throw new Error(error.response?.data?.message || 'Error updating agent'); 
//     } 
// }; 
 
// Deactivate an agent 
// export const deactivateAgent = async (agentId) => { 
//     try { 
//         const response = await axiosInstance.put(`/updateAgent/${agentId}`, { isActive: false }); 
//         return response.data; 
//     } catch (error) { 
//         throw new Error(error.response?.data?.message || 'Error deactivating agent'); 
//     } 
// };


//Search customer by ID
export const searchCustomersById = async (customerId) => {
    setAuthToken();
    try {
        const response = await adminApiClient.get(`/get-customer-by-id/${customerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Search customers by active status with pagination
export const searchCustomersByActiveStatus = async (active, page, size) => {
    setAuthToken();
    try {
        const response = await adminApiClient.get(`/search-by-active-status`, {
            params: {
                active,
                page,
                size
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addAgent = async (agentData) => {  
    setAuthToken();
    try {  
        const response = await adminApiClient.post('/addAgent', agentData);  
        return response.data;  
    } catch (error) {  
        console.error('Error adding agent:', error);  
        throw new Error(error.response?.data?.message || 'Error adding agent');  
    }  
};

