
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
// import { Table, Button, Container, Card, Row, Col } from 'react-bootstrap'; // Use Bootstrap components
// import './InstallementsDetails.css'; // Optional custom CSS file

// const InstallmentDetails = () => {
//     const { insuranceId } = useParams(); // Get insuranceId from URL params
//     const token = localStorage.getItem('authToken');
//     const [customer, setCustomer] = useState(null);
//     const [installments, setInstallments] = useState([]);
//     const [policyDetails, setPolicyDetails] = useState(null); // Store policy details
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchDetails = async () => {
//             try {
//                 // Fetch customer, policy, and installments details using the existing endpoint
//                 const response = await axios.get(
//                     `http://localhost:8080/E-Insurance/customer/policies/${insuranceId}/customer-details`,
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );

//                 const data = response.data;
//                 setCustomer(data); // Set customer details
//                 if (data.insurancePolicies && data.insurancePolicies.length > 0) {
//                     setPolicyDetails(data.insurancePolicies[0]); // Set policy details
//                     setInstallments(data.insurancePolicies[0].payments); // Set installments
//                 }
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };

//         fetchDetails();
//     }, [insuranceId, token]);

//     const handlePayClick = (installmentAmount, index) => {
//         // Check if the previous installment is paid
//         if (index >0 && installments[index - 1].paymentStatus !== 'PAID') {
//             alert('You cannot pay this installment until the previous installment is paid.');
//             return;
//         }
//         navigate(`/payment/${insuranceId}`, {
//             state: {
//                 installmentAmount: installmentAmount, // Pass the installment amount to the payment page
//                 policyId: insuranceId, // Pass the policyId
//             },
//         });
//     };

//     return (
//         <Container className="my-4">
//             <h1 className="text-center mb-4">Installment Details</h1>

//             {/* Customer and Policy Details */}
//             <Row className="mb-4">
//                 {customer && (
//                     <Col md={6}>
//                         <Card className="shadow-sm custom-card mb-3">
//                             <Card.Header className="bg-primary text-white">Customer Details</Card.Header>
//                             <Card.Body>
//                                 <Table bordered hover responsive>
//                                     <tbody>
//                                         <tr>
//                                             <th>First Name</th>
//                                             <td>{customer.firstName}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Last Name</th>
//                                             <td>{customer.lastName}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Email</th>
//                                             <td>{customer.email}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Phone Number</th>
//                                             <td>{customer.phoneNumber}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>City</th>
//                                             <td>{customer.city_id}</td>
//                                         </tr>
//                                     </tbody>
//                                 </Table>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 )}

//                 {policyDetails && (
//                     <Col md={6}>
//                         <Card className="shadow-sm custom-card mb-3">
//                             <Card.Header className="bg-success text-white">Policy Details</Card.Header>
//                             <Card.Body>
//                                 <Table bordered hover responsive>
//                                     <tbody>
//                                         <tr>
//                                             <th>Policy ID</th>
//                                             <td>{policyDetails.insuranceId}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Insurance Scheme</th>
//                                             <td>{policyDetails.insuranceScheme}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Issued Date</th>
//                                             <td>{policyDetails.issuedDate}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Premium Amount</th>
//                                             <td>{policyDetails.premiumAmount}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Profit Ratio</th>
//                                             <td>{policyDetails.profitRatio}</td>
//                                         </tr>
//                                         <tr>
//                                             <th>Policy Term</th>
//                                             <td>{policyDetails.policyTerm} years</td>
//                                         </tr>
//                                     </tbody>
//                                 </Table>
//                             </Card.Body>
//                         </Card>
//                     </Col>
//                 )}
//             </Row>

//             {/* Installment Details */}
//             <Card className="shadow-sm custom-card">
//                 <Card.Header className="bg-info text-white">Installments</Card.Header>
//                 <Card.Body>
//                     <Table striped bordered hover responsive>
//                         <thead className="table-dark">
//                             <tr>
//                                 <th>Installment Number</th>
//                                 <th>Installment Date</th>
//                                 <th>Installment Amount</th>
//                                 <th>Status</th>
//                                 <th>Paid Date</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {installments.map((installment, index) => (
//                                 <tr key={index}>
//                                     <td>{installment.installmentNumber}</td>
//                                     <td>{installment.installmentDate}</td>
//                                     <td>{installment.installmentAmount}</td>
//                                     <td>{installment.paymentStatus}</td>
//                                     <td>{installment.paidDate || 'N/A'}</td>
//                                     <td>
//                                         {installment.paymentStatus === 'Unpaid' && (
//                                             <Button
//                                                 variant="success"
//                                                 size="sm"
//                                                 // onClick={() => handlePayClick(installment.installmentAmount)}
//                                                 onClick={() => handlePayClick(installment.installmentAmount, index)}

