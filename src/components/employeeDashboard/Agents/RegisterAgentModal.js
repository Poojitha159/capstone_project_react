// import React, { useState , useEffect } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';
// // import { employeeApiClient, setAuthToken } from '../../../utils/token';
// import { employeeApiClient,setAuthToken } from '../../../utils/token';
// import { adminApiClient } from '../../../utils/token';
// const RegisterAgentModal = ({ show, handleClose, refreshAgents }) => {
//     const [states, setStates] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [agentData, setAgentData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         city_id: '',
//         // stateId: '', 
//         active: true
//     });
//     const [error, setError] = useState(null);

//     // useEffect(() => {
//     //     setAuthToken()
//     //     const fetchStates = async () => {
//     //         try {
               
//     //             const response = await adminApiClient.get('/viewAllstates');
//     //             setStates(response.data.content);  // Adjust according to your API response structure
//     //         }  catch (error) {
//     //             setError(error);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };

//     //     fetchStates();
//     // }, []);
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setAgentData({ ...agentData, [name]: value });
//     };

//     const handleRegisterAgent = async (e) => {
//         e.preventDefault();
//         try {
//             setAuthToken();
//             await employeeApiClient.post('/registerAgent', agentData);
//             handleClose(); // Close the modal
//             await refreshAgents(); // Refresh the agent list
//         } catch (err) {
//             setError(err);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Register New Agent</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleRegisterAgent}>
//                     <Form.Group className="mb-3" controlId="formUsername">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter username"
//                             name="username"
//                             value={agentData.username}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter email"
//                             name="email"
//                             value={agentData.email}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Enter password"
//                             name="password"
//                             value={agentData.password}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formFirstName">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter first name"
//                             name="firstName"
//                             value={agentData.firstName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formLastName">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter last name"
//                             name="lastName"
//                             value={agentData.lastName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formPhoneNumber">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter phone number"
//                             name="phoneNumber"
//                             value={agentData.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formCity">
//                         <Form.Label>City ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter city ID"
//                             name="city_id"
//                             value={agentData.city_id}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     {/* <Form.Group className="mb-3" controlId="formState">
//                         <Form.Label>State</Form.Label>
//                         <Form.Control
//                             as="select"
//                             name="stateId"
//                             value={agentData.stateId}
//                             onChange={handleInputChange}
//                             required
//                         >
//                             <option value="">Select State</option>
//                             {states.map(state => (
//                                 <option key={state.id} value={state.id}>
//                                     {state.name}
//                                 </option>
//                             ))}
//                         </Form.Control>
//                     </Form.Group> */}
//                     <Form.Group className="mb-3" controlId="formActive">
//                         <Form.Check
//                             type="checkbox"
//                             label="Active"
//                             name="active"
//                             checked={agentData.active}
//                             onChange={(e) => setAgentData({ ...agentData, active: e.target.checked })}
//                         />
//                     </Form.Group>

//                     {error && <p className="text-danger">{error.message}</p>}

//                     <Button variant="primary" type="submit">
//                         Register Agent
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default RegisterAgentModal;


// import React, { useState, useEffect } from 'react';
// import { Modal, Form, Button } from 'react-bootstrap';
// import { employeeApiClient, setAuthToken } from '../../../utils/token';
// import { adminApiClient,allApiClient } from '../../../utils/token';

// const RegisterAgentModal = ({ show, handleClose, refreshAgents }) => {
//     const [states, setStates] = useState([]);
//     const [cities, setCities] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [agentData, setAgentData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         phoneNumber: '',
//         city_id: '',
//         active: true
//     });
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         setAuthToken();
//         const fetchCities = async () => {
//             try {
//                 let allCities = [];
//                 let page = 0;
//                 let size = 50; // Adjust size as needed
//                 let totalPages = 1;

//                 while (page < totalPages) {
//                     const response = await allApiClient.get('/cities', {
//                         params: { page, size }
//                     });
                    
//                     // Update the total pages and current page cities
//                     totalPages = response.data.totalPages;
//                     const activeCities = response.data.content.filter(city => city.isActive);
//                     allCities = [...allCities, ...activeCities];
                    
//                     page++;
//                 }

//                 setCities(allCities);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchCities();
//     }, []);

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setAgentData({ ...agentData, [name]: value });
//     };

//     const handleRegisterAgent = async (e) => {
//         e.preventDefault();
//         try {
//             setAuthToken();
//             await employeeApiClient.post('/registerAgent', agentData);
//             handleClose(); // Close the modal
//             await refreshAgents(); // Refresh the agent list
//         } catch (err) {
//             setError(err);
//         }
//     };

