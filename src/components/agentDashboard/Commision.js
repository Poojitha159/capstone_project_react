import React, { useState } from 'react';
import axios from 'axios';

const Commission = () => {
    // Assuming you have the agentId from session or props
    const agentId = 1;  // Replace this with actual agent ID logic
    const authToken = localStorage.getItem('authToken'); // Assuming authToken is stored in localStorage

    const [policyId, setPolicyId] = useState('');
    const [commission, setCommission] = useState(null);
    const [error, setError] = useState('');

    // Handle form input change
    const handleInputChange = (e) => {
        setPolicyId(e.target.value);
        setCommission(null);
        setError('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate the input
        if (!policyId) {
            setError("Please enter a valid policy ID.");
            return;
        }

        try {
            // Make the API request to calculate the commission
            const response = await axios.get(`http://localhost:8080/E-Insurance/agent/${agentId}/commissions`, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Include the token in the headers
                },
                params: {
                    policyId: policyId
                }
            });

            // Handle success
            setCommission(response.data);
            setError('');
        } catch (error) {
            // Handle error from the backend
            if (error.response && error.response.data) {
                setError("Error calculating commission: " + (error.response.data.message || error.response.data));
            } else {
                setError("An error occurred while calculating the commission.");
            }
        }
    };

    return (
        <div>
            <h2>Calculate Commission</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="policyId">Policy ID:</label>
                    <input
                        type="text"
                        id="policyId"
                        name="policyId"
                        value={policyId}
                        onChange={handleInputChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Calculate Commission</button>
            </form>

            {commission !== null && (
                <div className="alert alert-success mt-3">
                    <h4>Commission Calculated:</h4>
                    <p>Commission Amount: <strong>{commission}</strong></p>
                </div>
            )}

            {error && (
                <div className="alert alert-danger mt-3">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Commission;
