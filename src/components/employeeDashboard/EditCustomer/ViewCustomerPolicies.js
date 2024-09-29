// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { setAuthToken } from '../../../utils/token';

// const ViewCustomerPolicies = () => {
//     const { customerId } = useParams();
//     const [policies, setPolicies] = useState([]);

//     useEffect(() => {
//         fetchCustomerPolicies();
//     }, [customerId]);

//     const fetchCustomerPolicies = async () => {
//         try {
//             setAuthToken(); // Set the token before making the request
//             const response = await axios.get(`http://localhost:8080/E-Insurance/employee/policy/customer/${customerId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}` // Include the token in the headers
//                 }
//             });
//             setPolicies(response.data);
//         } catch (error) {
//             console.error('Error fetching policies:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Customer Policies</h1>
//             <table border="1">
//                 <thead>
//                     <tr>
//                         <th>Policy ID</th>
//                         <th>Insurance Scheme</th>
//                         <th>Premium Amount</th>
//                         <th>Issued Date</th>
//                         <th>Maturity Date</th>
//                         <th>Policy Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {policies.length > 0 ? (
//                         policies.map((policy) => (
//                             <tr key={policy.insuranceId}>
//                                 <td>{policy.insuranceId}</td>
//                                 <td>{policy.insuranceScheme}</td>
//                                 <td>{policy.premiumAmount}</td>
//                                 <td>{policy.issuedDate}</td>
//                                 <td>{policy.maturityDate}</td>
//                                 <td>{policy.policyStatus}</td>
//                             </tr>
//                         ))
//                     ) : (
//                         <tr>
//                             <td colSpan="6">No policies found for this customer.</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default ViewCustomerPolicies;
//888888888888888888888888888888888888888888888888

// import React, { useEffect, useState } from 'react'; 
// import { useParams } from 'react-router-dom'; 
// import axios from 'axios'; 
// import { setAuthToken } from '../../../utils/token'; 
// import DocumentModal from './DocumentModal';  // Import the modal

// const ViewCustomerPolicies = () => { 
//     const { customerId } = useParams(); 
//     const [policies, setPolicies] = useState([]); 
//     const [documents, setDocuments] = useState([]); 
//     const [showModal, setShowModal] = useState(false); 
//     const [selectedPolicyId, setSelectedPolicyId] = useState(null);

//     useEffect(() => { 
//         fetchCustomerPolicies(); 
//     }, [customerId]); 

//     const fetchCustomerPolicies = async () => { 
//         try { 
//             setAuthToken(); // Set the token before making the request 
//             const response = await axios.get(`http://localhost:8080/E-Insurance/employee/policy/customer/${customerId}`, { 
//                 headers: { 
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}` 
//                 } 
//             });
//             setPolicies(response.data); 
//         } catch (error) { 
//             console.error('Error fetching policies:', error); 
//         } 
//     }; 

//     const fetchDocuments = async (policyId) => {
//         try {
//             const response = await axios.get(`http://localhost:8080/E-Insurance/employee/policy/${policyId}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             });

//             setDocuments(response.data);
//             setSelectedPolicyId(policyId);
//             setShowModal(true);
//         } catch (error) {
//             console.error('Error fetching documents:', error);
//         }
//     };

//     const handleVerify = async (status) => {
//         try {
//             const documentDtos = documents.map(doc => ({
//                 id: doc.id,
//                 documentName: doc.documentName,
//                 documentStatus: status, // Approve or Reject
//                 documentImage: doc.documentImage
//             }));
//             const response = await axios.put(`http://localhost:8080/E-Insurance/employee/${selectedPolicyId}/verify-policy`, documentDtos, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('authToken')}`
//                 }
//             });
//             console.log('Policy verified successfully:', response.data);
//             setShowModal(false);
//         } catch (error) {
//             console.error('Error verifying policy:', error);
//         }
//     };
// return ( 
//         <div> 
//             <h1>Customer Policies</h1> 
//             <table border="1"> 
//                 <thead> 
//                     <tr> 
//                         <th>Policy ID</th> 
//                         <th>Insurance Scheme</th> 
//                         <th>Premium Amount</th> 
//                         <th>Issued Date</th> 
//                         <th>Maturity Date</th> 
//                         <th>Policy Status</th> 
//                         <th>View Documents</th>
//                     </tr> 
//                 </thead> 
//                 <tbody> 
//                     {policies.length > 0 ? ( 
//                         policies.map((policy) => ( 
//                             <tr key={policy.insuranceId}> 
//                                 <td>{policy.insuranceId}</td> 
//                                 <td>{policy.insuranceScheme}</td> 
//                                 <td>{policy.premiumAmount}</td> 
//                                 <td>{policy.issuedDate}</td> 
//                                 <td>{policy.maturityDate}</td> 
//                                 <td>{policy.policyStatus}</td> 
//                                 <td>
//                                     <button onClick={() => fetchDocuments(policy.insuranceId)}>
//                                         View Documents
//                                     </button>
//                                 </td>
//                             </tr> 
//                         )) 
//                     ) : ( 
//                         <tr> 
//                             <td colSpan="7">No policies found for this customer.</td> 
//                         </tr> 
//                     )} 
//                 </tbody> 
//             </table> 

