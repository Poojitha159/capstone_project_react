// import React, { useState } from 'react';
// import axios from 'axios';

// const PolicyForm = () => {
//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);
//     const [policyTerm, setPolicyTerm] = useState('');
//     const [premiumAmount, setPremiumAmount] = useState('');
//     const [installmentPeriod, setInstallmentPeriod] = useState('');
//     const [insuranceSchemeId, setInsuranceSchemeId] = useState('');
//     const [agentId, setAgentId] = useState('');

//     const handleAddNominee = (nominee) => {
//         setNominees([...nominees, nominee]);
//     };

//     const handleAddDocument = (document) => {
//         setDocuments([...documents, document]);
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         // Prepare the request payload
//         const payload = {
//             insuranceSchemeId,
//             agentId,
//             policyTerm,
//             premiumAmount,
//             installmentPeriod,
//             nominees: nominees.map(nominee => ({
//                 nomineeName: nominee.nomineeName,
//                 relationStatus: nominee.relationStatus
//             })),
//             documents: documents.map(doc => ({
//                 documentName: doc.documentName,
//                 documentImage: doc.documentImage
//             }))
//         };

//         try {
//             const customerId=localStorage.getItem('customerId');
//             // Send data to backend
//             const response = await axios.post(`http:localhost:8080/E-Insurance/customer/${customerId}/buy-policy`, payload);
//             alert(response.data); // Handle success response
//         } catch (error) {
//             console.error('Error submitting policy:', error);
//             alert('Error submitting policy. Please try again.');
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             {/* Input fields for policy details */}
//             <input
//                 type="text"
//                 placeholder="Insurance Scheme ID"
//                 value={insuranceSchemeId}
//                 onChange={(e) => setInsuranceSchemeId(e.target.value)}
//                 required
//             />
//             <input
//                 type="text"
//                 placeholder="Agent ID"
//                 value={agentId}
//                 onChange={(e) => setAgentId(e.target.value)}
//                 required
//             />
//             <input
//                 type="number"
//                 placeholder="Policy Term (Years)"
//                 value={policyTerm}
//                 onChange={(e) => setPolicyTerm(e.target.value)}
//                 required
//             />
//             <input
//                 type="number"
//                 placeholder="Premium Amount"
//                 value={premiumAmount}
//                 onChange={(e) => setPremiumAmount(e.target.value)}
//                 required
//             />
//             <input
//                 type="number"
//                 placeholder="Installment Period (Months)"
//                 value={installmentPeriod}
//                 onChange={(e) => setInstallmentPeriod(e.target.value)}
//                 required
//             />
            
//             {/* Add Nominee */}
//             <button type="button" onClick={() => handleAddNominee({ nomineeName: 'John Doe', relationStatus: 'PARENT' })}>
//                 Add Nominee
//             </button>

//             {/* Add Document */}
//             <button type="button" onClick={() => handleAddDocument({ documentName: 'AADHAR_CARD', documentImage: 'adhaar_card_base64' })}>
//                 Add Document
//             </button>

//             {/* Submit Form */}
//             <button type="submit">Submit</button>
//         </form>
//     );
// };

// export default PolicyForm;

// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { Form, Button } from 'react-bootstrap';
// import { customerApiClient, setAuthToken } from '../../utils/token';

// const PolicyForm = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
    
//     // Initial state setup from location state
//     const [formState, setFormState] = useState({
//         schemeId: '',
//         investmentAmount: '',
//         policyTerm: '',
//         installmentPeriod: '',
//         interestAmount: '',
//         totalAmount: '',
//         installmentAmount: ''
//     });
    
//     // State for nominees and documents
//     const [nominees, setNominees] = useState([]);
//     const [documents, setDocuments] = useState([]);
//     const [nomineeName, setNomineeName] = useState('');
//     const [relation, setRelation] = useState('');

//     useEffect(() => {
//         if (location.state) {
//             setFormState({
//                 schemeId: location.state.schemeId || '',
//                 investmentAmount: location.state.investmentAmount || '',
//                 policyTerm: location.state.policyTerm || '',
//                 installmentPeriod: location.state.installmentPeriod || '',
//                 interestAmount: location.state.interestAmount || '',
//                 totalAmount: location.state.totalAmount || '',
//                 installmentAmount: location.state.installmentAmount || ''
//             });
//         }
//     }, [location.state]);

