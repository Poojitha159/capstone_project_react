



import React, { useState, useEffect, useRef } from 'react';   
import { Link } from 'react-router-dom';   
import { NavDropdown } from 'react-bootstrap';   
import './HomePage.css';   
 
// Import the image from the assets folder   
import policy from '../../assets/admin/policy.jpg'; // Replace with your actual image path 
 
import { fetchAllPlans } from '../../services/planService';   
import InsurancePlans from './InsurancePlans';   
 
const HomePage = () => {   
    const [plans, setPlans] = useState([]);   
    const [loading, setLoading] = useState(true);   
    const [error, setError] = useState(null);   
    const contactRef = useRef(null);   
 
    useEffect(() => {   
        const loadPlans = async () => {   
            try {   
                const fetchedPlans = await fetchAllPlans();   
                setPlans(fetchedPlans.content);  // Ensure the correct part of the response is used 
            } catch (error) {   
                setError('Failed to load plans.');   
            } finally {   
                setLoading(false);   
            }   
        };   
 
        loadPlans();   
    }, []);   
 
    const scrollToContact = (e) => {   
        e.preventDefault(); // Prevent the default link behavior   
        if (contactRef.current) {   
            contactRef.current.scrollIntoView({ behavior: 'smooth' });   
        }   
    };   
 
    return ( 
        <div className="homepage"> 
            {/* Navbar Section */} 
            <header className="navbar-homepage"> 
                {/* E-Insurance Text Logo */} 
                <Link to="/" className="navbar-brand"> 
                    <span className="text-logo">E-Insurance</span> 
                </Link> 
                 
                <nav> 
                    <ul> 
                        {/* Login Dropdown */} 
                        <li className="nav-item dropdown"> 
                            <span className="dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> 
                                Login 
                            </span> 
                            <div className="dropdown-menu"> 
                                <NavDropdown.Item as={Link} to="/login/customer">Customer Login</NavDropdown.Item> 
                                <NavDropdown.Item as={Link} to="/login/agent">Agent Login</NavDropdown.Item> 
                                <NavDropdown.Item as={Link} to="/login/admin">Admin Login</NavDropdown.Item> 
                                <NavDropdown.Item as={Link} to="/login/employee">Employee Login</NavDropdown.Item> 
                            </div> 
                        </li> 
                        <li><Link to="/E-Insurance/register">Register</Link></li> 
                        <li><a href="#contact" onClick={scrollToContact}>Contact</a></li> 
                        {/* Insurance Plans Dropdown */} 
                        <li className="nav-item dropdown"> 
                            <InsurancePlans plans={plans} /> {/* Pass the plans as props */} 
                        </li> 
                    </ul> 
                </nav> 
            </header> 
     
            {/* Main Content Section */} 
            <div className="content"> 
                <img 
                    src={policy} 
                    alt="Insurance" 
                    className="full-page-width-image" 
                /> 
            </div> 
     
            {/* Description Section */} 
            <section className="description"> 
                <h2>What is E-Insurance?</h2> 
                <p> 
                    E-Insurance refers to the digital management and processing of insurance policies through electronic means.  
                    It offers a convenient way to access, manage, and claim insurance services online.  
                    With E-Insurance, policyholders can easily compare plans, purchase insurance, and handle all related tasks from the comfort of their homes. 
                </p> 
                <p> 
                    Benefits of E-Insurance include
streamlined processes, reduced paperwork,  
                    and the ability to access insurance services anytime and anywhere.  
                    This modern approach enhances the efficiency of insurance operations and provides greater flexibility for users. 
                </p> 
            </section> 
     
            {/* Features Section with Icons */} 
            <section className="features-section"> 
                <h2>Why Choose E-Insurance?</h2> 
                <div className="features"> 
                    <div className="feature"> 
                        <i className="bi bi-clock"></i> 
                        <h3>24/7 Access</h3> 
                        <p>Manage your policies anytime, anywhere.</p> 
                    </div> 
                    <div className="feature"> 
                        <i className="bi bi-file-earmark-check"></i> 
                        <h3>Easy Claims Process</h3> 
                        <p>Submit claims quickly and hassle-free.</p> 
                    </div> 
                    <div className="feature"> 
                        <i className="bi bi-shield-lock"></i> 
                        <h3>Personalized Plans</h3> 
                        <p>Find the plan that fits your needs perfectly.</p> 
                    </div> 
                </div> 
            </section> 
     
            {/* Footer Section */} 
            <footer className="footer" ref={contactRef}> 
                <div className="footer-content"> 
                    <p>Contact Us:</p> 
                    <ul> 
                        <li><i className="bi bi-telephone"></i> Phone: 9705513505</li> 
                        <li><i className="bi bi-envelope"></i> Email: e-insurance@gmail.com</li> 
                    </ul> 
                    <div className="social-icons"> 
                        <a href="https://www.linkedin.com" target="_blank" rel="noreferrer"> 
                            <i className="bi bi-linkedin"></i> 
                        </a> 
                        <a href="https://www.instagram.com" target="_blank" rel="noreferrer"> 
                            <i className="bi bi-instagram"></i> 
                        </a> 
                        <a href="https://www.twitter.com" target="_blank" rel="noreferrer"> 
                            <i className="bi bi-twitter"></i> 
                        </a> 
                    </div> 
                </div> 
            </footer> 
        </div> 
    ); 
};   
 
export default HomePage;
