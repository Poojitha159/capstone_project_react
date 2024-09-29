// import React, { useState,useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';

// const RegisterCustomer = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const { schemeId, scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount, agentId } = location.state || {};
// console.log(agentId);
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         phone_number: '',
//         dob: '',
//         cityId: '',  // To store the selected city ID
//         roles: ['ROLE_CUSTOMER']
//     });

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
//     };
//     const [cities, setCities] = useState([]);  // To store the list of cities
//     const [loading, setLoading] = useState(true);  // To handle loading state

//     useEffect(() => {
//         // Fetch the list of cities when the component mounts
//         const fetchCities = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/E-Insurance/toall/cities'); 
//                 // Adjust URL as needed
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch cities');
//                 }
//                 const data = await response.json();
//                 setCities(data.content);  // Assuming response data has 'content' field
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching cities:', error);
//                 setLoading(false);
//             }
//         };
//         fetchCities();
//     }, []);
//     const handleSubmit = async (e) => {
//         e.preventDefault();
// console.log("form data subnitted is :",formData);
//         try {
//             // Register the customer

//             const response = await axios.post('http://localhost:8080/E-Insurance/agent/addCustomer', {
//                 ...formData,
//                 agentId
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             });

            
// // Check the response to ensure customerId is correctly received
// console.log('Registration response:', response.data);

// // Ensure to inspect the entire response
// let  customerId = response.data;
// console.log(customerId+'customerrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
// if (!customerId) {
//     console.error('No customerId returned from registration response');
//     return;
// }
//             // Navigate to buy-policy with customerId and agentId
//             // navigate('/buy-policy', {
//             //     state: {
//             //         schemeId,
//             //         scheme,
//             //         investmentAmount,
//             //         policyTerm,
//             //         installmentPeriod,
//             //         interestAmount,
//             //         totalAmount,
//             //         installmentAmount,
//             //         customerId:response.data,
                   
//             //         agentId // Include agentId in the state
//             //     }
//             // });
//             navigate('/buy-policy', {
//                 state: {
//                     schemeId,
//                     scheme,
//                     investmentAmount,
//                     policyTerm,
//                     installmentPeriod,
//                     interestAmount,
//                     totalAmount,
//                     installmentAmount,
//                     customerId, // Make sure you pass the customerId variable correctly
//                     agentId
//                 }
//             });
//         } catch (error) {
//             console.error('Error registering customer:', error);
//         }
//     };

//     const isFormValid = () => {
//         return formData.username && formData.email && formData.password && formData.firstName && formData.lastName && formData.phone_number && formData.dob && formData.cityId;
//     };

//     return (
// //         <div className="container mt-4">
// //             <h3 className="mb-4">Register Customer</h3>
// //             <form onSubmit={handleSubmit}>
// //                 <input
// //                     type="text"
// //                     name="firstName"
// //                     placeholder="First Name"
// //                     value={customerDetails.firstName}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <input
// //                     type="text"
// //                     name="lastName"
// //                     placeholder="Last Name"
// //                     value={customerDetails.lastName}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <input
// //                     type="text"
// //                     name="phone_number"
// //                     placeholder="Phone Number"
// //                     value={customerDetails.phone_number}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <input
// //                     type="date"
// //                     name="dob"
// //                     placeholder="Date of Birth"
// //                     value={customerDetails.dob}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <input
// //                     type="text"
// //                     name="cityId"
// //                     placeholder="City ID"
// //                     value={customerDetails.cityId}
// //                     onChange={handleInputChange}
// //                     required
// //                 />
// //                 <button type="submit">Register and Proceed</button>
// //             </form>
// //         </div>
// //     );
// // };
// <form onSubmit={handleSubmit}>
// <h2>Customer Registration</h2>
// <label htmlFor="username">Username:</label>
// <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

// <label htmlFor="email">Email:</label>
// <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

// <label htmlFor="password">Password:</label>
// <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

// <label htmlFor="firstName">First Name:</label>
// <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

// <label htmlFor="lastName">Last Name:</label>
// <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

// <label htmlFor="phone_number">Phone Number:</label>
// <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

