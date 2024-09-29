import axios from 'axios'; 
 
const api = axios.create({ 
    baseURL: 'http://localhost:8080/E-Insurance/admin', 
}); 
 
const getAuthToken = () => { 
    return localStorage.getItem('authToken'); 
}; 
 
api.interceptors.request.use(config => { 
    const token = getAuthToken(); 
    if (token) { 
        config.headers['Authorization'] = `Bearer ${token}`; 
    } 
    return config; 
}, error => { 
    return Promise.reject(error); 
}); 
 
export const fetchEmployeeCount = async () => { 
    try { 
        const response = await api.get('/employee-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching employee count:', error.response ? error.response.data : error); 
        throw error; 
    } 
}; 
 
export const fetchAgentCount = async () => { 
    try { 
        const response = await api.get('/agent-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching agent count:', error.response ? error.response.data : error); 
        throw error; 
    } 
}; 
 
export const fetchInsurancePlanCount = async () => { 
    try { 
        const response = await api.get('/insurance-plan-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching insurance plan count:', error.response ? error.response.data : error); 
        throw error; 
    } 
}; 
 
export const fetchInsuranceSchemeCount = async () => { 
    try { 
        const response = await api.get('/insurance-scheme-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching insurance scheme count:', error.response ? error.response.data : error); 
        throw error; 
    } 
}; 
 
export const fetchCityCount = async () => { 
    try { 
        const response = await api.get('/city-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching city count:', error.response ? error.response.data : error); 
        throw error; 
    } 
}; 
 
export const fetchStateCount = async () => { 
    try { 
        const response = await api.get('/state-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching state count:', error.response ? error.response.data : error); 
        throw error; 
    } 
}; 
 
export const fetchCustomerCount = async () => { 
    try { 
        const response = await api.get('/customer-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching customer count:', error.response ? error.response.data : error); 
        throw error; 
    } 
}; 
 
export const fetchTaxSettingsCount = async () => { 
    try { 
        const response = await api.get('/tax-settings-count'); 
        return response.data; 
    } catch (error) { 
        console.error('Error fetching tax settings count:', error.response ? error.response.data : error); 
        throw error; 
    } 
};
