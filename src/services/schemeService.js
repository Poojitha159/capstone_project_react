import { allApiClient,adminApiClient, setAuthToken} from '../utils/token';
import axios from 'axios';
// Function to fetch schemes by plan ID
export const fetchSchemesByPlanId = async (planId) => {
 
    try {
        setAuthToken()
        const response = await allApiClient.get(`/getSchemesByPlan/${planId}`);
        console.log('API Response:', response);

       // return response.data;
       return response;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const fetchInsurancePlans = async (page = 0, size = 10, sortBy = 'insurancePlanId', direction = 'asc') => {
    try {
        const response = await axios.get('http://localhost:8080/E-Insurance/toall/getAllPlans', {
            params: {
                page,
                size,
                sortBy,
                direction
            }
        });
        return response.data.content; // Adjusted for response structure
    } catch (error) {
        handleError(error, 'Error fetching insurance plans');
    }
};


// src/utils/service.js



// export const fetchInsuranceSchemes = async (currentPage) => {
//     try {
//         setAuthToken()
//         const response = await adminApiClient.get('/getAllSchemes', {
//             params: {
//                 page: currentPage - 1,
               
//             },
//         });
//         return response.data;
//     } catch (error) {
//         throw new Error('Error fetching insurance schemes: ' + error.message);
//     }
// };

export const fetchInsuranceSchemes = async (currentPage, pageSize) => {
    try {
        setAuthToken(); // Ensure your auth token is set
        const response = await adminApiClient.get('/getAllSchemes', {
            params: {
                page: currentPage - 1, // Convert to zero-based index
                size: pageSize, // Send the page size
                sortBy: 'insuranceSchemeId', // Optional: include sorting if needed
                direction: 'asc' // Optional: include sorting direction if needed
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error fetching insurance schemes: ' + error.message);
    }
};


// Upload File Function
export const uploadFile = async (file, additionalParams = {}) => {
    const formData = new FormData();
    formData.append('file', file);

    // Append additional parameters if any
    for (const key in additionalParams) {
        formData.append(key, additionalParams[key]);
    }

    try {
        const token = localStorage.getItem('authToken');
        const response = await axios.post('http://localhost:8080/E-Insurance/file/upload', formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data', // Ensure this is set
            },
        });
        return response.data; // Return the uploaded file information
    } catch (error) {
        console.error('Error uploading file:', error.response ? error.response.data : error.message);
        throw error; // Propagate the error
    }
};


// View File Function
export const viewFile = async (fileName) => {
    try {
        const response = await axios.get(`http://localhost:8085/E-Insurance/file/view/${fileName}`, {
            responseType: 'blob', // Important for file download
        });
        return response.data; // This will be a Blob object
    } catch (error) {
        console.error('Error viewing file:', error.response ? error.response.data : error.message);
        throw error; // Propagate the error
    }
};

// Utility function to handle errors
const handleError = (error, defaultMessage) => {
    let errorMessage = defaultMessage;

    if (error.response) {
        errorMessage = `Server responded with status code ${error.response.status}: ${error.response.data.message || error.response.statusText}`;
    } else if (error.request) {
        errorMessage = 'No response received from the server';
    } else {
        errorMessage = `Error in setting up request: ${error.message}`;
    }

    console.error(errorMessage);
    throw new Error(errorMessage); // Throw the error to be handled in the UI
};

export const addScheme = async (insurancePlanId, schemeDto) => {
    console.log(schemeDto);

    try {
        const token=localStorage.getItem('authToken');

        const response = await axios.post(  `http://localhost:8080/E-Insurance/admin/createScheme/${insurancePlanId}`, schemeDto, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });
        console.log('Success:', response.data);
    } catch (error) {
        console.error('Error adding scheme:', error.response ? error.response.data : error.message);
    }
};


// Activate Scheme 
export const activateScheme = async (schemeId) => {  
    try {  
        const token=localStorage.getItem('authToken');
        const response = await axios.put(`http://localhost:8080/E-Insurance/admin/activateScheme/${schemeId}`, { active: true }, { 
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            } 
        });  
        return response.data;  
    } catch (error) {  
        console.error('Error activating scheme:', error); 
        throw new Error(error.response?.data?.message || 'Error activating scheme');  
    }  
};  
 
// Deactivate Scheme 
export const deactivateScheme = async (schemeId) => {  
    try {  
        const token=localStorage.getItem('authToken');
        const response = await axios.delete(`http://localhost:8080/E-Insurance/admin/deactivateScheme/${schemeId}`, { 
            headers: { 
                'Authorization':` Bearer ${token}` 
            } 
        });  
        return response.data;  
    } catch (error) {  
        console.error('Error deactivating scheme:', error); 
        throw new Error(error.response?.data?.message || 'Error deactivating scheme');  
    }  
};

export const updateSchemeStatus = async (schemeId, newStatus) => { 
    try { 
        const token=localStorage.getItem('authToken'); 
        const response = await axios.put(`http://localhost:8080/E-Insurance/admin/activateScheme/${schemeId}`, { 
            active: newStatus // Ensure this matches what the backend expects 
        }, { 
            headers: { 
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json' 
            } 
        }); 
        return response.data; 
    } catch (error) { 
        console.error('Error updating scheme status:', error.response ? error.response.data : error.message); 
        throw error; 
    } 
};

export const updateScheme = async (schemeId, updatedData) => { 
    try { 
        const token=localStorage.getItem('authToken'); 
        const response = await axios.put(`http://localhost:8080/E-Insurance/admin/updateInsuranceScheme/${schemeId}`, updatedData,{
            headers: { 
                'Authorization':` Bearer ${token}` 
            } 
        
        }); 
        return response.data; // Adjust according to your backend response 
    } catch (error) { 
        console.error('Error updating scheme:', error); 
        throw new Error(error.response?.data?.message || 'Failed to update scheme'); 
    } 
};
