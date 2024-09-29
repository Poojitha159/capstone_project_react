import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
    // const [customer, setCustomer] = useState({});
    const [customer, setCustomer] = useState(); 
    const [policies, setPolicies] = useState([]);
    const customerId = localStorage.getItem('customerId');
    const token = localStorage.getItem('authToken'); 
    const navigate = useNavigate();
    
    const [showClaimModal, setShowClaimModal] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    useEffect(() => {
        console.log("customerId:", customerId);
        console.log("token:", token);
        const fetchCustomerDetails = async () => {
            try {
                const response =axios.get(`http://localhost:8080/E-Insurance/customer/customersss/${customerId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("API Response:", response.data);
                if (response.data) {
                    setCustomer(response.data);
                    setPolicies(response.data.insurancePolicies || []); // Ensure policies are an array
                } else {
                    console.error("No data found in API response.");
                }
              

            } catch (error) {
                if (error.response) {
                    // Log the error response details
                    console.error("Error response data:", error.response.data);
                    console.error("Error response status:", error.response.status);
                    console.error("Error response headers:", error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    console.error("Error request:", error.request);
                } else {
                    // Something happened in setting up the request
                    console.error("Error message:", error.message);
                }
            }
        };

        fetchCustomerDetails();
    }, [customerId]);

    // Handle claim button click
    const handleClaimClick = (policy) => {
        console.log('Claim button clicked for policy:', policy);
        setSelectedPolicy(policy);
        setShowClaimModal(true);
    };


    // Add a loading state or a check to ensure `customer` is not null
    if (!customer) {
        return <div>Loading customer details...</div>;
    }

    return (
        <div>
            <h1>Customer Details</h1>
            <div>
                <p><strong>FirstName:</strong> {customer.firstName}</p>
                <p><stong>Lastname</stong>{customer.lastName}</p>
                <p><strong>Email:</strong> {customer.email}</p>
                {/* <p><strong>City:</strong> {customer.city}</p> */}
                <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>
                {/* <p><strong>Status:</strong> {customer.active ? 'Active' : 'Inactive'}</p> */}
            </div>

            <h2>Your Policies</h2>
            <table>
                <thead>
                    <tr>
                        <th>Policy ID</th>
                        <th>Insurance Scheme</th>
                        <th>Issued Date</th>
                        <th>Premium Amount</th>
                        <th>Installments</th>
                        <th>claim</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map(policy => (
                        <tr key={policy.insuranceId}>
                            <td>{policy.insuranceId}</td>
                            <td>{policy.insuranceScheme}</td>
                            <td>{policy.issuedDate}</td>
                            <td>{policy.premiumAmount}</td>
                            <td>
                                <button onClick={() => navigate(`/policies/${policy.insuranceId}/installments`, { state: { policy } })}>
                                    View Installments
                                </button>
                            </td>
                            <td>
                            <button onClick={() => handleClaimClick(policy)}>
                                    Claim
                                </button>
                                </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerDetails;
