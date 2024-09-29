

// import React, { useState, useEffect, useRef } from 'react'; // Import the hooks 
// import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap'; 
// import { Link, useNavigate } from 'react-router-dom'; 
// import './CustomerNavbar.css'; 
// import { fetchAllPlans } from '../../../services/planService';   
// import InsurancePlans from '../../homePage/InsurancePlans';  // No need to fetch here again 
 
// const CustomerNavbar = () => { 
//   const navigate = useNavigate(); 
//   const [plans, setPlans] = useState([]);  
//   const [loading, setLoading] = useState(true);   
//   const [error, setError] = useState(null);   
//   const contactRef = useRef(null);    
 
//   const handleLogout = () => { 
//     localStorage.removeItem('authToken'); 
//     localStorage.removeItem('UserRole'); 
//     localStorage.removeItem('customerId'); 
//     localStorage.removeItem('userId'); 
//     localStorage.clear(); 
//     navigate('/'); 
//   }; 
 
//   useEffect(() => {   
//     const loadPlans = async () => {   
//         try {   
//             const fetchedPlans = await fetchAllPlans();   
//             console.log('Fetched Plans:', fetchedPlans); // Check if fetched plans are correct 
//             setPlans(fetchedPlans.content);  // Use fetchedPlans.content to get the array 
//         } catch (error) {   
//             setError('Failed to load plans.');   
//         } finally {   
//             setLoading(false);   
//         }   
//     };   
//     loadPlans();   
// }, []); 
 
//   return ( 
//     <Navbar bg="dark" variant="dark" expand="lg"> 
//       <Navbar.Brand as={Link} to="/E-Insurance/customerdashboard">Customer Dashboard</Navbar.Brand> 
//       <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
//       <Navbar.Collapse id="basic-navbar-nav"> 
//         <Nav className="me-auto"> 
//           <NavDropdown title="Account" id="account-dropdown"> 
//             <NavDropdown.Item as={Link} to="/E-Insurance/customerdashboard/edit-customerprofile"> 
//               Edit Profile 
//             </NavDropdown.Item> 
//             <NavDropdown.Item as={Link} to="/E-Insurance/customerdashboard/changecustomerpassword"> 
//               Change Password 
//             </NavDropdown.Item> 
//           </NavDropdown> 
//           <Nav.Link as={Link} to="/E-Insurance/customer/queries">Queries</Nav.Link> 
//           <Nav.Link as={Link} to="/E-Insurance/customer/customerpolicies">Policies</Nav.Link> 
//           <Nav.Link as={Link} to="/E-Insurance/customerdashboard/policy-installments">Customer Policy</Nav.Link> 
       
//           <li className="nav-item dropdown">  
//             <InsurancePlans plans={plans} />  {/* Pass the fetched plans as props */} 
//           </li> 
//         </Nav> 
//         <Button variant="outline-light" onClick={handleLogout} className="btn-logout"> 
//           Logout 
//         </Button> 
//       </Navbar.Collapse> 
//     </Navbar> 
//   ); 
// }; 
 
// export default CustomerNavbar;

import React, { useState, useEffect, useRef } from 'react'; // Import the hooks
import { Navbar, Nav, NavDropdown, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './CustomerNavbar.css';
import { fetchAllPlans } from '../../../services/planService';
import InsurancePlans from '../../homePage/InsurancePlans';  // No need to fetch here again

const CustomerNavbar = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const contactRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('UserRole');
    localStorage.removeItem('customerId');
    localStorage.removeItem('userId');
    localStorage.clear();
    navigate('/');
  };

  useEffect(() => {
    const loadPlans = async () => {
      try {
        const fetchedPlans = await fetchAllPlans();
        console.log('Fetched Plans:', fetchedPlans); // Check if fetched plans are correct
        setPlans(fetchedPlans.content);  // Use fetchedPlans.content to get the array
      } catch (error) {
        setError('Failed to load plans.');
      } finally {
        setLoading(false);
      }
    };
    loadPlans();
  }, []);

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/E-Insurance/customerdashboard">Customer Dashboard</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <NavDropdown title="Account" id="account-dropdown">
            <NavDropdown.Item as={Link} to="/E-Insurance/customerdashboard/edit-customerprofile">
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/E-Insurance/customerdashboard/changecustomerpassword">
              Change Password
            </NavDropdown.Item>
          </NavDropdown>
          <Nav.Link as={Link} to="/E-Insurance/customer/queries" className="mx-2">Queries</Nav.Link> 
          <Nav.Link as={Link} to="/E-Insurance/customer/customerpolicies" className="mx-2">Policies</Nav.Link> 
          <Nav.Link as={Link} to="/E-Insurance/customerdashboard/policy-installments" className="mx-2">Customer Policy</Nav.Link> 
          <li className="nav-item dropdown mx-2">  
            <InsurancePlans plans={plans} />  {/* Pass the fetched plans as props */} 
          </li> 
        </Nav> 
        <Button variant="outline-light" onClick={handleLogout} className="btn-logout"> 
          Logout 
        </Button> 
      </Navbar.Collapse> 
    </Navbar> 
  ); 
}; 

export default CustomerNavbar;
