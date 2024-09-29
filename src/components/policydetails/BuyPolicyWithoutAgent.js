import React, { useState,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const BuyPolicyWithoutAgent= () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, installmentAmount } = location.state || {};

    const [nominees, setNominees] = useState([]);
    const [nomineeName, setNomineeName] = useState('');
    const [relation, setRelation] = useState('');
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [files, setFiles] = useState({});
    const [customerStatus, setCustomerStatus] = useState(null);
    const token = localStorage.getItem('authToken');
    const customerId=localStorage.getItem('customerId');
    const [loading, setLoading] = useState(true); // To manage loading state
    useEffect(() => {
        const fetchCustomerStatus = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/E-Insurance/customer/get-customer-by-id/${customerId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setCustomerStatus(response.data); // Assuming response contains customer details
            } catch (error) {
                console.error('Error fetching customer status:', error);
            } finally {
                setLoading(false);
            }
        };

        if (customerId) {
            fetchCustomerStatus();
        }
    }, [customerId, token]);

    if (!scheme) {
        return <p>Loading or no data available...</p>;
    }

    if (!customerStatus) {
        return <p>No customer information available.</p>;
    }

    if (!customerStatus.active || !customerStatus.verified) {
        return (
            <div>
                <p>You cannot purchase a policy as your account is either not verified or not active.</p>
                <Button onClick={() => navigate(-1)}>Go Back</Button>
            </div>
        );
    }

    const handleAddNominee = () => {
        if (nomineeName && relation) {
            setNominees([...nominees, { nomineeName, relationStatus: relation }]);
            setNomineeName('');
            setRelation('');
        }
    };

    const handleRemoveNominee = (index) => {
        setNominees(nominees.filter((_, i) => i !== index));
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };
    const handleDocumentChange = (documentName, file) => {
        setFiles(prevFiles => ({
            ...prevFiles,
            [documentName]: file,
        }));
    };

    const handleUploadDocuments = async () => {
        const filesArray = Object.keys(files).map(documentName => ({
            documentName,
            file: files[documentName],
        }));
        const uploaded = [];
        for (const file of filesArray) {
            const formData = new FormData();
            formData.append('file', file.file);

            try {
                const response = await axios.post('http://localhost:8080/E-Insurance/file/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.data) {
                    uploaded.push({
                        documentName: file.documentName,
                        documentImage: response.data.name,
                    });
                }
            } catch (error) {
                console.error(`Error uploading document ${file.documentName}:`, error);
            }
        }
        setUploadedDocs(uploaded);
    };

    const handleSubmit = async () => {
        try {
            if (!customerId) {
                throw new Error('Customer ID is missing');
            }

            const response = await axios.post(`http://localhost:8080/E-Insurance/customer/${customerId}/buyWithoutAgent`, {
                insuranceSchemeId: schemeId,
                policyTerm,
                premiumAmount: investmentAmount,
                installmentPeriod,
                nominees,
                documents: uploadedDocs
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                const { insuranceId } = response.data; 
                // navigate(`/payment/${insuranceId}`, {
                    navigate(`/E-Insurance/customerdashboard`, {
                    state: {
                        scheme,
                        schemeId,
                        investmentAmount,
                        policyTerm,
                        installmentPeriod,
                        totalAmount: investmentAmount,
                        installmentAmount,
                        nominees,
                        uploadedDocs
                    },
                });
            }
        } catch (error) {
            console.error('Error submitting policy details:', error);
        }
    };

    return (
        <div className="container mt-4">
            <Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button>
            <h3 className="mb-4">Policy Details</h3>
            <p>SchemeID: {schemeId}</p>
            <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p>
            <p>Policy Term (Years): {policyTerm}</p>
            <p>Installment Period (Months): {installmentPeriod}</p>
            <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p>

            <h5 className="mt-4">Add Nominees</h5>
            <Form.Group controlId="formNomineeName">
                <Form.Label>Nominee Name</Form.Label>
                <Form.Control
                    type="text"
                    value={nomineeName}
                    onChange={(e) => setNomineeName(e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="formRelation">
                <Form.Label>Relation</Form.Label>
                <Form.Control
                    as="select"
                    value={relation}
                    onChange={(e) => setRelation(e.target.value)}
                >
                    <option value="">Select Relation</option>
                    <option value="SPOUSE">Spouse</option>
                    <option value="CHILD">Child</option>
                    <option value="PARENT">Parent</option>
                    <option value="SIBLING">Sibling</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleAddNominee}>
                Add Nominee
            </Button>

            {/* <ul className="mt-2">
                {nominees.map((nominee, index) => (
                    <li key={index}>
                        {nominee.nomineeName} - {nominee.relationStatus}
                    </li>
                ))}
            </ul> */}
            <ul className="mt-2">
                {nominees.map((nominee, index) => (
                    <li key={index}>
                        {nominee.nomineeName} - {nominee.relationStatus}
                        <Button variant="danger" size="sm" onClick={() => handleRemoveNominee(index)} className="ml-2">
                            Remove
                        </Button>
                    </li>
                ))}
            </ul>

            <h5 className="mt-4">Upload Documents</h5>
            {scheme?.schemeDocument?.map((doc, index) => (
                <Form.Group controlId={`formFile-${index}`} key={index}>
                    <Form.Label>{doc.name}</Form.Label>
                    <Form.Control
                        type="file"
                        onChange={(e) => handleDocumentChange(doc.name, e.target.files[0])}
                    />
                </Form.Group>
            ))}
            <Button variant="secondary" className="mt-3" onClick={handleUploadDocuments}>
                Upload Documents
            </Button>

            <ul className="mt-2">
                {uploadedDocs.length > 0 ? (
                    uploadedDocs.map((doc, index) => (
                        <li key={index}>{doc.documentName}</li>
                    ))
                ) : (
                    <p>No documents uploaded</p>
                )}
            </ul>

            <Button variant="success" className="mt-4" onClick={handleSubmit}>
                Proceed to Payment
            </Button>
        </div>
    );
};

export default BuyPolicyWithoutAgent;