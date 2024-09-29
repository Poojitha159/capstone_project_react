
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PolicyDetailsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    const { scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, installmentAmount, customerId, agentIdFromParent } = location.state || {};

    const [nominees, setNominees] = useState([]);
    const [nomineeName, setNomineeName] = useState('');
    const [relation, setRelation] = useState('');
    const [uploadedDocs, setUploadedDocs] = useState([]);
    const [files, setFiles] = useState({});
   // const agentId = isAgent ? localStorage.getItem('agentId') : 0;
     const [isAgent, setIsAgent] = useState(Boolean(localStorage.getItem('agentId'))); // Determine if agent is buying or not
    //const [isAgent, setIsAgent] = useState(Boolean(localStorage.getItem('agentId')));
    const token = localStorage.getItem('authToken');
    const customerIdFromLocalStorage = localStorage.getItem('customerId');
    const [realAgentId,setRealAgentId]=useState(localStorage.getItem('agentId'));
    console.log(realAgentId+'realllllllllllllllllll');
console.log(isAgent+"haaaaaaahsgdgahahs");
//console.log(agentIdFromParent);
    // Determine the actual customer ID to use
   // const customerId = isAgent ? customerIdFromParent : customerIdFromLocalStorage;

    // useEffect(() => {
    //     // Validate required data from location state
    //     if (!scheme || !schemeId || !investmentAmount || !policyTerm || !installmentPeriod || !installmentAmount) {
    //         navigate('/error', { replace: true });
    //     }
    // }, [navigate, scheme, schemeId, investmentAmount, policyTerm, installmentPeriod, installmentAmount]);
  // Check if customerId is null or invalid
  if (!customerIdFromLocalStorage) {//
    console.error('Invalid customerId because ===');
    return <p>Error: Customer ID is missing or invalid.</p>;
}

else if( customerId === null){
    console.error('Invalid customerId of ===null');
    //return <p>Error: Customer ID is  ==null</p>;
}
else if(customerId === undefined){
    console.error('Invalid customerId because ===undefined');
    return <p>Error: Customer ID is  ==undefined</p>;
}

if(customerId === ''){
    console.error('Invalid customerId because ===3');
    return <p>Error: Customer ID is  ===''</p>;
}

    const handleAddNominee = () => {
        if (nomineeName && relation) {
            setNominees([...nominees, { nomineeName, relationStatus: relation }]);
            setNomineeName('');
            setRelation('');
        }
        console.log('Nomineedone');
    };

     // New function to handle nominee removal
     const handleRemoveNominee = (index) => {
        setNominees(nominees.filter((_, i) => i !== index));
    };


    const handleDocumentChange = (documentName, file) => {
        setFiles(prevFiles => ({
            ...prevFiles,
            [documentName]: file,
        }));
        console.log('done');
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
        console.log('uploaddone');
    };
    console.log(customerId+'lahsgvdfhdsjakjhsdgfgdhsjaksdhgfhdjs');

    const handleSubmit = async () => {
        console.log(customerId);
        if (!customerId) {
            console.error('Customer ID is missing');
            return;
        }
        console.log(customerId);
console.log(realAgentId+'aaaalkdjdddddddddddddddd');
console.log('Preparing to submit policy details...');
    console.log('Customer ID:', customerId);
    console.log('Is Agent:', isAgent);
    console.log('Real Agent ID:', realAgentId);
    console.log('Scheme ID:', schemeId);

        const endpoint = isAgent 
            ? `http://localhost:8080/E-Insurance/customer/${customerId}/buy-policy`
            : `http://localhost:8080/E-Insurance/customer/${customerId}/buyWithoutAgent`;
console.log(customerId);
        try {
            const response = await axios.post(endpoint, {
                
                insuranceSchemeId: schemeId,
                policyTerm,
                premiumAmount: investmentAmount,
                installmentPeriod,
                agentId: isAgent ? realAgentId : 0 ,
                nominees,
                documents: uploadedDocs
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                // const policyId = response.data;
                const { insuranceId } = response.data; 
                console.log('Backend Response:', response.data);
                console.log(response.data+'lllllllllllllllllllllllllllllllllllllllll');
                console.log('Policy ID:', insuranceId); // Log the policyId to the console
                console.log('Navigating to payment page with policyId:', insuranceId);

                // Navigate to the payment page, passing the policyId
                //navigate(`/payment/${policyId}`, {
                    navigate(`/payment/${insuranceId}`, {
                    state: {
                        scheme,
                        schemeId,
                        investmentAmount,
                        policyTerm,
                        installmentPeriod,
                        totalAmount: investmentAmount,
                        installmentAmount,
                        nominees,
                        uploadedDocs,
                       // policyId: policyId
                       
                    },
                });
            }
        } catch (error) {
            console.error('Error submitting policy details:', error);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
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

            <ul className="mt-2">
                {nominees.map((nominee, index) => (
                    <li key={index}>
                        {nominee.nomineeName} - {nominee.relationStatus}
                        <Button variant="danger" size="sm" className="ms-2" onClick={() => handleRemoveNominee(index)}>
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
            <Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button>
           
            <Button variant="success" className="mt-4" onClick={handleSubmit}>
                Proceed 
            </Button>
        </div>
    );
};

export default PolicyDetailsPage;
