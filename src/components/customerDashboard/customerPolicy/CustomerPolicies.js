// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ClaimPolicy from '../claimPolicy/ClaimPolicy';

// const CustomerPolicies = ({ customerId }) => {
//     const [policies, setPolicies] = useState([]);
//     const [showClaimModal, setShowClaimModal] = useState(false);
//     const [selectedPolicy, setSelectedPolicy] = useState(null);
//     customerId = localStorage.getItem('customerId');
//     const token = localStorage.getItem('authToken'); 
//     const navigate = useNavigate();


//     useEffect(() => {
//         const fetchPolicies = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/customer/customers/${customerId}/policies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}` // Set the token in the headers
//                     }
//                 });

//                 setPolicies(response.data.content); // Adjust based on your API response structure
//             } catch (error) {
//                 console.error("Error fetching policies:", error);
//             }
//         };


//         fetchPolicies();
//     }, [customerId]);
//      // Handle claim button click
//      const handleClaimClick = (policy) => {
//         setSelectedPolicy(policy);
//         setShowClaimModal(true);
//     };


//     return (
//         <div>
//             <h1>Your Policies</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Insurance Scheme</th>
//                         <th>Issued Date</th>
//                         <th>Premium Amount</th>
//                         <th>Installments</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {policies.map(policy => (
//                         <tr key={policy.insuranceId}>
//                             <td>{policy.insuranceId}</td>
//                             <td>{policy.insuranceScheme}</td>
//                             <td>{policy.issuedDate}</td>
//                             <td>{policy.premiumAmount}</td>
//                             {/* <button onClick={() => navigate(`/policies/${policy.insuranceId}/installments`, { state: { policy } })}>
//                                     View Installments
//                                 </button>
//                                  */}
//                                  <button onClick={() => navigate(`/installments/${policy.insuranceId}`, { state: { policy } })}>
//     View Installments
// </button>
// <button onClick={() => handleClaimClick(policy)}>Claim</button>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render the ClaimPolicy component if showClaimModal is true */}
//             {showClaimModal && (
//                 <ClaimPolicy
//                     policyId={selectedPolicy.insuranceId}
//                     customerId={customerId}
//                     onClose={() => setShowClaimModal(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default CustomerPolicies;

//=======================================
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import ClaimPolicy from '../claimPolicy/ClaimPolicy';
// const CustomerPolicies = ({ customerId }) => {
//     const [policies, setPolicies] = useState([]);
//     const [showClaimModal, setShowClaimModal] = useState(false);
//     const [selectedPolicy, setSelectedPolicy] = useState(null);
//     customerId = localStorage.getItem('customerId');
//     const token = localStorage.getItem('authToken'); 
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPolicies = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/customer/customers/${customerId}/policies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setPolicies(response.data.content); // Adjust based on your API response structure
//                 console.log('==================================')
//                 console.log(response.data.content);
//             } catch (error) {
//                 console.error('Error fetching policies:', error);
//             }
//         };
//         fetchPolicies();
//     }, [customerId]);


//     // Handle claim button click
//     const handleClaimClick = (policy) => {
//         console.log('Claim button clicked for policy:', policy);
//         setSelectedPolicy(policy);
//         setShowClaimModal(true);
//     };

//     return (
//         <div>
//             <h1>Your Policies</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Insurance Scheme</th>
//                         <th>Issued Date</th>
//                         <th>Premium Amount</th>
//                         <th>Actions</th>

//                     </tr>
//                 </thead>
//                 <tbody>

//                     {policies.map((policy) => (

//                         <tr key={policy.insuranceId}>
//                             <td>{policy.insuranceId}</td>
//                             <td>{policy.insuranceScheme}</td>
//                             <td>{policy.issuedDate}</td>
//                             <td>{policy.premiumAmount}</td>
//                             <td>
//                                 <button
//                                     onClick={() => navigate(`/installments/${policy.insuranceId}`, { state: { policy,insuranceId: policy.insuranceId } })}
//                                 >
//                                     View Installments
//                                 </button>
//                                 <button onClick={() => handleClaimClick(policy)} style={{ display: 'inline-block', margin: '5px' }}>
//     Claim
// </button></td>

//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Render the ClaimPolicy component if showClaimModal is true */}
//             {showClaimModal && (
//                 <ClaimPolicy
//                     policyId={selectedPolicy.insuranceId}
//                     customerId={customerId}
//                     onClose={() => setShowClaimModal(false)}
//                 />
//             )}
//         </div>
//     );
// };

