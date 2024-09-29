import React from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { Navbar, Nav, Button } from 'react-bootstrap'; 
import './AdminNavbar.css'; 
import { notify } from '../../../utils/globalToast';
const AdminNavbar = () => { 
    const navigate = useNavigate(); // For redirecting to home 
 
    const handleLogout = () => { 
        localStorage.removeItem('authToken')
        localStorage.removeItem('UserRole')
        localStorage.removeItem('customerId')
        localStorage.removeItem('userId')
        localStorage.clear();
        navigate('/')
         notify('Back to LoginBoard!', 'success'); 
    }; 
 
    return ( 
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top"> 
            <Navbar.Brand as={Link} to="/E-Insurance/admindashboard">Admin Dashboard</Navbar.Brand> 
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
            <Navbar.Collapse id="basic-navbar-nav"> 
                {/* <Nav className="mr-auto">  */}
                <Nav className="me-auto"> {/* Wrap all links in a Nav component */}
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/employees">Manage Employees</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/agents">Manage Agents</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/plans">Manage Insurance Plans</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/schemes">Manage Insurance Schemes</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/viewcustomers">View Customers</Nav.Link>
                    {/* <Nav.Link as={Link} to="/E-Insurance/admindashboard/tax">Manage Tax Settings</Nav.Link> */}
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/cities">Manage Cities</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/states">Manage States</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/claims">Manage Claims</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/admindashboard/agentclaim">Agent Claims</Nav.Link>
                </Nav>
                <Button variant="outline-light" onClick={handleLogout} className="btn-logout"> 
                    Logout 
                </Button> 
            </Navbar.Collapse> 
        </Navbar> 
    ); 
}; 
 
export default AdminNavbar;