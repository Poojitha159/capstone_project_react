// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Button, Form, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';

// const EditProfileForm = () => {
//     const navigate = useNavigate();
//     const [employee, setEmployee] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         username: '',
//         active:''
//         // Add other fields if necessary
//     });
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         // Fetch current employee details from API
//         const fetchEmployeeDetails = async () => {
//             try {
//                 const token = localStorage.getItem('authToken');
//                 const response = await axios.get(`http://localhost:8080/employee/1`, { // Adjust URL and employee ID
//                     headers: { 'Authorization': `Bearer ${token}` }
//                 });
//                 setEmployee(response.data);
//             } catch (err) {
//                 setError('Failed to fetch employee details');
//             }
//         };

//         fetchEmployeeDetails();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setEmployee((prevState) => ({
//             ...prevState,
//             [name]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess('');

//         try {
//             const token = localStorage.getItem('authToken');
//             await axios.put(`http://localhost:8080/E-Insurance/employee/1/profile`, employee, { // Adjust URL and employee ID
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             setSuccess('Profile updated successfully');
//             navigate('/profile'); // Redirect to profile page or another route
//         } catch (err) {
//             setError(err.response?.data || 'An error occurred');
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h3>Edit Profile</h3>
//             {success && <Alert variant="success">{success}</Alert>}
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formFirstName">
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="firstName"
//                         value={employee.firstName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formLastName">
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="lastName"
//                         value={employee.lastName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                         type="email"
//                         name="email"
//                         value={employee.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail">
//                     <Form.Label>username</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="username"
//                         value={employee.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formStatus">
//             <Form.Label>Status</Form.Label>
//             <div>
//                 <Form.Check
//                     type="radio"
//                     id="active"
//                     name="active"
//                     label="Active"
//                     value="active"
//                     checked={employee.active === 'active'}
//                     onChange={handleChange}
//                 />
//                 <Form.Check
//                     type="radio"
//                     id="inactive"
//                     name="active"
//                     label="Inactive"
//                     value="inactive"
//                     checked={employee.active === 'inactive'}
//                     onChange={handleChange}
//                 />
//             </div>
//         </Form.Group>

//                 {/* Add other fields if necessary */}

//                 <Button variant="primary" type="submit" className="mt-3">
//                     Save Changes
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default EditProfileForm;
//=====================================
// import React, { useState, useEffect } from 'react';

// import { Button, Form, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { fetchEmployeeDetails, updateEmployeeProfile } from '../../../services/employeeService';

// const EditProfileForm = () => {
//     const navigate = useNavigate();
//     const [employee, setEmployee] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         username: '',
//         active: ''
//     });
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         // Fetch current employee details from API
//         const fetchEmployee = async () => {
//             try {
//                 const data = await fetchEmployeeDetails(1); // Adjust employee ID as needed
//                 setEmployee(data);
//             } catch (err) {
//                 setError('Failed to fetch employee details');
//             }
//         };

//         fetchEmployee();
//     }, []);

//     // const handleChange = (e) => {
//     //     const { name, value } = e.target;
//     //     setEmployee((prevState) => ({
//     //         ...prevState,
//     //         [name]: value
//     //     }));
//     // };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         // Handle radio button specifically
//         if (type === 'radio') {
//             setEmployee((prevState) => ({
//                 ...prevState,
//                 [name]: value === 'active' // Convert 'active' to true, 'inactive' to false
//             }));
//         } else {
//             setEmployee((prevState) => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }
//     };


//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess('');

//         try {
//             await updateEmployeeProfile(1, employee); // Adjust employee ID as needed
//             setSuccess('Profile updated successfully');
//             navigate('/employee-dashboard');
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || 'An error occurred';
//             setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
//         }
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };



//     return (
//         <div className="container mt-4">
//             <h3>Edit Profile</h3>
//             {success && <Alert variant="success">{success}</Alert>}
//             {error && <Alert variant="danger">
//                 {error.message || 'An unknown error occurred'}
//             </Alert>}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formFirstName">
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="firstName"
//                         value={employee.firstName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formLastName">
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="lastName"
//                         value={employee.lastName}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formEmail">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                         type="email"
//                         name="email"
//                         value={employee.email}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formUsername">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="username"
//                         value={employee.username}
//                         onChange={handleChange}
//                         required
//                     />
//                 </Form.Group>

