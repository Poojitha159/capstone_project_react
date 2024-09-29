


// import React, { useEffect, useState } from 'react'; 
// import { Card, Row, Col } from 'react-bootstrap'; 
// import { Link, useNavigate } from 'react-router-dom'; 
// import { verifyUser } from '../../../services/authService';
// import { toast } from 'react-toastify';
// import './CustomerDasdhboard.css'; // Make sure to update your CSS file name if needed
// import { FaClipboardList, FaComments, FaUserFriends, FaFileAlt } from 'react-icons/fa'; 

// const CustomerDashboard = () => {
//     const [totalPolicies, setTotalPolicies] = useState(0); 
//     const [totalQueries, setTotalQueries] = useState(0); 
//     const [activeAgents, setActiveAgents] = useState(0); 
//     const [customerPoliciesCount, setCustomerPoliciesCount] = useState(0); 

//     const navigate = useNavigate();
//     const firstName = localStorage.getItem('firstName');

//     const verify = async () => {
//         const token = localStorage.getItem('authToken');
//         try {
//             const response = await verifyUser(token, 'customer');
//             return response ? true : false;
//         } catch (error) {
//             console.error('Error verifying user:', error);
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem('authToken');

//         if (!token || !verify()) {
//             toast.warn('Back to Login Page!');
//             navigate('/login/customer');
//         }
//     }, [navigate]);

//     return ( 
//         <div className="customer-dashboard"> 
//             <h1 className="mt-3 pt-2 text-center">Welcome, {firstName}</h1> 
//             <br/>
//             <Row className="justify-content-center"> {/* Centering the row */} 
//                 <Col md={3} xs={12} className="mb-3"> 
//                     <Card as={Link} to="/E-Insurance/customer/customerpolicies" className="shadow p-4 text-center" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#007bff', height: '200px' }}> 
//                         <Card.Body> 
//                             <FaClipboardList size={50} color="white" /> 
//                             <Card.Title style={{ color: 'white' }}>Total Policies</Card.Title> 
//                             <Card.Text style={{ color: 'white' }}> 
//                                 {/* {totalPolicies}  */}
//                             </Card.Text> 
//                         </Card.Body> 
//                     </Card> 
//                 </Col> 
//                 <Col md={3} xs={12} className="mb-3"> 
//                     <Card as={Link} to="/E-Insurance/customer/queries" className="shadow p-4 text-center" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#28a745', height: '200px' }}> 
//                         <Card.Body> 
//                             <FaComments size={50} color="white" /> 
//                             <Card.Title style={{ color: 'white' }}>Total Queries</Card.Title> 
//                             <Card.Text style={{ color: 'white' }}> 
//                                 {/* {totalQueries}  */}
//                             </Card.Text> 
//                         </Card.Body> 
//                     </Card> 
//                 </Col> 
//                 <Col md={3} xs={12} className="mb-3"> 
//                     <Card as={Link} to="/E-Insurance/customerdashboard/policy-installments" className="shadow p-4 text-center" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#17a2b8', height: '200px' }}> 
//                         <Card.Body> 
//                             <FaFileAlt size={50} color="white" /> 
//                             <Card.Title style={{ color: 'white' }}>Customer Policies</Card.Title> 
//                             <Card.Text style={{ color: 'white' }}> 
//                                 {/* {customerPoliciesCount}  */}
//                             </Card.Text> 
//                         </Card.Body> 
//                     </Card> 
//                 </Col> 
//                 </Row><Row>
//                 <Col md={3} xs={12} className="mb-3"> 
//                     <Card as={Link} to="/E-Insurance/customerdashboard/edit-customerprofile" className="shadow p-4 text-center" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#40E0D0', height: '200px' }}> 
//                         <Card.Body> 
//                             <FaComments size={50} color="white" /> 
//                             <Card.Title style={{ color: 'white' }}>Profile</Card.Title> 
//                             <Card.Text style={{ color: 'white' }}> 
//                                 {/* {totalQueries}  */}
//                             </Card.Text> 
//                         </Card.Body> 
//                     </Card> 
//                 </Col> 
//                 <Col md={3} xs={12} className="mb-3"> 
//                     <Card as={Link} to="/E-Insurance/customerdashboard/changecustomerpassword" className="shadow p-4 text-center" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#DAA520', height: '200px' }}> 
//                         <Card.Body> 
//                             <FaComments size={50} color="white" /> 
//                             <Card.Title style={{ color: 'white' }}>Profile</Card.Title> 
//                             <Card.Text style={{ color: 'white' }}> 
//                                 {/* {totalQueries}  */}
//                             </Card.Text> 
//                         </Card.Body> 
//                     </Card> 
//                 </Col> 
//             </Row> 
//         </div> 
//     ); 
// }; 