// export default CustomerPolicies;
//===============================================

//================================================ corretct code
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button, Table, Container, Modal } from 'react-bootstrap';
// import ClaimPolicy from '../claimPolicy/ClaimPolicy';
// import './CustomerPolicies.css';
// const CustomerPolicies = ({ customerId }) => {
//     const [policies, setPolicies] = useState([]);
//     const [showClaimModal, setShowClaimModal] = useState(false);
//     const [selectedPolicy, setSelectedPolicy] = useState(null);
//     customerId = localStorage.getItem('customerId');
//     const token = localStorage.getItem('authToken');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPolicies = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/customer/customers/${customerId}/policies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });
//                 setPolicies(response.data.content); // Adjust based on your API response structure
//             } catch (error) {
//                 console.error('Error fetching policies:', error);
//             }
//         };
//         fetchPolicies();
//     }, [customerId]);

//     // Handle claim button click
//     const handleClaimClick = (policy) => {
//         setSelectedPolicy(policy);
//         setShowClaimModal(true);
//     };

//     return (
//         <Container className="my-5">
//             <h1 className="mb-4">Your Policies</h1>
//             <Table striped bordered hover responsive className="policy-table">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Insurance Scheme</th>
//                         <th>Issued Date</th>
//                         <th>Premium Amount</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {policies.map((policy) => (
//                         <tr key={policy.insuranceId}>
//                             <td>{policy.insuranceId}</td>
//                             <td>{policy.insuranceScheme}</td>
//                             <td>{policy.issuedDate}</td>
//                             <td>${policy.premiumAmount.toFixed(2)}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     onClick={() => navigate(`/installments/${policy.insuranceId}`, { state: { policy, insuranceId: policy.insuranceId } })}
//                                     className="me-2"
//                                 >
//                                     View Installments
//                                 </Button>
//                                 <Button
//                                     variant="warning"
//                                     size="sm"
//                                     onClick={() => handleClaimClick(policy)}
//                                 >
//                                     Claim
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Render the ClaimPolicy component if showClaimModal is true */}
//             <Modal show={showClaimModal} onHide={() => setShowClaimModal(false)} centered>
//                 <ClaimPolicy
//                     policyId={selectedPolicy?.insuranceId}
//                     customerId={customerId}
//                     onClose={() => setShowClaimModal(false)}
//                 />
//             </Modal>
//         </Container>
//     );
// };

// export default CustomerPolicies;

//===============================================
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button, Table, Container, Modal, Pagination, Form } from 'react-bootstrap';
// import ClaimPolicy from '../claimPolicy/ClaimPolicy';
// import './CustomerPolicies.css';

// const CustomerPolicies = ({ customerId }) => {
//     const [policies, setPolicies] = useState([]);
//     const [showClaimModal, setShowClaimModal] = useState(false);
//     const [selectedPolicy, setSelectedPolicy] = useState(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [pageSize, setPageSize] = useState(10);

//     customerId = localStorage.getItem('customerId');
//     const token = localStorage.getItem('authToken');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPolicies = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/customer/customers/${customerId}/policies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         page: currentPage,
//                         size: pageSize,
//                     },
//                 });
//                 setPolicies(response.data.content);
//                 setTotalPages(response.data.totalPages);
//             } catch (error) {
//                 console.error('Error fetching policies:', error);
//             }
//         };
//         fetchPolicies();
//     }, [customerId, currentPage, pageSize]);

//     // Handle claim button click
//     // Handle claim/cancel button click
//     const handleClaimClick = (policy) => {
//         setSelectedPolicy(policy);

//         setShowClaimModal(true);
//     };

//     // Handle page change
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     // Handle page size change
//     const handlePageSizeChange = (event) => {
//         setPageSize(parseInt(event.target.value));
//         setCurrentPage(0); // Reset to first page whenever page size changes
//     };

//     return (
//         <Container className="my-5">
//             <h1 className="mb-4">Your Policies</h1>

//             <Form.Group controlId="pageSize" className="mb-3">
//                 <Form.Label>Page Size:</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={pageSize}
//                     onChange={handlePageSizeChange}
//                     style={{ width: '100px', display: 'inline-block', marginLeft: '10px' }}
//                 >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                 </Form.Control>
//             </Form.Group>

