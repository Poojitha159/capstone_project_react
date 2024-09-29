// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Form } from 'react-bootstrap';

// const BuyPolicyPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount } = location.state || {};

//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);

//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');
//     const [uploadedDocs, setUploadedDocs] = useState([]);

//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };

//     const handleDocumentChange = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedDocs([...uploadedDocs, ...files]);
//     };

//     const handleSubmitPolicy = () => {
//         // Implement the policy submission logic here
//         // You might want to send the policy data along with nominees and documents to your backend
//         navigate('/'); // Redirect after submission
//     };

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Buy Policy</h3>
//             <Form>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Premium Amount</Form.Label>
//                     <Form.Control type="text" value={`$${parseFloat(investmentAmount).toFixed(2)}`} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Policy Term (Years)</Form.Label>
//                     <Form.Control type="text" value={policyTerm} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Installment Period (Months)</Form.Label>
//                     <Form.Control type="text" value={installmentPeriod} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Total Amount</Form.Label>
//                     <Form.Control type="text" value={`$${totalAmount.toFixed(2)}`} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Installment Amount (Monthly)</Form.Label>
//                     <Form.Control type="text" value={`$${installmentAmount.toFixed(2)}`} readOnly />
//                 </Form.Group>

//                 <h5 className="mt-4">Add Nominees</h5>
//                 <Form.Group controlId="formNomineeName">
//                     <Form.Label>Nominee Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={nomineeName}
//                         onChange={(e) => setNomineeName(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formRelation">
//                     <Form.Label>Relation</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={relation}
//                         onChange={(e) => setRelation(e.target.value)}
//                     >
//                         <option value="">Select Relation</option>
//                         <option value="Spouse">Spouse</option>
//                         <option value="Child">Child</option>
//                         <option value="Parent">Parent</option>
//                         <option value="Sibling">Sibling</option>
//                     </Form.Control>
//                 </Form.Group>
//                 <Button variant="primary" onClick={handleAddNominee}>
//                     Add Nominee
//                 </Button>

//                 <ul className="mt-2">
//                     {nominees.map((nominee, index) => (
//                         <li key={index}>{nominee.nomineeName} - {nominee.relation}</li>
//                     ))}
//                 </ul>

//                 <h5 className="mt-4">Upload Documents</h5>
//                 <Form.Group controlId="formFileMultiple">
//                     <Form.Label>Upload Documents</Form.Label>
//                     <Form.Control
//                         type="file"
//                         multiple
//                         onChange={handleDocumentChange}
//                     />
//                 </Form.Group>
//                 <ul className="mt-2">
//                     {uploadedDocs.length > 0 ? (
//                         uploadedDocs.map((doc, index) => (
//                             <li key={index}>{doc.name}</li>
//                         ))
//                     ) : (
//                         <p>No documents uploaded</p>
//                     )}
//                 </ul>

//                 <Button variant="success" onClick={handleSubmitPolicy} className="mt-4">
//                     Submit Policy
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default BuyPolicyPage;
// before stripe integration correct code from here 
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Form } from 'react-bootstrap';

// const BuyPolicyPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount } = location.state || {};

//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);

//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');
//     const [uploadedDocs, setUploadedDocs] = useState([]);

//     useEffect(() => {
//         const role = localStorage.getItem('UserRole');
//         const token = localStorage.getItem('authToken');

//         console.log(role,token);
//         // Check if the role is ROLE_CUSTOMER and the token is valid
//         if (role !== 'ROLE_CUSTOMER' ) {
//             console.log(role,token);
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };

//     const handleDocumentChange = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedDocs([...uploadedDocs, ...files]);
//     };

//     const handleSubmitPolicy = () => {
//         // Implement the policy submission logic here
//         // You might want to send the policy data along with nominees and documents to your backend
//         navigate('/'); // Redirect after submission
//     };

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Buy Policy</h3>
//             <Form>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Premium Amount</Form.Label>
//                     <Form.Control type="text" value={`$${parseFloat(investmentAmount).toFixed(2)}`} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Policy Term (Years)</Form.Label>
//                     <Form.Control type="text" value={policyTerm} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Installment Period (Months)</Form.Label>
//                     <Form.Control type="text" value={installmentPeriod} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Total Amount</Form.Label>
//                     <Form.Control type="text" value={`$${totalAmount.toFixed(2)}`} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Installment Amount (Monthly)</Form.Label>
//                     <Form.Control type="text" value={`$${installmentAmount.toFixed(2)}`} readOnly />
//                 </Form.Group>

//                 <h5 className="mt-4">Add Nominees</h5>
//                 <Form.Group controlId="formNomineeName">
//                     <Form.Label>Nominee Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={nomineeName}
//                         onChange={(e) => setNomineeName(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formRelation">
//                     <Form.Label>Relation</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={relation}
//                         onChange={(e) => setRelation(e.target.value)}
//                     >
//                         <option value="">Select Relation</option>
//                         <option value="Spouse">Spouse</option>
//                         <option value="Child">Child</option>
//                         <option value="Parent">Parent</option>
//                         <option value="Sibling">Sibling</option>
//                     </Form.Control>
//                 </Form.Group>
//                 <Button variant="primary" onClick={handleAddNominee}>
//                     Add Nominee
//                 </Button>

//                 <ul className="mt-2">
//                     {nominees.map((nominee, index) => (
//                         <li key={index}>{nominee.nomineeName} - {nominee.relation}</li>
//                     ))}
//                 </ul>

//                 <h5 className="mt-4">Upload Documents</h5>
//                 <Form.Group controlId="formFileMultiple">
//                     <Form.Label>Upload Documents</Form.Label>
//                     <Form.Control
//                         type="file"
//                         multiple
//                         onChange={handleDocumentChange}
//                     />
//                 </Form.Group>
//                 <ul className="mt-2">
//                     {uploadedDocs.length > 0 ? (
//                         uploadedDocs.map((doc, index) => (
//                             <li key={index}>{doc.name}</li>
//                         ))
//                     ) : (
//                         <p>No documents uploaded</p>
//                     )}
//                 </ul>

//                 <Button variant="success" onClick={handleSubmitPolicy} className="mt-4">
//                     Submit Policy
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// export default BuyPolicyPage;

// to here--------

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { Button, Form } from 'react-bootstrap';
// import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Load Stripe with your publishable key
// const stripePromise = loadStripe('sk_test_51PvwUsRonuWXFC5NVMnNqvRd5wnCAyLAOpnq8TcgIO8LLE2bgYmJosN5i9Ay5Ru4RyHC3cwR9nbdOZdl81faEGaO00J2BJb5X6'); // Replace 'your-public-key' with your actual public key

// export const BuyPolicyPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, investmentAmount, policyTerm, installmentPeriod, totalAmount, installmentAmount } = location.state || {};

//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);

//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');
//     const [uploadedDocs, setUploadedDocs] = useState([]);

//     useEffect(() => {
//         const role = localStorage.getItem('UserRole');
//         const token = localStorage.getItem('authToken');

//         if (role !== 'ROLE_CUSTOMER' || !token) {
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };

//     const handleDocumentChange = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedDocs([...uploadedDocs, ...files]);
//     };

//     const handleSubmitPolicy = () => {
//         // Redirect to the payment page with the policy data
//         navigate('/payment', {
//             state: {
//                 totalAmount,
//                 nominees,
//                 documents: uploadedDocs
//             }
//         });
//     };

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Buy Policy</h3>
//             <Form>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Premium Amount</Form.Label>
//                     <Form.Control type="text" value={`$${parseFloat(investmentAmount).toFixed(2)}`} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Policy Term (Years)</Form.Label>
//                     <Form.Control type="text" value={policyTerm} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Installment Period (Months)</Form.Label>
//                     <Form.Control type="text" value={installmentPeriod} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Total Amount</Form.Label>
//                     <Form.Control type="text" value={`$${totalAmount.toFixed(2)}`} readOnly />
//                 </Form.Group>
//                 <Form.Group controlId="formBasicText">
//                     <Form.Label>Installment Amount (Monthly)</Form.Label>
//                     <Form.Control type="text" value={`$${installmentAmount.toFixed(2)}`} readOnly />
//                 </Form.Group>

