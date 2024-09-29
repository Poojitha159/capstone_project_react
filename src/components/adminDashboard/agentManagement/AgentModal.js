// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { notify } from '../../../utils/globalToast.js';
// import { adminApiClient,setAuthToken } from '../../../utils/token.js';
// export const EditAgentModal = ({ show, handleClose, agent, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         cityId: '',
//         active: true,
//         password: ''
//     });


//     useEffect(() => {
//         if (agent) {
//             setFormData({
//                 username: agent.userResponseDto.username || '',
//                 email: agent.userResponseDto.email || '',
//                 firstName: agent.firstName || '',
//                 lastName: agent.lastName || '',
//                 phoneNumber: agent.phoneNumber || '',
//                 cityId: agent.city?.cityId || '',
//                 active: agent.active,
//                 password: '' // Do not populate the password by default
//             });
//         }
//     }, [agent]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     // const handleSubmit = async (e) => {
//     //     setAuthToken()
//     //     if(!agent.agentId){
//     //         notify('Agent ID must not be null', 'danger');
//     //       }
//     //     e.preventDefault();
//     //     try {
//     //         await adminApiClient.put(`/updateAgent/${agent.agentId}`, formData);
//     //         notify('Agent updated successfully', 'success');
//     //         onUpdate(); // Call this to refresh the agent list
//     //         handleClose(); // Close the modal after successful update
//     //     } catch (error) {
//     //         notify('Error updating agent', 'danger');
//     //     }
//     // };
//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // const payload = {
//         //     firstName: formData.firstName,
//         //     lastName: formData.lastName,
//         //     email: formData.email,
//         //     username: formData.username,
//         //     password: formData.password,
//         //     phoneNumber: formData.phoneNumber,
//         //     city_id: formData.cityId,
//         //     isActive: formData.active
//         // };
    
//         try {
//             setAuthToken();
//             await adminApiClient.post('/addAgent', formData);
//             notify('Agent registered successfully', 'success');
//             // Refresh the agent list or navigate to a different page
//             onUpdate();
//             handleClose();
//         } catch (error) {
//             notify('Error registering agent', 'danger');
//         }
//     };
    
//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Edit Agent</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                             type="text"
// name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>City ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="cityId"
//                             value={formData.cityId}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Check
//                             type="checkbox"
//                             label="Active"
//                             name="active"
//                             checked={formData.active}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     {/* <Form.Group className="mb-3">
//                         <Form.Label>Password (Optional)</Form.Label>
//                         <Form.Control
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                     </Form.Group> */}
//                     <Button variant="primary" type="submit">
//                         Save Changes
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };


// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { notify } from '../../../utils/globalToast.js';
// import { adminApiClient, setAuthToken } from '../../../utils/token.js';

// export const EditAgentModal = ({ show, handleClose, agent, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         cityId: '',
//         active: true,
//         //password: '' // Keep this optional
//     });

//     useEffect(() => {
//         if (agent) {
//             setFormData({
//                 username: agent.userResponseDto.username || '',
//                 email: agent.userResponseDto.email || '',
//                 firstName: agent.firstName || '',
//                 lastName: agent.lastName || '',
//                 phoneNumber: agent.phoneNumber || '',
//                 cityId: agent.city?.cityId || '',
//                 active: agent.active,
//                 // password: '' // Optional
//             });
//         }
//     }, [agent]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setAuthToken(); // Ensure this function is setting the token correctly

//         try {
//             if (agent && agent.agentId) {
//                 // Update existing agent
//                 await adminApiClient.put(`/updateAgent/${agent.agentId}`, formData);
//                 notify('Agent updated successfully', 'success');
//             } else {
//                 // Add new agent
//                 await adminApiClient.post('/addAgent', formData);
//                 notify('Agent registered successfully', 'success');
//             }
//             onUpdate(); // Refresh the agent list or update the UI
//             handleClose(); // Close the modal
//         } catch (error) {
//             notify('Error processing request', 'danger');
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{agent ? 'Edit Agent' : 'Add Agent'}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>City ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="cityId"
//                             value={formData.cityId}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Check
//                             type="checkbox"
//                             label="Active"
//                             name="active"
//                             checked={formData.active}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     {/* Optional password field */}
//                     {/* <Form.Group className="mb-3">
//                         <Form.Label>Password (Optional)</Form.Label>
//                         <Form.Control
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                     </Form.Group> */}
//                     <Button variant="primary" type="submit">
//                         {agent ? 'Save Changes' : 'Register'}
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// after swapnil changes 
// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { notify } from '../../../utils/globalToast.js';
// import { adminApiClient, setAuthToken } from '../../../utils/token.js';

