import React ,{useEffect,useState} from 'react'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { Navbar, Nav, Button } from 'react-bootstrap'; 
import { FaUserEdit, FaLock, FaCalculator, FaWallet, FaChartLine, FaUsers, FaQuestionCircle } from 'react-icons/fa'; 
import { Card, Row, Col } from 'react-bootstrap';
import { fetchAllPlans } from '../../services/planService';
// import './AgNavbar.css'; 
// import { notify} from '../../../utils/globalToast';
import { notify } from '../../utils/globalToast';
import InsurancePlans from '../homePage/InsurancePlans';
const AgentNavbar = () => { 
    const [plans, setPlans] = useState([]);  
  const [loading, setLoading] = useState(true);   
  const [error, setError] = useState(null);   
    const navigate = useNavigate(); // For redirecting to home 
    const firstName=localStorage.getItem('firstName');
    const handleLogout = () => { 
        localStorage.removeItem('authToken')
        localStorage.removeItem('UserRole')
        localStorage.removeItem('customerId')
        localStorage.removeItem('userId')
        localStorage.clear();
        navigate('/')
         notify('Back to LoginBoard!', 'success'); 
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
        <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top"> 
           <Navbar.Brand as={Link} to="/E-Insurance/agentdashboard">Agent Dashboard</Navbar.Brand>  
            <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
            <Navbar.Collapse id="basic-navbar-nav">  
                
                 <Nav className="me-auto"> 
                    <Nav.Link as={Link} to="/E-Insurance/agent/profile">Manage Profile</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/agent/change-password">Password</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/agent/commission-report">Commission Report</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/agent/customer">My Customers</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/agent/customer-queries">View Queries</Nav.Link>

                    <Nav.Link as={Link} to="/E-Insurance/agent/withdrawals">Manage Withdrawals</Nav.Link>
                    <Nav.Link as={Link} to="/E-Insurance/agent/earnings">Earnings</Nav.Link>
                    <li className="nav-item dropdown">  
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
 
export default AgentNavbar;