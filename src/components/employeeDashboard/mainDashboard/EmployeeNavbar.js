// import React from 'react'; 
// import { Link } from 'react-router-dom'; 
// import { Button } from 'react-bootstrap';
// import './EmployeeNavbar.css';
// import { notify } from '../../../utils/globalToast';
// import { useNavigate } from 'react-router-dom';
 
// const EmployeeNavbar = () => { 
//   const navigate =useNavigate();
//   const handleLogout = () => { 
//     localStorage.removeItem('authToken'); 
//     localStorage.removeItem('UserRole'); 
//     localStorage.removeItem('customerId'); 
//     localStorage.removeItem('userId'); 
//     localStorage.clear();
//     navigate('/'); 
//     notify('Back to LoginBoard!', 'success'); 
//   }; 
//   return ( 
//     <nav className="navbar navbar-expand-lg navbar-light bg-light"> 
//       <div className="container-fluid"> 
//       <h3> Employee Dashboard</h3>
//         {/* <Link to="/employee-dashboard" className="navbar-brand">Employee Dashboard</Link>  */}
//         {/* <p>Employee Dashboard</p>  */}
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"> 
//           <span className="navbar-toggler-icon"></span> 
//         </button> 
//         <div className="collapse navbar-collapse" id="navbarNav"> 
//           <ul className="navbar-nav"> 
        
//             <li className="nav-item"> 
//               <Link to="/E-Insurance/employeedashboard/edit-profile" className="nav-link">Edit Profile</Link> 
//             </li> 
//             <li className="nav-item"> 
//               <Link to="/E-Insurance/employeedashboard/changeemployeepassword" className="nav-link">Change Password</Link> 
//             </li> 
//             <li className="nav-item"> 
//               <Link to="/E-Insurance/employeedashboard/agent-registration" className="nav-link">Agent Registration</Link> 
//             </li> 
//             <li className="nav-item"> 
//               <Link to="/E-Insurance/employeedashboard/viewcustomer" className="nav-link">View Customer</Link> 
//             </li> 
            
//           </ul> 
//           <Button variant="outline-light" onClick={handleLogout} className="btn-logout"> 
//                     Logout 
//                 </Button> 
//         </div> 
//       </div> 
//     </nav> 
//   ); 
// }; 
 
// export default EmployeeNavbar;

import React from 'react';  
import { Link, useNavigate } from 'react-router-dom';  
import { Navbar, Nav, Button } from 'react-bootstrap';  
import './EmployeeNavbar.css';  
import { notify } from '../../../utils/globalToast'; 
 
const EmployeeNavbar = () => {  
  const navigate = useNavigate(); 
 
  const handleLogout = () => {  
    localStorage.removeItem('authToken');  
    localStorage.removeItem('UserRole');  
    localStorage.removeItem('customerId');  
    localStorage.removeItem('userId');  
    localStorage.clear(); 
    navigate('/');  
    notify('Back to LoginBoard!', 'success');  
  };  
 
  return (  
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">  
      <Navbar.Brand as={Link} to="/E-Insurance/employeedashboard">Employee Dashboard</Navbar.Brand>  
      <Navbar.Toggle aria-controls="basic-navbar-nav" />  
      <Navbar.Collapse id="basic-navbar-nav">  
        <Nav className="me-auto"> 
          <Nav.Link as={Link} to="/E-Insurance/employeedashboard/edit-profile">Edit Profile</Nav.Link>  
          <Nav.Link as={Link} to="/E-Insurance/employeedashboard/changeemployeepassword">Change Password</Nav.Link>  
          <Nav.Link as={Link} to="/E-Insurance/employeedashboard/agent-registration">Agent Registration</Nav.Link>  
          <Nav.Link as={Link} to="/E-Insurance/employeedashboard/viewcustomer">View Customer</Nav.Link>  
        </Nav> 
        <Button variant="outline-light" onClick={handleLogout} className="btn-logout">  
          Logout  
        </Button>  
      </Navbar.Collapse>  
    </Navbar>  
  );  
};  
 
export default EmployeeNavbar;