// export const EditAgentModal = ({ show, handleClose, agent, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         city_id: '', // Updated field name
//         isActive: true, // Updated field name
//         password: '' // Optional
//     });

//     useEffect(() => {
//         if (agent) {
//             setFormData({
//                 username: agent.userResponseDto.username || '',
//                 email: agent.userResponseDto.email || '',
//                 firstName: agent.firstName || '',
//                 lastName: agent.lastName || '',
//                 phoneNumber: agent.phoneNumber || '',
//                 city_id: agent.city?.cityId || '', // Updated field name
//                 isActive: agent.active, // Updated field name
//                 password: '' // Optional
//             });
//         }
//     }, [agent]);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setAuthToken(); // Ensure this function is setting the token correctly

//         try {
//             setAuthToken()
//             if (agent && agent.agentId) {
//                 // Update existing agent
//                 await adminApiClient.put(`/updateAgent/${agent.agentId}`, formData);
//                 notify('Agent updated successfully', 'success');
//             } else {
//                 // Add new agent
//                 await adminApiClient.post('/addAgent', formData);
//                 notify('Agent registered successfully', 'success');
//             }
//             onUpdate(); // Refresh the agent list or update the UI
//             handleClose(); // Close the modal
//         } catch (error) {
//             notify('Error processing request', 'danger');
//             console.error('Error response:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{agent ? 'Edit Agent' : 'Add Agent'}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>City ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="city_id" // Updated field name
//                             value={formData.city_id}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Check
//                             type="checkbox"
//                             label="Active"
//                             name="isActive" // Updated field name
//                             checked={formData.isActive}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     {/* Optional password field */}
//                     {/* <Form.Group className="mb-3">
//                         <Form.Label>Password (Optional)</Form.Label>
//                         <Form.Control
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                     </Form.Group> */}
//                     <Button variant="primary" type="submit">
//                         {agent ? 'Save Changes' : 'Register'}
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };
// after swapnil changes 

// import React, { useState, useEffect } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import { adminApiClient, setAuthToken } from '../../../utils/token.js';
// import { notify } from '../../../utils/globalToast.js';

// export const EditAgentModal = ({ show, handleClose, agent, onUpdate }) => {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         city_id: '',
//         isActive: true,
//         password: ''
//     });
//     const [cities, setCities] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         if (agent) {
//             setFormData({
//                 username: agent.userResponseDto.username || '',
//                 email: agent.userResponseDto.email || '',
//                 firstName: agent.firstName || '',
//                 lastName: agent.lastName || '',
//                 phoneNumber: agent.phoneNumber || '',
//                 city_id: agent.city?.cityId || '',
//                 isActive: agent.active,
//                 password: ''
//             });
//         }
//     }, [agent]);

//     useEffect(() => {
//         const fetchCities = async () => {
//             try {
//                 setAuthToken(); // Ensure token is set
//                 const response = await adminApiClient.get('/cities', {
//                     params: {
//                         active: true, // Fetch only active cities
//                         page: 0, // Fetch first page
//                         size: 100 // Adjust size as needed
//                     }
//                 });
//                 setCities(response.data.content);
//             } catch (error) {
//                 notify('Error fetching cities', 'danger');
//                 console.error('Error response:', error.response ? error.response.data : error.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchCities();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setAuthToken(); // Ensure token is set

//         try {
//             if (agent && agent.agentId) {
//                 // Update existing agent
//                 await adminApiClient.put(`/updateAgent/${agent.agentId}`, formData);
//                 notify('Agent updated successfully', 'success');
//             } else {
//                 // Add new agent
//                 await adminApiClient.post('/addAgent', formData);
//                 notify('Agent registered successfully', 'success');
//             }
//             onUpdate(); // Refresh the agent list or update the UI
//             handleClose(); // Close the modal
//         } catch (error) {
//             notify('Error processing request', 'danger');
//             console.error('Error response:', error.response ? error.response.data : error.message);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>{agent ? 'Edit Agent' : 'Add Agent'}</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="username"
//                             value={formData.username}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="phoneNumber"
//                             value={formData.phoneNumber}
//                             onChange={handleChange}
//                         />
//                     </Form.Group>
//                     <Form.Group className="mb-3">
//                         <Form.Label>City</Form.Label>
//                         <Form.Control
//                             as="select"
//                             name="city_id"
//                             value={formData.city_id}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Select City</option>
//                             {cities.map(city => (
//                                 <option key={city.cityId} value={city.cityId}>
//                                     {city.name}
//                                 </option>
//                             ))}
//                         </Form.Control>
//                     </Form.Group>
//                     {/* <Form.Group className="mb-3">
//                     <Form.Label>Active</Form.Label>
//                         <Form.Check
//                             type="checkbox"
//                             label="Active"
//                             name="isActive"
//                             checked={formData.isActive}
//                             onChange={handleChange}
//                         />
//                     </Form.Group> */}
//                      <Form.Group className="mb-3">
//                         <Form.Label>Active</Form.Label>
//                         <div className="form-check form-switch">
//                             <input
//                                 className="form-check-input"
//                                 type="checkbox"
//                                 name="isActive"
//                                 id="isActive"
//                                 checked={formData.isActive}
//                                 onChange={handleChange}
//                             />
//                             <label className="form-check-label" htmlFor="isActive">
//                                 {formData.isActive ? 'Active' : 'Inactive'}
//                             </label>
//                         </div>
//                     </Form.Group>
//                     {/* Optional password field */}
//                     {/* <Form.Group className="mb-3">
//                         <Form.Label>Password (Optional)</Form.Label>
//                         <Form.Control
//                             type="password"
//                             name="password"
//                             value={formData.password}
//                             onChange={handleChange}
//                         />
//                     </Form.Group> */}
//                     <Button variant="primary" type="submit">
//                         {agent ? 'Save Changes' : 'Register'}
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };


