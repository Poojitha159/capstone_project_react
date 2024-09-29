import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { adminApiClient, setAuthToken } from '../../../utils/token';

export const EmployeeModal = ({ show, handleClose, employee, onUpdate }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        isActive: true
    });
    const [error, setError] = useState(null);

    useEffect(() => {
        if (employee) {
            setFormData({
                username: employee.username,
                email: employee.email,
                firstName: employee.firstName,
                lastName: employee.lastName,
                isActive: employee.active
            });
        }
    }, [employee]);

    const handleFormChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleFormSubmit = async (e) => {
        setAuthToken();
        e.preventDefault();

        // Validation
        if (!formData.username || !formData.email || !formData.firstName || !formData.lastName) {
            setError('All fields are required.');
            return;
        }

        if (!isEmailValid(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            await adminApiClient.put(`/updateEmployee/${employee.employeeId}`, formData);
            onUpdate(); // Notify parent to refresh data
            handleClose();
            setError(null); 
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="error text-danger">{error}</p>}
                <Form onSubmit={handleFormSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                <Form.Check
                    type="switch" // Use 'switch' to create a toggle
                    id="custom-switch"
                    label="Active"
                    checked={formData.isActive}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                />
            </Form.Group>
                    <Button variant="primary" type="submit">
                        Save Changes
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export const AddEmployeeModal = ({ show, handleClose, onAdd }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        active: true
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const isEmailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        setAuthToken();
        e.preventDefault();

        // Validation
        if (!formData.firstName || !formData.lastName || !formData.username || !formData.email || !formData.password) {
            setError('All fields are required.');
            return;
        }

        if (!isEmailValid(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }

        try {
            await adminApiClient.post('/addEmployee', formData);
            onAdd(); // Notify the parent component to refresh the employee list
            handleClose(); 
            setError(null); 
            setFormData({ firstName: '', lastName: '', username: '', email: '', password: '', active: true });
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="error text-danger">{error}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                <Form.Check
                    type="switch" // Use 'switch' to create a toggle
                    id="custom-switch"
                    label="Active"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, isActive: e.target.checked }))}
                />
            </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Employee
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};
