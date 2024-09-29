// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// // import './Login.css'

// const Login = () => {
//     const [usernameOrEmail, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('http://localhost:8080/E-Insurance/auth/login', { "usernameOrEmail":usernameOrEmail,
//                 "password":password});
//             localStorage.setItem('token', response.data.token); // Store JWT token
//             if (role === 'ROLE_ADMIN') {
//                                 navigate('/admindashboard'); // Redirect to Admin Dashboard
//                                 notify('Admin Login successful!','success');
//                             } else if (role === 'ROLE_CUSTOMER') {
//                                 navigate('/customer-dashboard'); // Redirect to Customer Dashboard
//                                 notify('Customer Login successful!','success');
//                             } else if (role === 'ROLE_AGENT') {
//                                 navigate('/agent-dashboard'); // Redirect to Agent Dashboard
//                                 notify('Agent Login successful!','success');
//                             } 
//                             else if (role === 'ROLE_EMPLOYEE') {
//                                 navigate('/employee-dashboard'); // Redirect to Agent Dashboard
//                                 notify('Employee Login successful!','success');
//                             }
//                             else {
//                                 navigate('/default-dashboard'); // Fallback
//                             }
//                         } catch (error) {
                            
//                             notify('Login failed. Please try again.','error')
//                             console.error('Login failed:', error.response?.data?.message || error.message);
//                         }
//                     };
                    
//         // } catch (error) {
//         //     console.error('Login failed:', error.response.data.message);
//         // }
//     };

//     return (
//         <div>
//             <h2>Login</h2>
//             <form onSubmit={handleLogin}>
//             <div>
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         value={usernameOrEmail}
//                         onChange={(e) => setUsername(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <div>
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                         required
//                     />
//                 </div>
//                 <button type="submit">Login</button>
//             </form>
//         </div>
//     );
// };

// export default Login;

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import '../../styles/components/Login.css';
// //import './Login.css'; // Ensure this file contains your styling
// // import './Login.css';
// import {  Button } from 'react-bootstrap';
// // import { notify } from '../../utils/Helpers/GlobalToast';
// import { notify } from '../../utils/globalToast';
// import { loginApiClient } from '../../utils/token';
// import { login } from '../../services/loginService';

// const Login = () => {
//     const [usernameOrEmail, setUsernameOrEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [errors, setErrors] = useState({});
//     const navigate = useNavigate();
    
    

//     const handleLogin = async (e) => {
//         e.preventDefault();

//         // Validate inputs
//         const errors = {};
//         if (!usernameOrEmail) {
//             errors.usernameOrEmail = 'Username or email is required';
//         }
//         if (!password) {
//             errors.password = 'Password is required';
//         }
//         if (Object.keys(errors).length > 0) {
//             setErrors(errors);
//             return;
//         }

//         try {
//             // Perform login
//             const { accessToken, role } = await login(usernameOrEmail, password);
//             // const { accessToken, role } = response.data;
//             localStorage.setItem('authToken', accessToken); // Store JWT token
//             localStorage.setItem('UserRole', role); // Store user role

//             notify('Login successful!','success');

//             // Navigate based on role
//             if (role === 'ROLE_ADMIN') {
//                 navigate('/admindashboard'); // Redirect to Admin Dashboard
//                 notify('Admin Login successful!','success');
//             } else if (role === 'ROLE_CUSTOMER') {
//                 navigate('/customer-dashboard'); // Redirect to Customer Dashboard
//                 notify('Customer Login successful!','success');
//             } else if (role === 'ROLE_AGENT') {
//                 navigate('/agent-dashboard'); // Redirect to Agent Dashboard
//                 notify('Agent Login successful!','success');
//             } 
//             else if (role === 'ROLE_EMPLOYEE') {
//                 navigate('/employee-dashboard'); // Redirect to Agent Dashboard
//                 notify('Employee Login successful!','success');
//             }
//             else {
//                 navigate('/default-dashboard'); // Fallback
//             }
//         } catch (error) {
            
//             notify('Login failed. Please try again.','error')
//             console.error('Login failed:', error.response?.data?.message || error.message);
//         }
//     };
    
    // const handleGoBack = () => {
    //     navigate(-1); // Goes back to the previous page
    // };

//     const handleForgotPassword = () => {
//         navigate('/forgot-password');
//     };


