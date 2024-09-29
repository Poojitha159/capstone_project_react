import React, { useState } from 'react';
import axios from 'axios';

const ChangePassword = () => {
    const [form, setForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Assuming you have the agentId stored in the session/context
    const agentId = 1; // Replace with actual agent ID logic
    const authToken = localStorage.getItem('authToken'); // Assuming authToken is stored

    // Handle form input changes
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Client-side validation: Check if new password and confirm new password match
        if (form.newPassword !== form.confirmNewPassword) {
            setError("New password and confirm password do not match.");
            return;
        }

        try {
            // Prepare the data for the request
            const changePasswordDto = {
                oldPassword: form.oldPassword,
                newPassword: form.newPassword
            };

            // Debug: Log the request payload and URL
            console.log("Sending request to:", `http://localhost:8080/E-Insurance/agent/${agentId}/change-password`);
            console.log("Payload:", changePasswordDto);

            // Make the API request to change the password
            const response = await axios.put(
                `http://localhost:8080/E-Insurance/agent/${agentId}/change-password`,
                changePasswordDto,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}` // Include auth token
                    }
                }
            );

            // Handle success
            setSuccess(response.data.message || "Password changed successfully");
            setForm({
                oldPassword: '',
                newPassword: '',
                confirmNewPassword: ''
            });
        } catch (error) {
            // Handle error from the backend
            if (error.response && error.response.data) {
                setError(error.response.data.message || "Error changing password");
            } else {
                setError("An error occurred while changing the password.");
            }
        }
    };

    return (
        <div>
            <h2>Change Password</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            {success && <div className="alert alert-success">{success}</div>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Old Password:</label>
                    <input 
                        type="password" 
                        name="oldPassword" 
                        value={form.oldPassword} 
                        onChange={handleChange} 
                        className="form-control" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>New Password:</label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        value={form.newPassword} 
                        onChange={handleChange} 
                        className="form-control" 
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Confirm New Password:</label>
                    <input 
                        type="password" 
                        name="confirmNewPassword" 
                        value={form.confirmNewPassword} 
                        onChange={handleChange} 
                        className="form-control" 
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
