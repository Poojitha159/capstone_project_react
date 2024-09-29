
// import React ,{useState}from 'react'; 
// import { Link, useNavigate} from 'react-router-dom';
// import { Card ,Col,Row} from 'react-bootstrap';
// import { FaUserPlus, FaUserEdit, FaEye, FaMoneyBillWave, FaClipboardCheck } from 'react-icons/fa';
// import { notify } from '../../../utils/globalToast'; 
// import './EmployeeDashboard.css'; // Add your custom CSS here 
// import { verifyUser } from '../../../services/authService';
// import { toast } from 'react-toastify';
// import { useEffect } from 'react';
// import { fetchCustomerCount } from '../../../services/adminDashboard';
 
// const EmployeeDashboard = () => { 
//   const navigate = useNavigate(); 
//   const [customerCount, setCustomerCount] = useState(0);  
 
  
//   const verify = async () => {
//     const token=localStorage.getItem('authToken');
//     try {
//         const response = await verifyUser(token,'employee',);
//         // Handle the response here
//         if (response) {
//             return true;
//         }
//         else {
//             return false;

//         }
//         //  console.log('User verified successfully:', response);
//     } catch (error) {
//         // Handle any errors
//         console.error('Error verifying user:', error);
//     }
// };
// useEffect(() => {
//     const token=localStorage.getItem('authToken');

//     if (!token || !verify()) {
//         toast.warn('Back to Login Page ! ')
//         navigate('/login/employee');

//     }
//     console.log( verify());

// })

 
//   const fetchCounts = async () => { 
//     try { 
//         const count = await fetchCustomerCount(); 
//         setCustomerCount(count); 
//     } catch (error) { 
//         console.error('Error fetching customer count:', error); 
//     } 
//   }; 
 
//   useEffect(() => { 
//     fetchCounts();  
//   }, []); 
 
//  const firstName=localStorage.getItem('firstName');
//   return ( 
//     // <div className="employee-dashboard"> 
    
       
//     //   <div className="container mt-4"> 
//     //   <h1>WELCOME  {firstName} </h1>
//     //     <div className="row"> 
//     //       <div className="col-md-4"> 
//     //         <div className="card mb-4"> 
//     //           <div className="card-body"> 
//     //             <h5 className="card-title">Agent Account</h5> 
//     //             <p className="card-text">Register a new agent account.</p> 
//     //             <Link to="/E-Insurance/employeedashboard/agent-registration" className="btn btn-primary">Go</Link> 
//     //           </div> 
//     //         </div> 
//     //       </div> 
           
//     //       <div className="col-md-4"> 
//     //         <div className="card mb-4"> 
//     //           <div className="card-body"> 
//     //             <h5 className="card-title">Manage Profile</h5> 
//     //             <p className="card-text">Edit your profile or change your password.</p> 
//     //             <div className="btn-group"> 
//     //               <Link to="/E-Insurance/employeedashboard/edit-profile" className="btn btn-primary">Edit Profile</Link> 
//     //               <Link to="/E-Insurance/employeedashboard/changeemployeepassword" className="btn btn-secondary">Change Password</Link> 
//     //             </div> 
//     //           </div> 
//     //         </div> 
//     //       </div> 
 
//     //       <div className="col-md-4"> 
//     //         <div className="card mb-4"> 
//     //           <div className="card-body"> 
//     //             <h5 className="card-title">View Customer</h5> 
//     //             <p className="card-text">View customer details.</p> 
//     //             <Link to="/E-Insurance/employeedashboard/viewcustomer" className="btn btn-primary">Go</Link> 
//     //           </div> 
//     //         </div> 
//     //       </div> 
 
//     //       <div className="col-md-4"> 
//     //         <div className="card mb-4"> 
//     //           <div className="card-body"> 
//     //             <h5 className="card-title">View Agent</h5> 
//     //             <p className="card-text">View agent details.</p> 
//     //             <Link to="/edit-agent" className="btn btn-primary">Go</Link> 
//     //           </div> 
//     //         </div> 
//     //       </div> 
 
//     //       <div className="col-md-4"> 
//     //         <div className="card mb-4"> 
//     //           <div className="card-body"> 
//     //             <h5 className="card-title">View Commission</h5> 
//     //             <p className="card-text">View commission details.</p> 
//     //             <Link to="/view-commission" className="btn btn-primary">Go</Link> 
//     //           </div> 
//     //         </div> 
            
//     //       </div>
          
//     //     </div> 
//     //   </div> 
      
//     // </div> 

//     <div className="employee-dashboard"> 
   
// <br/><br/>
//     <h1 className="mt-5 pt-4">Welcome {firstName}</h1> 
//     <br/>
//     <br/>

//     <Row className="mb-4 mt-4"> 
//       <Col md={3} className="d-flex"> 
//         <Card as={Link} to="/E-Insurance/employeedashboard/agent-registration" className="shadow p-3 flex-fill" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#007bff' }}> 
//           <Card.Body className="text-center"> 
//             <FaUserPlus size={40} color="white" /> 
//             <Card.Title style={{ color: 'white' }}>Register Agent</Card.Title> 
//             <Card.Text style={{ color: 'white' }}>Create a new agent account.</Card.Text> 
//           </Card.Body> 
//         </Card> 
//       </Col> 