//     return (
//         <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
//             <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
//                 <h3 className="card-title text-center mb-4">Login</h3>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
//                         <input
//                             type="text"
//                             id="usernameOrEmail"
//                             className="form-control"
//                             value={usernameOrEmail}
//                             onChange={(e) => setUsernameOrEmail(e.target.value)}
//                         />
//                         {errors.usernameOrEmail && <small className="text-danger">{errors.usernameOrEmail}</small>}
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                         />
//                         {errors.password && <small className="text-danger">{errors.password}</small>}
//                     </div>
//                     <div className="d-grid">
//                         <button type="submit" className="btn btn-primary">Login</button>
//                     </div>
//                     <div className="text-center mt-3">
//                     <Button onClick={handleForgotPassword} className="btn btn-link">
//                         Forgot Password?
//                     </Button>
//                 </div>
//                 </form>
//             </div>
            
            // <div><Button onClick={handleGoBack} className="go-back-button">
            //         Go Back!
            //     </Button></div>
                
                

                
//         </div>
//     );
// };

// export default Login;

//88888888888888888888888888888888888888888888888888888888888888
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import { notify } from '../../utils/globalToast'; 
// import '../../styles/components/Login.css';
// import { toast, ToastContainer } from 'react-toastify';
// import { successToast } from '../../utils/toast';


// const Login = () => {
//     //const { role } = useParams(); // Get role from URL 
//     const [usernameOrEmail, setUsernameOrEmail] = useState('');
//     const [password, setPassword] = useState('');
    
//     const navigate = useNavigate();
//     const isValidEmail = (email) => {
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//     };

//     const handleLogin = async (e) => {
//         e.preventDefault();

//          // Validation: Check if fields are empty
//          if (!usernameOrEmail || !password) {
//             notify('Both username/email and password are required.', 'error');
//             return;
//         }

//         // Validation: Check if the input is an email and validate its format
//         if (usernameOrEmail.includes('@') && !isValidEmail(usernameOrEmail)) {
//             notify('Please enter a valid email address.', 'error');
//             return;
//         }
//         try {
//             // Make API call to login
//             const response = await axios.post('http://localhost:8080/E-Insurance/auth/login', {
//                 usernameOrEmail,
//                 password
//             });
//         const { accessToken, role, cityId, agentId, isActive, firstName} = response.data;
//         if (!isActive) {
//             notify('Your account is not active. Please contact support.', 'error');
//             return; // Stop the login process if the user is not active
//         }

//             localStorage.setItem('authToken', accessToken); // Store JWT token 
//             localStorage.setItem('UserRole', role); // Store user role 
//             localStorage.setItem('userId', response.data.user_id);
//             localStorage.setItem('cityId',cityId)
//             localStorage.setItem('agentId',agentId);
//             localStorage.setItem('firstName',firstName);
    
//     localStorage.setItem('customerId', response.data.customerId);

//             // Extract user role from response or token (ensure you handle role correctly)
//          //   const role = response.data.role; // Assuming the role is returned in the response

//             // Redirect based on user role
//             switch (role) {
//                 case 'ROLE_ADMIN':
//                     navigate('/E-Insurance/admindashboard');
//                     //notify('Admin Login successful!', 'success');
//                     successToast('Admin Login successful!');
//                     break;
//                 case 'ROLE_CUSTOMER':
//                     navigate('/E-Insurance/customerdashboard');
//                     toast.success('Customer Login successful!', 'success');
//                     break;
//                 case 'ROLE_AGENT':
//                     navigate('/E-Insurance/agentdashboard');
//                     toast.success('Agent Login successful!', 'success');
//                     break;
//                 case 'ROLE_EMPLOYEE':
//                     navigate('/E-Insurance/employeedashboard');
//                     toast.success('Employee Login successful!', 'success');
//                     break;
//                 default:
//                     navigate('/default-dashboard');
//                     toast.success('Login successful!', 'success');
//                     break;
//             }
//         } catch (error) {
//             notify('Login failed. Please try again.', 'error');
//             console.error('Login failed:', error.response?.data?.message || error.message);
//         }
//     };

    // const handleGoBack = () => {
    //     navigate(-1); // Goes back to the previous page
    // };