//             <Table striped bordered hover responsive className="policy-table">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Insurance Scheme</th>
//                         <th>Issued Date</th>
//                         <th>Premium Amount</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {policies.map((policy) => (
//                         <tr key={policy.insuranceId}>
//                             <td>{policy.insuranceId}</td>
//                             <td>{policy.insuranceScheme}</td>
//                             <td>{policy.issuedDate}</td>
//                             <td>${policy.premiumAmount.toFixed(2)}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     onClick={() => navigate(`/installments/${policy.insuranceId}`, { state: { policy, insuranceId: policy.insuranceId } })}
//                                     className="me-2"
//                                 >
//                                     View Installments
//                                 </Button>
//                                 <Button
//                                     variant="warning"
//                                     size="sm"
//                                     onClick={() => handleClaimClick(policy)}
//                                 >
//                                     Claim
//                                 </Button>

//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Pagination Controls */}
//             <Pagination className="justify-content-center my-4">
//                 <Pagination.First onClick={() => handlePageChange(0)} disabled={currentPage === 0} />
//                 <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
//                 {[...Array(totalPages).keys()].map(page => (
//                     <Pagination.Item
//                         key={page}
//                         active={page === currentPage}
//                         onClick={() => handlePageChange(page)}
//                     >
//                         {page + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
//                 <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
//             </Pagination>

//             {/* Render the ClaimPolicy component if showClaimModal is true */}
//             <ClaimPolicy
//                 show={showClaimModal}
//                 policyId={selectedPolicy?.insuranceId}
//                 customerId={customerId}
//                 onClose={() => setShowClaimModal(false)}

//             />
//         </Container>
//     );
// };

// export default CustomerPolicies;
// // ===================================0000000000000000000
// 11111111111111
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button, Table, Container, Pagination, Form, Modal } from 'react-bootstrap';
// import ClaimPolicy from '../claimPolicy/ClaimPolicy';
// import './CustomerPolicies.css';

// const CustomerPolicies = ({ customerId }) => {
//     const [policies, setPolicies] = useState([]);
//     const [showClaimModal, setShowClaimModal] = useState(false);
//     const [selectedPolicy, setSelectedPolicy] = useState(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [pageSize, setPageSize] = useState(10);
//     const [documents, setDocuments] = useState([]); // To store fetched documents
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false); // For document modal visibility

//     customerId = localStorage.getItem('customerId');
//     const token = localStorage.getItem('authToken');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchPolicies = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/customer/customers/${customerId}/policies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         page: currentPage,
//                         size: pageSize,
//                     },
//                 });
//                 setPolicies(response.data.content);
//                 setTotalPages(response.data.totalPages);
//             } catch (error) {
//                 console.error('Error fetching policies:', error);
//             }
//         };
//         fetchPolicies();
//     }, [customerId, currentPage, pageSize]);

//     // Handle claim button click
//     const handleClaimClick = (policy) => {
//         setSelectedPolicy(policy);
//         setShowClaimModal(true);
//     };

//     // Handle view documents button click
//     const handleViewDocumentsClick = async (policy) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/E-Insurance/customer/policys/${policy.insuranceId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });
//             setDocuments(response.data); // Store documents in state
//             setShowDocumentsModal(true); // Show modal after fetching documents
//         } catch (error) {
//             console.error('Error fetching documents:', error);
//         }
//     };

//     // View individual document
//     const viewDocument = async (documentImage) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/E-Insurance/file/view/${documentImage}`, {
//                 responseType: 'blob', // Handle the file as binary
//             });

//             const contentType = response.headers['content-type'];
//             const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
//             const link = document.createElement('a');
//             link.href = url;

//             // If it's a viewable type like an image or PDF, open it in a new tab
//             if (contentType.includes('image') || contentType === 'application/pdf') {
//                 link.setAttribute('target', '_blank');
//             }

//             link.click(); // Trigger file view/download
//         } catch (error) {
//             console.error('Error fetching document:', error);
//         }
//     };

//     // Handle page change
//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     // Handle page size change
//     const handlePageSizeChange = (event) => {
//         setPageSize(parseInt(event.target.value));
//         setCurrentPage(0); // Reset to first page whenever page size changes
//     };

//     // Close documents modal
//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//     };