import React, { useState, useEffect } from 'react'; 
import { Modal, Button, Form } from 'react-bootstrap';
import { adminApiClient, setAuthToken } from '../../../utils/token.js';
import { notify } from '../../../utils/globalToast.js';

export const EditAgentModal = ({ show, handleClose, agent, onUpdate }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city_id: '',
        isActive: true,
        password: ''
    });
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('Agent prop:', agent); // Debugging statement
        if (agent) {
            setFormData({
                username: agent.userResponseDto.username || '',
                email: agent.userResponseDto.email || '',
                firstName: agent.firstName || '',
                lastName: agent.lastName || '',
                phoneNumber: agent.phoneNumber || '',
                city_id: agent.city?.cityId || '',
                isActive: agent.active,
                password: ''
            });
        }
    }, [agent, show]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                setAuthToken(); // Ensure token is set
                const response = await adminApiClient.get('/cities', {
                    params: {
                        active: true, // Fetch only active cities
                        page: 0, // Fetch first page
                        size: 100 // Adjust size as needed
                    }
                });
                setCities(response.data.content);
            } catch (error) {
                notify('Error fetching cities', 'danger');
                console.error('Error response:', error.response ? error.response.data : error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCities();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const validateForm = () => {
        const { username, email, phoneNumber, city_id } = formData;
        let isValid = true;

        // Clear previous errors
        document.querySelectorAll('.form-control, .form-check-input').forEach(input => {
            input.classList.remove('is-invalid');
        });

        // Check for empty fields
        if (!username || !email || !phoneNumber || !city_id) {
            isValid = false;
            document.querySelectorAll('[name]').forEach(input => {
                if (!input.value) {
                    input.classList.add('is-invalid');
                }
            });
        }

        // Validate phone number
        const phonePattern = /^\d{10}$/;
        if (!phonePattern.test(phoneNumber)) {
            isValid = false;
            document.querySelector('[name="phoneNumber"]').classList.add('is-invalid');
        }

        // Validate email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            isValid = false;
            document.querySelector('[name="email"]').classList.add('is-invalid');
        }

        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            notify('Please correct the errors in the form.', 'danger');
            return;
        }
        setAuthToken(); // Ensure token is set

        try {
            if (agent && agent.agentId) {
                // Update existing agent
                await adminApiClient.put(`/updateAgent/${agent.agentId}`, formData);
                notify('Agent updated successfully', 'success');
            } else {
                // Add new agent
                await adminApiClient.post('/addAgent', formData);
                notify('Agent registered successfully', 'success');
            }
            onUpdate(); // Refresh the agent list or update the UI
            handleClose(); // Close the modal
        } catch (error) {
            notify('Error processing request', 'danger');
            console.error('Error response:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{agent ? 'Edit Agent' : 'Add Agent'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            isInvalid={!formData.username}
                        />
                        <Form.Control.Feedback type="invalid">Username is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            isInvalid={!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)}
                        />
                        <Form.Control.Feedback type="invalid">Invalid email address</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            required
                            isInvalid={!/^\d{10}$/.test(formData.phoneNumber)}
                        />
                        <Form.Control.Feedback type="invalid">Phone number must be 10 digits</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            as="select"
                            name="city_id"
                            value={formData.city_id}
                            onChange={handleChange}
                            required
                            isInvalid={!formData.city_id}
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">City is required</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Active</Form.Label>
                        <div className="form-check form-switch">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                name="isActive"
                                id="isActive"
                                checked={formData.isActive}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="isActive">
                                {formData.isActive ? 'Active' : 'Inactive'}
                            </label>
                        </div>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        {agent ? 'Save Changes' : 'Register'}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};