//     // const handleAddNominee = (event) => {
//     //     event.preventDefault();
//     //     const nomineeName = event.target.elements.nomineeName.value;
//     //     const relationStatus = event.target.elements.relationStatus.value;
//     //     setNominees([...nominees, { nomineeName, relationStatus }]);
//     //     event.target.reset();
//     // };
//     const handleAddNominee = () => {
//         if (nomineeName && relation) {
//             setNominees([...nominees, { nomineeName, relation }]);
//             setNomineeName('');
//             setRelation('');
//         }
//     };
//     const handleRemoveNominee = (index) => {
//         setNominees(nominees.filter((_, i) => i !== index));
//     };

//     const handleAddDocument = (event) => {
//         event.preventDefault();
//         const documentName = event.target.elements.documentName.value;
//         const documentImage = event.target.elements.documentImage.files[0];
        
//         const reader = new FileReader();
//         reader.onloadend = () => {
//             setDocuments([...documents, { documentName, documentImage: reader.result }]);
//         };
//         if (documentImage) {
//             reader.readAsDataURL(documentImage);
//         }
//         event.target.reset();
//     };

//     const handleRemoveDocument = (index) => {
//         setDocuments(documents.filter((_, i) => i !== index));
//     };

//     const handleSubmit = async (event) => {
//         event.preventDefault();

//         const payload = {
//             insuranceSchemeId: formState.schemeId,
//             // agentId: 'someAgentId', // Replace with actual agent ID
//             policyTerm: formState.policyTerm,
//             premiumAmount: formState.investmentAmount,
//             installmentPeriod: formState.installmentPeriod,
//             nominees: nominees.map(nominee => ({
//                 nomineeName: nominee.nomineeName,
//                 relationStatus: nominee.relationStatus
//             })),
//             documents: documents.map(doc => ({
//                 documentName: doc.documentName,
//                 documentImage: doc.documentImage
//             }))
//         };

//         try {
//             setAuthToken()
//             const customerId=localStorage.getItem('customerId');
//             const response = await customerApiClient.post(`/${customerId}/buy-policy`, payload);
//             alert(response.data); // Handle success response
//             navigate('/confirmation');
//         } catch (error) {
//             console.error('Error submitting policy:', error);
//             alert('Error submitting policy. Please try again.');
//         }
//     };

//     return (
//         <div className="container mt-4">
//             <h3>Policy Form</h3>
//             <Form>
//             <form onSubmit={handleSubmit}>
//                 {/* Form fields for the policy */}
//                 <div className="form-group">
//                     <label>Scheme ID</label>
//                     <input type="text" className="form-control" value={formState.schemeId} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Investment Amount</label>
//                     <input type="number" className="form-control" value={formState.investmentAmount} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Policy Term (Years)</label>
//                     <input type="number" className="form-control" value={formState.policyTerm} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Installment Period (Months)</label>
//                     <input type="number" className="form-control" value={formState.installmentPeriod} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Interest Amount</label>
//                     <input type="text" className="form-control" value={formState.interestAmount} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Total Amount</label>
//                     <input type="text" className="form-control" value={formState.totalAmount} readOnly />
//                 </div>
//                 <div className="form-group">
//                     <label>Installment Amount (Monthly)</label>
//                     <input type="text" className="form-control" value={formState.installmentAmount} readOnly />
//                 </div>

//                 {/* Nominees Section */}
//                 <h4>Nominees</h4>
//                 <Form.Group controlId="formNomineeName">
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

//                 <ul className="list-group mt-3">
//                     {nominees.map((nominee, index) => (
//                         <li key={index} className="list-group-item">
//                             {nominee.nomineeName} - {nominee.relationStatus}
//                             <button className="btn btn-danger btn-sm float-right" onClick={() => handleRemoveNominee(index)}>Remove</button>
//                         </li>
//                     ))}
//                 </ul>
//                 </form>
//                 </Form>
// <Form>
//                 {/* Documents Section */}
//                 <h4>Documents</h4>
//                 <form onSubmit={handleAddDocument}>
//                     <div className="form-group">
//                         <label>Document Name</label>
//                         <input type="text" name="documentName" className="form-control" required />
//                     </div>
//                     <div className="form-group">
//                         <label>Document Image</label>
//                         <input type="file" name="documentImage" className="form-control" accept="image/*" required />
//                     </div>
//                     <button type="submit" className="btn btn-secondary">Add Document</button>
//                 </form>
//                 <ul className="list-group mt-3">
//                     {documents.map((doc, index) => (
//                         <li key={index} className="list-group-item">
//                             {doc.documentName} - <a href={doc.documentImage} target="_blank" rel="noopener noreferrer">View</a>
//                             <button className="btn btn-danger btn-sm float-right" onClick={() => handleRemoveDocument(index)}>Remove</button>
//                         </li>
//                     ))}
//                 </ul>
//                 </Form>
//                 <button type="submit" className="btn btn-primary mt-3">Submit Policy</button>
            