//                 <Form.Group controlId="formStatus">
//                     <Form.Label>Status</Form.Label>
//                     <div>
//                         <Form.Check
//                             type="radio"
//                             id="active"
//                             name="active"
//                             label="Active"
//                             value="active"
//                             checked={employee.active === true} // Boolean comparison
//                             onChange={handleChange}
//                         />
//                         <Form.Check
//                             type="radio"
//                             id="inactive"
//                             name="active"
//                             label="Inactive"
//                             value="inactive"
//                             checked={employee.active === false} // Boolean comparison
//                             onChange={handleChange}
//                         />
//                     </div>
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="mt-3">
//                     Save Changes
//                 </Button>
//             </Form>

//             <div><Button onClick={handleGoBack} className="go-back-button">
//                 Go Back!
//             </Button></div>
//         </div>
//     );
// };

// export default EditProfileForm;
//=========================
//8888888888888888888888
// import React, { useState, useEffect } from 'react';
// import { Button, Form, Alert } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import { fetchEmployeeDetails, updateEmployeeProfile } from '../../../services/employeeService';

// const EditProfileForm = () => {
//     const navigate = useNavigate();
//     const [employee, setEmployee] = useState({
//         firstName: '',
//         lastName: '',
//         email: '',
//         username: '',
//         active: ''
//     });
//     const [errors, setErrors] = useState({});
//     const [error, setError] = useState(null);
//     const [success, setSuccess] = useState('');

//     useEffect(() => {
//         const fetchEmployee = async () => {
//             try {
//                 const data = await fetchEmployeeDetails(1); // Adjust employee ID as needed
//                 setEmployee(data);
//             } catch (err) {
//                 setError('Failed to fetch employee details');
//             }
//         };
//         fetchEmployee();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;

//         // Handle radio button specifically
//         if (type === 'radio') {
//             setEmployee((prevState) => ({
//                 ...prevState,
//                 [name]: value === 'active' // Convert 'active' to true, 'inactive' to false
//             }));
//         } else {
//             setEmployee((prevState) => ({
//                 ...prevState,
//                 [name]: value
//             }));
//         }
//     };

//     const validateFields = () => {
//         const newErrors = {};

//         // First Name validation
//         if (!employee.firstName.trim()) {
//             newErrors.firstName = 'First Name is required';
//         }

//         // Last Name validation
//         if (!employee.lastName.trim()) {
//             newErrors.lastName = 'Last Name is required';
//         }

//         // Email validation
//         if (!employee.email.trim()) {
//             newErrors.email = 'Email is required';
//         } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)) {
//             newErrors.email = 'Invalid email address';
//         }

//         // Username validation
//         if (!employee.username.trim()) {
//             newErrors.username = 'Username is required';
//         }

//         // Status validation
//         if (employee.active === '') {
//             newErrors.active = 'Please select a status';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0; // Return true if no errors
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setError(null);
//         setSuccess('');

//         if (!validateFields()) {
//             return; // Stop submission if validation fails
//         }

//         try {
//             await updateEmployeeProfile(1, employee); // Adjust employee ID as needed
//             setSuccess('Profile updated successfully');
//             navigate('/employee-dashboard');
//         } catch (err) {
//             const errorMessage = err.response?.data?.message || 'An error occurred';
//             setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
//         }
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     return (
//         <div className="container mt-4">
//             <h3>Edit Profile</h3>
//             {success && <Alert variant="success">{success}</Alert>}
//             {/* {error && <Alert variant="danger">
//                 {error.message || 'An unknown error occurred'}
//             </Alert>} */}
//             <Form onSubmit={handleSubmit}>
//                 <Form.Group controlId="formFirstName">
//                     <Form.Label>First Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="firstName"
//                         value={employee.firstName}
//                         onChange={handleChange}
//                         isInvalid={!!errors.firstName}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {errors.firstName}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="formLastName">
//                     <Form.Label>Last Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="lastName"
//                         value={employee.lastName}
//                         onChange={handleChange}
//                         isInvalid={!!errors.lastName}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {errors.lastName}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="formEmail">
//                     <Form.Label>Email</Form.Label>
//                     <Form.Control
//                         type="email"
//                         name="email"
//                         value={employee.email}
//                         onChange={handleChange}
//                         isInvalid={!!errors.email}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {errors.email}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="formUsername">
//                     <Form.Label>Username</Form.Label>
//                     <Form.Control
//                         type="text"
//                         name="username"
//                         value={employee.username}
//                         onChange={handleChange}
//                         isInvalid={!!errors.username}
//                     />
//                     <Form.Control.Feedback type="invalid">
//                         {errors.username}
//                     </Form.Control.Feedback>
//                 </Form.Group>

//                 <Form.Group controlId="formStatus">
//                     <Form.Label>Status</Form.Label>
//                     <div>
//                         <Form.Check
//                             type="radio"
//                             id="active"
//                             name="active"
//                             label="Active"
//                             value="active"
//                             checked={employee.active === true} // Boolean comparison
//                             onChange={handleChange}
//                             isInvalid={!!errors.active}
//                         />
//                         <Form.Check
//                             type="radio"
//                             id="inactive"
//                             name="active"
//                             label="Inactive"
//                             value="inactive"
//                             checked={employee.active === false} // Boolean comparison
//                             onChange={handleChange}
//                             isInvalid={!!errors.active}
//                         />
//                     </div>
//                     {errors.active && (
//                         <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
//                             {errors.active}
//                         </Form.Control.Feedback>
//                     )}
//                 </Form.Group>

//                 <Button variant="primary" type="submit" className="mt-3">
//                     Save Changes
//                 </Button>
//             </Form>

//             <div>
//                 <Button onClick={handleGoBack} className="go-back-button mt-3">
//                     Go Back!
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default EditProfileForm;
//88888888888888888888888

import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchEmployeeDetails, updateEmployeeProfile } from '../../../services/employeeService';