// export default CustomerDashboard;


import React, { useEffect, useState } from 'react'; 
import { Card, Row, Col } from 'react-bootstrap'; 
import { Link, useNavigate } from 'react-router-dom'; 
import { verifyUser } from '../../../services/authService';
import { toast } from 'react-toastify';
// import './CustomerDashboard.css'; // Make sure to update your CSS file name if needed
import { FaClipboardList, FaComments, FaFileAlt, FaUserEdit, FaLock } from 'react-icons/fa'; 

const CustomerDashboard = () => {
    const [totalPolicies, setTotalPolicies] = useState(0); 
    const [totalQueries, setTotalQueries] = useState(0); 
    const [customerPoliciesCount, setCustomerPoliciesCount] = useState(0); 

    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName');

    const verify = async () => {
        const token = localStorage.getItem('authToken');
        try {
            const response = await verifyUser(token, 'customer');
            return response ? true : false;
        } catch (error) {
            console.error('Error verifying user:', error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!token || !verify()) {
            toast.warn('Back to Login Page!');
            navigate('/login/customer');
        }
    }, [navigate]);

    return ( 
        <div className="customer-dashboard"> 
            <h1 className="mt-3 pt-2 text-center">Welcome, {firstName}</h1> 
            <br/>
            <Row className="justify-content-center"> {/* Centering the row */} 
                <Col md={3} xs={12} className="mb-3"> 
                    <Card as={Link} to="/E-Insurance/customer/customerpolicies" 
                          className="shadow p-4 text-center" 
                          style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#007bff', height: '200px' }}> 
                        <Card.Body> 
                            <FaClipboardList size={50} color="white" /> 
                            <Card.Title style={{ color: 'white' }}>Total Policies</Card.Title> 
                            <Card.Text style={{ color: 'white' }}> 
                                {/* {totalPolicies}  */}
                            </Card.Text> 
                        </Card.Body> 
                    </Card> 
                </Col> 
                <Col md={3} xs={12} className="mb-3"> 
                    <Card as={Link} to="/E-Insurance/customer/queries" 
                          className="shadow p-4 text-center" 
                          style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#28a745', height: '200px' }}> 
                        <Card.Body> 
                            <FaComments size={50} color="white" /> 
                            <Card.Title style={{ color: 'white' }}>Total Queries</Card.Title> 
                            <Card.Text style={{ color: 'white' }}> 
                                {/* {totalQueries}  */}
                            </Card.Text> 
                        </Card.Body> 
                    </Card> 
                </Col> 
                <Col md={3} xs={12} className="mb-3"> 
                    <Card as={Link} to="/E-Insurance/customerdashboard/policy-installments" 
                          className="shadow p-4 text-center" 
                          style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#17a2b8', height: '200px' }}> 
                        <Card.Body> 
                            <FaFileAlt size={50} color="white" /> 
                            <Card.Title style={{ color: 'white' }}>Customer Policies</Card.Title> 
                            <Card.Text style={{ color: 'white' }}> 
                                {/* {customerPoliciesCount}  */}
                            </Card.Text> 
                        </Card.Body> 
                    </Card> 
                </Col> 
            </Row>
            <Row className="justify-content-center"> {/* Centering the next row of cards */}
                <Col md={3} xs={12} className="mb-3"> 
                    <Card as={Link} to="/E-Insurance/customerdashboard/edit-customerprofile" 
                          className="shadow p-4 text-center" 
                          style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#40E0D0', height: '200px' }}> 
                        <Card.Body> 
                            <FaUserEdit size={50} color="white" /> 
                            <Card.Title style={{ color: 'white' }}>Edit Profile</Card.Title> 
                            <Card.Text style={{ color: 'white' }}> 
                                {/* Additional Info if Needed */}
                            </Card.Text> 
                        </Card.Body> 
                    </Card> 
                </Col> 
                <Col md={3} xs={12} className="mb-3"> 
                    <Card as={Link} to="/E-Insurance/customerdashboard/changecustomerpassword" 
                          className="shadow p-4 text-center" 
                          style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#DAA520', height: '200px' }}> 
                        <Card.Body> 
                            <FaLock size={50} color="white" /> 
                            <Card.Title style={{ color: 'white' }}>Change Password</Card.Title> 
                            <Card.Text style={{ color: 'white' }}> 
                                {/* Additional Info if Needed */}
                            </Card.Text> 
                        </Card.Body> 
                    </Card> 
                </Col> 
            </Row>
        </div> 
    ); 
}; 

export default CustomerDashboard;