//     return (
//         <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
//             <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
//                 <h3 className="card-title text-center mb-4">Login</h3>
//                 <form onSubmit={handleLogin}>
//                     <div className="mb-3">
//                         <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
//                         <input
//                             type="text"
//                             id="usernameOrEmail"
//                             className="form-control"
//                             value={usernameOrEmail}
//                             onChange={(e) => setUsernameOrEmail(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="form-control"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             required
//                         />
//                     </div>
//                     <div className="d-grid">
//                         <Button type="submit" className="btn btn-primary">Login</Button>
//                     </div>
//                     <div className="text-center mt-3">
//                         <Button onClick={() => navigate('/E-Insurance/forgot-password')} className="btn btn-link">
//                             Forgot Password?
//                         </Button>
//                     </div>
//                 </form>
//             </div>
            // <div><Button onClick={handleGoBack} className="go-back-button">
            //         Go Back!
            //     </Button></div>
//                 <ToastContainer />
//         </div>
        
//     );
// };

// export default Login;

//8888888888888888888888888888888888888
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { notify } from '../../utils/globalToast'; 
import { toast, ToastContainer } from 'react-toastify';
import { successToast } from '../../utils/toast';
import '../../styles/components/Login.css';

const Login = () => {
    const { role } = useParams(); // Get role from URL
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate inputs
        if (!usernameOrEmail || !password) {
            notify('Both username/email and password are required.', 'error');
            return;
        }

        if (usernameOrEmail.includes('@') && !isValidEmail(usernameOrEmail)) {
            notify('Please enter a valid email address.', 'error');
            return;
        }

        try {
            // API call to login
            const response = await axios.post('http://localhost:8080/E-Insurance/auth/login', {
                usernameOrEmail,
                password,
                role // Send role from URL params
            });

            // Destructure the response to get the necessary information
            const { accessToken, role: userRole, isActive, firstName, cityId, agentId, customerId } = response.data;

            // Check if the account is active
            if (!isActive) {
                notify('Your account is not active. Please contact support.', 'error');
                return;
            }

            // Save user info to localStorage
            localStorage.setItem('authToken', accessToken);
            localStorage.setItem('UserRole', userRole);
            localStorage.setItem('userId', response.data.user_id);
            localStorage.setItem('cityId', cityId);
            localStorage.setItem('agentId', agentId);
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('customerId', customerId);

           // Fix: Map roles if needed
        const mappedUserRole = userRole.toUpperCase().startsWith('ROLE_') ? userRole.toUpperCase() : `ROLE_${userRole.toUpperCase()}`;

        // TEMP: Log expected vs actual role
        console.log(`Expected role: ROLE_${role.toUpperCase()}, but got from backend: ${mappedUserRole}`);

        if (mappedUserRole !== `ROLE_${role.toUpperCase()}`) {
            notify(`You are not authorized to log in from this page. Expected role: ROLE_${role.toUpperCase()}, but got: ${mappedUserRole}`, 'error');
            return;
        }

        // Redirect based on role
        switch (mappedUserRole) {
            case 'ROLE_ADMIN':
                successToast('Admin Login successful!');
                navigate('/E-Insurance/admindashboard');
                break;
            case 'ROLE_CUSTOMER':
                toast.success('Customer Login successful!');
                navigate('/E-Insurance/customerdashboard');
                break;
            case 'ROLE_AGENT':
                // toast.success('Agent Login successful!');
                navigate('/E-Insurance/agentdashboard');
                break;
            case 'ROLE_EMPLOYEE':
               
                navigate('/E-Insurance/employeedashboard');
                toast.success('Employee login Successful ');
                break;
            default:
                notify('Unexpected role. Please contact support.', 'error');
                break;
            }
        } catch (error) {
            // Handle any login errors
            const errorMessage = error.response?.data?.message || error.message;
            toast.warn('Login failed the User is not correct ');
            console.error('Login failed:', errorMessage);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="login-container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card shadow-lg p-4" style={{ maxWidth: "400px", width: "100%" }}>
                <h3 className="card-title text-center mb-4">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h3>
                <form onSubmit={handleLogin}>
                {/* <h3 className="card-title text-center mb-4">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h3> */}
                    <div className="mb-3">
                        <label htmlFor="usernameOrEmail" className="form-label">Username or Email</label>
                        <input
                            type="text"
                            id="usernameOrEmail"
                            className="form-control"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="d-grid">
                        <Button type="submit" className="btn btn-primary">Login</Button>
                    </div>

                    <div className="text-center mt-3">
                         <Button onClick={() => navigate('/E-Insurance/forgot-password')} className="btn btn-link">
                            Forgot Password?
                        </Button>
                     </div>
                    
                </form>
                
            </div>
            <ToastContainer />
            <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
        </div>
    );
};

export default Login;
