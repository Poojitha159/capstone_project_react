import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { adminApiClient,setAuthToken } from '../../../utils/token';



const CityModal = ({ show, handleClose, addCity }) => {
    const [cityName, setCityName] = useState('');
    const [selectedStateId, setSelectedStateId] = useState('');
    const [states, setStates] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStates = async () => {
            setAuthToken()
            try {
               
                const response = await adminApiClient.get('/viewAllstates');
                setStates(response.data.content);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchStates();
    }, []);

    const handleAddCity = async () => {
        setAuthToken()
        setError(null); // Reset the error state before validation

        // Validation
        if (!cityName.trim()) {
            setError('City name is required.');
            return;
        }
        if (!selectedStateId) {
            setError('Please select a state.');
            return;
        }
        try {
            if (!cityName || !selectedStateId) {
                setError('Please provide city name and select a state.');
                return;
            }
            const cityRequest = { name: cityName, state_id: selectedStateId };
            await adminApiClient.post('/create-city', cityRequest);
            addCity({ ...cityRequest, cityId: Date.now(), isActive: true });
            handleClose();
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add City</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* {error && <p className="error">{error}</p>} */}
                {error && <p className="error text-danger">{error}</p>} {/* Display error message */}
                <Form>
                    <Form.Group controlId="formCityName">
                        <Form.Label>City Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter city name"
                            value={cityName}
                            onChange={(e) => setCityName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formState">
                        <Form.Label>Select State</Form.Label>
                        <Form.Control
                            as="select"
                            value={selectedStateId}
                            onChange={(e) => setSelectedStateId(e.target.value)}
                        >
                            <option value="">Select State</option>
                            {states.map(state => (
                                <option key={state.stateId} value={state.stateId}>{state.name}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleAddCity}>Add City</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CityModal;
