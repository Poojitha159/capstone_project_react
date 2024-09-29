// src/services/customerService.js

import { adminApiClient, setAuthToken,customerApiClient ,employeeApiClient} from '../utils/token';

export const fetchCustomers = async (page = 0, size = 10) => {
    setAuthToken();
    try {
        const response = await adminApiClient.get('/get-all-customers', {
            params: { page, size },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching customers:', error);
        throw error;
    }
};


// Function to change password
export const changePasswordofCustomer = async (customerId, oldPassword, newPassword) => {
    try {
        // Set the authorization token
        setAuthToken();
        // Make the API request
        const response = await customerApiClient.put(
            `/${customerId}/change-password`,
            { oldPassword, newPassword }
        );

        // Return the response data if needed
        return response.data;
    } catch (error) {
        // Re-throw the error for handling in the component
        throw error;
    }
};

export const fetchCustomerDetails = async (customerId) => {
    try {
      setAuthToken();
      const response = await customerApiClient.get(`/view-customer-by-id/${customerId}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch customer details');
    }
  };
  
  export const updateCustomerDetails = async (customerId, customerData) => {
    try {
      setAuthToken();
      await customerApiClient.put(`/customers/${customerId}`, customerData);
    } catch (error) {
      throw new Error('Failed to update customer details');
    }
  };

  // to fetvch the cyustomer by id used in Fetchschems.js
  export const fetchCustomerById = async (customerId) => {
    try {
      setAuthToken()
        const response = await customerApiClient(`/view-customer-by-id/${customerId}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching customer details');
    }
};

// to get all policies bt customer id
export const getAllPoliciesByCustomerId = async (customerId, page = 0, size = 10) => {
  try {
    setAuthToken(); // Assuming this function sets the authorization header
    const response = await customerApiClient(`/customers/${customerId}/policies`, {
      params: { page, size }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching policies:', error);
    throw error;
  }
};


export const getCustomerDetailsByPolicyId = async (policyId) => {
  try {
    setAuthToken()
    const response = await customerApiClient(`/policies/${policyId}/customer-details`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch customer and policy details');
  }
};

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

// Search customers by name with pagination
export const searchCustomersByName = async (name, page, size) => {
    setAuthToken();
    try {
        const response = await adminApiClient.get(`/search-by-name`, {
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


export const getCustomers = async (page, size) => {
  try {
      // Ensure the token is set before making API calls
      setAuthToken();
      const response = await adminApiClient.get('/get-all-customers', {
          params: { page, size }
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch customers');
  }
};

