import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateAgent, fetchAgentById } from '../../../services/employeeService';

const EditAgentModal = ({ agentId, show, handleClose, refreshAgents }) => {
    const [agentDetails, setAgentDetails] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        active: true,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (show && agentId) {
            // Fetch agent details to pre-fill the form
            const fetchAgentDetails = async () => {
                try {
                    const data = await fetchAgentById(agentId);
                    setAgentDetails({
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phoneNumber: data.phoneNumber,
                        active: data.active,
                    });
                    setLoading(false);
                } catch (err) {
                    setError("Error fetching agent details");
                    setLoading(false);
                }
            };

            fetchAgentDetails();
        }
    }, [show, agentId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgentDetails({ ...agentDetails, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            console.log('00000000000000000000');
            console.log(agentId);
            await updateAgent(agentId, agentDetails); // API call to update agent
            refreshAgents(); // Refresh the agent list after update
            handleClose(); // Close modal
        } catch (err) {
            setError("Error updating agent");
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Agent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? <p>Loading...</p> : (
                    <Form>
                        {error && <p className="text-danger">{error}</p>}
                        <Form.Group controlId="formFirstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="firstName"
                                value={agentDetails.firstName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="lastName"
                                value={agentDetails.lastName}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        {/* <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={agentDetails.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group> */}
                        <Form.Group controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                name="phoneNumber"
                                value={agentDetails.phoneNumber}
                                onChange={handleInputChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="formStatus">
                            <Form.Check
                                type="checkbox"
                                label="Active"
                                name="active"
                                checked={agentDetails.active}
                                onChange={(e) => setAgentDetails({ ...agentDetails, active: e.target.checked })}
                            />
                        </Form.Group>
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSubmit}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditAgentModal;
