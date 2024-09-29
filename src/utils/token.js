

import axios from 'axios';

export const loginApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/auth/login',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const registerApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/auth/register',
    headers: {
        'Content-Type': 'application/json',
    },
});



export const adminApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/admin',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const allApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/toall',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const otpApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/auth',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fileApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/file',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const employeeApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/employee',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const customerApiClient = axios.create({
    baseURL: 'http://localhost:8080/E-Insurance/customer',
    headers: {
        'Content-Type': 'application/json',
    },
});


// Function to set the Authorization header
export const setAuthToken = () => {
    const token = localStorage.getItem('authToken');
    if (token) {
        adminApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        allApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        otpApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        loginApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        registerApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        employeeApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        customerApiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    } else {
        // Optionally clear headers if token is not found
        delete adminApiClient.defaults.headers.common['Authorization'];
        delete allApiClient.defaults.headers.common['Authorization'];
        delete otpApiClient.defaults.headers.common['Authorization'];
        delete loginApiClient.defaults.headers.common['Authorization'];
        delete registerApiClient.defaults.headers.common['Authorization'];
        delete employeeApiClient.defaults.headers.common['Authorization'];
        delete customerApiClient.defaults.headers.common['Authorization'];
    }
};

// Call this function initially or whenever the token is updated
setAuthToken();