//                 <h5 className="mt-4">Add Nominees</h5>
//                 <Form.Group controlId="formNomineeName">
//                     <Form.Label>Nominee Name</Form.Label>
//                     <Form.Control
//                         type="text"
//                         value={nomineeName}
//                         onChange={(e) => setNomineeName(e.target.value)}
//                     />
//                 </Form.Group>
//                 <Form.Group controlId="formRelation">
//                     <Form.Label>Relation</Form.Label>
//                     <Form.Control
//                         as="select"
//                         value={relation}
//                         onChange={(e) => setRelation(e.target.value)}
//                     >
//                         <option value="">Select Relation</option>
//                         <option value="Spouse">Spouse</option>
//                         <option value="Child">Child</option>
//                         <option value="Parent">Parent</option>
//                         <option value="Sibling">Sibling</option>
//                     </Form.Control>
//                 </Form.Group>
//                 <Button variant="primary" onClick={handleAddNominee}>
//                     Add Nominee
//                 </Button>

//                 <ul className="mt-2">
//                     {nominees.map((nominee, index) => (
//                         <li key={index}>{nominee.nomineeName} - {nominee.relation}</li>
//                     ))}
//                 </ul>

//                 <h5 className="mt-4">Upload Documents</h5>
//                 <Form.Group controlId="formFileMultiple">
//                     <Form.Label>Upload Documents</Form.Label>
//                     <Form.Control
//                         type="file"
//                         multiple
//                         onChange={handleDocumentChange}
//                     />
//                 </Form.Group>
//                 <ul className="mt-2">
//                     {uploadedDocs.length > 0 ? (
//                         uploadedDocs.map((doc, index) => (
//                             <li key={index}>{doc.name}</li>
//                         ))
//                     ) : (
//                         <p>No documents uploaded</p>
//                     )}
//                 </ul>

//                 <Button variant="success" onClick={handleSubmitPolicy} className="mt-4">
//                     Proceed to Payment
//                 </Button>
//             </Form>
//         </div>
//     );
// };

// // Payment component with Stripe integration
// export const PaymentForm = ({ totalAmount, nominees, documents }) => {
//     const stripe = useStripe();
//     const elements = useElements();

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         const { token, error } = await stripe.createToken({ type: 'card' });

//         if (error) {
//             console.log('[Error]', error);
//             return;
//         }

//         // Send the token and other payment details to your server
//         const response = await fetch('/api/payment/charge', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 amount: totalAmount,
//                 stripeToken: token.id,
//                 nominees,
//                 documents
//             })
//         });

//         const data = await response.json();
//         if (data.success) {
//             console.log('Payment successful');
//             // Redirect or update the UI as needed
//         } else {
//             console.log('Payment failed', data.message);
//         }
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <h5 className="mb-4">Payment</h5>
//             <Form.Group controlId="cardElement">
//                 <Form.Label>Card Details</Form.Label>
//                 <CardElement />
//             </Form.Group>
//             <Button type="submit" variant="primary" disabled={!stripe}>
//                 Pay ${totalAmount.toFixed(2)}
//             </Button>
//         </Form>
//     );
// };

// // Wrap PaymentForm in Elements provider
// const PaymentPage = () => {
//     return (
//         <Elements stripe={stripePromise}>
//             <PaymentForm
//                 totalAmount={100} // Example amount, replace with actual amount
//                 nominees={[]} // Pass actual nominees
//                 documents={[]} // Pass actual documents
//             />
//         </Elements>
//     );
// };


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { Button, Form } from 'react-bootstrap';

// // Load your Stripe public key
// const stripePromise = loadStripe('your-publishable-key-here');

// const PaymentForm = ({ handlePaymentSuccess, totalAmount, nominees, documents }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setLoading(true);
//         const { error, paymentMethod } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: elements.getElement(CardElement),
//         });

//         if (error) {
//             setError(error.message);
//             setLoading(false);
//             return;
//         }

//         // Call backend to process the payment
//         const response = await fetch('/api/payment/test', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({
//                 amount: totalAmount * 100, // Convert to cents
//                 stripeToken: paymentMethod.id,
//                 additionalInfo: {
//                     policyId: 'your-policy-id', // Pass actual policy ID
//                     agentId: 'your-agent-id', // Pass actual agent ID
//                     nominees: nominees,
//                     documents: documents.map(doc => doc.name), // Only send file names
//                 }
//             }),
//         });

//         const data = await response.json();
//         if (data === 'success') {
//             handlePaymentSuccess();
//         } else {
//             setError('Payment failed');
//         }
//         setLoading(false);
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="cardElement">
//                 <Form.Label>Credit or Debit Card</Form.Label>
//                 <CardElement />
//             </Form.Group>
//             {error && <p className="text-danger">{error}</p>}
//             <Button type="submit" variant="success" disabled={loading}>
//                 {loading ? 'Processing…' : 'Pay Now'}
//             </Button>
//         </Form>
//     );
// };

// const BuyPolicyPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount } = location.state || {};

//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);
//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');
//     const [uploadedDocs, setUploadedDocs] = useState([]);

//     useEffect(() => {
//         const role = localStorage.getItem('UserRole');
//         const token = localStorage.getItem('authToken');
//         if (role !== 'ROLE_CUSTOMER' || !token) {
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };

//     const handleDocumentChange = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedDocs([...uploadedDocs, ...files]);
//     };

//     const handlePaymentSuccess = () => {
//         navigate('/confirmation'); // Change this to the appropriate path
//     };

//     if (!totalAmount) {
//         console.error('totalAmount is not defined in location.state');
//         return <p>Error: Missing payment details</p>;
//     }

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Buy Policy</h3>
//             <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p>
//             <p>Policy Term (Years): {policyTerm}</p>
//             <p>Installment Period (Months): {installmentPeriod}</p>
//             <p>Total Amount: ${totalAmount.toFixed(2)}</p>
//             <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p>

//             <h5 className="mt-4">Add Nominees</h5>
//             <Form.Group controlId="formNomineeName">
//                 <Form.Label>Nominee Name</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={nomineeName}
//                     onChange={(e) => setNomineeName(e.target.value)}
//                 />
//             </Form.Group>
//             <Form.Group controlId="formRelation">
//                 <Form.Label>Relation</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={relation}
//                     onChange={(e) => setRelation(e.target.value)}
//                 >
//                     <option value="">Select Relation</option>
//                     <option value="Spouse">Spouse</option>
//                     <option value="Child">Child</option>
//                     <option value="Parent">Parent</option>
//                     <option value="Sibling">Sibling</option>
//                 </Form.Control>
//             </Form.Group>
//             <Button variant="primary" onClick={handleAddNominee}>
//                 Add Nominee
//             </Button>

//             <ul className="mt-2">
//                 {nominees.map((nominee, index) => (
//                     <li key={index}>{nominee.nomineeName} - {nominee.relation}</li>
//                 ))}
//             </ul>

            // <h5 className="mt-4">Upload Documents</h5>
            // <Form.Group controlId="formFileMultiple">
            //     <Form.Label>Upload Documents</Form.Label>
            //     <Form.Control
            //         type="file"
            //         multiple
            //         onChange={handleDocumentChange}
            //     />
            // </Form.Group>
            // <ul className="mt-2">
            //     {uploadedDocs.length > 0 ? (
            //         uploadedDocs.map((doc, index) => (
            //             <li key={index}>{doc.name}</li>
            //         ))
            //     ) : (
            //         <p>No documents uploaded</p>
            //     )}
            // </ul>