//             {/* Document Modal */}
//             <DocumentModal 
//                 show={showModal} 
//                 handleClose={() => setShowModal(false)} 
//                 documents={documents} 
//                 handleVerify={handleVerify} 
//             />
//         </div> 
//     ); 
// }; 

// export default ViewCustomerPolicies;


//888888888888888888888
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { setAuthToken } from '../../../utils/token';
import DocumentModal from './DocumentModal';  // Import the modal
import './ViewCustomerPolicies.css';

const ViewCustomerPolicies = () => {
    const { customerId } = useParams();
    const [policies, setPolicies] = useState([]); 
    const [documents, setDocuments] = useState([]); 
    const [showModal, setShowModal] = useState(false); 
    const [selectedPolicyId, setSelectedPolicyId] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0); 

    useEffect(() => { 
        fetchCustomerPolicies(); 
    }, [customerId, currentPage]);

    const fetchCustomerPolicies = async () => { 
        try { 
            setAuthToken(); 
            const response = await axios.get(`http://localhost:8080/E-Insurance/employee/policy/customer/${customerId}`, { 
                params: { page: currentPage, size: pageSize }, 
                headers: { 
                    Authorization: `Bearer ${localStorage.getItem('authToken')}` 
                } 
            }); 
            setPolicies(response.data.content || []); // Ensure it's an array
            setTotalPages(response.data.totalPages || 0); // Update total pages
        } catch (error) { 
            console.error('Error fetching policies:', error); 
        } 
    }; 

    const fetchDocuments = async (policyId) => {
        try {
            const response = await axios.get(`http://localhost:8080/E-Insurance/employee/policy/${policyId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setDocuments(response.data);
            setSelectedPolicyId(policyId);
            setShowModal(true);
        } catch (error) {
            console.error('Error fetching documents:', error);
        }
    };

    const handleVerify = async (updatedDocuments) => {
        try {
            const response = await axios.put(
                `http://localhost:8080/E-Insurance/employee/${selectedPolicyId}/verify-policy`,
                updatedDocuments,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
                    },
                }
            );
            console.log('Policy verified successfully:', response.data);
            setShowModal(false);
        } catch (error) {
            console.error('Error verifying policy:', error);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    return ( 
        <div className="customer-policies-container"> 
        <br/>
            <h1>Customer Policies</h1> 
            {policies.length > 0 ? (
                <table className="policies-table"> 
                    <thead> 
                        <tr> 
                            <th>Policy ID</th> 
                            <th>Insurance Scheme</th> 
                            <th>Premium Amount</th> 
                            <th>Agent ID</th>
                            <th>Issued Date</th> 
                            <th>Maturity Date</th> 
                            <th>Policy Status</th> 
                            <th>View Documents</th>
                        </tr> 
                    </thead> 
                    <tbody> 
                        {policies.map((policy) => ( 
                            <tr key={policy.insuranceId}> 
                                <td>{policy.insuranceId}</td> 
                                <td>{policy.insuranceScheme}</td> 
                                <td>{policy.premiumAmount}</td> 
                                <td>{policy.agentId}</td>
                                <td>{policy.issuedDate}</td> 
                                <td>{policy.maturityDate}</td> 
                                <td>{policy.policyStatus}</td> 
                                <td>
                                    <button 
                                        className='btnn' 
                                        onClick={() => fetchDocuments(policy.insuranceId)}>
                                        View Documents
                                    </button>
                                </td>
                            </tr> 
                        ))} 
                    </tbody> 
                </table>
            ) : (
                <div className="no-policies-message">
                    <h3>No policies found for this customer.</h3>
                </div>
            )} 

            {/* Pagination Controls */}
            {totalPages > 0 && (
                <div className="pagination-controls">
                    <button onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                    <span>Page {currentPage + 1} of {totalPages}</span>
                    <button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>Next</button>
                </div>
            )}

            {/* Document Modal */}
            <DocumentModal
                show={showModal} 
                handleClose={() => setShowModal(false)} 
                documents={documents} 
                handleVerify={handleVerify} 
            />
        </div> 
    ); 
}; 

export default ViewCustomerPolicies;