//     return (
//         <Modal show={show} onHide={handleClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Register New Agent</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleRegisterAgent}>
//                     <Form.Group className="mb-3" controlId="formUsername">
//                         <Form.Label>Username</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter username"
//                             name="username"
//                             value={agentData.username}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formEmail">
//                         <Form.Label>Email</Form.Label>
//                         <Form.Control
//                             type="email"
//                             placeholder="Enter email"
//                             name="email"
//                             value={agentData.email}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formPassword">
//                         <Form.Label>Password</Form.Label>
//                         <Form.Control
//                             type="password"
//                             placeholder="Enter password"
//                             name="password"
//                             value={agentData.password}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formFirstName">
//                         <Form.Label>First Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter first name"
//                             name="firstName"
//                             value={agentData.firstName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formLastName">
//                         <Form.Label>Last Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter last name"
//                             name="lastName"
//                             value={agentData.lastName}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formPhoneNumber">
//                         <Form.Label>Phone Number</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter phone number"
//                             name="phoneNumber"
//                             value={agentData.phoneNumber}
//                             onChange={handleInputChange}
//                             required
//                         />
//                     </Form.Group>

//                     <Form.Group className="mb-3" controlId="formCity">
//                         <Form.Label>City</Form.Label>
//                         <Form.Control
//                             as="select"
//                             name="city_id"
//                             value={agentData.city_id}
//                             onChange={handleInputChange}
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

//                     <Form.Group className="mb-3" controlId="formActive">
//                         <Form.Check
//                             type="checkbox"
//                             label="Active"
//                             name="active"
//                             checked={agentData.active}
//                             onChange={(e) => setAgentData({ ...agentData, active: e.target.checked })}
//                         />
//                     </Form.Group>

//                     {error && <p className="text-danger">{error.message}</p>}

//                     <Button variant="primary" type="submit">
//                         Register Agent
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default RegisterAgentModal;


import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { employeeApiClient, setAuthToken } from '../../../utils/token';
import { adminApiClient, allApiClient } from '../../../utils/token';

const RegisterAgentModal = ({ show, handleClose, refreshAgents }) => {
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [agentData, setAgentData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        city_id: '',
        active: true
    });
    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setAuthToken();
        const fetchCities = async () => {
            try {
                let allCities = [];
                let page = 0;
                let size = 50; // Adjust size as needed
                let totalPages = 1;

                while (page < totalPages) {
                    const response = await allApiClient.get('/cities', {
                        params: { page, size }
                    });
                    
                    // Update the total pages and current page cities
                    totalPages = response.data.totalPages;
                    const activeCities = response.data.content.filter(city => city.isActive);
                    allCities = [...allCities, ...activeCities];
                    
                    page++;
                }

                setCities(allCities);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgentData({ ...agentData, [name]: value });
    };

    const validateFields = () => {
        const newErrors = {};

        if (!agentData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!agentData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(agentData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!agentData.password.trim()) {
            newErrors.password = 'Password is required';
        } else if (agentData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        if (!agentData.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }

        if (!agentData.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }

        if (!agentData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone Number is required';
        } else if (!/^\d{10}$/.test(agentData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone Number must be 10 digits';
        }

        if (!agentData.city_id) {
            newErrors.city_id = 'Please select a city';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleRegisterAgent = async (e) => {
        e.preventDefault();
        if (!validateFields()) {
            return; // Stop if validation fails
        }
        try {
            setAuthToken();
            await employeeApiClient.post('/registerAgent', agentData);
            handleClose(); // Close the modal
            await refreshAgents(); // Refresh the agent list
        } catch (err) {
            setError(err);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Register New Agent</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleRegisterAgent}>
                    <Form.Group className="mb-3" controlId="formUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter username"
                            name="username"
                            value={agentData.username}
                            onChange={handleInputChange}
                            isInvalid={!!errors.username}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.username}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={agentData.email}
                            onChange={handleInputChange}
                            isInvalid={!!errors.email}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.email}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            name="password"
                            value={agentData.password}
                            onChange={handleInputChange}
                            isInvalid={!!errors.password}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.password}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formFirstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter first name"
                            name="firstName"
                            value={agentData.firstName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.firstName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.firstName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formLastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter last name"
                            name="lastName"
                            value={agentData.lastName}
                            onChange={handleInputChange}
                            isInvalid={!!errors.lastName}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.lastName}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formPhoneNumber">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter phone number"
                            name="phoneNumber"
                            value={agentData.phoneNumber}
                            onChange={handleInputChange}
                            isInvalid={!!errors.phoneNumber}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.phoneNumber}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formCity">
                        <Form.Label>City</Form.Label>
                        <Form.Control
                            as="select"
                            name="city_id"
                            value={agentData.city_id}
                            onChange={handleInputChange}
                            isInvalid={!!errors.city_id}
                            required
                        >
                            <option value="">Select City</option>
                            {cities.map(city => (
                                <option key={city.cityId} value={city.cityId}>
                                    {city.name}
                                </option>
                            ))}
                        </Form.Control>
                        <Form.Control.Feedback type="invalid">
                            {errors.city_id}
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formActive">
                    <Form.Label>Active</Form.Label>
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            name="active"
                            checked={agentData.active}
                            onChange={(e) => setAgentData({ ...agentData, active: e.target.checked })}
                        />
                    </Form.Group>

                    {error && <p className="text-danger">{error.message}</p>}

                    <Button variant="primary" type="submit">
                        Register Agent
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default RegisterAgentModal;