//             <Elements stripe={stripePromise}>
//                 <PaymentForm
//                     handlePaymentSuccess={handlePaymentSuccess}
//                     totalAmount={totalAmount}
//                     nominees={nominees}
//                     documents={uploadedDocs}
//                 />
//             </Elements>
//         </div>
//     );
// };

// export default BuyPolicyPage;
// ---------------------
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// import { useLocation, useNavigate } from 'react-router-dom';
// import { Elements, CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';
// import { Button, Form } from 'react-bootstrap';

// // Load your Stripe public key
// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

// const PaymentForm = ({ handlePaymentSuccess, totalAmount, nominees, documents }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const token = localStorage.getItem('authToken');

// //     const handleSubmit = async (event) => {
// //         event.preventDefault();

// //         if (!stripe || !elements) {
// //             return;
// //         }

// //         setLoading(true);
// //         // const { error, paymentMethod } = await stripe.createPaymentMethod({
// //         //     type: 'card',
// //         //     card: elements.getElement(CardElement),
// //         // });
// //         // console.log(paymentMethod);

// //         // if (error) {
// //         //     console.log('getting log');
// //         //     setError(error.message);
// //         //     setLoading(false);
// //         //     return;
// //         // }

// //     //     // Call backend to process the payment
// //     //     const response = await axios.post(
// //     //         'http://localhost:8080/E-Insurance/customer/test',
// //     //         {            method: 'POST',
// //     //             headers: {
// //     //                 'Content-Type': 'application/json',
// //     //                 'Authorization': `Bearer ${token}`, // Include the token in headers
// //     //             },
// //     //         body: JSON.stringify({
// //     //             amount: totalAmount * 100, // Convert to cents
// //     //             stripeToken: paymentMethod.id,
// //     //             additionalInfo: {
// //     //                 policyId: '4', // Pass actual policy ID
// //     //                 agentId: '1', // Pass actual agent ID
// //     //                 nominees: nominees,
// //     //                 documents: documents.map(doc => doc.name), // Only send file names
// //     //             }
// //     //         }),
// //     //     });
// //     //     console.log(response);

// //     //     const data = await response.json();
// //     //     if (data === 'success') {
// //     //         handlePaymentSuccess();
// //     //     } else {
// //     //         setError('Payment failed');
// //     //     }
// //     //     setLoading(false);
// //     // };
// // //     try {
// // //         const response = await axios.post(
// // //             'http://localhost:8080/E-Insurance/customer/test',
// // //             {
// // //                 amount: totalAmount * 100, // Convert to cents
// // //                 stripeToken: paymentMethod.id,
// // //                 additionalInfo: {
// // //                     policyId: '4', // Pass actual policy ID
// // //                     agentId: '1', // Pass actual agent ID
// // //                     nominees: nominees,
// // //                     documents: documents.map(doc => doc.name), // Only send file names
// // //                 }
// // //             },
// // //             {
// // //                 headers: {
// // //                     'Content-Type': 'application/json',
// // //                     'Authorization': `Bearer ${token}`, // Include the token in headers
// // //                 }
// // //             }
// // //         );

// // //         if (response.data === 'success') {
// // //             handlePaymentSuccess();
// // //         } else {
// // //             setError('Payment failed');
// // //         }
// // //     } catch (error) {
// // //         console.error('Error processing payment:', error);
// // //         setError('Payment failed');
// // //     }

// // //     setLoading(false);
// // // };
// //  // Create a PaymentIntent on your server
// //  try {
// //     const { data: { clientSecret } } = await axios.post(`http:/localhost:8080/E-Insurance/customer/create-payment-intent`, {
// //         amount: totalAmount * 100, // Amount in cents
// //         paymentMethodId: (await stripe.createPaymentMethod({
// //             type: 'card',
// //             card: elements.getElement(CardElement),
// //         })).paymentMethod.id,
// //     });

// //     // Confirm the PaymentIntent
// //     const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
// //         payment_method: {
// //             card: elements.getElement(CardElement),
// //         },
// //     });

// //     if (stripeError) {
// //         setError(stripeError.message);
// //     } else {
// //         handlePaymentSuccess();
// //     }
// // } catch (error) {
// //     console.error('Error processing payment:', error);
// //     setError('Payment failed');
// // }

// // setLoading(false);
// // };

// const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//         return;
//     }

//     setLoading(true);

//     try {
//         // Create a PaymentMethod
//         const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
//             type: 'card',
//             card: elements.getElement(CardElement),
//         });

//         if (paymentMethodError) {
//             setError(paymentMethodError.message);
//             setLoading(false);
//             return;
//         }
//         const token = localStorage.getItem('authToken');
//         if (!token) {
//             setError('No authentication token found');
//             setLoading(false);
//             return;
//         }

//         // Call backend to create a PaymentIntent
//         const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
//             amount: totalAmount * 100, // Convert amount to cents
//             paymentMethodId: paymentMethod.id,
//         }, {
//             headers: {
//                 'Authorization': `Bearer ${token}`, // Include the token here
//                 'Content-Type': 'application/json',
//             },
//         });

//         // Confirm the PaymentIntent
//         const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: paymentMethod.id,
//         });

//         if (stripeError) {
//             setError(stripeError.message);
//         } else {
//             handlePaymentSuccess();
//         }
//     } catch (error) {
//         console.error('Error processing payment:', error);
//         setError('Payment failed');
//     }

//     setLoading(false);
// };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="cardElement">
//                 <Form.Label>Credit or Debit Card</Form.Label>
//                 <CardElement />
//             </Form.Group>
//             {error && <p className="text-danger">{error}</p>}
//             <Button type="submit" variant="success" disabled={loading}>
//                 {loading ? 'Processing…' : 'Pay Now'}
//             </Button>
//         </Form>
//     );
// };
// export { PaymentForm };

// const BuyPolicyPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount } = location.state || {};

//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);
//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');
//     const [uploadedDocs, setUploadedDocs] = useState([]);

//     useEffect(() => {
//         const role = localStorage.getItem('UserRole');
//         const token = localStorage.getItem('authToken');
//         if (role !== 'ROLE_CUSTOMER' || !token) {
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };

//     const handleDocumentChange = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedDocs([...uploadedDocs, ...files]);
//     };

//     const handlePaymentSuccess = () => {
//         navigate('/confirmation'); // Change this to the appropriate path
//     };

//     if (!totalAmount) {
//         console.error('totalAmount is not defined in location.state');
//         return <p>Error: Missing payment details</p>;
//     }

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Buy Policy</h3>
//             <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p>
//             <p>Policy Term (Years): {policyTerm}</p>
//             <p>Installment Period (Months): {installmentPeriod}</p>
//             <p>Total Amount: ${totalAmount.toFixed(2)}</p>
//             <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p>

//             <h5 className="mt-4">Add Nominees</h5>
//             <Form.Group controlId="formNomineeName">
//                 <Form.Label>Nominee Name</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={nomineeName}
//                     onChange={(e) => setNomineeName(e.target.value)}
//                 />
//             </Form.Group>
//             <Form.Group controlId="formRelation">
//                 <Form.Label>Relation</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={relation}
//                     onChange={(e) => setRelation(e.target.value)}
//                 >
//                     <option value="">Select Relation</option>
//                     <option value="Spouse">Spouse</option>
//                     <option value="Child">Child</option>
//                     <option value="Parent">Parent</option>
//                     <option value="Sibling">Sibling</option>
//                 </Form.Control>
//             </Form.Group>
//             <Button variant="primary" onClick={handleAddNominee}>
//                 Add Nominee
//             </Button>

