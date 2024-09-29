// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';

// const ClaimPolicy = ({ policyId, customerId, onClose }) => {
//     const [claimDetails, setClaimDetails] = useState({
//         bankName: '',
//         branchName: '',
//         bankAccountId: '',
//         ifscCode: '',
//     });
//     const [error, setError] = useState('');
//     const token = localStorage.getItem('authToken');

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setClaimDetails({ ...claimDetails, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async () => {
//  // Validate all fields
//  const { bankName, branchName, bankAccountId, ifscCode } = claimDetails;
//  if (!bankName || !branchName || !bankAccountId || !ifscCode) {
//      setError('All fields are required.');
//      return;
//  }

//         try {
//             const response = await axios.post(
//                 'http://localhost:8080/E-Insurance/claim',
//                 {
//                     policyId: policyId,
//                     ...claimDetails,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         customerId: customerId,
//                     },
//                 }
//             );
//             alert(response.data); // Display success message
//             onClose(); // Close the modal
//         } catch (err) {
//             console.error('Error submitting claim:', err);
//             setError('Failed to submit the claim. Please try again.');
//         }
//     };

//     return (
//         <Modal show onHide={onClose}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Claim Policy</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>Bank Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankName"
//                             value={claimDetails.bankName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Branch Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="branchName"
//                             value={claimDetails.branchName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Bank Account ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankAccountId"
//                             value={claimDetails.bankAccountId}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>IFSC Code</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="ifscCode"
//                             value={claimDetails.ifscCode}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Close
//                 </Button>
//                 <Button variant="primary" onClick={handleSubmit}>
//                     Submit Claim
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ClaimPolicy;
//=====================

//888888888888888888888888888888888888888cancel varaku mundu code 
// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';

// const ClaimPolicy = ({ show, policyId, customerId, onClose }) => {
//     const [claimDetails, setClaimDetails] = useState({
//         bankName: '',
//         branchName: '',
//         bankAccountId: '',
//         ifscCode: '',
//     });
//     const [error, setError] = useState('');
//     const token = localStorage.getItem('authToken');

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setClaimDetails({ ...claimDetails, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async () => {
//         // Validate all fields
//         const { bankName, branchName, bankAccountId, ifscCode } = claimDetails;
//         if (!bankName || !branchName || !bankAccountId || !ifscCode) {
//             setError('All fields are required.');
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'http://localhost:8080/E-Insurance/customer/claim',
//                 {
//                     policyId: policyId,
//                     ...claimDetails,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         customerId: customerId,
//                     },
//                 }
//             );
//             alert(response.data); // Display success message
//             onClose(); // Close the modal
//         } catch (err) {
//             console.error('Error submitting claim:', err);
//             setError('Failed to submit the claim. Please try again.');
//         }
//     };

//     return (
//         <Modal show={show} onHide={onClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Claim Policy</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>Bank Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankName"
//                             value={claimDetails.bankName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Branch Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="branchName"
//                             value={claimDetails.branchName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Bank Account ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankAccountId"
//                             value={claimDetails.bankAccountId}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>IFSC Code</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="ifscCode"
//                             value={claimDetails.ifscCode}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Close
//                 </Button>
//                 <Button variant="primary" onClick={handleSubmit}>
//                     Submit Claim
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ClaimPolicy;
// //88888888888888888888888888888888888888888888888888888888888888


// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';
// import axios from 'axios';

// const ClaimPolicy = ({ show, policyId, customerId, onClose }) => {
//     const [claimDetails, setClaimDetails] = useState({
//         bankName: '',
//         branchName: '',
//         bankAccountId: '',
//         ifscCode: '',
//     });
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const token = localStorage.getItem('authToken');

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setClaimDetails({ ...claimDetails, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async () => {
//         // Validate all fields
//         const { bankName, branchName, bankAccountId, ifscCode } = claimDetails;
//         if (!bankName || !branchName || !bankAccountId || !ifscCode) {
//             setError('All fields are required.');
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'http://localhost:8080/E-Insurance/customer/customer-claim', // Adjusted endpoint
//                 {
//                     policyId: policyId,
//                     ...claimDetails,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         customerId: customerId,
//                     },
//                 }
//             );
//             if (response.data.claimedStatus) {
//                 setSuccessMessage("Claim request submitted successfully and is pending verification.");
//             } else {
//                 setError("Claim request failed.");
//             }
//             onClose(); // Close the modal
//         } catch (err) {
//             console.error('Error submitting claim:', err);
//             setError('Failed to submit the claim. Please try again.');
//             setSuccessMessage(''); // Clear success message
//         }
//     };

//     return (
//         <Modal show={show} onHide={onClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Claim Policy</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>Bank Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankName"
//                             value={claimDetails.bankName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Branch Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="branchName"
//                             value={claimDetails.branchName}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Bank Account ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankAccountId"
//                             value={claimDetails.bankAccountId}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>IFSC Code</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="ifscCode"
//                             value={claimDetails.ifscCode}
//                             onChange={handleChange}
//                             required
//                         />
//                     </Form.Group>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Close
//                 </Button>
//                 <Button variant="primary" onClick={handleSubmit}>
//                     Submit Claim
//                 </Button>
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ClaimPolicy;
//------------------------------------------
// import React, { useState, useEffect } from 'react';
// import { Button, Modal, Form, Alert } from 'react-bootstrap';
// import axios from 'axios';

// const ClaimPolicy = ({ show, policyId, customerId, onClose }) => {
//     const [claimDetails, setClaimDetails] = useState({
//         bankName: '',
//         branchName: '',
//         bankAccountId: '',
//         ifscCode: '',
//     });
//     const [error, setError] = useState('');
//     const [successMessage, setSuccessMessage] = useState('');
//     const [claimApproved, setClaimApproved] = useState(false); // To check if claim is already approved
//     const token = localStorage.getItem('authToken');
//     const [remark, setRemark] = useState('');


//     // Fetch claim status when the modal opens
//     useEffect(() => {
//         const checkClaimStatus = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/customer/policy/${policyId}/claim-status`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         customerId: customerId,
//                     },
//                 });
//                 if (response.data.claimedStatus === 'APPROVED') {
//                     setClaimApproved(true);
//                     setClaimDetails({
//                         bankName: response.data.bankName,
//                         branchName: response.data.branchName,
//                         bankAccountId: response.data.bankAccountId,
//                         ifscCode: response.data.ifscCode,
//                     });
//                 } else {
//                     setClaimApproved(false);
//                 }
//             } catch (err) {
//                 console.error('Error fetching claim status:', err);
//             }
//         };

//         if (show) {
//             checkClaimStatus();
//         }
//     }, [show, policyId, customerId, token]);

//     // Handle form input changes
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setClaimDetails({ ...claimDetails, [name]: value });
//     };

//     // Handle form submission
//     const handleSubmit = async () => {
//         if (claimApproved) {
//             alert('This claim has already been approved.');
//             return;
//         }

//         // Validate all fields
//         const { bankName, branchName, bankAccountId, ifscCode } = claimDetails;
//         if (!bankName || !branchName || !bankAccountId || !ifscCode) {
//             setError('All fields are required.');
//             return;
//         }

//         try {
//             const response = await axios.post(
//                 'http://localhost:8080/E-Insurance/customer/customer-claim',
//                 {
//                     policyId: policyId,
//                     ...claimDetails,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                     params: {
//                         customerId: customerId,
//                     },
//                 }
//             );
//             if (response.data.claimedStatus) {
//                 setSuccessMessage('Claim request submitted successfully and is pending verification.');
//             } else {
//                 setError('Claim request failed.');
//             }
//             onClose(); // Close the modal
//         } catch (err) {
//             console.error('Error submitting claim:', err);
//             setError('Failed to submit the claim. Please try again.');
//             setSuccessMessage(''); // Clear success message
//         }
//     };

//     return (
//         <Modal show={show} onHide={onClose} centered>
//             <Modal.Header closeButton>
//                 <Modal.Title>Claim Policy</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 {claimApproved ? (
//                     <Alert variant="info">
//                         This claim has already been approved. You can view the details below but cannot modify them.
//                     </Alert>
//                 ) : null}
//                 <Form>
//                     <Form.Group>
//                         <Form.Label>Bank Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankName"
//                             value={claimDetails.bankName}
//                             onChange={handleChange}
//                             required
//                             disabled={claimApproved} // Disable if claim is approved
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Branch Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="branchName"
//                             value={claimDetails.branchName}
//                             onChange={handleChange}
//                             required
//                             disabled={claimApproved} // Disable if claim is approved
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>Bank Account ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="bankAccountId"
//                             value={claimDetails.bankAccountId}
//                             onChange={handleChange}
//                             required
//                             disabled={claimApproved} // Disable if claim is approved
//                         />
//                     </Form.Group>
//                     <Form.Group>
//                         <Form.Label>IFSC Code</Form.Label>
//                         <Form.Control
//                             type="text"
//                             name="ifscCode"
//                             value={claimDetails.ifscCode}
//                             onChange={handleChange}
//                             required
//                             disabled={claimApproved} // Disable if claim is approved
//                         />
//                     </Form.Group>
//                     {error && <p style={{ color: 'red' }}>{error}</p>}
//                     {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//                 </Form>
//             </Modal.Body>
//             <Modal.Footer>
//                 <Button variant="secondary" onClick={onClose}>
//                     Close
//                 </Button>
//                 {!claimApproved && (
//                     <Button variant="primary" onClick={handleSubmit}>
//                         Submit Claim
//                     </Button>
//                 )}
//             </Modal.Footer>
//         </Modal>
//     );
// };

// export default ClaimPolicy;
//---------------------------
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const ClaimPolicy = ({ show, policyId, customerId, onClose }) => {
    const [claimDetails, setClaimDetails] = useState({
        bankName: '',
        branchName: '',
        bankAccountId: '',
        ifscCode: '',
    });
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [claimApproved, setClaimApproved] = useState(false);
    const [remark, setRemark] = useState(''); // To hold the remark
    const token = localStorage.getItem('authToken');

    // Fetch claim status when the modal opens
    useEffect(() => {
        const checkClaimStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/E-Insurance/customer/policy/${policyId}/claim-status`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const claimData = response.data;

                if (claimData && claimData.claimedStatus) {
                    if (claimData.claimedStatus === 'APPROVED') {
                        setClaimApproved(true);
                        setClaimDetails({
                            bankName: claimData.bankName,
                            branchName: claimData.branchName,
                            bankAccountId: claimData.bankAccountId,
                            ifscCode: claimData.ifscCode,
                        });
                        setRemark(claimData.remark);
                    } else if (claimData.claimedStatus === 'REJECTED') {
                        setClaimApproved(false);
                        setRemark(claimData.remark);
                    }
                } else {
                    setClaimApproved(false);
                    setRemark(''); // Clear remark if no claim is found
                }
            } catch (err) {
                console.error('Error fetching claim status:', err);
            }
        };

        if (show) {
            checkClaimStatus();
        }
    }, [show, policyId, token]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setClaimDetails({ ...claimDetails, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async () => {
        if (claimApproved) {
            alert('This claim has already been approved.');
            return;
        }

        // Validate all fields
        const { bankName, branchName, bankAccountId, ifscCode } = claimDetails;
        if (!bankName || !branchName || !bankAccountId || !ifscCode) {
            setError('All fields are required.');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8080/E-Insurance/customer/customer-claim',
                {
                    policyId: policyId,
                    ...claimDetails,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    params: {
                        customerId: customerId,
                    },
                }
            );
            if (response.data.claimedStatus) {
                setSuccessMessage('Claim request submitted successfully and is pending verification.');
            } else {
                setError('Claim request failed.');
            }
            onClose(); // Close the modal
        } catch (err) {
            console.error('Error submitting claim:', err);
            setError('Failed to submit the claim. Please try again.');
            setSuccessMessage(''); // Clear success message
        }
    };

    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Claim Policy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {claimApproved ? (
                    <Alert variant="info">
                        This claim has already been approved. Remark: {remark}
                    </Alert>
                ) : remark ? (
                    <Alert variant="danger">
                        This claim has been rejected. Remark: {remark}
                    </Alert>
                ) : null}
                {!claimApproved && !remark && (
                    <Form>
                        <Form.Group>
                            <Form.Label>Bank Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="bankName"
                                value={claimDetails.bankName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Branch Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="branchName"
                                value={claimDetails.branchName}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Bank Account ID</Form.Label>
                            <Form.Control
                                type="text"
                                name="bankAccountId"
                                value={claimDetails.bankAccountId}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>IFSC Code</Form.Label>
                            <Form.Control
                                type="text"
                                name="ifscCode"
                                value={claimDetails.ifscCode}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                {!claimApproved && (
                    <Button variant="primary" onClick={handleSubmit}>
                        Submit Claim
                    </Button>
                )}
            </Modal.Footer>
        </Modal>
    );
};

export default ClaimPolicy;
