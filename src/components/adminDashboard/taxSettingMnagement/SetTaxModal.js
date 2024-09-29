// import React, { useState } from 'react';
// import { Modal, Button, Form } from 'react-bootstrap';
// import axios from 'axios';
// import { notify } from '../../../utils/globalToast';

// const SetTaxModal = ({ show, onHide }) => {
//     const [taxValue, setTaxValue] = useState('');

//     const handleTaxChange = (e) => {
//         setTaxValue(e.target.value);
//     };

//     const handleSubmit = async (e) => {

//         e.preventDefault();

//         try {
//             // Make API call to set the payment tax
//             await axios.post('http://localhost:8080/E-Insurance/admin/payment-tax', {
//                 paymentTax: taxValue,
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             });

//             // Notify success
//             notify('Payment tax updated successfully', 'success');
            
//             // Close modal
//             onHide();
//         } catch (error) {
//             console.error('Error setting payment tax:', error);
//             notify('Failed to update payment tax', 'error');
//         }
//     };

//     return (
//         <Modal show={show} onHide={onHide}>
//             <Modal.Header closeButton>
//                 <Modal.Title>Set Payment Tax</Modal.Title>
//             </Modal.Header>
//             <Modal.Body>
//                 <Form onSubmit={handleSubmit}>
//                     <Form.Group controlId="formTaxValue">
//                         <Form.Label>Enter Payment Tax Value</Form.Label>
//                         <Form.Control
//                             type="number"
//                             placeholder="Enter tax value"
//                             value={taxValue}
//                             onChange={handleTaxChange}
//                             required
//                         />
//                     </Form.Group>
//                     <Button variant="primary" type="submit" className="mt-3">
//                         Set Tax
//                     </Button>
//                 </Form>
//             </Modal.Body>
//         </Modal>
//     );
// };

// export default SetTaxModal;

import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { notify } from '../../../utils/globalToast';

const SetTaxModal = ({ show, onHide }) => {
    const [taxValue, setTaxValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Fetch the current payment tax when the modal opens
    useEffect(() => {
        const fetchCurrentTax = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8080/E-Insurance/admin/payment-tax', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
                setTaxValue(response.data.paymentTax); // Assuming response contains "paymentTax"
            } catch (error) {
                console.error('Error fetching current tax:', error);
                setError('Failed to load the current tax');
            } finally {
                setLoading(false);
            }
        };

        if (show) {
            fetchCurrentTax(); // Fetch the tax when the modal opens
        }
    }, [show]);

    const handleTaxChange = (e) => {
        setTaxValue(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make API call to set the payment tax
            await axios.post('http://localhost:8080/E-Insurance/admin/payment-tax', {
                paymentTax: taxValue,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            // Notify success
            notify('Payment tax updated successfully', 'success');

            // Close modal
            onHide();
        } catch (error) {
            console.error('Error setting payment tax:', error);
            notify('Failed to update payment tax', 'error');
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Set Payment Tax</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <div className="text-center">
                        <Spinner animation="border" />
                    </div>
                ) : error ? (
                    <div className="text-center text-danger">
                        {error}
                    </div>
                ) : (
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTaxValue">
                            <Form.Label>Enter Payment Tax Value</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter tax value"
                                value={taxValue}
                                onChange={handleTaxChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="mt-3">
                            Set Tax
                        </Button>
                    </Form>
                )}
            </Modal.Body>
        </Modal>
    );
};

export default SetTaxModal;
