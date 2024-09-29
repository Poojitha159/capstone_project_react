import React, { useState, useEffect } from 'react'; 
import { Modal, Button, Form } from 'react-bootstrap'; 

const EditSchemeModal = ({ show, handleClose, scheme, onUpdate }) => { 
    const [formData, setFormData] = useState({ 
        insuranceScheme: '', 
        description: '', 
        minimumInvestmentAmount: '', 
        maximumInvestmentAmount: '', 
        minimumAge: '', 
        maximumAge: '', 
        profitRatio: '', 
        newRegistrationCommission: '', 
        installmentPaymentCommission: '', 
        active: true, 
    }); 
    const [errors, setErrors] = useState({}); 

    useEffect(() => { 
        if (scheme) { 
            setFormData({ 
                insuranceScheme: scheme.insuranceScheme || '', 
                description: scheme.description || '', 
                minimumInvestmentAmount: scheme.minimumInvestmentAmount || '', 
                maximumInvestmentAmount: scheme.maximumInvestmentAmount || '', 
                minimumAge: scheme.minimumAge || '', 
                maximumAge: scheme.maximumAge || '', 
                profitRatio: scheme.profitRatio || '', 
                newRegistrationCommission: scheme.newRegistrationCommission || '', 
                installmentPaymentCommission: scheme.installmentPaymentCommission || '', 
                active: scheme.active || true, 
            }); 
            setErrors({}); // Reset errors when opening the modal
        } 
    }, [scheme, show]); // Added 'show' to dependency array

    const validateForm = () => {
        const newErrors = {};

        // Check required fields
        if (!formData.insuranceScheme) newErrors.insuranceScheme = 'Scheme name is required';
        if (!formData.description) newErrors.description = 'Description is required';
        if (!formData.minimumInvestmentAmount) newErrors.minimumInvestmentAmount = 'Minimum investment amount is required';
        if (!formData.maximumInvestmentAmount) newErrors.maximumInvestmentAmount = 'Maximum investment amount is required';
        if (!formData.minimumAge) newErrors.minimumAge = 'Minimum age is required';
        if (!formData.maximumAge) newErrors.maximumAge = 'Maximum age is required';
        if (!formData.profitRatio) newErrors.profitRatio = 'Profit ratio is required';
        if (!formData.newRegistrationCommission) newErrors.newRegistrationCommission = 'Registration commission is required';
        if (!formData.installmentPaymentCommission) newErrors.installmentPaymentCommission = 'Installment commission is required';

        // Ensure minimumAge < maximumAge
        if (formData.minimumAge && formData.maximumAge && parseInt(formData.minimumAge) >= parseInt(formData.maximumAge)) {
            newErrors.minimumAge = 'Minimum age should be less than maximum age';
            newErrors.maximumAge = 'Maximum age should be greater than minimum age';
        }

        // Ensure minimumInvestmentAmount < maximumInvestmentAmount
        if (formData.minimumInvestmentAmount && formData.maximumInvestmentAmount && parseFloat(formData.minimumInvestmentAmount) >= parseFloat(formData.maximumInvestmentAmount)) {
            newErrors.minimumInvestmentAmount = 'Minimum investment should be less than maximum investment';
            newErrors.maximumInvestmentAmount = 'Maximum investment should be greater than minimum investment';
        }

        // Numeric validation for profitRatio, newRegistrationCommission, installmentPaymentCommission
        const numberFields = ['profitRatio', 'newRegistrationCommission', 'installmentPaymentCommission'];
        numberFields.forEach(field => {
            if (formData[field] && !/^\d+(\.\d{1,2})?$/.test(formData[field])) {
                newErrors[field] = `${field.replace(/([A-Z])/g, ' $1')} must be a valid number without special characters`;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => { 
        const { name, value, type, checked } = e.target; 
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value, 
        }); 
    }; 

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (validateForm()) {
            onUpdate(scheme.insuranceSchemeId, formData); 
            handleClose(); 
        }
    }; 

    const handleModalClose = () => {
        handleClose();
        setErrors({}); // Reset errors when modal closes
    };

    return ( 
        <Modal show={show} onHide={handleModalClose}> 
            <Modal.Header closeButton> 
                <Modal.Title>Edit Insurance Scheme</Modal.Title> 
            </Modal.Header> 
            <Modal.Body> 
                <Form onSubmit={handleSubmit}> 
                    <Form.Group controlId="formInsuranceScheme"> 
                        <Form.Label>Name</Form.Label> 
                        <Form.Control 
                            type="text" 
                            name="insuranceScheme" 
                            value={formData.insuranceScheme} 
                            onChange={handleChange} 
                            isInvalid={!!errors.insuranceScheme}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.insuranceScheme}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="formDescription"> 
                        <Form.Label>Description</Form.Label> 
                        <Form.Control 
                            as="textarea" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange} 
                            isInvalid={!!errors.description}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="formMinimumInvestmentAmount"> 
                        <Form.Label>Minimum Investment Amount</Form.Label> 
                        <Form.Control 
                            type="number" 
                            name="minimumInvestmentAmount" 
                            value={formData.minimumInvestmentAmount} 
                            onChange={handleChange} 
                            isInvalid={!!errors.minimumInvestmentAmount}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.minimumInvestmentAmount}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="formMaximumInvestmentAmount"> 
                        <Form.Label>Maximum Investment Amount</Form.Label> 
                        <Form.Control 
                            type="number" 
                            name="maximumInvestmentAmount" 
                            value={formData.maximumInvestmentAmount} 
                            onChange={handleChange} 
                            isInvalid={!!errors.maximumInvestmentAmount}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.maximumInvestmentAmount}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="formMinimumAge"> 
                        <Form.Label>Minimum Age</Form.Label> 
                        <Form.Control 
                            type="number" 
                            name="minimumAge" 
                            value={formData.minimumAge} 
                            onChange={handleChange} 
                            isInvalid={!!errors.minimumAge}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.minimumAge}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="formMaximumAge"> 
                        <Form.Label>Maximum Age</Form.Label> 
                        <Form.Control 
                            type="number" 
                            name="maximumAge" 
                            value={formData.maximumAge} 
                            onChange={handleChange} 
                            isInvalid={!!errors.maximumAge}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.maximumAge}</Form.Control.Feedback>
                    </Form.Group> 
                    <Form.Group controlId="formProfitRatio"> 
                        <Form.Label>Profit Ratio</Form.Label> 
                        <Form.Control 
                            type="text" 
                            name="profitRatio" 
                            value={formData.profitRatio} 
                            onChange={handleChange} 
                            isInvalid={!!errors.profitRatio}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.profitRatio}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formNewRegistrationCommission"> 
                        <Form.Label>New Registration Commission</Form.Label> 
                        <Form.Control 
                            type="text" 
                            name="newRegistrationCommission" 
                            value={formData.newRegistrationCommission} 
                            onChange={handleChange} 
                            isInvalid={!!errors.newRegistrationCommission}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.newRegistrationCommission}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formInstallmentPaymentCommission"> 
                        <Form.Label>Installment Payment Commission</Form.Label> 
                        <Form.Control 
                            type="text" 
                            name="installmentPaymentCommission" 
                            value={formData.installmentPaymentCommission} 
                            onChange={handleChange} 
                            isInvalid={!!errors.installmentPaymentCommission}
                        /> 
                        <Form.Control.Feedback type="invalid">{errors.installmentPaymentCommission}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formActive"> 
                        <Form.Label>Active</Form.Label>
                        <Form.Check 
                            type="checkbox" 
                            name="active" 
                            label="" 
                            checked={formData.active} 
                            onChange={handleChange} 
                            style={{ transform: 'scale(0.8)' }} // Makes the checkbox smaller
                        /> 
                    </Form.Group>



                    <Modal.Footer>

                        <Button variant="secondary" onClick={handleClose}>Close</Button> 
                        <Button variant="primary" type="submit">Save Changes</Button> 
                    </Modal.Footer> 
                </Form> 
            </Modal.Body> 
        </Modal> 
    ); 
}; 
 
export default EditSchemeModal;
