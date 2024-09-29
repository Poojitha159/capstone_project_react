import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
//import './ForgotPassword.css'; // Ensure this file contains your styling
import '../../styles/components/ForgotPassword.css';
import { requestOtp } from '../../services/forgotPassword';
const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
     // Email validation function
     const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        // Validation: Check if the email field is empty
        if (!email) {
            setError('Email is required.');
            return;
        }

        // Validation: Check if the email format is valid
        if (!isValidEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        try {
            await requestOtp(email); // Use the function from the service
            toast.success('OTP has been sent to your email.');
            navigate('/E-Insurance/reset-password'); // Redirect to reset password page
        } catch (error) {
            setError(error.message); // Update error state with the error message
            toast.error('Failed to send OTP. Please try again.');
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="forgot-password-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="card-title text-center mb-4">Forgot Password</h3>
                <form onSubmit={handleForgotPassword}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && <small className="text-danger">{error}</small>}
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">Send OTP</button>
                    </div>
                </form>
            </div>
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
                
        </div>
    );
};

export default ForgotPassword;