//             <ul className="mt-2">
//                 {nominees.map((nominee, index) => (
//                     <li key={index}>{nominee.nomineeName} - {nominee.relation}</li>
//                 ))}
//             </ul>

//             <h5 className="mt-4">Upload Documents</h5>
//             <Form.Group controlId="formFileMultiple">
//                 <Form.Label>Upload Documents</Form.Label>
//                 <Form.Control
//                     type="file"
//                     multiple
//                     onChange={handleDocumentChange}
//                 />
//             </Form.Group>
//             <ul className="mt-2">
//                 {uploadedDocs.length > 0 ? (
//                     uploadedDocs.map((doc, index) => (
//                         <li key={index}>{doc.name}</li>
//                     ))
//                 ) : (
//                     <p>No documents uploaded</p>
//                 )}
//             </ul>

//             <Elements stripe={stripePromise}>
//                 <PaymentForm
//                     handlePaymentSuccess={handlePaymentSuccess}
//                     totalAmount={totalAmount}
//                     nominees={nominees}
//                     documents={uploadedDocs}
//                 />
//             </Elements>
//         </div>
//     );
// };

// export default BuyPolicyPage;
// --------
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
// import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Load your Stripe public key
// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

// const PaymentForm = ({ handlePaymentSuccess, totalAmount, nominees, documents }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);

//     const token = localStorage.getItem('authToken');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setLoading(true);

//         try {
//             // Create a PaymentMethod
//             const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: elements.getElement(CardElement),
//             });

//             if (paymentMethodError) {
//                 setError(paymentMethodError.message);
//                 setLoading(false);
//                 return;
//             }

//             if (!token) {
//                 setError('No authentication token found');
//                 setLoading(false);
//                 return;
//             }

//         //     // Prepare data for backend
//         // const requestData = {
//         //     amount: Math.round(totalAmount * 100), // Convert amount to cents
//         //     paymentMethodId: paymentMethod.id,
//         //     policyId: 4, // Adjust as needed
//         //     paymentType: "stripe",
//         //     tax: 5,
//         //     totalPayment: 200,
//         //     nominees, // Add nominees here
//         //     documents: uploadedDocs.map(doc => ({
//         //         documentName: doc.name,
//         //         documentImage: await getDocumentBase64(doc) // Convert to Base64 if needed
//         //     })),
//         // };

//             // Call backend to create a PaymentIntent
//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
//                 amount: Math.round(totalAmount * 100), // Convert amount to cents
//                 paymentMethodId: paymentMethod.id,
//                 policyId:4,
//                 paymentType:"stripe",
//                 tax:5,
//                 totalPayment:200,


//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`, // Include the token here
//                     'Content-Type': 'application/json',
//                 },
//             });

//             // Confirm the PaymentIntent
//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: paymentMethod.id,
//             });

//             if (stripeError) {
//                 setError(stripeError.message);
//             } else {
//                 handlePaymentSuccess();
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setError('Payment failed');
//         }

//         setLoading(false);
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="cardElement">
//                 <Form.Label>Credit or Debit Card</Form.Label>
//                 <CardElement />
//             </Form.Group>
//             {error && <p className="text-danger">{error}</p>}
//             <Button type="submit" variant="success" disabled={loading}>
//                 {loading ? 'Processing…' : 'Pay Now'}
//             </Button>
//         </Form>
//     );
// };

// export { PaymentForm };


// const BuyPolicyPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount } = location.state || {};

//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);
//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');
//     const [uploadedDocs, setUploadedDocs] = useState([]);

//     useEffect(() => {
//         const role = localStorage.getItem('UserRole');
//         const token = localStorage.getItem('authToken');
//         if (role !== 'ROLE_CUSTOMER' || !token) {
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };

//     const handleDocumentChange = (e) => {
//         const files = Array.from(e.target.files);
//         setUploadedDocs([...uploadedDocs, ...files]);
//     };

//     const handlePaymentSuccess = () => {
//         navigate('/confirmation'); // Change this to the appropriate path
//         alert('policy created succesfully');
//     };

//     if (!totalAmount) {
//         console.error('totalAmount is not defined in location.state');
//         return <p>Error: Missing payment details</p>;
//     }

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Buy Policy</h3>
//             <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p>
//             <p>Policy Term (Years): {policyTerm}</p>
//             <p>Installment Period (Months): {installmentPeriod}</p>
//             <p>Total Amount: ${totalAmount.toFixed(2)}</p>
//             <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p>

//             <h5 className="mt-4">Add Nominees</h5>
//             <Form.Group controlId="formNomineeName">
//                 <Form.Label>Nominee Name</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={nomineeName}
//                     onChange={(e) => setNomineeName(e.target.value)}
//                 />
//             </Form.Group>
//             <Form.Group controlId="formRelation">
//                 <Form.Label>Relation</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={relation}
//                     onChange={(e) => setRelation(e.target.value)}
//                 >
//                     <option value="">Select Relation</option>
//                     <option value="Spouse">Spouse</option>
//                     <option value="Child">Child</option>
//                     <option value="Parent">Parent</option>
//                     <option value="Sibling">Sibling</option>
//                 </Form.Control>
//                 <br/>
//             </Form.Group>
//             <Button variant="primary" onClick={handleAddNominee}>
//                 Add Nominee
//             </Button>

//             <ul className="mt-2">
//                 {nominees.map((nominee, index) => (
//                     <li key={index}>{nominee.nomineeName} - {nominee.relation}</li>
//                 ))}
//             </ul>

//             <h5 className="mt-4">Upload Documents</h5>
//             <Form.Group controlId="formFileMultiple">
//                 <Form.Label>Upload Documents</Form.Label>
//                 <Form.Control
//                     type="file"
//                     multiple
//                     onChange={handleDocumentChange}
//                 />
//             </Form.Group>
//             <ul className="mt-2">
//                 {uploadedDocs.length > 0 ? (
//                     uploadedDocs.map((doc, index) => (
//                         <li key={index}>{doc.name}</li>
//                     ))
//                 ) : (
//                     <p>No documents uploaded</p>
//                 )}
//             </ul>

//             <Elements stripe={stripePromise}>
//                 <PaymentForm
//                     handlePaymentSuccess={handlePaymentSuccess}
//                     totalAmount={totalAmount}
//                     nominees={nominees}
//                     documents={uploadedDocs}
//                 />
//             </Elements>
//         </div>
//     );
// };

// export default BuyPolicyPage;
// //----------------

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
// import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js';
// import { loadStripe } from '@stripe/stripe-js';

// // Load your Stripe public key
// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc');

// const uploadDocuments = async (files, onUploadComplete) => {
//     const uploadedDocs = [];
    
//     for (const file of files) {
//         const formData = new FormData();
//         formData.append('file', file);

//         try {
//             const response = await axios.post('http://localhost:8080/E-Insurance/file/upload', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             if (response.data) {
//                 uploadedDocs.push({
//                     documentName: file.name,
//                     documentImage: response.data.name,
//                 });
//             }
//         } catch (error) {
//             console.error('Error uploading document ${file.name}:', error);
//         }
//     }

//     onUploadComplete(uploadedDocs);
// };

