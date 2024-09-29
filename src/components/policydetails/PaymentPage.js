

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation,useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

// Load your Stripe public key
const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

const PaymentPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { schemeId, investmentAmount, installmentAmount } = location.state || {};
    const { policyId } = useParams(); 

    const [paymentData, setPaymentData] = useState({
        paymentType: 'credit',
        amount: 0.0,
        tax: 0.0,
        totalPayment: 0.0,
        policyId: parseInt(policyId, 10), // Parse policyId as an integer
        installmentAmount: 0.0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const taxResponse = await axios.get('http://localhost:8080/E-Insurance/toall/payment-tax', {
                    headers: { 'Content-Type': 'application/json' },
                });
                const tax = taxResponse.data.paymentTax || 0;
                //const taxAmount = (investmentAmount * tax) / 100;
                //const totalPayment = investmentAmount + taxAmount;
                const taxAmount = (parseInt(installmentAmount) * parseFloat(tax) / 100);
                const totalPayment = parseInt(installmentAmount) + taxAmount;

                setPaymentData({
                    amount: parseInt(installmentAmount),
                    tax: taxAmount,
                    policyId: policyId,
                    totalPayment,
                    installmentAmount, // Use passed installment amount
                });
            } catch (error) {
                console.error('Failed to load payment details:', error);
            }
        };
        fetchData();
    }, [investmentAmount, policyId]);

    const handlePaymentSuccess = () => {
        //navigate('/confirmation');
        alert('Payment DONE!');
        setTimeout(() => {
            navigate('/');
        }, 10000); // 60 seconds delay
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="payment-container mt-4">
            <h3 className="mb-4">Payment Details</h3>
            <div className="container mt-5">
                <PaymentForm paymentData={paymentData} handlePaymentSuccess={handlePaymentSuccess} />
            </div>
            <Button onClick={handleGoBack} className="go-back-button">
                Go Back!
            </Button>
        </div>
    );
};


const PaymentForm = ({ paymentData, handlePaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [paymentType, setPaymentType] = useState('CREDIT'); // Default to CREDIT

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        try {
            setError(null);

            // Create a payment method using Stripe
            const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: cardElement,
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
                return;
            }

            // Create a payment intent using the backend
            const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
                amount: Math.round(paymentData.amount),
                paymentMethodId: paymentMethod.id,
                policyId: paymentData.policyId,
                paymentType, // Use the selected payment type
                tax: Math.round(paymentData.tax ),
                totalPayment:  paymentData.totalPayment,//Math.round(paymentData.totalPayment * 100),
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                },
            });
           

            // Confirm the payment using Stripe
            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (stripeError) {
                setError(stripeError.message);
                return;
            }

            handlePaymentSuccess();

        } catch (error) {
            console.error('Error processing payment:', error);
            setError('Payment failed');
        }
    };


    return (
        <form onSubmit={handleSubmit} className="payment-form">
            <div className="form-group">
                <label htmlFor="cardDetails" className="form-label">Card Details</label>
                <div id="cardDetails" className="card-element-container shadow-sm rounded">
                    <CardElement />
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Payment Type</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="CREDIT"
                            checked={paymentType === 'CREDIT'}
                            onChange={() => setPaymentType('CREDIT')}
                        />
                        Credit
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="DEBIT"
                            checked={paymentType === 'DEBIT'}
                            onChange={() => setPaymentType('DEBIT')}
                        />
                        Debit
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label className="form-label">Installment Amount</label>
                <input type="text" className="form-control" value={paymentData.installmentAmount} readOnly />
            </div>

            <div className="form-group">
                <label className="form-label">Tax Amount</label>
                <input type="text" className="form-control" value={paymentData.tax} readOnly />
            </div>

            {error && <div className="alert alert-danger rounded">{error}</div>}
            <Button type="submit" className="btn btn-primary btn-block payment-button" disabled={!stripe}>
                Pay Now
            </Button>
        </form>
    );
};

const PaymentComponent = () => (
    <Elements stripe={stripePromise}>
        <PaymentPage />
    </Elements>
);

export default PaymentComponent;
