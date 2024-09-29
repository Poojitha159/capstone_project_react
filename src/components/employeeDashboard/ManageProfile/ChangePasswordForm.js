
import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { notify } from '../../../utils/globalToast';
import { changePassword } from '../../../services/employeeService';

const ChangePasswordForm = () => {
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

        // Validation checks
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError('All fields are required.');
            return;
        }

        if (oldPassword === newPassword) {
            setError('New password must be different from the old password.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const employeeId = 1; // Replace with the actual employee ID
            await changePassword(employeeId, oldPassword, newPassword);
            notify('Password changed successfully', 'success');
            setSuccess('Password changed successfully');
            navigate('/employee-dashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred';
            setError(typeof errorMessage === 'object' ? JSON.stringify(errorMessage) : errorMessage);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div style={{ maxWidth: '400px', width: '100%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#fff' }}>
                <h3 className="text-center">Change Password</h3>
                <br/>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formOldPassword">
                    <Form.Label>Old Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter old password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        required
                        isInvalid={!!error && !oldPassword}
                    />
                    <Form.Control.Feedback type="invalid">
                        Old password is required.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formNewPassword" className="mt-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        isInvalid={!!error && (!newPassword || oldPassword === newPassword)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {oldPassword === newPassword
                            ? 'New password must be different from the old password.'
                            : 'New password is required.'}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formConfirmPassword" className="mt-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        isInvalid={!!error && (!confirmPassword || newPassword !== confirmPassword)}
                    />
                    <Form.Control.Feedback type="invalid">
                        {newPassword !== confirmPassword
                            ? 'New passwords do not match.'
                            : 'Confirm new password is required.'}
                    </Form.Control.Feedback>
                </Form.Group>
                <br/>

                <Button variant="primary" type="submit" className="mt-3">
                    Change Password
                </Button>

                <br/><br/><br/>
            </Form>

            
        </div>
        </div>
    );
};

export default ChangePasswordForm;