const EditProfileForm = () => {
    const navigate = useNavigate();
    
    const [employee, setEmployee] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        active: true // Initial state for 'active' should be true or false
    });

    const [errors, setErrors] = useState({});
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const data = await fetchEmployeeDetails(1); // Adjust employee ID as needed
                setEmployee(data); // Prefill the form with fetched data
            } catch (err) {
                setError('Failed to fetch employee details');
            }
        };
        fetchEmployee();
    }, []);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        if (type === 'radio') {
            setEmployee((prevState) => ({
                ...prevState,
                [name]: value === 'active' // Set true for 'active' and false for 'inactive'
            }));
        } else {
            setEmployee((prevState) => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const validateFields = () => {
        const newErrors = {};

        // First Name validation
        if (!employee.firstName.trim()) {
            newErrors.firstName = 'First Name is required';
        }

        // Last Name validation
        if (!employee.lastName.trim()) {
            newErrors.lastName = 'Last Name is required';
        }

        // Email validation
        if (!employee.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(employee.email)) {
            newErrors.email = 'Invalid email address';
        }

        // Username validation
        if (!employee.username.trim()) {
            newErrors.username = 'Username is required';
        }

        // Status validation
        if (employee.active === '') {
            newErrors.active = 'Please select a status';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Return true if no errors
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess('');

        if (!validateFields()) {
            return; // Stop submission if validation fails
        }

        try {
            await updateEmployeeProfile(1, employee); // Adjust employee ID as needed
            setSuccess('Profile updated successfully');
            navigate('/employeedashboard');
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'An error occurred';
            setError(typeof errorMessage === 'string' ? errorMessage : JSON.stringify(errorMessage));
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="container mt-4">
            <h3>Edit Profile</h3>
            {success && <Alert variant="success">{success}</Alert>}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstName"
                        value={employee.firstName} // Pre-fill with employee's first name
                        onChange={handleChange}
                        isInvalid={!!errors.firstName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.firstName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastName"
                        value={employee.lastName} // Pre-fill with employee's last name
                        onChange={handleChange}
                        isInvalid={!!errors.lastName}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.lastName}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={employee.email} // Pre-fill with employee's email
                        onChange={handleChange}
                        isInvalid={!!errors.email}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.email}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type="text"
                        name="username"
                        value={employee.username} // Pre-fill with employee's username
                        onChange={handleChange}
                        isInvalid={!!errors.username}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.username}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="formStatus">
                    <Form.Label>Status</Form.Label>
                    <div>
                        <Form.Check
                            type="radio"
                            id="active"
                            name="active"
                            label="Active"
                            value="active"
                            checked={employee.active === true} // Pre-fill radio button
                            onChange={handleChange}
                            isInvalid={!!errors.active}
                        />
                        <Form.Check
                            type="radio"
                            id="inactive"
                            name="active"
                            label="Inactive"
                            value="inactive"
                            checked={employee.active === false} // Pre-fill radio button
                            onChange={handleChange}
                            isInvalid={!!errors.active}
                        />
                    </div>
                    {errors.active && (
                        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
                            {errors.active}
                        </Form.Control.Feedback>
                    )}
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-3">
                    Save Changes
                </Button>
            </Form>

            <div>
                <Button onClick={handleGoBack} className="go-back-button mt-3">
                    Go Back!
                </Button>
            </div>
        </div>
    );
};

export default EditProfileForm;
