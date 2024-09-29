
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, Button, Row, Col } from 'react-bootstrap';
import './AdminDashboard.css';
import { FaUsers, FaClipboardList, FaTags, FaCity, FaMapMarkedAlt, FaUser, FaMoneyBillWave } from 'react-icons/fa';
import { fetchEmployeeCount, fetchAgentCount, fetchInsurancePlanCount,fetchInsuranceSchemeCount,fetchCityCount, fetchStateCount,fetchCustomerCount,fetchTaxSettingsCount} from '../../../services/adminDashboard.js';
import { toast } from 'react-toastify';
import { verifyUser } from '../../../services/authService.js';
import SetTaxModal from '../taxSettingMnagement/SetTaxModal.js';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [showTaxModal, setShowTaxModal] = useState(false); // State to handle modal visibility

   

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (!token || !verifyUser(token, 'admin')) {
            toast.warn('Back to Login Page ! ');
            navigate('/login/admin');
        }
    }, [navigate]);
    const firstName = localStorage.getItem('firstName');

    const [counts, setCounts] = useState({
        employeeCount: 0,
        agentCount: 0,
        insurancePlanCount: 0,
        insuranceSchemeCount: 0,
        cityCount: 0,
        stateCount: 0,
        customerCount: 0,
        taxSettingsCount: 0
    });

    useEffect(() => {
        const fetchCounts = async () => {
            try {
                const employeeCount = await fetchEmployeeCount();
                const agentCount = await fetchAgentCount();
                const insurancePlanCount = await fetchInsurancePlanCount();
                const insuranceSchemeCount = await fetchInsuranceSchemeCount();
                const cityCount = await fetchCityCount();
                const stateCount = await fetchStateCount();
                const customerCount = await fetchCustomerCount();
                const taxSettingsCount = await fetchTaxSettingsCount();

                setCounts({
                    employeeCount,
                    agentCount,
                    insurancePlanCount,
                    insuranceSchemeCount,
                    cityCount,
                    stateCount,
                    customerCount,
                    taxSettingsCount
                });
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        fetchCounts();
    }, []);
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('UserRole');
        localStorage.removeItem('customerId');
        localStorage.removeItem('userId');
        localStorage.clear();
        navigate('/');
        toast.info('Back to LoginBoard!');
    };

    return (
        // <div className="admin-dashboard">
        //     <div className="main-panel">
        //         <h1>Welcome {firstName}</h1>
        //         <Row className="mb-4">
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={employeeImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage Employees</Card.Title>
        //                         <Button variant="primary" as={Link} to="/E-Insurance/admindashboard/employees" className="card-button">Go to Employees</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={agentImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage Agents</Card.Title>
        //                         <Button variant="primary" as={Link} to="/E-Insurance/admindashboard/agents" className="card-button">Go to Agents</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={plansImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage Insurance Plans</Card.Title>
        //                         <Button variant="primary" as={Link} to="/E-Insurance/admindashboard/plans" className="card-button">Go to Plans</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={schemesImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage Insurance Schemes</Card.Title>
        //                         <Button variant="primary" as={Link} to="/E-Insurance/admindashboard/schemes" className="card-button">Go to Schemes</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //         </Row>
        //         <Row>
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={taxImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage Tax Settings</Card.Title>
        //                         <Button variant="primary" onClick={() => setShowTaxModal(true)} className="card-button">Set Tax</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={citiesImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage Cities</Card.Title>
        //                         <Button variant="primary" as={Link} to="/E-Insurance/admindashboard/cities" className="card-button">Go to Cities</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={statesImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage States</Card.Title>
        //                         <Button variant="primary" as={Link} to="/E-Insurance/admindashboard/states" className="card-button">Go to States</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //             <Col md={6} lg={3}>
        //                 <Card className="dashboard-card">
        //                     <Card.Img variant="top" src={taxImage} />
        //                     <Card.Body>
        //                         <Card.Title>Manage Customers</Card.Title>
        //                         <Button variant="primary" as={Link} to="/E-Insurance/admindashboard/viewcustomers" className="card-button">View Customers</Button>
        //                     </Card.Body>
        //                 </Card>
        //             </Col>
        //         </Row>
        //     </div>

        //     {/* SetTaxModal Component */}
        //     <SetTaxModal show={showTaxModal} onHide={() => setShowTaxModal(false)} />
        // </div>

        <div className="admin-dashboard">
           
            <h1>Welcome {firstName}</h1>
                     <Row className="mb-4">
                <Col md={3} xs={12} className="mb-3">
                    <Card as={Link} to="/E-Insurance/admindashboard/employees" className="shadow p-3" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#007bff' }}>
                        <Card.Body className="text-center">
                            <FaUsers size={50} color="white" />
                            <Card.Title style={{ color: 'white' }}>Total Employees</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{counts.employeeCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} xs={12} className="mb-3">
                    <Card as={Link} to="/E-Insurance/admindashboard/agents" className="shadow p-3" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#28a745' }}>
                        <Card.Body className="text-center">
                            <FaClipboardList size={50} color="white" />
                            <Card.Title style={{ color: 'white' }}>Total Agents</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{counts.agentCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} xs={12} className="mb-3">
                    <Card as={Link} to="/E-Insurance/admindashboard/plans" className="shadow p-3" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#ffc107' }}>
                        <Card.Body className="text-center">
                            <FaTags size={50} color="black" />
                            <Card.Title style={{ color: 'black' }}>Total Insurance Plans</Card.Title>
                            <Card.Text style={{ color: 'black' }}>{counts.insurancePlanCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} xs={12} className="mb-3">
                    <Card as={Link} to="/E-Insurance/admindashboard/schemes" className="shadow p-3" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#17a2b8' }}>
                        <Card.Body className="text-center">
                            <FaCity size={50} color="white" />
                            <Card.Title style={{ color: 'white' }}>Total Insurance Schemes</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{counts.insuranceSchemeCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col md={3} xs={12} className="mb-3">
                    <Card as={Link} to="/E-Insurance/admindashboard/cities" className="shadow p-3" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#6f42c1' }}>
                        <Card.Body className="text-center">
                            <FaMapMarkedAlt size={50} color="white" />
                            <Card.Title style={{ color: 'white' }}>Total Cities</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{counts.cityCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} xs={12} className="mb-3">
                    <Card as={Link} to="/E-Insurance/admindashboard/states" className="shadow p-3" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#e83e8c' }}>
                        <Card.Body className="text-center">
                            <FaMapMarkedAlt size={50} color="white" />
                            <Card.Title style={{ color: 'white' }}>Total States</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{counts.stateCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} xs={12} className="mb-3">
                    <Card as={Link} to="/E-Insurance/admindashboard/viewcustomers" className="shadow p-3" style={{ textDecoration: 'none', color: 'inherit', backgroundColor: '#343a40' }}>
                        <Card.Body className="text-center">
                            <FaUsers size={50} color="white" />
                            <Card.Title style={{ color: 'white' }}>Total Customers</Card.Title>
                            <Card.Text style={{ color: 'white' }}>{counts.customerCount}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={3} xs={12} className="mb-3">
    <Card 
        className="shadow p-3" 
        style={{ backgroundColor: '#ff851b', color: 'white', cursor: 'pointer' }} 
        onClick={() => setShowTaxModal(true)} // Add this line
    >
        <Card.Body className="text-center">
            <FaMoneyBillWave size={50} color="white" />
            <Card.Title style={{ color: 'white' }}>Total Tax Settings</Card.Title>
            <Card.Text style={{ color: 'white' }}>{counts.taxSettingsCount}</Card.Text>
        </Card.Body>
    </Card>
</Col>

            </Row>
            <SetTaxModal show={showTaxModal} onHide={() => setShowTaxModal(false)} />
            

        </div>

    );
};

export default AdminDashboard;