//                                             >
//                                                 Pay
//                                             </Button>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </Card.Body>
//             </Card>
//         </Container>
//     );
// };

// export default InstallmentDetails;
// //==============================================================

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap'; // Use Bootstrap components
import './InstallementsDetails.css'; // Optional custom CSS file

const InstallmentDetails = () => {
    const { insuranceId } = useParams(); // Get insuranceId from URL params
    const token = localStorage.getItem('authToken');
    const [customer, setCustomer] = useState(null);
    const [installments, setInstallments] = useState([]);
    const [policyDetails, setPolicyDetails] = useState(null); // Store policy details
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                // Fetch customer, policy, and installments details using the existing endpoint
                const response = await axios.get(
                    `http://localhost:8080/E-Insurance/customer/policies/${insuranceId}/customer-details`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;
                setCustomer(data); // Set customer details
                if (data.insurancePolicies && data.insurancePolicies.length > 0) {
                    setPolicyDetails(data.insurancePolicies[0]); // Set policy details
                    setInstallments(data.insurancePolicies[0].payments); // Set installments
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchDetails();
    }, [insuranceId, token]);

    const handlePayClick = (installmentAmount, index) => {
        // Check if the previous installment is paid
        if (index > 0 && installments[index - 1].paymentStatus !== 'PAID') {
            alert('You cannot pay this installment until the previous installment is paid.');
            return;
        }
        navigate(`/payment/${insuranceId}`, {
            state: {
                installmentAmount: installmentAmount, // Pass the installment amount to the payment page
                policyId: insuranceId, // Pass the policyId
            },
        });
    };

    return (
        <div className="my-4">
            <h1 className="text-center mb-4">Installment Details</h1>

            {/* Customer Details */}
            {customer && (
                <Table bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th colSpan="2">Customer Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>First Name</th>
                            <td>{customer.firstName}</td>
                        </tr>
                        <tr>
                            <th>Last Name</th>
                            <td>{customer.lastName}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>{customer.email}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>{customer.phoneNumber}</td>
                        </tr>
                        {/* <tr>
                            <th>City</th>
                            <td>{customer.city_id}</td>
                        </tr> */}
                    </tbody>
                </Table>
            )}

            {/* Policy Details */}
            {policyDetails && (
                <Table bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th colSpan="2">Policy Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Policy ID</th>
                            <td>{policyDetails.insuranceId}</td>
                        </tr>
                        <tr>
                            <th>Insurance Scheme</th>
                            <td>{policyDetails.insuranceScheme}</td>
                        </tr>
                        <tr>
                            <th>Issued Date</th>
                            <td>{policyDetails.issuedDate}</td>
                        </tr>
                        <tr>
                            <th>Premium Amount</th>
                            <td>{policyDetails.premiumAmount}</td>
                        </tr>
                        <tr>
                            <th>Profit Ratio</th>
                            <td>{policyDetails.profitRatio}</td>
                        </tr>
                        <tr>
                            <th>Policy Term</th>
                            <td>{policyDetails.policyTerm} years</td>
                        </tr>
                        <tr>
                            <th>Agent</th>
                            <td>{policyDetails.agentId}</td>
                        </tr>
                    </tbody>
                </Table>
            )}
            <div>
                        <h4>Installments</h4>
                        </div>
            {/* Installment Details */}
            <Table striped bordered hover>
                
            
                <thead className="table-dark">
               
                    <tr>
                        <th>Installment Number</th>
                        <th>Installment Date</th>
                        <th>Installment Amount</th>
                        <th>Status</th>
                        <th>Paid Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {installments.map((installment, index) => (
                        <tr key={index}>
                            <td>{installment.installmentNumber}</td>
                            <td>{installment.installmentDate}</td>
                            <td>{installment.installmentAmount}</td>
                            <td>{installment.paymentStatus}</td>
                            <td>{installment.paidDate || 'N/A'}</td>
                            <td>
                                {installment.paymentStatus === 'Unpaid' && (
                                    <Button
                                        variant="success"
                                        size="sm"
                                        onClick={() => handlePayClick(installment.installmentAmount, index)}
                                    >
                                        Pay
                                    </Button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default InstallmentDetails;
