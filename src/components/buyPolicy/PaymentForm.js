import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button, Form } from 'react-bootstrap';

const PaymentForm = ({ handlePaymentSuccess, totalAmount, nominees, documents }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);
        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setError('Card element not found');
            setLoading(false);
            return;
        }

        const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (stripeError) {
            setError(stripeError.message);
            setLoading(false);
            return;
        }

        // Call backend to process the payment
        const response = await fetch('/E-Insurance/customer/test', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                amount: totalAmount * 100, // Convert to cents
                stripeToken: paymentMethod.id,
                additionalInfo: {
                    policyId: 'your-policy-id', // Pass actual policy ID
                    agentId: 'your-agent-id', // Pass actual agent ID
                    nominees: nominees,
                    documents: documents.map(doc => doc.name), // Only send file names
                }
            }),
        });

        const data = await response.json();
        if (data === 'success') {
            handlePaymentSuccess();
        } else {
            setError('Payment failed');
        }
        setLoading(false);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="cardElement">
                <Form.Label>Credit or Debit Card</Form.Label>
                <CardElement />
            </Form.Group>
            {error && <p className="text-danger">{error}</p>}
            <Button type="submit" variant="success" disabled={loading}>
                {loading ? 'Processing…' : 'Pay Now'}
            </Button>
        </Form>
    );
};

export default PaymentForm;
