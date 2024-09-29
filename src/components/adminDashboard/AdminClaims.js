
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import './AdminClaim.css';

// const AdminClaims = () => {
//     const [claims, setClaims] = useState([]);
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(5); // Items per page
//     const [totalPages, setTotalPages] = useState(0);
//     const [selectedClaimId, setSelectedClaimId] = useState(null);
//     const [actionType, setActionType] = useState(""); // "approve" or "reject"
//     const [remark, setRemark] = useState("");
//     const [showModal, setShowModal] = useState(false);
//     const token = localStorage.getItem('authToken');
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchClaims = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/E-Insurance/admin/claims', {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         page: page,
//                         size: size,
//                     },
//                 });
//                 setClaims(response.data.content);
//                 setTotalPages(response.data.totalPages);
//             } catch (error) {
//                 console.error('Error fetching claims:', error);
//             }
//         };
//         fetchClaims();
//     }, [page, size]);

//     const handleAction = async () => {
//         if (!remark) {
//             alert("Remark is required.");
//             return;
//         }

//         const endpoint = actionType === "approve"
//             ? `http://localhost:8080/E-Insurance/admin/claims/${selectedClaimId}/approve`
//             : `http://localhost:8080/E-Insurance/admin/claims/${selectedClaimId}/reject`;

//         try {
//             await axios.post(endpoint, {}, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                 },
//                 params: {
//                     remark: remark, // Passing the remark to the backend
//                 },
//             });

//             // Update the claim status in the UI
//             setClaims(claims.map(claim =>
//                 claim.id === selectedClaimId
//                     ? { ...claim, claimedStatus: actionType === "approve" ? 'APPROVED' : 'REJECTED' }
//                     : claim
//             ));

//             setShowModal(false); // Close the modal
//             setRemark(""); // Reset the remark field
//         } catch (error) {
//             console.error(`Error ${actionType === "approve" ? 'approving' : 'rejecting'} claim:`, error);
//         }
//     };