// <label htmlFor="dob">Date of Birth:</label>
// <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

// <label htmlFor="cityId">City:</label>
// {loading ? (
//     <p>Loading cities...</p>
// ) : (
//     <select id="cityId" name="cityId" value={formData.cityId} onChange={handleChange} required>
//         <option value="">Select a city</option>
//         {cities.map(city => (
//             <option key={city.cityId} value={city.cityId}>
//                 {city.name}
//             </option>
//         ))}
//     </select>
// )}

// {/* <button type="submit" disabled={!isFormValid()}>Register</button> */}
// <button type="submit">Register and Proceed</button>
// </form>
// );
// };

// export default RegisterCustomer;

//before chatgpt......................
// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { Button } from 'react-bootstrap';
// import { toast } from 'react-toastify';
// import './RegisterCustomer.css';

// const RegisterCustomer = () => {
//     const location = useLocation();
//     const navigate = useNavigate();

//     const {
//         schemeId, scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount, agentId
//     } = location.state || {};

//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//         phone_number: '',
//         dob: '',
//         cityId: '', // To store the selected city ID
//         roles: ['ROLE_CUSTOMER']
//     });

//     const [cities, setCities] = useState([]); // To store the list of cities
//     const [loading, setLoading] = useState(true); // To handle loading state
   
//     const [errorMessage, setErrorMessage] = useState('');

//     useEffect(() => {
//         // Fetch the list of cities when the component mounts
//         const fetchCities = async () => {
//             try {
//                 const response = await fetch('http://localhost:8080/E-Insurance/toall/cities'); 
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch cities');
//                 }
//                 const data = await response.json();
//                 setCities(data.content); // Assuming response data has 'content' field
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching cities:', error);
//                 setLoading(false);
//             }
//         };
//         fetchCities();
//     }, []);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value
//         });
//     };

//     // const handleSubmit = async (e) => {
//     //     e.preventDefault();
//     //     console.log('Form data submitted:', formData);

//     //     try {
//     //         // Register the customer or get the existing customer ID
//     //         const response = await axios.post('http://localhost:8080/E-Insurance/agent/addCustomer', {
//     //             ...formData,
//     //             agentId
//     //         }, {
//     //             headers: {
//     //                 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//     //             }
//     //         });

//     //         // Get the customerId from the response
//     //         let customerId = response.data;
//     //         console.log('Customer ID:', customerId);
//     //         console.log(customerId);

//     //         // Navigate to the next page using the customerId
//     //         navigate('/buy-policy', {
//     //             state: {
//     //                 schemeId,
//     //                 scheme,
//     //                 investmentAmount,
//     //                 policyTerm,
//     //                 installmentPeriod,
//     //                 interestAmount,
//     //                 totalAmount,
//     //                 installmentAmount,
//     //                 customerId, // Use the returned customerId
//     //                 agentId
//     //             }
//     //         });
//     //     } catch (error) {
//     //         console.error('Error registering customer:', error);
//     //     }
//     // };

    
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setErrorMessage('');
//         console.log('Submitting form data:', formData);

//         try {
//             // Check if the customer already exists
//             const response = await axios.get(`http://localhost:8080/E-Insurance/agent/customer/${formData.email}`, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             });
//             console.log('Customer response:', response.data);

//             // If the customer exists, check if they're active
//             const customer = response.data;
//             if (!customer.active) {
//                 setErrorMessage('This customer is inactive. Please contact support.');
//                 alert('This customer is inactive. Please contact support.');
//                 console.log('Customer is inactive:', customer);
//                 return;
//             }

//             // If customer is active, proceed to the next step
//             navigate('/buy-policy', {
//                 state: {
//                     schemeId,
//                     scheme,
//                     investmentAmount,
//                     policyTerm,
//                     installmentPeriod,
//                     interestAmount,
//                     totalAmount,
//                     installmentAmount,
//                     customerId: customer.customerId,
//                     agentId
//                 }
//             });

//         } catch (error) {
//             // If the customer does not exist, proceed with registration
//             if (error.response && error.response.status === 404) {
//                 console.log('Customer not found, proceeding with registration...');

