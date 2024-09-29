// import React from 'react';
// import InsurancePlans from '../homePage/InsurancePlans';

// const Navbar = ({
//   handleUpdateProfile,
//   handleChangePassword,
//   handleCalculateCommission,
//   handleWithdrawCommission,
//   handleGetEarningsReport,
//   handleGetCommissionReport
// }) => {
//   return (
//     <nav className="navbar">
//       <button onClick={handleUpdateProfile}>Update Profile</button>
//       <button onClick={handleChangePassword}>Change Password</button>
//       <button onClick={handleCalculateCommission}>Calculate Commission</button>
//       <button onClick={handleWithdrawCommission}>Withdraw Commission</button>
//       <button onClick={handleGetEarningsReport}>Earnings Report</button>
//       <button onClick={handleGetCommissionReport}>Commission Report</button>
      // <li className="nav-item dropdown">
      //                        <InsurancePlans/> 
      //                   </li>

//     </nav>
//   );
// };

// export default Navbar;


import React from "react";
import { Link } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
// import { notify } from '../../../utils/globalToast';
import { notify } from "../../utils/globalToast";
import { useNavigate } from "react-router-dom";
import { FaUserEdit, FaLock, FaCalculator, FaWallet, FaChartLine, FaUsers, FaQuestionCircle } from 'react-icons/fa'; 

    
    

  const Navbar = () => { 
    const navigate = useNavigate(); // For redirecting to home 
    const firstName=localStorage.getItem('firstName');
    const handleLogout = () => { 
       
        localStorage.clear();
        navigate('/')
         notify('Back to LoginBoard!', 'success'); 
    }; 
 
  return (
    // <nav className="navbar">
    //   <button onClick={handleUpdateProfile}>Update Profile</button>
    //   <button onClick={handleChangePassword}>Change Password</button>
    //   <button onClick={handleCalculateCommission}>Calculate Commission</button>
    //   <button onClick={handleWithdrawCommission}>Withdraw Commission</button>
    //   <button onClick={handleGetEarningsReport}>Earnings Report</button>
    //   <button onClick={handleGetCommissionReport}>Commission Report</button>
    // </nav>

    <Navbar expand="lg" className="fixed-top"> 
      <div className="agent-dashboard-container"> 
         <h1>WELCOME {firstName}</h1>
      {/* <div className="agent-dashboard"> */}
        <div className="main-panel">
          <Row className="mb-4">
          <Col md={6} lg={3}>
  <Card className="dashboard-card bg-green" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#343a40' }}>
    <Card.Body>
      <FaUserEdit size={64} className="card-icon" />
      <Card.Title>
        <Link to="/E-Insurance/agent/profile" className="card-link">Manage Profile</Link>
      </Card.Title>
    </Card.Body>
  </Card>
</Col>

            <Col md={6} lg={3}>
              <Card className="dashboard-card bg-orange"  style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#007bff' }}>
                <Card.Body>
                  <FaLock size={64} className="card-icon " />
                  <Card.Title>
                    <Link to="/E-Insurance/agent/change-password" className="card-link " style={{ color: 'white' }}>Change Password</Link>
                    <Card.Text style={{ color: 'white' }}></Card.Text>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="dashboard-card bg-blue" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#28a745' }}>
                <Card.Body>
                  <FaCalculator size={64} className="card-icon " />
                  <Card.Title>
                    <Link to="/E-Insurance/agent/commission-report" className="card-link " style={{ color: 'white' }}>Commission Report</Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} lg={3}>
              <Card className="dashboard-card bg-purple" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#ffc107' }}>
                <Card.Body>
                  <FaUsers size={64} className="card-icon " />
                  <Card.Title>
                    <Link to="/E-Insurance/agent/customer" className="card-link " style={{ color: 'white' }}>Customers</Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="dashboard-card bg-yellow" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#17a2b8' }}>
                <Card.Body>
                  <FaQuestionCircle size={64} className="card-icon " />
                  <Card.Title>
                    <Link to="/E-Insurance/agent/customer-queries" className="card-link " style={{ color: 'white' }}>View Queries</Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="dashboard-card bg-cyan" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#e83e8c' }}>
                <Card.Body>
                  <FaWallet size={64} className="card-icon " />
                  <Card.Title>
                    <Link to="/E-Insurance/agent/withdrawals" className="card-link " style={{ color: 'white' }}>Withdraw<br/><br/></Link>
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      {/* </div> */}
    </div>
  </Navbar>
  );
};

export default Navbar;
