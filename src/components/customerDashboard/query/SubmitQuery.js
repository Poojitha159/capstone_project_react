import React, { useState } from 'react';
import axios from 'axios';

const SubmitQuery = ({ customerId }) => {
    const [message, setMessage] = useState('');
    const [agentId, setAgentId] = useState(''); // State for agentId
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const CustomerId = localStorage.getItem("customerId");

    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        try {
            const contactFormRequest = {
                customerId: CustomerId,
                agentId: agentId, // Set from input field
                message: message,
            };

            console.log(CustomerId);
            
            await axios.post(`http://localhost:8080/E-Insurance/customer/contact`, contactFormRequest, {
                headers: {
                    Authorization: `Bearer ${getAuthToken()}`, // Include the auth token
                },
            });


            setSuccess('Query submitted successfully!');
            setMessage('');
            setAgentId(''); // Clear agentId input after successful submission
        } catch (err) {
            console.error('Error submitting query:', err);
            setError('Failed to submit query. Please try again.');
        }
    };

    return (
        <div>
            <h2>Submit Your Query</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="agentId">Agent ID:</label>
                    <input
                        type="number"
                        id="agentId"
                        value={agentId}
                        onChange={(e) => setAgentId(e.target.value)} // Update state on change
                        required
                    />
                </div>
                <div>
                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit Query</button>
            </form>
        </div>
    );
};

export default SubmitQuery;