//                 try {
//                     const registerResponse = await axios.post('http://localhost:8080/E-Insurance/agent/addCustomer', {
//                         ...formData,
//                         agentId
//                     }, {
//                         headers: {
//                             'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//                         }
//                     });

//                     const customerId = registerResponse.data;
//                     console.log('Registration successful, customer ID:', customerId);
//                     navigate('/buy-policy', {
//                         state: {
//                             schemeId,
//                             scheme,
//                             investmentAmount,
//                             policyTerm,
//                             installmentPeriod,
//                             interestAmount,
//                             totalAmount,
//                             installmentAmount,
//                             customerId,
//                             agentId
//                         }
//                     });
//                 } catch (registrationError) {
//                     console.error('Error registering customer:', registrationError);
//                     setErrorMessage('Registration failed. Please try again.');
//                 }
//             } else {
//                 setErrorMessage('An error occurred. Please check the email or try again.');
//             }
//         }
//     };
//     const handleLogout = () => {
       
//         navigate('/E-Insurance/agentdashboard');
//         toast.info('Back to AgentDashBoard!');
//     };


// //     return (
// //         <div>
// //         <form className='formContainer ' onSubmit={handleSubmit}>
// //             <Button className='logoutButton' variant="outline-light" onClick={handleLogout}> 
// //                     Logout 
// //                 </Button> 
// //             <h2>Customer Registration</h2>
// //             <label className='formLabel' htmlFor="username">Username:</label>
// //             <input className='formInput' type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

// //             <label className='formLabel' htmlFor="email">Email:</label>
// //             <input className='formInput' type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

// //             <label className='formLabel' htmlFor="password">Password:</label>
// //             <input className='formInput' type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

// //             <label className='formLabel' htmlFor="firstName">First Name:</label>
// //             <input className='formInput' type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

// //             <label className='formLabel' htmlFor="lastName">Last Name:</label>
// //             <input className='formInput' type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

// //             <label className='formLabel' htmlFor="phone_number">Phone Number:</label>
// //             <input className='formInput' type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

// //             <label className='formLabel' htmlFor="dob">Date of Birth:</label>
// //             <input className='formInput' type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

// //             <label className='formLable' htmlFor="cityId">City:</label>
// //             {loading ? (
// //                 <p>Loading cities...</p>
// //             ) : (
// //                 <select className='formInput'  id="cityId" name="cityId" value={formData.cityId} onChange={handleChange} required>
// //                     <option value="">Select a city</option>
// //                     {cities.map(city => (
// //                         <option key={city.cityId} value={city.cityId}>
// //                             {city.name}
// //                         </option>
// //                     ))}
// //                 </select>
// //             )}

// //             <button className='submitButton' type="submit">Register and Proceed</button>
// //         </form>
// //         </div>
// //     );
// // };

// // export default RegisterCustomer;
// return (
//     <>
//     <div><Button variant="outline-light" onClick={handleLogout} className="logoutbutton">
//             Logout
//         </Button></div>
//     <form onSubmit={handleSubmit} className="formContainer">
        
//         <h2 className="formTitle">Customer Registration</h2>
//         <label htmlFor="username">Username:</label>
//         <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

//         <label htmlFor="email">Email:</label>
//         <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

//         <label htmlFor="password">Password:</label>
//         <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

//         <label htmlFor="firstName">First Name:</label>
//         <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

//         <label htmlFor="lastName">Last Name:</label>
//         <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

//         <label htmlFor="phone_number">Phone Number:</label>
//         <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

//         <label htmlFor="dob">Date of Birth:</label>
//         <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

//         <label htmlFor="cityId">City:</label>
//         {loading ? (
//             <p>Loading cities...</p>
//         ) : (
//             <select id="cityId" name="cityId" value={formData.cityId} onChange={handleChange} required>
//                 <option value="">Select a city</option>
//                 {cities.map(city => (
//                     <option key={city.cityId} value={city.cityId}>
//                         {city.name}
//                     </option>
//                 ))}
//             </select>
//         )}

//         <button className='button' type="submit">Register and Proceed</button>
//         {errorMessage && <p className="error">{errorMessage}</p>}
//     </form>
//     </>
// );
// };