//     return (
//         <Container className="my-5">
//             <h1 className="mb-4">Your Policies</h1>

//             <Form.Group controlId="pageSize" className="mb-3">
//                 <Form.Label>Page Size:</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={pageSize}
//                     onChange={handlePageSizeChange}
//                     style={{ width: '100px', display: 'inline-block', marginLeft: '10px' }}
//                 >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                 </Form.Control>
//             </Form.Group>

//             <Table striped bordered hover responsive className="policy-table">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Insurance Scheme</th>
//                         <th>Issued Date</th>
//                         <th>Premium Amount</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {policies.map((policy) => (
//                         <tr key={policy.insuranceId}>
//                             <td>{policy.insuranceId}</td>
//                             <td>{policy.insuranceScheme}</td>
//                             <td>{policy.issuedDate}</td>
//                             <td>${policy.premiumAmount.toFixed(2)}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     onClick={() => navigate(`/installments/${policy.insuranceId}`, { state: { policy, insuranceId: policy.insuranceId } })}
//                                     className="me-2"
//                                 >
//                                     View Installments
//                                 </Button>
//                                 <Button
//                                     variant="warning"
//                                     size="sm"
//                                     onClick={() => handleClaimClick(policy)}
//                                     className="me-2"
//                                 >
//                                     Claim
//                                 </Button>
//                                 <Button
//                                     variant="secondary"
//                                     size="sm"
//                                     onClick={() => handleViewDocumentsClick(policy)}
//                                 >
//                                     View Documents
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Pagination Controls */}
//             <Pagination className="justify-content-center my-4">
//                 <Pagination.First onClick={() => handlePageChange(0)} disabled={currentPage === 0} />
//                 <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
//                 {[...Array(totalPages).keys()].map(page => (
//                     <Pagination.Item
//                         key={page}
//                         active={page === currentPage}
//                         onClick={() => handlePageChange(page)}
//                     >
//                         {page + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
//                 <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
//             </Pagination>

//             {/* Render the ClaimPolicy component if showClaimModal is true */}
//             <ClaimPolicy
//                 show={showClaimModal}
//                 policyId={selectedPolicy?.insuranceId}
//                 customerId={customerId}
//                 onClose={() => setShowClaimModal(false)}
//             />

//             {/* Modal to show documents */}
//             <Modal show={showDocumentsModal} onHide={handleCloseDocumentsModal} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Submitted Documents</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     {documents.length > 0 ? (
//                         <Table striped bordered hover responsive>
//                             <thead>
//                                 <tr>
//                                     <th>Document ID</th>
//                                     <th>Document Name</th>
//                                     <th>Date Submitted</th>
//                                     <th>Type</th>
//                                     <th>Action</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {documents.map((doc) => (
//                                     <tr key={doc.documentId}>
//                                         <td>{doc.documentId}</td>
//                                         <td>{doc.documentName}</td>
//                                         <td>{doc.submittedDate}</td>
//                                         <td>{doc.type}</td>
//                                         <td>
//                                             <Button
//                                                 variant="primary"
//                                                 onClick={() => viewDocument(doc.documentImage)}  // Pass documentImage (UUID) to view
//                                             >
//                                                 View
//                                             </Button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     ) : (
//                         <p>No documents found.</p>
//                     )}
//                 </Modal.Body>
//             </Modal>
//         </Container>
//     );
// };

// export default CustomerPolicies;
// 1111111111111111
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, Table, Pagination, Form, Modal, Card } from 'react-bootstrap';
import ClaimPolicy from '../claimPolicy/ClaimPolicy';
import './CustomerPolicies.css';

