
import React from 'react';
import axios from 'axios';
import { adminApiClient,employeeApiClient,setAuthToken } from '../utils/token';
// Fetch all employees with pagination
export const fetchEmployees = async (page, size) => {
    setAuthToken()

    try {
        const response = await adminApiClient.get('/getAllEmployees', {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Deactivate an employee
export const deactivateEmployee = async (id) => {
    setAuthToken()

    try {
        await adminApiClient.delete(`/deactivate/${id}`);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

// Additional functions for adding and updating employees
export const addEmployee = async (employeeData) => {
    setAuthToken()

    try {
        await adminApiClient.post('/addEmployee', employeeData);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const updateEmployee = async (employeeId, employeeData) => {
    setAuthToken()

    try {
        await adminApiClient.put(`/updateEmployee/${employeeId}`, employeeData);
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

//getAllCustomers

export const getCustomers = async (page, size) => {
    try {
        // Ensure the token is set before making API calls
        setAuthToken();
        const response = await employeeApiClient.get('/get-all-customers', {
            params: { page, size }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to fetch customers');
    }
};




// Function to change password
export const changePassword = async (employeeId, oldPassword, newPassword) => {
    try {
        // Set the authorization token
        setAuthToken();

        // Make the API request
        const response = await employeeApiClient.put(
            `/${employeeId}/change-password`,
            { oldPassword, newPassword }
        );

        // Return the response data if needed
        return response.data;
    } catch (error) {
        // Re-throw the error for handling in the component
        throw error;
    }
};

//editProfile

// Fetch employee details
export const fetchEmployeeDetails = async (id) => {
    try {
        // Ensure the token is set
        setAuthToken();
        const response = await employeeApiClient.get(`/view-employee-by-id/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Update employee profile
export const updateEmployeeProfile = async (id, employee) => {
    try {
        // Ensure the token is set
        setAuthToken();
        const response = await employeeApiClient.put(`/${id}/profile`, employee);
        return response.data;
    } catch (error) {
        throw error;
    }
};


// for AgentList .js

// Fetch agents with pagination
export const fetchAgents = async (page, size) => {
    try {
        setAuthToken(); // Ensure the token is set before making the request
        const response = await employeeApiClient.get(`/getAllAgents?page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Fetch agents without pagination
export const fetchAllAgents = async () => {
    try {
        setAuthToken(); // Ensure the token is set before making the request
        const response = await employeeApiClient.get('/getAllAgents');
        return response.data;
    } catch (error) {
        throw error;
    }
};









// Search customer by ID
export const searchCustomersById = async (customerId) => {
    setAuthToken();
    try {
        const response = await employeeApiClient.get(`/get-customer-by-id/${customerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Search customers by name with pagination
export const searchCustomersByName = async (name, page, size) => {
    setAuthToken();
    try {
        const response = await employeeApiClient.get(`/search-by-name`, {
            params: {
                name,
                page,
                size
            }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Search customers by active status with pagination
export const searchCustomersByActiveStatus = async (active, page, size) => {
    setAuthToken();
    try {
        const response = await employeeApiClient.get(`/search-by-active-status`, {
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







export const fetchEmployeeById = async(employeeId)=>{//(employeeId) => {
    
    // return axios.get(`http://localhost:8080/E-Insurance/admin/view-employee-by-id/${employeeId}`)
    //     .then(response => response.data);
     setAuthToken();
    try {
        const response = await adminApiClient.get(`/view-employee-by-id/${employeeId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const fetchEmployeesByActiveStatus = async(active, page, size) => {
    // return axios.get(`http://localhost:8080/E-Insurance/admin/employeesByActiveStatus?active=${active}&page=${page}&size=${size}`)
    //     .then(response => response.data);
    setAuthToken();
    try {
        const response = await adminApiClient.get(`/employeesByActiveStatus?active=${active}&page=${page}&size=${size}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};




// Get the token from localStorage
const getToken = () => localStorage.getItem('authToken');

export const deactivateAgent = async (agentId) => {
    setAuthToken()
    const token = getToken(); // Fetch the token from storage
    return await employeeApiClient.delete(`/deactivate-agent/${agentId}`, {
        headers: {
            Authorization: `Bearer ${token}` // Attach the token as a Bearer token
        }
    });
};


// Fetch agent details by ID
export const fetchAgentById = async (agentId) => {
    setAuthToken()
  //  const token = getToken();
    const response = await employeeApiClient.get(`/agentById/${agentId}`, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    });
    return response.data;
};

// Update agent details
export const updateAgent = async (agentId, agentDetails) => {
    setAuthToken()
    //const token = getToken();
    return await employeeApiClient.put(`/updateAgent/${agentId}`, agentDetails, {
        // headers: {
        //     Authorization: `Bearer ${token}`
        // }
    });
};


// export const fetchAgentById = async (id) => {
//     const response = await fetch(`/api/agentById/${id}`);
//     if (!response.ok) throw new Error("Failed to fetch agent");
//     return await response.json();
// };

export const fetchAgentsByActiveStatus = async (active) => {
    setAuthToken();
    try {
        const response = await employeeApiClient.get(`/agentsByActiveStatus?active=${active}`);
        console.log(response); // Log the entire response for debugging
        if (response.status !== 200) throw new Error("Failed to fetch agents");
        return response.data;
    } catch (error) {
        console.error("Error fetching agents:", error); // Log the error for debugging
        throw new Error(`Failed to fetch agents: ${error.message}`);
    }
};
