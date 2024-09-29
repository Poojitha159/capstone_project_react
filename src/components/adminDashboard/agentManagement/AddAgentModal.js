import React, { useState,useEffect } from 'react'; 
import { Modal, Button, Form,Spinner } from 'react-bootstrap'; 
import { addAgent } from '../../../services/agentService.js';
import { notify } from '../../../utils/globalToast.js'; 
 import { adminApiClient } from '../../../utils/token.js';
const AddAgentModal = ({ show, handleClose, onAdd }) => { 
    const [firstName, setFirstName] = useState(''); 
    const [lastName, setLastName] = useState(''); 
    const [email, setEmail] = useState(''); 
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const [username, setUsername] = useState(''); 
    const [password, setPassword] = useState(''); 
    const [cityId, setCityId] = useState(''); 
    const [cities, setCities] = useState([]); 
    const [loadingCities, setLoadingCities] = useState(true);


    // Fetch cities when modal opens
    useEffect(() => {
        if (show) {
            fetchCities();
        }
    }, [show]);

    // Function to fetch active cities from the backend
    const fetchCities = async () => {
        try {
            const response = await adminApiClient.get('/cities', { params: { page: 0, size: 50, sortBy: 'id', direction: 'asc' } });
            const cityData = response.data.content.filter(city => city.isActive); // Filter only active cities
            setCities(cityData);
            setLoadingCities(false);
        } catch (error) {
            notify(`Error fetching cities: ${error.message}`, 'danger');
            setLoadingCities(false);
        }
    };

 
    const handleSubmit = async (e) => { 
        e.preventDefault(); 
        const agentData = { 
            firstName, 
            lastName, 
            email, 
            phoneNumber, 
            username, 
            password, 
            isActive: true, // Default value 
            city_id: cityId ? parseInt(cityId) : null // Convert to number if necessary 
        }; 
 
        try { 
            await addAgent(agentData); 
            notify('Agent added successfully!', 'success'); 
            onAdd(); // Refresh the agents list 
            handleClose(); // Close the modal 
        } catch (error) { 
            notify(`Error adding agent: ${error.message}`, 'danger'); 
        } 
    }; 
 
    return ( 
        <Modal show={show} onHide={handleClose}> 
            <Modal.Header closeButton> 
                <Modal.Title>Add Agent</Modal.Title> 
            </Modal.Header> 
            <Modal.Body> 
                <Form onSubmit={handleSubmit}> 
                    <Form.Group controlId="formFirstName"> 
                        <Form.Label>First Name</Form.Label> 
                        <Form.Control 
                            type="text" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            required 
                        /> 
                    </Form.Group> 
                    <Form.Group controlId="formLastName"> 
                        <Form.Label>Last Name</Form.Label> 
                        <Form.Control 
                            type="text" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            required 
                        /> 
                    </Form.Group> 
                    <Form.Group controlId="formEmail"> 
                        <Form.Label>Email</Form.Label> 
                        <Form.Control 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                        /> 
                    </Form.Group> 
                    <Form.Group controlId="formPhoneNumber"> 
                        <Form.Label>Phone Number</Form.Label> 
                        <Form.Control 
                            type="text" 
                            value={phoneNumber} 
                            onChange={(e) => setPhoneNumber(e.target.value)} 
                            required 
                        /> 
                    </Form.Group> 
                    <Form.Group controlId="formUsername"> 
                        <Form.Label>Username</Form.Label> 
                        <Form.Control 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        /> 
                    </Form.Group> 
                    <Form.Group controlId="formPassword"> 
                        <Form.Label>Password</Form.Label> 
                        <Form.Control 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
required 
                        /> 
                    </Form.Group> 
                    <Form.Group controlId="formCityId"> 
                        <Form.Label>City</Form.Label> 
                        {loadingCities ? (
                            <Spinner animation="border" />
                        ) : (
                            <Form.Control 
                                as="select" 
                                value={cityId} 
                                onChange={(e) => setCityId(e.target.value)} 
                                required 
                            > 
                                <option value="">Select City</option> 
                                {cities.map(city => (
                                    <option key={city.cityId} value={city.cityId}>
                                        {city.name}
                                    </option>
                                ))} 
                            </Form.Control>
                        )}
                    </Form.Group> 
                    <Button variant="primary" type="submit"> 
                        Add Agent 
                    </Button> 
                </Form> 
            </Modal.Body> 
        </Modal> 
    ); 
}; 
 
export default AddAgentModal;