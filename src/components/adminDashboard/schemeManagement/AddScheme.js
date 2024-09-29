


import React, { useState, useEffect } from 'react';
import { fetchInsurancePlans, addScheme, uploadFile } from '../../../services/schemeService'; // Adjust as needed
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import './AddScheme.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddScheme = ({ show, handleClose }) => {
    const [planId, setPlanId] = useState("");
    const [schemeName, setSchemeName] = useState("");
    const [active, setActive] = useState(true);
    const [schemeImage, setSchemeImage] = useState("");
    const [description, setDescription] = useState("");
    const [minAmount, setMinAmount] = useState();
    const [maxAmount, setMaxAmount] = useState();
    const [minInvestmentTime, setMinInvestmentTime] = useState();
    const [maxInvestmentTime, setMaxInvestmentTime] = useState();
    const [minAge, setMinAge] = useState();
    const [maxAge, setMaxAge] = useState();
    const [profitRatio, setProfitRatio] = useState();
    const [registrationCommissionRatio, setRegistrationCommissionRatio] = useState();
    const [installmentCommissionRatio, setInstallmentCommissionRatio] = useState();
    const [schemeDocument, setDocuments] = useState([]);
    const [insurancePlans, setInsurancePlans] = useState([]);
    const [documentNames, setDocumentNames] = useState(['']); // For required documents
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [documentTypes, setDocumentTypes] = useState([]);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const plansData = await fetchInsurancePlans();
                setInsurancePlans(plansData.content || plansData);
            } catch (err) {
                setError('Error fetching insurance plans. Please try again later.');
            }
        };
        fetchPlans();
    }, []);

    const handlePlanChange = (e) => {
        setPlanId(e.target.value);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const fileLocation = await uploadFile(file);
            if (fileLocation) {
                setSchemeImage(fileLocation.name);
            } else {
                console.error("File upload failed or no data received.");
            }
        }
    };

    const handleDocumentNameChange = (index, value) => {
        const updatedNames = [...documentNames];
        updatedNames[index] = value;
        setDocumentNames(updatedNames);
    };

    const addDocumentField = () => {
        setDocumentNames([...documentNames, '']);
    };

    const removeDocumentField = (index) => {
        const updatedNames = documentNames.filter((_, i) => i !== index);
        setDocumentNames(updatedNames);
    };

    const validateForm = () => {
        if (!planId || !schemeName || !description || minAmount === undefined || maxAmount === undefined || 
            minInvestmentTime === undefined || maxInvestmentTime === undefined || 
            minAge === undefined || maxAge === undefined || 
            profitRatio === undefined || registrationCommissionRatio === undefined || 
            installmentCommissionRatio === undefined) {
            alert("All fields are required.");
            return false;
        }

        if (minInvestmentTime >= maxInvestmentTime) {
            alert("Minimum policy term should be less than maximum policy term.");
            return false;
        }

        if (minAmount >= maxAmount) {
            alert("Minimum investment amount should be less than maximum investment amount.");
            return false;
        }

        if (minAge >= maxAge) {
            alert("Minimum age should be less than maximum age.");
            return false;
        }

        if (profitRatio < 0 || registrationCommissionRatio < 0 || installmentCommissionRatio < 0) {
            alert("Profit ratio and commission ratios must be positive numbers.");
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return; // Stop if validation fails
        }

        const formData = {
            insuranceScheme: schemeName,
            isActive: active,
            schemeImage: schemeImage, // Assuming schemeImage is a file
            description: description,
            minimumPolicyTerm: minInvestmentTime,
            maximumPolicyTerm: maxInvestmentTime,
            minimumInvestmentAmount: minAmount,
            maximumInvestmentAmount: maxAmount,
            minimumAge: minAge,
            maximumAge: maxAge,
            profitRatio: profitRatio,
            newRegistrationCommission: registrationCommissionRatio,
            installmentPaymentCommission: installmentCommissionRatio,
            schemeDocument: []  // Initialize as an empty array for document names
        };
        
        // Add documents to the schemeDocuments array
        documentNames.forEach((docName) => {
            if (docName.trim()) {
                const docObject = {
                    name: docName.trim()
                };
                formData.schemeDocument.push(docObject);  // Push document object into the array
            }
        });
        console.log(formData);
        try {
            const response = await addScheme(planId, formData);
            if (response) {
                toast.success("Scheme Added Successfully.");
                handleClose();
                navigate('/dashboard');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add the scheme.');
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add New Insurance Scheme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="insurancePlanId">
                        <Form.Label>Select Insurance Plan</Form.Label>
                        <Form.Control
                            as="select"
                            name="insurancePlanId"
                            value={planId}
                            onChange={handlePlanChange}
                            disabled={insurancePlans.length === 0}
                            required
                        >
                            <option value="">-- Select Plan --</option>
                            {insurancePlans.length > 0
                                ? insurancePlans.map((plan) => (
                                    <option key={plan.insurancePlanId} value={plan.insurancePlanId}>
                                        {plan.name}
                                    </option>
                                ))
                                : <option value="">No plans available</option>}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="schemeName">
                        <Form.Label>Insurance Scheme Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={schemeName}
                            onChange={(e) => setSchemeName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="minAmount">
                        <Form.Label>Minimum Investment Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={minAmount}
                            onChange={(e) => setMinAmount(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="maxAmount">
                        <Form.Label>Maximum Investment Amount</Form.Label>
                        <Form.Control
                            type="number"
                            value={maxAmount}
                            onChange={(e) => setMaxAmount(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="minInvestmentTime">
                        <Form.Label>Minimum Investment Time </Form.Label>
                        <Form.Control
                            type="number"
                            value={minInvestmentTime}
                            onChange={(e) => setMinInvestmentTime(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="maxInvestmentTime">
                        <Form.Label>Maximum Investment Time </Form.Label>
                        <Form.Control
                            type="number"
                            value={maxInvestmentTime}
                            onChange={(e) => setMaxInvestmentTime(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="minAge">
                        <Form.Label>Minimum Age (Years)</Form.Label>
                        <Form.Control
                            type="number"
                            value={minAge}
                            onChange={(e) => setMinAge(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="maxAge">
                        <Form.Label>Maximum Age (Years)</Form.Label>
                        <Form.Control
                            type="number"
                            value={maxAge}
                            onChange={(e) => setMaxAge(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="profitRatio">
                        <Form.Label>Profit Ratio (%)</Form.Label>
                        <Form.Control
                            type="number"
                            value={profitRatio}
                            onChange={(e) => setProfitRatio(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="registrationCommissionRatio">
                        <Form.Label>New Registration Commission</Form.Label>
                        <Form.Control
                            type="number"
                            value={registrationCommissionRatio}
                            onChange={(e) => setRegistrationCommissionRatio(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="installmentCommissionRatio">
                        <Form.Label>Installment Payment Commission</Form.Label>
                        <Form.Control
                            type="number"
                            value={installmentCommissionRatio}
                            onChange={(e) => setInstallmentCommissionRatio(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="schemeImage">
                        <Form.Label>Upload Scheme Image</Form.Label>
                        <Form.Control
                            type="file"
                            onChange={handleImageUpload}
                        />
                    </Form.Group>

                    {/* Updated Required Documents Section */}
                    <Form.Group controlId="requiredDocuments">
                        <Form.Label>Required Documents</Form.Label>
                        {documentNames.map((docName, index) => (
                            <div key={index} className="d-flex mb-2">
                                <Form.Control
                                    type="text"
                                    value={docName}
                                    onChange={(e) => handleDocumentNameChange(index, e.target.value)}
                                    placeholder="Enter document name"
                                    required
                                />
                                {index > 0 && (
                                    <Button variant="danger" onClick={() => removeDocumentField(index)} className="ml-2">
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button variant="secondary" onClick={addDocumentField}>
                            Add Another Document
                        </Button>
                    </Form.Group>

                    <div className="d-flex justify-content-between mt-3">
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="primary" type="submit" disabled={loading}>
                            {loading ? <Spinner animation="border" size="sm" /> : 'Add Scheme'}
                        </Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default AddScheme;
