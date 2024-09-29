import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

// Load Stripe with your publishable key
const stripePromise = loadStripe('tok_visa'); // Ensure this is your Stripe public key

const Checkout = () => {
    return (
        <Elements stripe={stripePromise}>
            <PaymentForm
                handlePaymentSuccess={() => {
                    console.log("Payment succeeded");
                }}
                totalAmount={100} // Pass the actual amount
                nominees={[]} // Pass actual nominees
                documents={[]} // Pass actual documents
            />
        </Elements>
    );
};

export default Checkout;