//       <Col md={3} className="d-flex"> 
//         <Card as={Link} to="/E-Insurance/employeedashboard/edit-profile" className="shadow p-3 flex-fill" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#28a745' }}> 
//           <Card.Body className="text-center"> 
//             <FaUserEdit size={40} color="white" /> 
//             <Card.Title style={{ color: 'white' }}>Manage Profile</Card.Title> 
//             <Card.Text style={{ color: 'white' }}>Edit your profile or change your password.</Card.Text> 
//           </Card.Body> 
//         </Card> 
//       </Col> 

//       <Col md={3} className="d-flex"> 
//         <Card as={Link} to="/E-Insurance/employeedashboard/viewcustomer" className="shadow p-3 flex-fill" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#ffc107' }}> 
//           <Card.Body className="text-center"> 
//             <FaClipboardCheck size={40} color="black" /> {/* Updated icon */} 
//             <Card.Title style={{ color: 'black' }}>View Customer</Card.Title> 
//             <Card.Text style={{ color: 'black' }}>Access customer details.</Card.Text> 
//           </Card.Body> 
//         </Card> 
//       </Col> 

//       {/* <Col md={3} className="d-flex"> 
//         <Card as={Link} to="/view-commission" className="shadow p-3 flex-fill" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#6f42c1' }}> 
//           <Card.Body className="text-center"> 
//             <FaMoneyBillWave size={40} color="white" /> 
//             <Card.Title style={{ color: 'white' }}>View Commission</Card.Title> 
//             <Card.Text style={{ color: 'white' }}>See your commission details.</Card.Text> 
//           </Card.Body> 
//         </Card> 
//       </Col>  */}
//     </Row> 
//   </div> 
//   ); 
// }; 
 
// export default EmployeeDashboard;


import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { FaUserPlus, FaUserEdit, FaEye, FaMoneyBillWave, FaClipboardCheck } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { verifyUser } from '../../../services/authService';
import { fetchCustomerCount } from '../../../services/adminDashboard';
import './EmployeeDashboard.css'; // Add your custom CSS here 

const EmployeeDashboard = () => { 
  const navigate = useNavigate(); 
  const [customerCount, setCustomerCount] = useState(0);  

  const verify = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await verifyUser(token, 'employee');
      return response ? true : false;
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const checkVerification = async () => {
      if (!token || !(await verify())) {
        toast.warn('Back to Login Page!');
        navigate('/login/employee');
      }
    };
    checkVerification();
  }, [navigate]);

  const fetchCounts = async () => { 
    try { 
      const count = await fetchCustomerCount(); 
      setCustomerCount(count); 
    } catch (error) { 
      console.error('Error fetching customer count:', error); 
    } 
  }; 

  useEffect(() => { 
    fetchCounts();  
  }, []); 

  const firstName = localStorage.getItem('firstName');

  return ( 
    <div className="employee-dashboard text-center"> 
      <br /><br />
      <h1 className="mt-5 pt-4">Welcome {firstName}</h1> 
      <br /><br />
      <Row className="mb-4 mt-4 justify-content-center"> 
        <Col md={4} className="d-flex justify-content-center"> 
          <Card as={Link} to="/E-Insurance/employeedashboard/agent-registration" className="shadow p-4 flex-fill" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#007bff' }}> 
            <Card.Body className="text-center"> 
              <FaUserPlus size={60} color="white" /> 
              <Card.Title style={{ color: 'white' }}>Register Agent</Card.Title> 
              <Card.Text style={{ color: 'white' }}>Create a new agent account.</Card.Text> 
            </Card.Body> 
          </Card> 
        </Col> 

        <Col md={4} className="d-flex justify-content-center"> 
          <Card as={Link} to="/E-Insurance/employeedashboard/edit-profile" className="shadow p-4 flex-fill" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#28a745' }}> 
            <Card.Body className="text-center"> 
              <FaUserEdit size={60} color="white" /> 
              <Card.Title style={{ color: 'white' }}>Manage Profile</Card.Title> 
              <Card.Text style={{ color: 'white' }}>Edit your profile or change your password.</Card.Text> 
            </Card.Body> 
          </Card> 
        </Col> 

        <Col md={4} className="d-flex justify-content-center"> 
          <Card as={Link} to="/E-Insurance/employeedashboard/viewcustomer" className="shadow p-4 flex-fill" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#ffc107' }}> 
            <Card.Body className="text-center"> 
              <FaClipboardCheck size={60} color="black" /> 
              <Card.Title style={{ color: 'black' }}>View Customer</Card.Title> 
              <Card.Text style={{ color: 'black' }}>Access customer details.</Card.Text> 
            </Card.Body> 
          </Card> 
        </Col> 
      </Row> 
    </div> 
  ); 
}; 

export default EmployeeDashboard;