//     const openModal = (claimId, type) => {
//         setSelectedClaimId(claimId);
//         setActionType(type);
//         setShowModal(true);
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage >= 0 && newPage < totalPages) {
//             setPage(newPage);
//         }
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     // Filter pending claims
//     const pendingClaims = claims.filter(claim => claim.claimedStatus === 'PENDING');

//     return (
//         <div>
//             <br/>
//             <h1>Claims Management</h1>

//             {/* Table 1: All Claims (No action buttons) */}
//             <h2>All Claims</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Claim ID</th>
//                         <th>Policy ID</th>
//                         <th>Plan Name</th>
//                         <th>Scheme Name</th>
//                         <th>Customer ID</th>
//                         <th>Premium amount</th>
//                         <th>Paid Amount</th>
//                         <th>No of Installements</th>
//                         <th>Total Paid Installements</th>
//                         <th>Issued Date</th>
//                         <th>Maturity date</th>
//                         <th>Status</th>
//                         <th>Bank</th>
//                         <th>Account Number</th>
//                         <th>Branch Name</th>
//                         <th>IFSC CODE</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {claims.map(claim => (
//                         <tr key={claim.id}>
//                             <td>{claim.id}</td>
//                             <td>{claim.policyId}</td>
//                             <td>{claim.insuranceScheme.name}</td>
//                             <td>{claim.insuranceScheme.insuranceSchemes[0]?.insuranceScheme || 'No scheme'}</td>
//                             <td>{claim.customerId}</td>
//                             <td>{claim.amount}</td>
//                             <td>{claim.totalAmountPid}</td>
//                             <td>{claim.totalInstallements}</td>
//                             <td>{claim.totalPaidInstallments}</td>
//                             <td>{claim.issuedDate}</td>
//                             <td>{claim.maturityDate}</td>
//                             <td>{claim.claimedStatus}</td>
//                             <td>{claim.bankName}</td>
//                             <td>{claim.bankAccountId}</td>
//                             <td>{claim.branchName}</td>
//                             <td>{claim.ifscCode}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Table 2: Pending Claims (With action buttons) */}
//             <h2>Pending Claims</h2>
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Claim ID</th>
//                         <th>Policy ID</th>
//                         <th>Plan Name</th>
//                         <th>Scheme Name</th>
//                         <th>Customer ID</th>
//                         <th>Premium amount</th>
//                         <th>Paid Amount</th>
//                         <th>No of Installements</th>
//                         <th>Total Paid Installements</th>
//                         <th>Issued Date</th>
//                         <th>Maturity Date</th>
//                         <th>Status</th>
//                         <th>Bank</th>
//                         <th>Account Number</th>
//                         <th>Branch Name</th>
//                         <th>IFSC CODE</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {pendingClaims.map(claim => (
//                         <tr key={claim.id}>
//                             <td>{claim.id}</td>
//                             <td>{claim.policyId}</td>
//                             <td>{claim.insuranceScheme.name}</td>
//                             <td>{claim.insuranceScheme.insuranceSchemes[0]?.insuranceScheme || 'No scheme'}</td>
//                             <td>{claim.customerId}</td>
//                             <td>{claim.amount}</td>
//                             <td>{claim.totalAmountPid}</td>
//                             <td>{claim.totalInstallements}</td>
//                             <td>{claim.totalPaidInstallments}</td>
//                             <td>{claim.issuedDate}</td>
//                             <td>{claim.maturityDate}</td>
//                             <td>{claim.claimedStatus}</td>
//                             <td>{claim.bankName}</td>
//                             <td>{claim.bankAccountId}</td>
//                             <td>{claim.branchName}</td>
//                             <td>{claim.ifscCode}</td>
//                             <td>
//                                 <Button 
//                                     variant="success" 
//                                     onClick={() => openModal(claim.id, 'approve')}
//                                     disabled={claim.claimedStatus === 'APPROVED'}
//                                 >
//                                     Approve
//                                 </Button>{' '}
//                                 <Button 
//                                     variant="danger" 
//                                     onClick={() => openModal(claim.id, 'reject')}
//                                     disabled={claim.claimedStatus === 'REJECTED'}
//                                 >
//                                     Reject
//                                 </Button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <Pagination>
//                 <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
//                 <Pagination.Item active>{page + 1}</Pagination.Item>
//                 <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} />
//             </Pagination>

//             <Button onClick={handleGoBack} className="go-back-button">
//                 Go Back!
//             </Button>

//             {/* Modal for entering the remark */}
//             <Modal show={showModal} onHide={() => setShowModal(false)}>
//                 <Modal.Header closeButton>
//                     <Modal.Title>{actionType === "approve" ? "Approve Claim" : "Reject Claim"}</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>
//                     <Form>
//                         <Form.Group>
//                             <Form.Label>Remark</Form.Label>
//                             <Form.Control
//                                 as="textarea"
//                                 rows={3}
//                                 value={remark}
//                                 onChange={(e) => setRemark(e.target.value)}
//                                 placeholder={`Enter remark for ${actionType === "approve" ? "approval" : "rejection"}`}
//                             />
//                         </Form.Group>
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="secondary" onClick={() => setShowModal(false)}>
//                         Cancel
//                     </Button>
//                     <Button variant={actionType === "approve" ? "success" : "danger"} onClick={handleAction}>
//                         {actionType === "approve" ? "Approve" : "Reject"}
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </div>
//     );
// };

// export default AdminClaims;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, Pagination, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdminClaims = () => {
    const [claims, setClaims] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5); // Items per page
    const [totalPages, setTotalPages] = useState(0);
    const [selectedClaimId, setSelectedClaimId] = useState(null);
    const [actionType, setActionType] = useState(""); // "approve" or "reject"
    const [remark, setRemark] = useState("");
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem('authToken');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await axios.get('http://localhost:8080/E-Insurance/admin/claims', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        page: page,
                        size: size,
                    },
                });
                setClaims(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching claims:', error);
            }
        };
        fetchClaims();
    }, [page, size]);

    const handleAction = async () => {
        if (!remark) {
            alert("Remark is required.");
            return;
        }

        const endpoint = actionType === "approve"
            ? `http://localhost:8080/E-Insurance/admin/claims/${selectedClaimId}/approve`
            : `http://localhost:8080/E-Insurance/admin/claims/${selectedClaimId}/reject`;

        try {
            await axios.post(endpoint, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                params: {
                    remark: remark,
                },
            });

            setClaims(claims.map(claim =>
                claim.id === selectedClaimId
                    ? { ...claim, claimedStatus: actionType === "approve" ? 'APPROVED' : 'REJECTED' }
                    : claim
            ));

            setShowModal(false); // Close the modal
            setRemark(""); // Reset the remark field
        } catch (error) {
            console.error(`${actionType === "approve" ? 'Error approving' : 'Error rejecting'} claim:`, error);
        }
    };

    const openModal = (claimId, type) => {
        setSelectedClaimId(claimId);
        setActionType(type);
        setShowModal(true);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setPage(newPage);
        }
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    // Filter pending claims
    const pendingClaims = claims.filter(claim => claim.claimedStatus === 'PENDING');

    return (
        <div>
           
            <h1>Claims Management</h1>

            {/* All Claims Table */}
            <div className="table-container">
                <h2>All Claims</h2>
                <Table striped bordered hover responsive className="table">
                    <thead>
                        <tr>
                            <th>Claim ID</th>
                            <th>Policy ID</th>
                            <th>Plan Name</th>
                            <th>Scheme Name</th>
                            <th>Customer ID</th>
                            <th>Premium</th>
                            <th>Paid Amount</th>
                            <th>Instalments</th>
                            <th>Paid Instalments</th>
                            <th>Issued Date</th>
                            <th>Maturity Date</th>
                            <th>Status</th>
                            <th>Bank</th>
                            <th>Account Number</th>
                            <th>Branch</th>
                            <th>IFSC Code</th>
                        </tr>
                    </thead>
                    <tbody>
                        {claims.map(claim => (
                            <tr key={claim.id}>
                                <td>{claim.id}</td>
                                <td>{claim.policyId}</td>
                                <td className="truncated-cell" data-full-text={claim.insuranceScheme.name}>{claim.insuranceScheme.name}</td>
                                <td className="truncated-cell" data-full-text={claim.insuranceScheme.insuranceSchemes[0]?.insuranceScheme || 'No scheme'}>
                                    {claim.insuranceScheme.insuranceSchemes[0]?.insuranceScheme || 'No scheme'}
                                </td>
                                <td>{claim.customerId}</td>
                                <td>{claim.amount}</td>
                                <td>{claim.totalAmountPid}</td>
                                <td>{claim.totalInstallements}</td>
                                <td>{claim.totalPaidInstallments}</td>
                                <td>{claim.issuedDate}</td>
                                <td>{claim.maturityDate}</td>
                                <td>{claim.claimedStatus}</td>
                                <td>{claim.bankName}</td>
                                <td>{claim.bankAccountId}</td>
                                <td>{claim.branchName}</td>
                                <td>{claim.ifscCode}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            {/* Pending Claims Table */}
            <div className="table-container">
                <h2>Pending Claims</h2>
                <Table striped bordered hover responsive className="table">
                    <thead>
                        <tr>
                            <th>Claim ID</th>
                            <th>Policy ID</th>
                            <th>Plan Name</th>
                            <th>Scheme Name</th>
                            <th>Customer ID</th>
                            <th>Premium</th>
                            <th>Paid Amount</th>
                            <th>Instalments</th>
                            <th>Paid Instalments</th>
                            <th>Issued Date</th>
                            <th>Maturity Date</th>
                            <th>Status</th>
                            <th>Bank</th>
                            <th>Account Number</th>
                            <th>Branch</th>
                            <th>IFSC Code</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingClaims.map(claim => (
                            <tr key={claim.id}>
                                <td>{claim.id}</td>
                                <td>{claim.policyId}</td>
                                <td className="truncated-cell" data-full-text={claim.insuranceScheme.name}>{claim.insuranceScheme.name}</td>
                                <td className="truncated-cell" data-full-text={claim.insuranceScheme.insuranceSchemes[0]?.insuranceScheme || 'No scheme'}>
                                    {claim.insuranceScheme.insuranceSchemes[0]?.insuranceScheme || 'No scheme'}
                                </td>
                                <td>{claim.customerId}</td>
                                <td>{claim.amount}</td>
                                <td>{claim.totalAmountPid}</td>
                                <td>{claim.totalInstallements}</td>
                                <td>{claim.totalPaidInstallments}</td>
                                <td>{claim.issuedDate}</td>
                                <td>{claim.maturityDate}</td>
                                <td>{claim.claimedStatus}</td>
                                <td>{claim.bankName}</td>
                                <td>{claim.bankAccountId}</td>
                                <td>{claim.branchName}</td>
                                <td>{claim.ifscCode}</td>
                                <td>
    <div className="d-flex justify-content-between">
        <Button 
            variant="success" 
            onClick={() => openModal(claim.id, 'approve')}
            disabled={claim.claimedStatus === 'APPROVED'}
            className="me-2" // Add margin-end for spacing
        >
            Approve
        </Button>
        <Button 
            variant="danger" 
            onClick={() => openModal(claim.id, 'reject')}
            disabled={claim.claimedStatus === 'REJECTED'}
        >
            Reject
        </Button>
    </div>
</td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(page - 1)} disabled={page === 0} />
                <Pagination.Item active>{page + 1}</Pagination.Item>
                <Pagination.Next onClick={() => handlePageChange(page + 1)} disabled={page === totalPages - 1} />
            </Pagination>

            <Button onClick={handleGoBack} className="go-back-button">
                Go Back!
            </Button>

            {/* Modal for entering the remark */}
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{actionType === "approve" ? "Approve Claim" : "Reject Claim"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Remark</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={remark}
                                onChange={(e) => setRemark(e.target.value)}
                                placeholder={`Enter remark for ${actionType === "approve" ? "approval" : "rejection"}`}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant={actionType === "approve" ? "success" : "danger"} onClick={handleAction}>
                        {actionType === "approve" ? "Approve" : "Reject"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AdminClaims;