const CustomerPolicies = ({ customerId }) => {
    const [policies, setPolicies] = useState([]);
    const [showClaimModal, setShowClaimModal] = useState(false);
    const [selectedPolicy, setSelectedPolicy] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [documents, setDocuments] = useState([]);
    const [showDocumentsModal, setShowDocumentsModal] = useState(false);

    customerId = localStorage.getItem('customerId');
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPolicies = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/E-Insurance/customer/customers/${customerId}/policies`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: currentPage,
                        size: pageSize,
                    },
                });
                setPolicies(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching policies:', error);
            }
        };
        fetchPolicies();
    }, [customerId, currentPage, pageSize]);

    const handleClaimClick = (policy) => {
        setSelectedPolicy(policy);
        setShowClaimModal(true);
    };

    const handleViewDocumentsClick = async (policy) => {
        try {
            console.log('Fetching policies for customerId:', customerId, 'Page:', currentPage, 'Size:', pageSize);

            const response = await axios.get(`http://localhost:8080/E-Insurance/customer/policys/${policy.insuranceId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    page: currentPage,
                    size: pageSize,
                },
            });
            
            const relevantStatuses = ['PENDING', 'REJECT', 'REJECTED'];
            const filteredDocuments = response.data.filter(doc => {
                const status = doc.documentStatus.trim().toUpperCase();
                console.log("Document status:", status); 
                return relevantStatuses.includes(status);
            });

            console.log("Filtered documents:", filteredDocuments);
            setDocuments(filteredDocuments);
            setShowDocumentsModal(true);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const viewDocument = async (documentImage) => {
        try {
            const response = await axios.get(`http://localhost:8080/E-Insurance/file/view/${documentImage}`, {
                responseType: 'blob',
            });

            const contentType = response.headers['content-type'];
            const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
            const link = document.createElement('a');
            link.href = url;

            if (contentType.includes('image') || contentType === 'application/pdf') {
                link.setAttribute('target', '_blank');
            }

            link.click();
        } catch (error) {
            console.error('Error fetching document:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value));
        setCurrentPage(0);
    };

    const handleCloseDocumentsModal = () => {
        setShowDocumentsModal(false);
    };

    return (
        <div className="full-width-table">  {/* Use a full-width div */}
            <h1 className="mb-4">Your Policies</h1>

            <Form.Group controlId="pageSize" className="mb-3">
                <Form.Label>Page Size:</Form.Label>
                <Form.Control
                    as="select"
                    value={pageSize}
                    onChange={handlePageSizeChange}
                    style={{ width: '100px', display: 'inline-block', marginLeft: '10px' }}
                >
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </Form.Control>
            </Form.Group>

            <Table striped bordered hover responsive className="policy-table">
                <thead className="table-dark">
                    <tr>
                        <th>Policy ID</th>
                        <th>Insurance Scheme</th>
                        <th>Issued Date</th>
                        <th>Premium Amount</th>
                        <th>Policy Status</th>
                        <th>Claim Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {policies.map((policy) => (
                        <tr key={policy.insuranceId}>
                            <td>{policy.insuranceId}</td>
                            <td>{policy.insuranceScheme}</td>
                            <td>{policy.issuedDate}</td>
                            <td>${policy.premiumAmount.toFixed(2)}</td>
                            <td>{policy.policyStatus}</td>
                            <td>{policy.claimedStatus}</td>
                            <td>
                                <div className="d-flex justify-content-start">
                                    <Button
                                        variant="outline-info"
                                        size="sm"
                                        onClick={() => navigate(`/installments/${policy.insuranceId}`, { state: { policy, insuranceId: policy.insuranceId } })}
                                        className="me-2"
                                        disabled={policy.policyStatus === 'REJECT' || policy.policyStatus === 'REJECTED' || policy.policyStatus === 'DROPED'}
                                    >
                                        View Installments
                                    </Button>

                                    <Button
                                        variant="outline-success"
                                        size="sm"
                                        onClick={() => handleClaimClick(policy)}
                                        className="me-2"
                                        disabled={policy.policyStatus === 'REJECT' || policy.policyStatus === 'REJECTED'}
                                    >
                                        Claim
                                    </Button>

                                    <Button
                                        variant="outline-secondary"
                                        size="sm"
                                        onClick={() => handleViewDocumentsClick(policy)}
                                    >
                                        View Documents
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination className="justify-content-center my-4">
                <Pagination.First onClick={() => handlePageChange(0)} disabled={currentPage === 0} />
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
                {[...Array(totalPages).keys()].map(page => (
                    <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => handlePageChange(page)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
                <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
            </Pagination>

            <ClaimPolicy
                show={showClaimModal}
                policyId={selectedPolicy?.insuranceId}
                customerId={customerId}
                onClose={() => setShowClaimModal(false)}
            />

            <Modal show={showDocumentsModal} onHide={handleCloseDocumentsModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Submitted Documents</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {documents.length > 0 ? (
                        <div className="d-flex flex-wrap justify-content-around">
                            {documents.map((doc) => (
                                <Card key={doc.documentId} className="m-2" style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <Card.Title>{doc.documentName}</Card.Title>
                                        <Card.Text>
                                            Status: <strong>{doc.documentStatus}</strong>
                                        </Card.Text>
                                        <Button
                                            variant="primary"
                                            onClick={() => viewDocument(doc.documentImage)}
                                        >
                                            View Document
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <p>No documents with relevant statuses found.</p>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default CustomerPolicies;



//11111111111111111111

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { Button, Table, Container, Pagination, Form, Modal, Card } from 'react-bootstrap';
// import ClaimPolicy from '../claimPolicy/ClaimPolicy';
// import './CustomerPolicies.css';

// const CustomerPolicies = ({ customerId }) => {
//     const [policies, setPolicies] = useState([]);
//     const [showClaimModal, setShowClaimModal] = useState(false);
//     const [selectedPolicy, setSelectedPolicy] = useState(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [pageSize, setPageSize] = useState(10);
//     const [documents, setDocuments] = useState([]);
//     const [showDocumentsModal, setShowDocumentsModal] = useState(false);

//     customerId = localStorage.getItem('customerId');
//     const token = localStorage.getItem('authToken');
//     const navigate = useNavigate();

//     // Fetch policies associated with the customer
//     useEffect(() => {
//         const fetchPolicies = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/customer/customers/${customerId}/policies`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         page: currentPage,
//                         size: pageSize,
//                     },
//                 });
//                 setPolicies(response.data.content);
//                 setTotalPages(response.data.totalPages);
//             } catch (error) {
//                 console.error('Error fetching policies:', error);
//             }
//         };
//         fetchPolicies();
//     }, [customerId, currentPage, pageSize]);

//     // Handle claim click
//     const handleClaimClick = (policy) => {
//         setSelectedPolicy(policy);
//         setShowClaimModal(true);
//     };

//     // Fetch documents for a policy
//     const handleViewDocumentsClick = async (policy) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/E-Insurance/customer/policys/${policy.insuranceId}`, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             // Filter documents based on statuses PENDING, REJECT, REJECTED
//             const relevantStatuses = ['PENDING', 'REJECT', 'REJECTED'];
//             const filteredDocuments = response.data.filter(doc => relevantStatuses.includes(doc.documentStatus.trim().toUpperCase()));

//             setDocuments(filteredDocuments);
//             setShowDocumentsModal(true);
//         } catch (error) {
//             console.error('Error fetching documents:', error);
//         }
//     };

//     // View document functionality
//     const viewDocument = async (documentImage) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/E-Insurance/file/view/${documentImage}`, {
//                 responseType: 'blob',
//             });

//             const contentType = response.headers['content-type'];
//             const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
//             const link = document.createElement('a');
//             link.href = url;

//             if (contentType.includes('image') || contentType === 'application/pdf') {
//                 link.setAttribute('target', '_blank');
//             }

//             link.click();
//         } catch (error) {
//             console.error('Error fetching document:', error);
//         }
//     };

//     // Upload file and replace the existing document
//     const uploadFile = async (file, documentId) => {
//         console.log("Uploading file for documentId: ", documentId); 


//         const formData = new FormData();
//         formData.append("file", file);
//         formData.append("documentId", documentId); // Ensure documentId is sent

//         try {
//             const response = await axios.post(`http://localhost:8080/E-Insurance/file/upload`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${token}`,
//                 },
//             });

//             console.log("File uploaded successfully:", response.data);

//             // Assuming the response contains the updated document details
//             const updatedDocument = response.data;

//             // Update the document in the state
//             setDocuments(prevDocuments =>
//                 prevDocuments.map(doc =>
//                     doc.documentId === documentId ? { ...doc, documentImage: updatedDocument.documentImage } : doc
//                 )
//             );

//             alert("File uploaded and document updated successfully!");
//         } catch (error) {
//             console.error("Error uploading file:", error);
//             alert("Error uploading file.");
//         }
//     };

//     const handlePageChange = (page) => {
//         setCurrentPage(page);
//     };

//     const handlePageSizeChange = (event) => {
//         setPageSize(parseInt(event.target.value));
//         setCurrentPage(0);
//     };

//     const handleCloseDocumentsModal = () => {
//         setShowDocumentsModal(false);
//     };

//     return (
//         <Container className="my-5">
//             <h1 className="mb-4">Your Policies</h1>

//             <Form.Group controlId="pageSize" className="mb-3">
//                 <Form.Label>Page Size:</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={pageSize}
//                     onChange={handlePageSizeChange}
//                     style={{ width: '100px', display: 'inline-block', marginLeft: '10px' }}
//                 >
//                     <option value="5">5</option>
//                     <option value="10">10</option>
//                     <option value="20">20</option>
//                 </Form.Control>
//             </Form.Group>

//             <Table striped bordered hover responsive className="policy-table">
//                 <thead className="table-dark">
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Insurance Scheme</th>
//                         <th>Issued Date</th>
//                         <th>Premium Amount</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {policies.map((policy) => (
//                         <tr key={policy.insuranceId}>
//                             <td>{policy.insuranceId}</td>
//                             <td>{policy.insuranceScheme}</td>
//                             <td>{policy.issuedDate}</td>
//                             <td>${policy.premiumAmount.toFixed(2)}</td>
//                             <td>
//                                 <Button
//                                     variant="info"
//                                     size="sm"
//                                     onClick={() => navigate(`/installments/${policy.insuranceId}`, { state: { policy, insuranceId: policy.insuranceId } })}
//                                     className="me-2"
//                                 >
//                                     View Installments
//                                 </Button>
//                                 <Button
//                                     variant="warning"
//                                     size="sm"
//                                     onClick={() => handleClaimClick(policy)}
//                                     className="me-2"
//                                 >
//                                     Claim
//                                 </Button>
//                                 <Button
//                                     variant="secondary"
//                                     size="sm"
//                                     onClick={() => handleViewDocumentsClick(policy)}
//                                 >
//                                     View Documents
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <Pagination className="justify-content-center my-4">
//                 <Pagination.First onClick={() => handlePageChange(0)} disabled={currentPage === 0} />
//                 <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
//                 {[...Array(totalPages).keys()].map(page => (
//                     <Pagination.Item
//                         key={page}
//                         active={page === currentPage}
//                         onClick={() => handlePageChange(page)}
//                     >
//                         {page + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
//                 <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} disabled={currentPage === totalPages - 1} />
//             </Pagination>

//             <ClaimPolicy
//                 show={showClaimModal}
//                 policyId={selectedPolicy?.insuranceId}
//                 customerId={customerId}
//                 onClose={() => setShowClaimModal(false)}
//             />

//             <Modal show={showDocumentsModal} onHide={handleCloseDocumentsModal} size="lg">
//                 <Modal.Header closeButton>
//                     <Modal.Title>Submitted Documents</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//     {documents.length > 0 ? (
//         <div className="d-flex flex-wrap justify-content-around">
//             {documents.map((doc) => (
//                 <Card key={doc.documentId} className="m-2" style={{ width: '18rem' }}>
//                     <Card.Body>
//                         <Card.Title>{doc.documentName}</Card.Title>
//                         <Card.Text>
//                             Status: <strong>{doc.documentStatus}</strong>
//                         </Card.Text>
//                         {doc.documentImage && (
//                             <img
//                                 src={`http://localhost:8080/E-Insurance/file/view/${doc.documentImage}`} // Adjust the URL according to your backend
//                                 alt={doc.documentName}
//                                 style={{ width: '100%', height: 'auto' }} // Responsive image
//                             />
//                         )}
//                         <Button
//                             variant="primary"
//                             onClick={() => viewDocument(doc.documentImage)}
//                         >
//                             View Document
//                         </Button>

//                         {/* File upload section under each document */}
//                         <Form
//                             onSubmit={(e) => {
//                                 e.preventDefault();
//                                 const fileInput = e.target.elements.file;
//                                 console.log("Uploading file for documentId: ", doc.documentId);
//                                 uploadFile(fileInput.files[0], doc.documentId);
//                             }}
//                             className="mt-3"
//                         >
//                             <Form.Group>
//                                 <Form.Label>Upload New Document</Form.Label>
//                                 <Form.Control type="file" name="file" required />
//                             </Form.Group>
//                             <Button variant="success" type="submit">
//                                 Upload
//                             </Button>
//                         </Form>
//                     </Card.Body>
//                 </Card>
//             ))}
//         </div>
//     ) : (
//         <p>No documents with relevant statuses found.</p>
//     )}
// </Modal.Body>

//             </Modal>
//         </Container>
//     );
// };

// export default CustomerPolicies;
