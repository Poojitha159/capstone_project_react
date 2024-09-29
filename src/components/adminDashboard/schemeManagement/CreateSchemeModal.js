import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

// Enum for DocumentType
const DocumentTypeOptions = [
    { value: 'AADHAR', label: 'Aadhaar' },
    { value: 'PAN_CARD', label: 'PAN Card' },
    { value: 'HEALTH_CERTIFICATE', label: 'Health Certificate' },
    { value: 'PASSPORT', label: 'Passport' },
    { value: 'DRIVING_LICENCE', label: 'Driving Licence' },
    { value: 'VOTER_ID', label: 'Voter ID' },
    { value: 'INCOME_TAX', label: 'Income Tax' },
    { value: 'BIRTH_CERTIFICATE', label: 'Birth Certificate' },
    { value: 'BANK_STATEMENT', label: 'Bank Statement' },
    { value: 'HOME_CERTIFICATE', label: 'Home Certificate' },
    { value: 'CROP_CERTIFICATE', label: 'Crop Certificate' }
];

const CreateSchemeModal = ({ showModal, handleClose }) => {
    const [plans, setPlans] = useState([]);
    const [newScheme, setNewScheme] = useState({
        insuranceScheme: '',
        description: '',
        minimumPolicyTerm: '',
        maximumPolicyTerm: '',
        minimumAge: '',
        maximumAge: '',
        minimumInvestmentAmount: '',
        maximumInvestmentAmount: '',
        profitRatio: '',
        newRegistrationCommission: '',
        installmentPaymentCommission: '',
        isActive: true,
        schemeImage: '',
        insurancePlanId: '',
        requiredDocuments: [] // Array of selected document types
    });
    const [error, setError] = useState(null);
    //const [plans, setPlans] = useState([]);

    useEffect(() => {
        // Fetch insurance plans when the modal is shown
        const fetchPlans = async () => {
            try {
                const response = await axios.get('/api/getAllPlans');
                setPlans(response.data.content);
            } catch (err) {
                setError(err);
            }
        };

        if (showModal) {
            fetchPlans();
        }
    }, [showModal]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setNewScheme(prevScheme => ({
                ...prevScheme,
                [name]: checked
            }));
        } else {
            setNewScheme(prevScheme => ({
                ...prevScheme,
                [name]: value
            }));
        }
    };

    const handleDocumentChange = (e) => {
        const { value, checked } = e.target;
        setNewScheme(prevScheme => {
            const updatedDocuments = checked
                ? [...prevScheme.requiredDocuments, value]
                : prevScheme.requiredDocuments.filter(doc => doc !== value);

            return {
                ...prevScheme,
                requiredDocuments: updatedDocuments
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/createScheme', {
                ...newScheme,
                requiredDocuments: newScheme.requiredDocuments.join(', ')
            });
            handleClose(); // Close modal on success
            // Optionally handle success (e.g., refresh the list)
        } catch (err) {
            setError(err);
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Insurance Scheme</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {error && <p className="text-danger">{error.message}</p>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Insurance Plan</Form.Label>
                        <Form.Control
                            as="select"
                            name="insurancePlanId"
                            value={newScheme.insurancePlanId}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a plan</option>
                            {plans.map(plan => (
                                <option key={plan.insurancePlanId} value={plan.insurancePlanId}>
                                    {plan.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Scheme Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="insuranceScheme"
                            value={newScheme.insuranceScheme}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={newScheme.description}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Minimum Policy Term</Form.Label>
                        <Form.Control
                            type="number"
                            name="minimumPolicyTerm"
                            value={newScheme.minimumPolicyTerm}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Maximum Policy Term</Form.Label>
                        <Form.Control
                            type="number"
                            name="maximumPolicyTerm"
                            value={newScheme.maximumPolicyTerm}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Minimum Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="minimumAge"
                            value={newScheme.minimumAge}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Maximum Age</Form.Label>
                        <Form.Control
                            type="number"
                            name="maximumAge"
                            value={newScheme.maximumAge}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Minimum Investment Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="minimumInvestmentAmount"
                            value={newScheme.minimumInvestmentAmount}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Maximum Investment Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="maximumInvestmentAmount"
                            value={newScheme.maximumInvestmentAmount}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Profit Ratio (%)</Form.Label>
                        <Form.Control
                            type="number"
                            name="profitRatio"
                            value={newScheme.profitRatio}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>New Registration Commission (%)</Form.Label>
                        <Form.Control
                            type="number"
                            name="newRegistrationCommission"
                            value={newScheme.newRegistrationCommission}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Installment Payment Commission (%)</Form.Label>
                        <Form.Control
                            type="number"
                            name="installmentPaymentCommission"
                            value={newScheme.installmentPaymentCommission}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Scheme Image URL</Form.Label>
                        <Form.Control
                            type="text"
                            name="schemeImage"
                            value={newScheme.schemeImage}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Required Documents</Form.Label>
                        {DocumentTypeOptions.map(doc => (
                            <Form.Check
                                key={doc.value}
                                type="checkbox"
                                id={`document-${doc.value}`}
                                label={doc.label}
                                value={doc.value}
                                checked={newScheme.requiredDocuments.includes(doc.value)}
                                onChange={handleDocumentChange}
                            />
                        ))}
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Check
                            type="checkbox"
                            label="Active"
                            name="isActive"
                            checked={newScheme.isActive}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Scheme
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateSchemeModal;
