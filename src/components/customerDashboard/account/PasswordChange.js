import React, { useState } from 'react';

import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../utils/globalToast';
import { changePasswordofCustomer } from '../../../services/customerService';
import './PasswordChange.css';

const PasswordChange = () => {
    const navigate = useNavigate();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess('');

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        try {
          //  const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
            const customerId = 1; // Replace with the actual employee ID
            
            await changePasswordofCustomer(customerId, oldPassword, newPassword);
            console.log('password changed succesfully!!');
           notify('Password changed successfully','succes');
            navigate('/customer-dashboard'); // Redirect or show success message
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred';
            setError(typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage);        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };


    return (
        <div>
            <br/>
<br/>            <h3>Change Password</h3>
<br/>
<br/>
            {success && <Alert variant="success">{success}</Alert>}
            {/* {error && <Alert variant="danger">{error}</Alert>} */}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formOldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formNewPassword">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formConfirmPassword">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Change Password
                </Button>
            </Form>

            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
      </div>
        
    );
};

export default PasswordChange;