//         </div>
//     );
// };

// export default PolicyForm;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { customerApiClient, setAuthToken } from '../../utils/token';

const PolicyForm = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Initial state setup from location state
    const [formState, setFormState] = useState({
        schemeId: '',
        investmentAmount: '',
        policyTerm: '',
        installmentPeriod: '',
        interestAmount: '',
        totalAmount: '',
        installmentAmount: ''
    });

    // State for nominees and documents
    const [nominees, setNominees] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [nomineeName, setNomineeName] = useState('');
    const [relation, setRelation] = useState('');
    // State to manage documents
   
    const [documentName, setDocumentName] = useState('');
    const [documentImage, setDocumentImage] = useState(null);


    useEffect(() => {
        if (location.state) {
            setFormState({
                schemeId: location.state.schemeId || '',
                investmentAmount: location.state.investmentAmount || '',
                policyTerm: location.state.policyTerm || '',
                installmentPeriod: location.state.installmentPeriod || '',
                interestAmount: location.state.interestAmount || '',
                totalAmount: location.state.totalAmount || '',
                installmentAmount: location.state.installmentAmount || ''
            });
        }
    }, [location.state]);

    const handleAddDocument = (event) => {
        event.preventDefault();

        if (documentName && documentImage) {
            // Convert the file to Base64 format
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;

                // Add the document to the state
                setDocuments([...documents, { documentName, documentImage: base64String }]);

                // Reset the form fields
                // setDocumentName('');
                // setDocumentImage(null);
               // event.target.reset();
            };
            reader.readAsDataURL(documentImage);
        } else {
            alert('Please provide both document name and document image.');
        }
    };

    const handleRemoveDocument = (index) => {
        setDocuments(documents.filter((_, i) => i !== index));
    };

    const handleAddNominee = () => {
        if (nomineeName && relation) {
            setNominees([...nominees, { nomineeName, relation }]);
            setNomineeName('');
            setRelation('');
        }
    };

    const handleRemoveNominee = (index) => {
        setNominees(nominees.filter((_, i) => i !== index));
    };

    // const handleAddDocument = (event) => {
    //     event.preventDefault();
    //     const documentName = event.target.elements.documentName.value;
    //     const documentImage = event.target.elements.documentImage.files[0];

    //     if (documentImage) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setDocuments([...documents, { documentName, documentImage: reader.result }]);
    //         };
    //         reader.readAsDataURL(documentImage);
    //     }
    //     event.target.reset();
    // };

    // const handleRemoveDocument = (index) => {
    //     setDocuments(documents.filter((_, i) => i !== index));
    // };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const payload = {
            insuranceSchemeId: formState.schemeId,
            policyTerm: formState.policyTerm,
            premiumAmount: formState.investmentAmount,
            installmentPeriod: formState.installmentPeriod,
            nominees: nominees.map(nominee => ({
                nomineeName: nominee.nomineeName,
                relationStatus: nominee.relation
            })),
            documents: documents.map(doc => ({
                documentName: doc.documentName,
                documentImage: doc.documentImage
            }))
        };

        console.log('Payload:', JSON.stringify(payload, null, 2)); // Check payload

        //const simplePayload = {
        //     insuranceSchemeId: formState.schemeId,
        //     policyTerm: formState.policyTerm,
        //     premiumAmount: formState.investmentAmount,
        //     installmentPeriod: formState.installmentPeriod,
        //     nominees: [{ nomineeName: 'Test Nominee', relation: 'Spouse' }],
        //     documents: [{ documentName: 'Test Document', documentImage: 'data:image/png;base64,iVBORw0...' }]
        // };
    
        // console.log('Payload:', JSON.stringify(simplePayload, null, 2)); // Print simplified payload to check its structure
    

        try {
            setAuthToken();
            const customerId = localStorage.getItem('customerId');
            const response = await customerApiClient.post(`/${customerId}/buy-policy`, payload);
            alert(response.data); // Handle success response
            navigate('/confirmation');
        } catch (error) {
            console.error('Error submitting policy:', error);
            alert('Error submitting policy. Please try again.');
        }
    };

    return (
        <div className="container mt-4">
            <h3>Policy Form</h3>
            <Form onSubmit={handleSubmit}>
                {/* Form fields for the policy */}
                <Form.Group controlId="schemeId">
                    <Form.Label>Scheme ID</Form.Label>
                    <Form.Control type="text" value={formState.schemeId} readOnly />
                </Form.Group>
                <Form.Group controlId="investmentAmount">
                    <Form.Label>Investment Amount</Form.Label>
                    <Form.Control type="number" value={formState.investmentAmount} readOnly />
                </Form.Group>
                <Form.Group controlId="policyTerm">
                    <Form.Label>Policy Term (Years)</Form.Label>
                    <Form.Control type="number" value={formState.policyTerm} readOnly />
                </Form.Group>
                <Form.Group controlId="installmentPeriod">
                    <Form.Label>Installment Period (Months)</Form.Label>
                    <Form.Control type="number" value={formState.installmentPeriod} readOnly />
                </Form.Group>
                <Form.Group controlId="interestAmount">
                    <Form.Label>Interest Amount</Form.Label>
                    <Form.Control type="text" value={formState.interestAmount} readOnly />
                </Form.Group>
                <Form.Group controlId="totalAmount">
                    <Form.Label>Total Amount</Form.Label>
                    <Form.Control type="text" value={formState.totalAmount} readOnly />
                </Form.Group>
                <Form.Group controlId="installmentAmount">
                    <Form.Label>Installment Amount (Monthly)</Form.Label>
                    <Form.Control type="text" value={formState.installmentAmount} readOnly />
                </Form.Group>

                Nominees Section
                <h4>Nominees</h4>
                <Form.Group controlId="nomineeName">
                    <Form.Label>Nominee Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={nomineeName}
                        onChange={(e) => setNomineeName(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="relation">
                    <Form.Label>Relation</Form.Label>
                    <Form.Control
                        as="select"
                        value={relation}
                        onChange={(e) => setRelation(e.target.value)}
                    >
                        <option value="">Select Relation</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Child">Child</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleAddNominee}>
                    Add Nominee
                </Button>

                <ul className="list-group mt-3">
                    {nominees.map((nominee, index) => (
                        <li key={index} className="list-group-item">
                            {nominee.nomineeName} - {nominee.relation}
                            <Button variant="danger" size="sm" className="float-end" onClick={() => handleRemoveNominee(index)}>Remove</Button>
                        </li>
                    ))}
                </ul>

                {/* Documents Section */}
                {/* <h4 className="mt-4">Documents</h4>
                <Form onSubmit={handleAddDocument}>
                    <Form.Group controlId="documentName">
                        <Form.Label>Document Name</Form.Label>
                        <Form.Control type="text" name="documentName" required />
                    </Form.Group>
                    <Form.Group controlId="documentImage">
                        <Form.Label>Document Image</Form.Label>
                        <Form.Control type="file" name="documentImage" accept="image/*" required />
                    </Form.Group>
                    <Button type="submit" variant="secondary">Add Document</Button>
                </Form>
                <ul className="list-group mt-3">
                    {documents.map((doc, index) => (
                        <li key={index} className="list-group-item">
                            {doc.documentName} - <a href={doc.documentImage} target="_blank" rel="noopener noreferrer">View</a>
                            <Button variant="danger" size="sm" className="float-end" onClick={() => handleRemoveDocument(index)}>Remove</Button>
                        </li>
                    ))}
                </ul> */}
                <div>
            {/* Documents Section */}
            <h4 className="mt-4">Documents</h4>
            <Form onSubmit={handleAddDocument}>
                <Form.Group controlId="documentName">
                    <Form.Label>Document Name</Form.Label>
                    <Form.Control
                        type="text"
                        value={documentName}
                        onChange={(e) => setDocumentName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="documentImage">
                    <Form.Label>Document Image</Form.Label>
                    <Form.Control
                        type="file"
                        accept="image/*"
                        onChange={(e) => setDocumentImage(e.target.files[0])}
                        required
                    />
                </Form.Group>
                <Button type="submit" variant="secondary">Add Document</Button>
            </Form>
            <ul className="list-group mt-3">
                {documents.map((doc, index) => (
                    <li key={index} className="list-group-item">
                        {doc.documentName} - <a href={doc.documentImage} target="_blank" rel="noopener noreferrer">View</a>
                        <Button variant="danger" size="sm" className="float-end" onClick={() => handleRemoveDocument(index)}>Remove</Button>
                    </li>
                ))}
            </ul>
        </div>

                <Button type="submit" variant="primary" className="mt-3">Submit Policy</Button>
            </Form>
        </div>
    );
};

export default PolicyForm;