// const PaymentForm = ({ handlePaymentSuccess, totalAmount, nominees, documents }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const token = localStorage.getItem('authToken');

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         if (!stripe || !elements) {
//             return;
//         }

//         setLoading(true);

//         try {
//             // Create a PaymentMethod
//             const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
//                 type: 'card',
//                 card: elements.getElement(CardElement),
//             });

//             if (paymentMethodError) {
//                 setError(paymentMethodError.message);
//                 setLoading(false);
//                 return;
//             }

//             if (!token) {
//                 setError('No authentication token found');
//                 setLoading(false);
//                 return;
//             }

//             // Call backend to create a PaymentIntent
//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
//                 amount: Math.round(totalAmount * 100),
//                 paymentMethodId: paymentMethod.id,
//                 policyId: 4,
//                 paymentType: 'stripe',
//                 tax: 5,
//                 totalPayment: 200,
//             }, {
//                 headers: {
//                     'Authorization': `Bearer ${token}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             // Confirm the PaymentIntent
//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
//                 payment_method: paymentMethod.id,
//             });

//             if (stripeError) {
//                 setError(stripeError.message);
//             } else {
//                 handlePaymentSuccess();
//             }
//         } catch (error) {
//             console.error('Error processing payment:', error);
//             setError('Payment failed');
//         }

//         setLoading(false);
//     };

//     return (
//         <Form onSubmit={handleSubmit}>
//             <Form.Group controlId="cardElement">
//                 <Form.Label>Credit or Debit Card</Form.Label>
//                 <CardElement />
//             </Form.Group>
//             {error && <p className="text-danger">{error}</p>}
//             <Button type="submit" variant="success" disabled={loading}>
//                 {loading ? 'Processing…' : 'Pay Now'}
//             </Button>
//         </Form>
//     );
// };

// const BuyPolicyPage = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { scheme, investmentAmount, policyTerm, installmentPeriod, totalAmount, installmentAmount } = location.state || {};

//     const [nominees, setNominees] = useState([]);
//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');
//     const [uploadedDocs, setUploadedDocs] = useState([]);

//     useEffect(() => {
//         const role = localStorage.getItem('UserRole');
//         const token = localStorage.getItem('authToken');
//         if (role !== 'ROLE_CUSTOMER' || !token) {
//             navigate('/login');
//         }
//     }, [navigate]);

//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };

//     const handleDocumentChange = (e) => {
//         console.log('Files selected:', e.target.files);
//         const files = Array.from(e.target.files);
//         console.log('Selected files:', files); // Log selected files

//         uploadDocuments(files, (uploaded) => {
//             console.log('Uploaded documents:', uploaded);
//             setUploadedDocs([...uploadedDocs, ...uploaded]);
//         });
//     };

//     const handlePaymentSuccess = () => {
//         navigate('/confirmation');
//         alert('Policy created successfully');
//     };

//     if (!totalAmount) {
//         console.error('totalAmount is not defined in location.state');
//         return <p>Error: Missing payment details</p>;
//     }

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Buy Policy</h3>
//             <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p>
//             <p>Policy Term (Years): {policyTerm}</p>
//             <p>Installment Period (Months): {installmentPeriod}</p>
//             <p>Total Amount: ${totalAmount.toFixed(2)}</p>
//             <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p>

//             <h5 className="mt-4">Add Nominees</h5>
//             <Form.Group controlId="formNomineeName">
//                 <Form.Label>Nominee Name</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={nomineeName}
//                     onChange={(e) => setNomineeName(e.target.value)}
//                 />
//             </Form.Group>
//             <Form.Group controlId="formRelation">
//                 <Form.Label>Relation</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={relation}
//                     onChange={(e) => setRelation(e.target.value)}
//                 >
//                     <option value="">Select Relation</option>
//                     <option value="Spouse">Spouse</option>
//                     <option value="Child">Child</option>
//                     <option value="Parent">Parent</option>
//                     <option value="Sibling">Sibling</option>
//                 </Form.Control>
//             </Form.Group>
//             <Button variant="primary" onClick={handleAddNominee}>
//                 Add Nominee
//             </Button>

//             <ul className="mt-2">
//                 {nominees.map((nominee, index) => (
//                     <li key={index}>{nominee.nomineeName} - {nominee.relation}</li>
//                 ))}
//             </ul>

//             <h5 className="mt-4">Upload Documents</h5>
//             <Form.Group controlId="formFileMultiple">
//                 <Form.Label>Upload Documents</Form.Label>
//                 <Form.Control
//                     type="file"
//                     multiple
//                     onChange={handleDocumentChange}
//                 />
//             </Form.Group>
//             <ul className="mt-2">
//                 {uploadedDocs.length > 0 ? (
//                     uploadedDocs.map((doc, index) => (
//                         <li key={index}>{doc.documentName}</li>
//                     ))
//                 ) : (
//                     <p>No documents uploaded</p>
//                 )}
//             </ul>

//             <Elements stripe={stripePromise}>
//                 <PaymentForm
//                     handlePaymentSuccess={handlePaymentSuccess}
//                     totalAmount={totalAmount}
//                     nominees={nominees}
//                     documents={uploadedDocs}
//                 />
//             </Elements>
//         </div>
//     );
// };

// export default BuyPolicyPage;


// import React, { useState, useEffect } from 'react'; 
// import { useLocation, useNavigate } from 'react-router-dom'; 
// import axios from 'axios'; 
// import { Form, Button } from 'react-bootstrap'; 
// import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js'; 
// import { loadStripe } from '@stripe/stripe-js'; 

// // Load your Stripe public key 
// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc'); 

// const uploadDocuments = async (files, onUploadComplete) => { 
//     const uploadedDocs = []; 

//     for (const file of files) { 
//         const formData = new FormData(); 
//         formData.append('file', file.file); 

//         try { 
//             const response = await axios.post('http://localhost:8080/E-Insurance/file/upload', formData, { 
//                 headers: { 
//                     'Content-Type': 'multipart/form-data', 
//                 }, 
//             }); 

//             if (response.data) { 
//                 uploadedDocs.push({ 
//                     documentName: file.documentName, 
//                     documentImage: response.data.name, 
//                 }); 
//             } 
//         } catch (error) { 
//             console.error(`Error uploading document ${file.documentName}:`, error); 
//         } 
//     } 

//     onUploadComplete(uploadedDocs); 
// }; 

// const PaymentForm = ({ handlePaymentSuccess, totalAmount, nominees, documents }) => { 
//     const stripe = useStripe(); 
//     const elements = useElements(); 
//     const [error, setError] = useState(null); 
//     const [loading, setLoading] = useState(false); 
//     const token = localStorage.getItem('authToken'); 

//     const handleSubmit = async (event) => { 
//         event.preventDefault(); 

//         if (!stripe || !elements) { 
//             return; 
//         } 

//         setLoading(true); 

//         try { 
//             // Create a PaymentMethod 
//             const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({ 
//                 type: 'card', 
//                 card: elements.getElement(CardElement), 
//             }); 

//             if (paymentMethodError) { 
//                 setError(paymentMethodError.message); 
//                 setLoading(false); 
//                 return; 
//             } 

//             if (!token) { 
//                 setError('No authentication token found'); 
//                 setLoading(false); 
//                 return; 
//             } 

//             // Call backend to create a PaymentIntent 
//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', { 
//                 amount: Math.round(totalAmount * 100), 
//                 paymentMethodId: paymentMethod.id, 
//                 policyId: 4, 
//                 paymentType: 'stripe', 
//                 tax: 5, 
//                 totalPayment: 200, 
//             }, { 
//                 headers: { 
//                     'Authorization': `Bearer ${token}`, 
//                     'Content-Type': 'application/json', 
//                 }, 
//             }); 

//             // Confirm the PaymentIntent 
//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, { 
//                 payment_method: paymentMethod.id, 
//             }); 

//             if (stripeError) { 
//                 setError(stripeError.message); 
//             } else { 
//                 handlePaymentSuccess(); 
//             } 
//         } catch (error) { 
//             console.error('Error processing payment:', error); 
//             setError('Payment failed'); 
//         } 

//         setLoading(false); 
//     }; 

//     return ( 
//         <Form onSubmit={handleSubmit}> 
//             <Form.Group controlId="cardElement"> 
//                 <Form.Label>Credit or Debit Card</Form.Label> 
//                 <CardElement /> 
//             </Form.Group> 
//             {error && <p className="text-danger">{error}</p>} 
//             <Button type="submit" variant="success" disabled={loading}> 
//                 {loading ? 'Processing…' : 'Pay Now'} 
//             </Button> 
//         </Form> 
//     ); 
// }; 

// const BuyPolicyPage = () => { 
//     const location = useLocation(); 
//     const navigate = useNavigate(); 
    

//     const { scheme, investmentAmount, policyTerm, installmentPeriod, totalAmount, installmentAmount } = location.state || {}; 

//     const [nominees, setNominees] = useState([]); 
//     const [nomineeName, setNomineeName] = useState(''); 
//     const [relation, setRelation] = useState(''); 
    // const [uploadedDocs, setUploadedDocs] = useState([]); 
    // const [files, setFiles] = useState({}); // Object to hold files based on document names
    

  

//     useEffect(() => { 
//         const role = localStorage.getItem('UserRole'); 
//         const token = localStorage.getItem('authToken'); 
//         if (role !== 'ROLE_CUSTOMER' || !token) { 
//             navigate('/login'); 
//         } 
//     }, [navigate]); 

//     if (!scheme) {
//         return <p>Loading or no data available...</p>;
//     }

//     const handleAddNominee = () => { 
//         if (nomineeName && relation) { 
//             setNominees([...nominees, { nomineeName, relation }]); 
//             setNomineeName(''); 
//             setRelation(''); 
//         } 
//     }; 

//     const handleDocumentChange = (documentName, file) => { 
//         setFiles(prevFiles => ({ 
//             ...prevFiles, 
//             [documentName]: file, 
//         }));
//     }; 

//     const handleUploadDocuments = () => {
//         const filesArray = Object.keys(files).map(documentName => ({
//             documentName,
//             file: files[documentName],
//         }));
//         uploadDocuments(filesArray, (uploaded) => {
//             setUploadedDocs(uploaded);
//         });
//     };

//     const handlePaymentSuccess = () => { 
//         navigate('/confirmation'); 
//         alert('Policy created successfully'); 
//     }; 

//     if (!totalAmount) { 
//         console.error('totalAmount is not defined in location.state'); 
//         return <p>Error: Missing payment details</p>; 
//     } 
//     console.log(scheme);
//     console.log(scheme?.schemeDocument);

// //     // Set scheme from location state
// // useEffect(() => {
// //     if (location.state) {
// //       setScheme(location.state.scheme);
// //     }
// //   }, [location.state]);
  
// //   if (!scheme) {
// //     return <p>Loading or no data available...</p>;
// //   }
  

//     return ( 
//         <div className="container mt-4"> 
//             <h3 className="mb-4">Buy Policy</h3> 
//             <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p> 
//             <p>Policy Term (Years): {policyTerm}</p> 
//             <p>Installment Period (Months): {installmentPeriod}</p> 
//             <p>Total Amount: ${totalAmount.toFixed(2)}</p> 
//             <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p> 

//             <h5 className="mt-4">Add Nominees</h5> 
//             <Form.Group controlId="formNomineeName"> 
//                 <Form.Label>Nominee Name</Form.Label> 
//                 <Form.Control 
//                     type="text" 
//                     value={nomineeName} 
//                     onChange={(e) => setNomineeName(e.target.value)} 
//                 /> 
//             </Form.Group> 
//             <Form.Group controlId="formRelation"> 
//                 <Form.Label>Relation</Form.Label> 
//                 <Form.Control 
//                     as="select" 
//                     value={relation} 
//                     onChange={(e) => setRelation(e.target.value)} 
//                 > 
//                     <option value="">Select Relation</option> 
//                     <option value="Spouse">Spouse</option> 
//                     <option value="Child">Child</option> 
//                     <option value="Parent">Parent</option> 
//                     <option value="Sibling">Sibling</option> 
//                 </Form.Control> 
//             </Form.Group> 
//             <Button variant="primary" onClick={handleAddNominee}> 
//                 Add Nominee 
//             </Button> 

//             <ul className="mt-2"> 
//                 {nominees.map((nominee, index) => ( 
//                     <li key={index}>{nominee.nomineeName} - {nominee.relation}</li> 
//                 ))} 
//             </ul> 

//             <h5 className="mt-4">Upload Documents</h5> 
//             {scheme?.schemeDocument?.map((doc, index) => (
//                 <Form.Group controlId={`formFile-${index}`} key={index}> 
//                     <Form.Label>{doc.name}</Form.Label> 
//                     <Form.Control 
//                         type="file" 
//                         onChange={(e) => handleDocumentChange(doc.name, e.target.files[0])} 
//                     /> 
//                 </Form.Group> 
//             ))}
// <Button variant="secondary" className="mt-3" onClick={handleUploadDocuments}>
//                 Upload Documents
//             </Button>

//             <ul className="mt-2"> 
//                 {uploadedDocs.length > 0 ? ( 
//                     uploadedDocs.map((doc, index) => ( 
//                         <li key={index}>{doc.documentName}</li> 
//                     )) 
//                 ) : ( 
//                     <p>No documents uploaded</p> 
//                 )} 
//             </ul> 
           


//             <Elements stripe={stripePromise}> 
//                 <PaymentForm 
//                     handlePaymentSuccess={handlePaymentSuccess} 
//                     totalAmount={totalAmount} 
//                     nominees={nominees} 
//                     documents={uploadedDocs} 
//                 /> 
//             </Elements> 
//         </div> 
//     ); 
// }; 

// export default BuyPolicyPage;
//------------------
//--------------------
// import React, { useState, useEffect } from 'react'; 
// import { useLocation, useNavigate } from 'react-router-dom'; 
// import axios from 'axios'; 
// import { Form, Button } from 'react-bootstrap'; 
// import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js'; 
// import { loadStripe } from '@stripe/stripe-js'; 

// // Load your Stripe public key 
// const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc'); 

// const uploadDocuments = async (files, onUploadComplete) => { 
//     const uploadedDocs = []; 
//     const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

//     for (const file of files) { 
//         const formData = new FormData(); 
//         formData.append('file', file.file); 

//         try { 
//             const response = await axios.post('http://localhost:8080/E-Insurance/file/upload', formData, { 
//                 headers: { 
//                     'Content-Type': 'multipart/form-data',
//                     'Authorization': `Bearer ${token}`
//                 }, 
//             }); 

//             if (response.data) { 
//                 uploadedDocs.push({ 
//                     documentName: file.documentName, 
//                     documentImage: response.data.name, 
//                 }); 
//             } 
//         } catch (error) { 
//             console.error(`Error uploading document ${file.documentName}:`, error); 
//         } 
//     } 

//     onUploadComplete(uploadedDocs); 
// }; 

// const PaymentForm = ({ handlePaymentSuccess, totalAmount, nominees, documents }) => { 
//     const stripe = useStripe(); 
//     const elements = useElements(); 
//     const [error, setError] = useState(null); 
//     const [loading, setLoading] = useState(false); 
//     const token = localStorage.getItem('authToken'); 

//     const handleSubmit = async (event) => { 
//         event.preventDefault(); 

//         if (!stripe || !elements) { 
//             return; 
//         } 

//         setLoading(true); 

//         try { 
//             const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({ 
//                 type: 'card', 
//                 card: elements.getElement(CardElement), 
//             }); 

//             if (paymentMethodError) { 
//                 setError(paymentMethodError.message); 
//                 setLoading(false); 
//                 return; 
//             } 

//             if (!token) { 
//                 setError('No authentication token found'); 
//                 setLoading(false); 
//                 return; 
//             } 

//             const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', { 
//                 amount: Math.round(totalAmount * 100), 
//                 paymentMethodId: paymentMethod.id, 
//                 policyId: 4, // Make sure this policy ID is dynamically set if needed
//                 paymentType: 'stripe', 
//                 tax: 5, 
//                 totalPayment: 200, 
//             }, { 
//                 headers: { 
//                     'Authorization': `Bearer ${token}`, 
//                     'Content-Type': 'application/json', 
//                 }, 
//             }); 

//             const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, { 
//                 payment_method: paymentMethod.id, 
//             }); 

//             if (stripeError) { 
//                 setError(stripeError.message); 
//             } else { 
//                 handlePaymentSuccess(); 
//             } 
//         } catch (error) { 
//             console.error('Error processing payment:', error); 
//             setError('Payment failed'); 
//         } 

//         setLoading(false); 
//     }; 

//     return ( 
//         <Form onSubmit={handleSubmit}> 
//             <Form.Group controlId="cardElement"> 
//                 <Form.Label>Credit or Debit Card</Form.Label> 
//                 <CardElement /> 
//             </Form.Group> 
//             {error && <p className="text-danger">{error}</p>} 
//             <Button type="submit" variant="success" disabled={loading}> 
//                 {loading ? 'Processing…' : 'Pay Now'} 
//             </Button> 
//         </Form> 
//     ); 
// }; 

// const BuyPolicyPage = () => { 
//     const location = useLocation(); 
//     const navigate = useNavigate(); 
//     const {scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, totalAmount, installmentAmount } = location.state || {}; 

//     const [nominees, setNominees] = useState([]); 
//     const [nomineeName, setNomineeName] = useState(''); 
//     const [relation, setRelation] = useState(''); 
//     const [uploadedDocs, setUploadedDocs] = useState([]); 
//     const [files, setFiles] = useState({}); 
//     // const [selectedSchemeId,setSelectedSchemeId]=useEffect();

//     // useEffect(() => {
//     //     // Assuming scheme data is retrieved and set in state
//     //     if (location.state && location.state.scheme) {
//     //         setSelectedSchemeId(location.state.scheme.id);
//     //     }
//     // }, [location.state]);
//     const token = localStorage.getItem('authToken');
//     if (!token) {
//         console.error('No authentication token found');
//         // Handle missing token
//     }

//     useEffect(() => { 
//         const role = localStorage.getItem('UserRole'); 
//         const token = localStorage.getItem('authToken'); 
//         if (role !== 'ROLE_CUSTOMER' || !token) { 
//             navigate('/login'); 
//         } 
//     }, [navigate]); 

//     if (!scheme) {
//         return <p>Loading or no data available...</p>;
//     }

//     const handleAddNominee = () => { 
//         if (nomineeName && relation) { 
//             setNominees([...nominees, { nomineeName, relationStatus:relation }]); 
//             setNomineeName(''); 
//             setRelation(''); 
//         } 
//     }; 

//     const handleDocumentChange = (documentName, file) => { 
//         setFiles(prevFiles => ({ 
//             ...prevFiles, 
//             [documentName]: file, 
//         }));
//     }; 
//     const schemeDocument = scheme.schemeDocument || [];

    // const handleUploadDocuments = () => {
    //     const filesArray = Object.keys(files).map(documentName => ({
    //         documentName,
    //         file: files[documentName],
    //     }));
    //     uploadDocuments(filesArray, (uploaded) => {
    //         setUploadedDocs(uploaded);
    //     });
    // };

    
//     const handleSubmitPolicy = async () => {
//         if (!scheme || !schemeId) {
//             console.error('Scheme ID is missing');
//             return;
//         }
//     console.log(nominees);
//         const requestPayload = {
            
//             insuranceSchemeId: schemeId,//selectedSchemeId,
//             policyTerm,
//             premiumAmount: investmentAmount,
//             installmentPeriod,
//             nominees,
//             documents: uploadedDocs
//         };
    
//         try {
//             const customerId=localStorage.getItem('customerId');
//             // Assuming customerId is available in your component state or props
//             const response = await axios.post(`http://localhost:8080/E-Insurance/customer/${customerId}/buyWithoutAgent`, requestPayload, {
//                 headers: {
//                   'Authorization': `Bearer ${token}`,
//             'Content-Type': 'application/json',
//                 },
//             });
//             console.log('Response:', response.data);
//             // Handle success
//             handlePaymentSuccess();
//         } catch (error) {
//             console.error('Error submitting policy:', error.response?.data || error.message);
//         }
//     };
//     if (!totalAmount) { 
//         console.error('totalAmount is not defined in location.state'); 
//         return <p>Error: Missing payment details</p>; 
//     } 

//     const handlePaymentSuccess = () => {
//         // Navigate to a confirmation page or display a success message
//         navigate('/confirmation'); // Assuming you have a confirmation route
//         alert('Policy created successfully!'); // Display an alert message
    
//         // Optionally, you can reset form state or clear uploaded documents
//         setNominees([]);
//         setUploadedDocs([]);
//         setFiles({});
//     };

//     return ( 
//         <div className="container mt-4"> 
//             <h3 className="mb-4">Buy Policy</h3> 
//             <p>SchemeID:{schemeId}</p>
//             <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p> 
//             <p>Policy Term (Years): {policyTerm}</p> 
//             <p>Installment Period (Months): {installmentPeriod}</p> 
//             <p>Total Amount: ${totalAmount.toFixed(2)}</p> 
//             <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p> 

//             <h5 className="mt-4">Add Nominees</h5> 
//             <Form.Group controlId="formNomineeName"> 
//                 <Form.Label>Nominee Name</Form.Label> 
//                 <Form.Control 
//                     type="text" 
//                     value={nomineeName} 
//                     onChange={(e) => setNomineeName(e.target.value)} 
//                 /> 
//             </Form.Group> 
//             <Form.Group controlId="formRelation"> 
//                 <Form.Label>Relation</Form.Label> 
//                 <Form.Control 
//                     as="select" 
//                     value={relation} 
//                     onChange={(e) => setRelation(e.target.value)} 
//                 > 
//                     <option value="">Select Relation</option> 
//                     <option value="SPOUSE">Spouse</option> 
//                     <option value="Child">Child</option> 
//                     <option value="PARENT">Parent</option> 
//                     <option value="Sibling">Sibling</option> 
//                 </Form.Control> 
//             </Form.Group> 
//             <Button variant="primary" onClick={handleAddNominee}> 
//                 Add Nominee 
//             </Button> 

//             <ul className="mt-2"> 
//                 {nominees.map((nominee, index) => ( 
//                     <li key={index}>{nominee.nomineeName} - {nominee.relationStatus}</li> 
//                 ))} 
//             </ul> 

//             <h5 className="mt-4">Upload Documents</h5> 
//             {scheme?.schemeDocument?.map((doc, index) => (
//                 <Form.Group controlId={`formFile-${index}`} key={index}> 
//                     <Form.Label>{doc.name}</Form.Label> 
//                     <Form.Control 
//                         type="file" 
//                         onChange={(e) => handleDocumentChange(doc.name, e.target.files[0])} 
//                     /> 
//                 </Form.Group> 
//             ))}
//             <Button variant="secondary" className="mt-3" onClick={handleUploadDocuments}>
//                 Upload Documents
//             </Button>

//             <ul className="mt-2"> 
//                 {uploadedDocs.length > 0 ? ( 
//                     uploadedDocs.map((doc, index) => ( 
//                         <li key={index}>{doc.documentName}</li> 
//                     )) 
//                 ) : ( 
//                     <p>No documents uploaded</p> 
//                 )} 
//             </ul> 

//             <Elements stripe={stripePromise}> 
//                 <PaymentForm 
//                     handlePaymentSuccess={handleSubmitPolicy} 
//                     totalAmount={totalAmount} 
//                     nominees={nominees} 
//                     documents={uploadedDocs} 
//                 /> 
//             </Elements> 
//         </div> 
//     ); 
// }; 

// export default BuyPolicyPage;

//============

import React, { useState, useEffect } from 'react'; 
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios'; 
import { Form, Button } from 'react-bootstrap'; 
import { CardElement, useElements, useStripe, Elements } from '@stripe/react-stripe-js'; 
import { loadStripe } from '@stripe/stripe-js'; 


// Load your Stripe public key 
const stripePromise = loadStripe('pk_test_51Pz1w4LAuyjp8hN9KsG7Pi9ZX1DkIieK5dv8Zl8icQYrswiHtrS9XNM8XmIhJx8qugTBgOGpoYYVbjUuzrBWsOmJ00OSai0tZc'); 
// Define the uploadDocuments function
const uploadDocuments = async (files, onUploadComplete) => {
    const uploadedDocs = [];
    const token = localStorage.getItem('authToken'); // Retrieve the token from local storage

    for (const file of files) {
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
                uploadedDocs.push({
                    documentName: file.documentName,
                    documentImage: response.data.name,
                });
            }
        } catch (error) {
            console.error(`Error uploading document ${file.documentName}:`, error);
        }
    }

    onUploadComplete(uploadedDocs);
};
const PaymentForm = ({ handlePaymentSuccess, totalAmount, policyId, paymentType, tax }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const token = localStorage.getItem('authToken');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setLoading(true);

        try {
            const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement),
            });

            if (paymentMethodError) {
                setError(paymentMethodError.message);
                setLoading(false);
                return;
            }

            if (!token) {
                setError('No authentication token found');
                setLoading(false);
                return;
            }

            const { data: { clientSecret } } = await axios.post('http://localhost:8080/E-Insurance/customer/create-payment-intent', {
                amount: Math.round(totalAmount * 100), // Convert to cents
                paymentMethodId: paymentMethod.id,
                policyId: policyId,
                paymentType: paymentType,
                tax: tax,
                totalPayment: totalAmount,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            const { error: stripeError } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: paymentMethod.id,
            });

            if (stripeError) {
                setError(stripeError.message);
            } else {
                handlePaymentSuccess();
            }
        } catch (error) {
            console.error('Error processing payment:', error);
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

export {PaymentForm}

const BuyPolicyPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, totalAmount, installmentAmount } = location.state || {};

    const [nominees, setNominees] = useState([]);
    const [nomineeName, setNomineeName] = useState('');
    const [relation, setRelation] = useState('');
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [files, setFiles] = useState({});
    const [paymentType, setPaymentType] = useState('credit'); // Default value; could be 'debit' or 'credit'
    const [tax, setTax] = useState(0); // Initialize with 0 or a default value

    const token = localStorage.getItem('authToken');

    useEffect(() => {
        const role = localStorage.getItem('UserRole');
        if (role !== 'ROLE_CUSTOMER' || !token) {
            navigate('/login');
        }

        // Fetch the current tax value
        axios.get('http://localhost:8080/E-Insurance/admin/payment-tax', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
        .then(response => {
            console.log('====');
            console.log('Tax data response:', response); // Log full response
            console.log('Tax data:', response.data); // Log response data
            if (response.data && response.data.paymentTax !== undefined) {
                setTax(response.data.paymentTax);
            } else {
                console.error('Invalid tax data:', response.data);
                setTax(0); // Set default value on invalid data
            }
        })
        .catch(error => {
            console.error('Error fetching tax:', error);
            setTax(0); // Set default value on error
        });
    
    }, [navigate, token]);

    if (!scheme) {
        return <p>Loading or no data available...</p>;
    }

    const handleAddNominee = () => {
        if (nomineeName && relation) {
            setNominees([...nominees, { nomineeName, relationStatus: relation }]);
            setNomineeName('');
            setRelation('');
        }
    };

    const handleDocumentChange = (documentName, file) => {
        setFiles(prevFiles => ({
            ...prevFiles,
            [documentName]: file,
        }));
    };

    const handleUploadDocuments = () => {
        const filesArray = Object.keys(files).map(documentName => ({
            documentName,
            file: files[documentName],
        }));
        uploadDocuments(filesArray, (uploaded) => {
            setUploadedDocs(uploaded);
        });
    };

    const handleSubmitPolicy = async () => {
        if (!scheme || !schemeId) {
            console.error('Scheme ID is missing');
            return;
        }

        const requestPayload = {
            insuranceSchemeId: schemeId,
            policyTerm,
            premiumAmount: investmentAmount,
            installmentPeriod,
            nominees,
            documents: uploadedDocs
        };

        try {
            const customerId = localStorage.getItem('customerId');
            const response = await axios.post(`http://localhost:8080/E-Insurance/customer/${customerId}/buyWithoutAgent`, requestPayload, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Response:', response.data);
            handlePaymentSuccess();
        } catch (error) {
            console.error('Error submitting policy:', error.response?.data || error.message);
        }
    };

    const handlePaymentSuccess = () => {
        navigate('/confirmation');
        alert('Policy created successfully!');
        setNominees([]);
        setUploadedDocs([]);
        setFiles({});
    };

    const handlePaymentTypeChange = (event) => {
        setPaymentType(event.target.value); // Update payment type based on user selection
    };

    const handleTaxChange = (event) => {
        setTax(Number(event.target.value)); // Update tax amount based on user input
    };

    if (!totalAmount) {
        console.error('totalAmount is not defined in location.state');
        return <p>Error: Missing payment details</p>;
    }

    // Calculate the total amount to be paid including tax
    const totalAmountToPay = totalAmount + tax;

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Buy Policy</h3>
            <p>SchemeID: {schemeId}</p>
            <p>Premium Amount: ${parseFloat(investmentAmount).toFixed(2)}</p>
            <p>Policy Term (Years): {policyTerm}</p>
            <p>Installment Period (Months): {installmentPeriod}</p>
            <p>Total Amount: ${totalAmount.toFixed(2)}</p>
            <p>Installment Amount (Monthly): ${installmentAmount.toFixed(2)}</p>
            <p>Tax Amount: ${tax.toFixed(2)}</p>
            <p><strong>Total Amount to Pay: ${totalAmountToPay.toFixed(2)}</strong></p>

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
                    <option value="Child">Child</option>
                    <option value="PARENT">Parent</option>
                    <option value="Sibling">Sibling</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" onClick={handleAddNominee}>
                Add Nominee
            </Button>

            <ul className="mt-2">
                {nominees.map((nominee, index) => (
                    <li key={index}>
                        {nominee.nomineeName} - {nominee.relationStatus}
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

            <h5 className="mt-4">Payment Details</h5>
            <Form.Group controlId="formPaymentType">
                <Form.Label>Payment Type</Form.Label>
                <Form.Control
                    as="select"
                    value={paymentType}
                    onChange={handlePaymentTypeChange}
                >
                    <option value="credit">Credit Card</option>
                    <option value="debit">Debit Card</option>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="formTax">
                <Form.Label>Tax Amount</Form.Label>
                <Form.Control
                    type="number"
                    value={tax}
                    onChange={handleTaxChange}
                />
            </Form.Group>

            <Elements stripe={stripePromise}>
                <PaymentForm
                    handlePaymentSuccess={handleSubmitPolicy}
                    totalAmount={totalAmount}
                    policyId={schemeId}
                    paymentType={paymentType}
                    tax={tax}
                />
            </Elements>
        </div>
    );
};

export default BuyPolicyPage;