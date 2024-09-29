

import React, { useEffect } from 'react'; 
import { Link } from 'react-router-dom'; 
import { toast } from 'react-toastify';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaUserEdit, FaLock, FaCalculator, FaWallet, FaChartLine, FaUsers, FaQuestionCircle } from 'react-icons/fa'; 
import './AgentDashboard.css';
import { verifyUser } from '../../../services/authService';

const AgentDashboard = () => { 
  const firstName = localStorage.getItem('firstName');
  const navigate = useNavigate();

  const verify = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await verifyUser(token, 'agent');
      // Handle the response here
      return response ? true : false;
    } catch (error) {
      // Handle any errors
      console.error('Error verifying user:', error);
      return false; // Return false on error
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const checkVerification = async () => {
      if (!token || !(await verify())) {
        toast.warn('Back to Login Page!');
        navigate('/login/agent');
      }
    };
    checkVerification();
  }, [navigate]);

  return ( 
    <div className="agent-dashboard-container"> 
      <div className="main-panel">
        <h1>WELCOME {firstName}</h1>
        <Row className="mb-4 justify-content-center"> {/* Center the cards */}
          <Col md={6} lg={3} className="mb-4"> {/* Add bottom margin for spacing */}
            <Card className="dashboard-card" style={{ backgroundColor: '#9ACD32' }}>
              <Card.Body>
                <FaUserEdit size={64} className="card-icon" />
                <Card.Title>
                  <Link to="/E-Insurance/agent/profile" className="card-link" style={{ color: 'white' }}>Manage Profile</Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="dashboard-card" style={{ backgroundColor: '#007bff' }}>
              <Card.Body>
                <FaLock size={64} className="card-icon" />
                <Card.Title>
                  <Link to="/E-Insurance/agent/change-password" className="card-link" style={{ color: 'white' }}>Change Password</Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="dashboard-card" style={{ backgroundColor: '#28a745' }}>
              <Card.Body>
                <FaCalculator size={64} className="card-icon" />
                <Card.Title>
                  <Link to="/E-Insurance/agent/commission-report" className="card-link" style={{ color: 'white' }}>Commission Report</Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md={6} lg={3} className="mb-4">
            <Card className="dashboard-card" style={{ backgroundColor: '#ffc107' }}>
              <Card.Body>
                <FaUsers size={64} className="card-icon" />
                <Card.Title>
                  <Link to="/E-Insurance/agent/customer" className="card-link" style={{ color: 'white' }}>Customers</Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="dashboard-card" style={{ backgroundColor: '#17a2b8' }}>
              <Card.Body>
                <FaQuestionCircle size={64} className="card-icon" />
                <Card.Title>
                  <Link to="/E-Insurance/agent/customer-queries" className="card-link" style={{ color: 'white' }}>View Queries</Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} lg={3} className="mb-4">
            <Card className="dashboard-card" style={{ backgroundColor: '#e83e8c' }}>
              <Card.Body>
                <FaWallet size={64} className="card-icon" />
                <Card.Title>
                  <Link to="/E-Insurance/agent/withdrawals" className="card-link" style={{ color: 'white' }}>Withdraw<br/><br/></Link>
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>  
    </div>
  ); 
}; 
 
export default AgentDashboard;
