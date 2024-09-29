import React, { useState } from 'react';
import axios from 'axios';

const WithdrawCommission = () => {
    // Assuming you have the agentId from session, props, or state management (replace with your actual logic)
    const agentId = 1;  // Replace this with the actual agent ID logic
    const authToken = localStorage.getItem('authToken'); // Retrieve the auth token

    const [insurancePolicyId, setInsurancePolicyId] = useState('');
    const [amount, setAmount] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    // Handle input changes
    const handlePolicyIdChange = (e) => setInsurancePolicyId(e.target.value);
    const handleAmountChange = (e) => setAmount(e.target.value);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Basic validation
        if (!insurancePolicyId || !amount) {
            setError("Please fill in all fields.");
            setMessage('');
            return;
        }

        try {
            // API call to withdraw commission
            const response = await axios.post(`http://localhost:8080/E-Insurance/agent/withdraw`, 
                null, 
                {
                    params: {
                        agentId: agentId,
                        amount: amount,
                        insurancePolicyId: insurancePolicyId
                    },
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Include the token in the headers
                    }
                }
            );

            // Handle success
            setMessage(response.data);  // Withdrawal successful
            setError('');
        } catch (err) {
            // Handle error
            setError(err.response?.data?.message || 'Error occurred during withdrawal');
            setMessage('');
        }
    };

    return (
        <div>
            <h2>Withdraw Commission</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="insurancePolicyId">Insurance Policy ID:</label>
                    <input
                        type="text"
                        id="insurancePolicyId"
                        name="insurancePolicyId"
                        value={insurancePolicyId}
                        onChange={handlePolicyIdChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount to Withdraw:</label>
                    <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Withdraw</button>
            </form>

            {/* Success Message */}
            {message && (
                <div className="alert alert-success mt-3">
                    <p>{message}</p>
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="alert alert-danger mt-3">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default WithdrawCommission;