// export default RegisterCustomer;
//before chatgpt




import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './RegisterCustomer.css';

const RegisterCustomer = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const {
        schemeId, scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount, agentId
    } = location.state || {};

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phone_number: '',
        dob: '',
        cityId: '', // To store the selected city ID
        roles: ['ROLE_CUSTOMER']
    });

    const [cities, setCities] = useState([]); // To store the list of cities
    const [loading, setLoading] = useState(true); // To handle loading state
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch cities when component mounts
    useEffect(() => {
        const fetchCities = async () => {
            try {
                const response = await fetch('http://localhost:8080/E-Insurance/toall/cities');
                if (!response.ok) {
                    throw new Error('Failed to fetch cities');
                }
                const data = await response.json();
                setCities(data.content); // Assuming response data has 'content' field
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cities:', error);
                setLoading(false);
            }
        };
        fetchCities();
    }, []);

    // Handle form field changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Check if user exists
    const checkUserExists = async (email) => {
        try {
            const response = await axios.get(`http://localhost:8080/E-Insurance/agent/customers/${email}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            return response.data; // Return customer data if exists
        } catch (error) {
            if (error.response && error.response.status === 404) {
                return null; // Customer not found
            } else {
                console.error('Error checking customer:', error);
                throw new Error('Error checking customer');
            }
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        console.log('Submitting form data:', formData);

        try {
            // Step 1: Check if the customer exists by email
            const existingCustomer = await checkUserExists(formData.email);
            
            if (!existingCustomer) {
                // Step 2: If customer not found, show a confirmation alert
                const confirmRegistration = window.confirm('Customer not found. Would you like to register this user as a new customer?');
                
                if (!confirmRegistration) {
                    return; // If the user cancels the registration, stop further execution
                }
            } else {
                console.log('Customer found, navigating to policy purchase.');
                navigate('/buy-policy', {
                    state: {
                        schemeId,
                        scheme,
                        investmentAmount,
                        policyTerm,
                        installmentPeriod,
                        interestAmount,
                        totalAmount,
                        installmentAmount,
                        customerId: existingCustomer.customerId,
                        agentId
                    }
                });
                return;
            }

            // Step 3: If user confirms, proceed with registration
            const registerResponse = await axios.post('http://localhost:8080/E-Insurance/agent/addCustomer', {
                ...formData,
                agentId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            const customerId = registerResponse.data;
            console.log('Customer registered, ID:', customerId);

            // Navigate to buy-policy page after successful registration
            navigate('/buy-policy', {
                state: {
                    schemeId,
                    scheme,
                    investmentAmount,
                    policyTerm,
                    installmentPeriod,
                    interestAmount,
                    totalAmount,
                    installmentAmount,
                    customerId,
                    agentId
                }
            });

        } catch (error) {
            console.error('Error during customer registration:', error);
            setErrorMessage('An unexpected error occurred. Please try again.');
        }
    };

    const handleLogout = () => {
        navigate('/E-Insurance/agentdashboard');
        toast.info('Back to AgentDashBoard!');
    };

    return (
        <>
            <div>
               
            </div>
            <form onSubmit={handleSubmit} className="formContainer">
                <h2 className="formTitle">Customer Registration</h2>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                <label htmlFor="firstName">First Name:</label>
                <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />

                <label htmlFor="lastName">Last Name:</label>
                <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />

                <label htmlFor="phone_number">Phone Number:</label>
                <input type="text" id="phone_number" name="phone_number" value={formData.phone_number} onChange={handleChange} required />

                <label htmlFor="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" value={formData.dob} onChange={handleChange} required />

                <label htmlFor="cityId">City:</label>
                {loading ? (
                    <p>Loading cities...</p>
                ) : (
                    <select id="cityId" name="cityId" value={formData.cityId} onChange={handleChange} required>
                        <option value="">Select a city</option>
                        {cities.map(city => (
                            <option key={city.cityId} value={city.cityId}>
                                {city.name}
                            </option>
                        ))}
                    </select>
                )}

                <button className="button" type="submit">Register and Proceed</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </>
    );
};

export default RegisterCustomer;
