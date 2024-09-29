// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './FetchSchemes.css';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8085/E-Insurance/toall/getSchemesByPlan/${planId}`);
//                 setSchemes(response.data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         if (!investmentAmount || !scheme.profitRatio) return;
//         const interest = (investmentAmount * scheme.profitRatio) / 100;
//         setInterestAmount(interest);
//     };

//     const handleViewMore = (schemeId) => {
//         if (expandedSchemeId === schemeId) {
//             setExpandedSchemeId(null);
//         } else {
//             setExpandedSchemeId(schemeId);
//         }
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//             <div className="row">
//                 {schemes.map(scheme => (
//                     <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                         <div className="card scheme-card">
//                             <img
//                                 src={scheme.schemeImage}
//                                 alt={scheme.insuranceScheme}
//                                 className="card-img-top"
//                                 style={{ maxHeight: '200px', objectFit: 'cover' }}
//                             />
//                             <div className="card-body">
//                                 <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                 <p className="card-text">{scheme.description}</p>
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                 >
//                                     {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                 </button>
//                                 {expandedSchemeId === scheme.insuranceSchemeId && (
//                                     <div className="mt-3">
//                                         <table className="table table-bordered table-striped">
//                                             <tbody>
//                                                 <tr>
//                                                     <th>Min Policy Term:</th>
//                                                     <td>{scheme.minimumPolicyTerm}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Policy Term:</th>
//                                                     <td>{scheme.maximumPolicyTerm}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Min Age:</th>
//                                                     <td>{scheme.minimumAge}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Age:</th>
//                                                     <td>{scheme.maximumAge}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Min Investment:</th>
//                                                     <td>{scheme.minimumInvestmentAmount}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Investment:</th>
//                                                     <td>{scheme.maximumInvestmentAmount}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Profit Ratio:</th>
//                                                     <td>{scheme.profitRatio}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>New Registration Commission:</th>
//                                                     <td>{scheme.newRegistrationCommission}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Installment Payment Commission:</th>
//                                                     <td>{scheme.installmentPaymentCommission}</td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                         <div className="interest-calculator">
//                                             <h6>Interest Calculator</h6>
//                                             <div className="form-group">
//                                                 <label htmlFor="investmentAmount">Investment Amount</label>
//                                                 <input
//                                                     type="number"
//                                                     id="investmentAmount"
//                                                     className="form-control"
//                                                     value={investmentAmount}
//                                                     onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                 />
//                                             </div>
//                                             <div className="form-group mt-3">
//                                                 <label htmlFor="interestAmount">Interest Amount</label>
//                                                 <input
//                                                     type="text"
//                                                     id="interestAmount"
//                                                     className="form-control"
//                                                     value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                     readOnly
//                                                 />
//                                             </div>
//                                             <button
//                                                 className="btn btn-secondary mt-3"
//                                                 onClick={() => calculateInterest(scheme)}
//                                             >
//                                                 Calculate Interest
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default FetchSchemes;

//------------------correct from here ---
// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// // import { fetchSchemesByPlanId } from './service'; // Adjust the import path as necessary
// import { fetchSchemesByPlanId } from '../../services/schemeService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/components/FetchSchemes.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const data = await fetchSchemesByPlanId(planId);
//                 setSchemes(data);
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         if (!investmentAmount || !scheme.profitRatio) return;
//         const interest = (investmentAmount * scheme.profitRatio) / 100;
//         setInterestAmount(interest);
//     };

//     const handleViewMore = (schemeId) => {
//         if (expandedSchemeId === schemeId) {
//             setExpandedSchemeId(null);
//         } else {
//             setExpandedSchemeId(schemeId);
//         }
//     };
//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//             <div className="row">
//                 {schemes.map(scheme => (
//                     <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                         <div className="card scheme-card">
//                             <img
//                                 src={scheme.schemeImage}
//                                 alt={scheme.insuranceScheme}
//                                 className="card-img-top"
//                                 style={{ maxHeight: '200px', objectFit: 'cover' }}
//                             />
//                             <div className="card-body">
//                                 <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                 <p className="card-text">{scheme.description}</p>
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                 >
//                                     {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                 </button>
//                                 {expandedSchemeId === scheme.insuranceSchemeId && (
//                                     <div className="mt-3">
//                                         <table className="table table-bordered table-striped">
//                                             <tbody>
//                                                 <tr>
//                                                     <th>Min Policy Term:</th>
//                                                     <td>{scheme.minimumPolicyTerm}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Policy Term:</th>
//                                                     <td>{scheme.maximumPolicyTerm}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Min Age:</th>
//                                                     <td>{scheme.minimumAge}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Age:</th>
//                                                     <td>{scheme.maximumAge}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Min Investment:</th>
//                                                     <td>{scheme.minimumInvestmentAmount}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Investment:</th>
//                                                     <td>{scheme.maximumInvestmentAmount}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Profit Ratio:</th>
//                                                     <td>{scheme.profitRatio}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>New Registration Commission:</th>
//                                                     <td>{scheme.newRegistrationCommission}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Installment Payment Commission:</th>
//                                                     <td>{scheme.installmentPaymentCommission}</td>
//                                                 </tr>
//                                             </tbody>
//                                         </table>
//                                         <div className="interest-calculator">
//                                             <h6>Interest Calculator</h6>
//                                             <div className="form-group">
//                                                 <label htmlFor="investmentAmount">Investment Amount</label>
//                                                 <input
//                                                     type="number"
//                                                     id="investmentAmount"
//                                                     className="form-control"
//                                                     value={investmentAmount}
//                                                     onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                 />
//                                             </div>
//                                             <div className="form-group mt-3">
//                                                 <label htmlFor="interestAmount">Interest Amount</label>
//                                                 <input
//                                                     type="text"
//                                                     id="interestAmount"
//                                                     className="form-control"
//                                                     value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                     readOnly
//                                                 />
//                                             </div>
//                                             <button
//                                                 className="btn btn-secondary mt-3"
//                                                 onClick={() => calculateInterest(scheme)}
//                                             >
//                                                 Calculate Interest
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>

//             <div><Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button></div>
//         </div>
//     );
// };

// export default FetchSchemes;
// // ----- to here-----------------

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchSchemesByPlanId } from '../../services/schemeService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/components/FetchSchemes.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await fetchSchemesByPlanId(planId);
//                 console.log('Response Data:', response); // Log the entire response
//                 console.log(response.data);
//                 console.log(response.data.content);
//                 //setSchemes(response.data && Array.isArray(response.data.content) ? response.data.content : []);
//                 if (response && response.data && Array.isArray(response.data.content)) {
//                     setSchemes(response.data.content);
//                 } else {
//                     setSchemes([]); // Set to empty array if no content
//                 }
//             } catch (error) {
//                 console.error('Error fetching schemes:', error);
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         if (!investmentAmount || !scheme.profitRatio) return;
//         const interest = (investmentAmount * scheme.profitRatio) / 100;
//         setInterestAmount(interest);
//     };

//     const handleViewMore = (schemeId) => {
//         setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//         <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//         <div className="row">
//             {schemes.length > 0 ? (
//                 schemes.map(scheme => (
//                     <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                         <div className="card scheme-card">
//                         <img
//                                     src={scheme.schemeImage ? `/path/to/your/logs/${scheme.schemeImage}` : '/path/to/default-image.png'}
//                                     alt={scheme.insuranceScheme}
//                                     className="card-img-top"
//                                     style={{ maxHeight: '200px', objectFit: 'cover' }}
//                                 />
//                             <div className="card-body">
//                                 <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                 <p className="card-text">{scheme.description}</p>
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                 >
//                                     {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                 </button>
//                                 {expandedSchemeId === scheme.insuranceSchemeId && (
//                                     <div className="mt-3">
//                                         <table className="table table-bordered table-striped">
//                                             <tbody>
//                                                 <tr>
//                                                     <th>Min Policy Term:</th>
//                                                     <td>{scheme.minimumPolicyTerm}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Policy Term:</th>
//                                                     <td>{scheme.maximumPolicyTerm}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Min Age:</th>
//                                                     <td>{scheme.minimumAge}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Age:</th>
//                                                     <td>{scheme.maximumAge}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Min Investment:</th>
//                                                     <td>{scheme.minimumInvestmentAmount}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Max Investment:</th>
//                                                     <td>{scheme.maximumInvestmentAmount}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Profit Ratio:</th>
//                                                     <td>{scheme.profitRatio}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>New Registration Commission:</th>
//                                                     <td>{scheme.newRegistrationCommission}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Installment Payment Commission:</th>
//                                                     <td>{scheme.installmentPaymentCommission}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Insurance Plan ID:</th>
//                                                     <td>{scheme.insurancePlanId}</td>
//                                                 </tr>
//                                                 <tr>
//                                                     <th>Active:</th>
//                                                     <td>{scheme.active ? 'Yes' : 'No'}</td>
//                                                 </tr>
//                                                 <tr>
//                                                         <th>Documents Required:</th>
//                                                         <td>
//                                                             {scheme.schemeDocument && scheme.schemeDocument.length > 0 ? (
//                                                                 <ul>
//                                                                     {scheme.schemeDocument.map((document) => (
//                                                                         <li key={document.id}>{document.name}</li>
//                                                                     ))}
//                                                                 </ul>
//                                                             ) : (
//                                                                 <p>No documents available</p>
//                                                             )}
//                                                         </td>
//                                                     </tr>
                                                
//                                             </tbody>
//                                         </table>
                                        

//                                         <div className="interest-calculator">
//                                             <h6>Interest Calculator</h6>
//                                             <div className="form-group">
//                                                 <label htmlFor="investmentAmount">Investment Amount</label>
//                                                 <input
//                                                     type="number"
//                                                     id="investmentAmount"
//                                                     className="form-control"
//                                                     value={investmentAmount}
//                                                     onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                 />
//                                             </div>
//                                             <div className="form-group mt-3">
//                                                 <label htmlFor="interestAmount">Interest Amount</label>
//                                                 <input
//                                                     type="text"
//                                                     id="interestAmount"
//                                                     className="form-control"
//                                                     value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                     readOnly
//                                                 />
//                                             </div>
//                                             <button
//                                                 className="btn btn-secondary mt-3"
//                                                 onClick={() => calculateInterest(scheme)}
//                                             >
//                                                 Calculate Interest
//                                             </button>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 ))
//             ) : (
//                 <p>No schemes available</p>
//             )}
//         </div>

//         <div>
//             <Button onClick={handleGoBack} className="go-back-button">
//                 Go Back!
//             </Button>
//         </div>
//     </div>
// );
// };
// export default FetchSchemes;


// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { fetchSchemesByPlanId } from '../../services/schemeService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/components/FetchSchemes.css';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [schemeImages, setSchemeImages] = useState({}); // State to hold image URLs
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await fetchSchemesByPlanId(planId);
//                 console.log('Response Data:', response); // Log the entire response
//                 if (response && response.data && Array.isArray(response.data.content)) {
//                     setSchemes(response.data.content);
//                     // Populate schemeImages based on response
//                     // const images = {};
//                     // response.data.content.forEach(scheme => {
//                     //     images[scheme.insuranceSchemeId] = scheme.schemeImage ? `/path/to/images/${scheme.schemeImage}` : '/path/to/default-image.png';
//                     // });
//                     // setSchemeImages(images);
//                     // Create schemeImages object
//                     const images = {};
//                     response.data.content.forEach(scheme => {
//                         // Use '/uploads' as the base path for images
//                         const imageUrl = scheme.schemeImage ? `/uploads/${scheme.schemeImage}` : '/path/to/default-image.png';
//                         images[scheme.insuranceSchemeId] = imageUrl;
                        
//                         // Log the image URL for debugging
//                         console.log(`Scheme ID: ${scheme.insuranceSchemeId}, Image URL: ${imageUrl}`);
//                     });
//                     setSchemeImages(images);
//                 } else {
//                     setSchemes([]); // Set to empty array if no content
//                 }
//             } catch (error) {
//                 console.error('Error fetching schemes:', error);
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         if (!investmentAmount || !scheme.profitRatio) return;
//         const interest = (investmentAmount * scheme.profitRatio) / 100;
//         setInterestAmount(interest);
//     };

//     const handleViewMore = (schemeId) => {
//         setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//             <div className="row">
//                 {schemes.length > 0 ? (
//                     schemes.map(scheme => (
//                         <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                             <div className="card scheme-card">
//                                  {/* Conditionally include the image */}
                                 
//                                     <img
//                                     src={`http://localhost:8080/E-Insurance/file/view/${scheme.schemeImage}`}
//                                     alt={scheme.insuranceScheme}
//                                     className="scheme-image"
//                                     style={{ width: '80%' }}
//                                 />
                                
                               
                                
//                                 <div className="card-body">
//                                     <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                     <p className="card-text">{scheme.description}</p>
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                     >
//                                         {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                     </button>
//                                     {expandedSchemeId === scheme.insuranceSchemeId && (
//                                         <div className="mt-3">
//                                             <table className="table table-bordered table-striped">
//                                                 <tbody>
//                                                     <tr>
//                                                         <th>Min Policy Term:</th>
//                                                         <td>{scheme.minimumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Policy Term:</th>
//                                                         <td>{scheme.maximumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Age:</th>
//                                                         <td>{scheme.minimumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Age:</th>
//                                                         <td>{scheme.maximumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Investment:</th>
//                                                         <td>{scheme.minimumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Investment:</th>
//                                                         <td>{scheme.maximumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Profit Ratio:</th>
//                                                         <td>{scheme.profitRatio}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>New Registration Commission:</th>
//                                                         <td>{scheme.newRegistrationCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Installment Payment Commission:</th>
//                                                         <td>{scheme.installmentPaymentCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Insurance Plan ID:</th>
//                                                         <td>{scheme.insurancePlanId}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Active:</th>
//                                                         <td>{scheme.active ? 'Yes' : 'No'}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Documents Required:</th>
//                                                         <td>
//                                                             {scheme.schemeDocument && scheme.schemeDocument.length > 0 ? (
//                                                                 <ul>
//                                                                     {scheme.schemeDocument.map((document) => (
//                                                                         <li key={document.id}>{document.name}</li>
//                                                                     ))}
//                                                                 </ul>
//                                                             ) : (
//                                                                 <p>No documents available</p>
//                                                             )}
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                             <div className="interest-calculator">
//                                                 <h6>Interest Calculator</h6>
//                                                 <div className="form-group">
//                                                     <label htmlFor="investmentAmount">Investment Amount</label>
//                                                     <input
//                                                         type="number"
//                                                         id="investmentAmount"
//                                                         className="form-control"
//                                                         value={investmentAmount}
//                                                         onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="interestAmount">Interest Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="interestAmount"
//                                                         className="form-control"
//                                                         value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <button
//                                                     className="btn btn-secondary mt-3"
//                                                     onClick={() => calculateInterest(scheme)}
//                                                 >
//                                                     Calculate Interest
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No schemes available</p>
//                 )}
//             </div>
//             <div>
//                 <Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default FetchSchemes;
//----------------------
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchSchemesByPlanId } from '../../services/schemeService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/components/FetchSchemes.css';
// import { Button } from 'react-bootstrap';
// import './FetchScheme.css';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [schemeImages, setSchemeImages] = useState({}); // State to hold image URLs
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);
//     const [scheme, setScheme] = useState(null); // Track selected scheme for interest calc

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await fetchSchemesByPlanId(planId);
//                 console.log('Response Data:', response); // Log the entire response
//                 if (response && response.data && Array.isArray(response.data.content)) {
//                     setSchemes(response.data.content);
//                     // Create schemeImages object
//                     const images = {};
//                     response.data.content.forEach(scheme => {
//                         // Use '/E-Insurance/file/view/' as the base path for images
//                         // const imageUrl = scheme.schemeImage ? `http://localhost:8080/E-Insurance/file/view/${scheme.schemeImage}` : '/path/to/default-image.png';
//                         // images[scheme.insuranceSchemeId] = imageUrl;
//                         const isExternalUrl = scheme.schemeImage.startsWith('http');
//     const imageUrl = isExternalUrl ? scheme.schemeImage : `http://localhost:8080/E-Insurance/file/view/${scheme.schemeImage}`;
//     images[scheme.insuranceSchemeId] = imageUrl;
    
//                         // Log the image URL for debugging
//                         console.log(`Scheme ID: ${scheme.insuranceSchemeId}, Image URL: ${imageUrl}`);
//                     });
//                     setSchemeImages(images);
//                 } else {
//                     setSchemes([]); // Set to empty array if no content
//                 }
//             } catch (error) {
//                 console.error('Error fetching schemes:', error);
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         if (!investmentAmount || !scheme.profitRatio) return;
//         const interest = (investmentAmount * scheme.profitRatio) / 100;
//         setInterestAmount(interest);
//     };

//     const handleViewMore = (schemeId) => {
//         setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//             <div className="row">
//                 {schemes.length > 0 ? (
//                     schemes.map(scheme => (
//                         <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                             <div className="card scheme-card">
//                                 {/* Conditionally include the image */}
//                                 <img
//                                     src={schemeImages[scheme.insuranceSchemeId]}
//                                     alt={scheme.insuranceScheme}
//                                     className="scheme-image"
//                                     style={{ width: '80%' }}
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                     <p className="card-text">{scheme.description}</p>
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                     >
//                                         {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                     </button>
//                                     {expandedSchemeId === scheme.insuranceSchemeId && (
//                                         <div className="mt-3">
//                                             <table className="table table-bordered table-striped">
//                                                 <tbody>
//                                                     <tr>
//                                                         <th>Min Policy Term:</th>
//                                                         <td>{scheme.minimumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Policy Term:</th>
//                                                         <td>{scheme.maximumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Age:</th>
//                                                         <td>{scheme.minimumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Age:</th>
//                                                         <td>{scheme.maximumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Investment:</th>
//                                                         <td>{scheme.minimumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Investment:</th>
//                                                         <td>{scheme.maximumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Profit Ratio:</th>
//                                                         <td>{scheme.profitRatio}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>New Registration Commission:</th>
//                                                         <td>{scheme.newRegistrationCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Installment Payment Commission:</th>
//                                                         <td>{scheme.installmentPaymentCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Insurance Plan ID:</th>
//                                                         <td>{scheme.insurancePlanId}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Active:</th>
//                                                         <td>{scheme.active ? 'Yes' : 'No'}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Documents Required:</th>
//                                                         <td>
//                                                             {scheme.schemeDocument && scheme.schemeDocument.length > 0 ? (
//                                                                 <ul>
//                                                                     {scheme.schemeDocument.map((document) => (
//                                                                         <li key={document.id}>{document.name}</li>
//                                                                     ))}
//                                                                 </ul>
//                                                             ) : (
//                                                                 <p>No documents available</p>
//                                                             )}
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                             <div className="interest-calculator">
//                                                 <h6>Interest Calculator</h6>
//                                                 <div className="form-group">
//                                                     <label htmlFor="investmentAmount">Investment Amount</label>
//                                                     <input
//                                                         type="number"
//                                                         id="investmentAmount"
//                                                         className="form-control"
//                                                         value={investmentAmount}
//                                                         onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="interestAmount">Interest Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="interestAmount"
//                                                         className="form-control"
//                                                         value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <button
//                                                     className="btn btn-secondary mt-3"
//                                                     onClick={() => calculateInterest(scheme)}
//                                                 >
//                                                     Calculate Interest
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No schemes available</p>
//                 )}
//             </div>
//                   <div>
//                 <Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default FetchSchemes;
// // ----------------
///new oneee-----
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchSchemesByPlanId } from '../../services/schemeService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/components/FetchSchemes.css';
// import { Button } from 'react-bootstrap';
// import './FetchScheme.css';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [schemeImages, setSchemeImages] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [policyTerm, setPolicyTerm] = useState('');
//     const [installmentPeriod, setInstallmentPeriod] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [totalAmount, setTotalAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);
//     const [scheme, setScheme] = useState(null); // Track selected scheme for interest calc

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await fetchSchemesByPlanId(planId);
//                 if (response && response.data && Array.isArray(response.data.content)) {
//                     setSchemes(response.data.content);
//                     const images = {};
//                     response.data.content.forEach(scheme => {
//                         const isExternalUrl = scheme.schemeImage.startsWith('http');
//                         const imageUrl = isExternalUrl ? scheme.schemeImage : `http://localhost:8080/E-Insurance/file/view/${scheme.schemeImage}`;
//                         images[scheme.insuranceSchemeId] = imageUrl;
//                     });
//                     setSchemeImages(images);
//                 } else {
//                     setSchemes([]);
//                 }
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         const investment = parseFloat(investmentAmount);
//         const term = parseInt(policyTerm, 10);
//         const months = parseInt(installmentPeriod, 10);

//         if (isNaN(investment) || isNaN(term) || isNaN(months)) {
//             setError('Please enter valid numbers for investment amount, policy term, and installment period.');
//             return;
//         }

//         if (investment < scheme.minimumInvestmentAmount || investment > scheme.maximumInvestmentAmount) {
//             setError('Investment amount is out of the valid range.');
//             return;
//         }

//         if (term < scheme.minimumPolicyTerm || term > scheme.maximumPolicyTerm) {
//             setError('Policy term is out of the valid range.');
//             return;
//         }

//         const interest = (investment * scheme.profitRatio * term) / 100;
//         const total = investment + interest;
//         const installmentAmount = total / months;

//         setInterestAmount(interest);
//         setTotalAmount(total);
//     };

//     const handleViewMore = (schemeId) => {
//         setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//             <div className="row">
//                 {schemes.length > 0 ? (
//                     schemes.map(scheme => (
//                         <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                             <div className="card scheme-card">
//                                 <img
//                                     src={schemeImages[scheme.insuranceSchemeId]}
//                                     alt={scheme.insuranceScheme}
//                                     className="scheme-image"
//                                     style={{ width: '80%' }}
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                     <p className="card-text">{scheme.description}</p>
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                     >
//                                         {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                     </button>
//                                     {expandedSchemeId === scheme.insuranceSchemeId && (
//                                         <div className="mt-3">
//                                             <table className="table table-bordered table-striped">
//                                                 <tbody>
//                                                     <tr>
//                                                         <th>Min Policy Term:</th>
//                                                         <td>{scheme.minimumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Policy Term:</th>
//                                                         <td>{scheme.maximumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Age:</th>
//                                                         <td>{scheme.minimumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Age:</th>
//                                                         <td>{scheme.maximumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Investment:</th>
//                                                         <td>{scheme.minimumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Investment:</th>
//                                                         <td>{scheme.maximumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Profit Ratio:</th>
//                                                         <td>{scheme.profitRatio}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>New Registration Commission:</th>
//                                                         <td>{scheme.newRegistrationCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Installment Payment Commission:</th>
//                                                         <td>{scheme.installmentPaymentCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Insurance Plan ID:</th>
//                                                         <td>{scheme.insurancePlanId}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Active:</th>
//                                                         <td>{scheme.active ? 'Yes' : 'No'}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Documents Required:</th>
//                                                         <td>
//                                                             {scheme.schemeDocument && scheme.schemeDocument.length > 0 ? (
//                                                                 <ul>
//                                                                     {scheme.schemeDocument.map((document) => (
//                                                                         <li key={document.id}>{document.name}</li>
//                                                                     ))}
//                                                                 </ul>
//                                                             ) : (
//                                                                 <p>No documents available</p>
//                                                             )}
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                             <div className="interest-calculator">
//                                                 <h6>Interest Calculator</h6>
//                                                 <div className="form-group">
//                                                     <label htmlFor="investmentAmount">Investment Amount</label>
//                                                     <input
//                                                         type="number"
//                                                         id="investmentAmount"
//                                                         className="form-control"
//                                                         value={investmentAmount}
//                                                         onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="policyTerm">Policy Term (Years)</label>
//                                                     <input
//                                                         type="number"
//                                                         id="policyTerm"
//                                                         className="form-control"
//                                                         value={policyTerm}
//                                                         onChange={(e) => setPolicyTerm(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="installmentPeriod">Installment Period (Months)</label>
//                                                     <input
//                                                         type="number"
//                                                         id="installmentPeriod"
//                                                         className="form-control"
//                                                         value={installmentPeriod}
//                                                         onChange={(e) => setInstallmentPeriod(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="interestAmount">Interest Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="interestAmount"
//                                                         className="form-control"
//                                                         value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="totalAmount">Total Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="totalAmount"
//                                                         className="form-control"
//                                                         value={totalAmount !== null ? `$${totalAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <button
//                                                     className="btn btn-secondary mt-3"
//                                                     onClick={() => calculateInterest(scheme)}
//                                                 >
//                                                     Calculate
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No schemes available</p>
//                 )}
//             </div>
//             <div>
//                 <Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default FetchSchemes;

// new to here
// fetch schemes before buy policy button
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchSchemesByPlanId } from '../../services/schemeService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/components/FetchSchemes.css';
// import { Button } from 'react-bootstrap';
// import './FetchScheme.css';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const [schemes, setSchemes] = useState([]);
//     const [schemeImages, setSchemeImages] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [policyTerm, setPolicyTerm] = useState('');
//     const [installmentPeriod, setInstallmentPeriod] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [totalAmount, setTotalAmount] = useState(null);
//     const [installmentAmount, setInstallmentAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);
//     const [scheme, setScheme] = useState(null); // Track selected scheme for interest calc

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await fetchSchemesByPlanId(planId);
//                 if (response && response.data && Array.isArray(response.data.content)) {
//                     setSchemes(response.data.content);
//                     const images = {};
//                     response.data.content.forEach(scheme => {
//                         const isExternalUrl = scheme.schemeImage.startsWith('http');
//                         const imageUrl = isExternalUrl ? scheme.schemeImage : `http://localhost:8080/E-Insurance/file/view/${scheme.schemeImage}`;
//                         images[scheme.insuranceSchemeId] = imageUrl;
//                     });
//                     setSchemeImages(images);
//                 } else {
//                     setSchemes([]);
//                 }
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         const investment = parseFloat(investmentAmount);
//         const term = parseInt(policyTerm, 10);
//         const months = parseInt(installmentPeriod, 10);

//         if (isNaN(investment) || isNaN(term) || isNaN(months)) {
//             setError('Please enter valid numbers for investment amount, policy term, and installment period.');
//             return;
//         }

//         if (investment < scheme.minimumInvestmentAmount || investment > scheme.maximumInvestmentAmount) {
//             setError('Investment amount is out of the valid range.');
//             return;
//         }

//         if (term < scheme.minimumPolicyTerm || term > scheme.maximumPolicyTerm) {
//             setError('Policy term is out of the valid range.');
//             return;
//         }

//         const interest = (investment * scheme.profitRatio * term) / 100;
//         const total = investment + interest;
//         const installmentAmt = total / months;

//         setInterestAmount(interest);
//         setTotalAmount(total);
//         setInstallmentAmount(installmentAmt);
//     };

//     const handleViewMore = (schemeId) => {
//         setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//             <div className="row">
//                 {schemes.length > 0 ? (
//                     schemes.map(scheme => (
//                         <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                             <div className="card scheme-card">
//                                 <img
//                                     src={schemeImages[scheme.insuranceSchemeId]}
//                                     alt={scheme.insuranceScheme}
//                                     className="scheme-image"
//                                     style={{ width: '80%' }}
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                     <p className="card-text">{scheme.description}</p>
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                     >
//                                         {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                     </button>
//                                     {expandedSchemeId === scheme.insuranceSchemeId && (
//                                         <div className="mt-3">
//                                             <table className="table table-bordered table-striped">
//                                                 <tbody>
//                                                     <tr>
//                                                         <th>Min Policy Term:</th>
//                                                         <td>{scheme.minimumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Policy Term:</th>
//                                                         <td>{scheme.maximumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Age:</th>
//                                                         <td>{scheme.minimumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Age:</th>
//                                                         <td>{scheme.maximumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Investment:</th>
//                                                         <td>{scheme.minimumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Investment:</th>
//                                                         <td>{scheme.maximumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Profit Ratio:</th>
//                                                         <td>{scheme.profitRatio}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>New Registration Commission:</th>
//                                                         <td>{scheme.newRegistrationCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Installment Payment Commission:</th>
//                                                         <td>{scheme.installmentPaymentCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Insurance Plan ID:</th>
//                                                         <td>{scheme.insurancePlanId}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Active:</th>
//                                                         <td>{scheme.active ? 'Yes' : 'No'}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Documents Required:</th>
//                                                         <td>
//                                                             {scheme.schemeDocument && scheme.schemeDocument.length > 0 ? (
//                                                                 <ul>
//                                                                     {scheme.schemeDocument.map((document) => (
//                                                                         <li key={document.id}>{document.name}</li>
//                                                                     ))}
//                                                                 </ul>
//                                                             ) : (
//                                                                 <p>No documents available</p>
//                                                             )}
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                             <div className="interest-calculator">
//                                                 <h6>Interest Calculator</h6>
//                                                 <div className="form-group">
//                                                     <label htmlFor="investmentAmount">Investment Amount</label>
//                                                     <input
//                                                         type="number"
//                                                         id="investmentAmount"
//                                                         className="form-control"
//                                                         value={investmentAmount}
//                                                         onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="policyTerm">Policy Term (Years)</label>
//                                                     <input
//                                                         type="number"
//                                                         id="policyTerm"
//                                                         className="form-control"
//                                                         value={policyTerm}
//                                                         onChange={(e) => setPolicyTerm(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="installmentPeriod">Installment Period (Months)</label>
//                                                     <input
//                                                         type="number"
//                                                         id="installmentPeriod"
//                                                         className="form-control"
//                                                         value={installmentPeriod}
//                                                         onChange={(e) => setInstallmentPeriod(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="interestAmount">Interest Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="interestAmount"
//                                                         className="form-control"
//                                                         value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="totalAmount">Total Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="totalAmount"
//                                                         className="form-control"
//                                                         value={totalAmount !== null ? `$${totalAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="installmentAmount">Installment Amount (Monthly)</label>
//                                                     <input
//                                                         type="text"
//                                                         id="installmentAmount"
//                                                         className="form-control"
//                                                         value={installmentAmount !== null ? `$${installmentAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <button
//                                                     className="btn btn-secondary mt-3"
//                                                     onClick={() => calculateInterest(scheme)}
//                                                 >
//                                                     Calculate
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No schemes available</p>
//                 )}
//             </div>
//             <div>
//                 <Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default FetchSchemes;
//fetch scehemes before buy policy button

// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchSchemesByPlanId } from '../../services/schemeService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../../styles/components/FetchSchemes.css';
// import { Button } from 'react-bootstrap';
// import './FetchScheme.css';
// import BuyPolicyPage from '../buyPolicy/BuyPolicyPage';

// const FetchSchemes = () => {
//     const { planId } = useParams();
//     const navigate = useNavigate();
//     const [schemes, setSchemes] = useState([]);
//     const [schemeImages, setSchemeImages] = useState({});
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [investmentAmount, setInvestmentAmount] = useState('');
//     const [policyTerm, setPolicyTerm] = useState('');
//     const [installmentPeriod, setInstallmentPeriod] = useState('');
//     const [interestAmount, setInterestAmount] = useState(null);
//     const [totalAmount, setTotalAmount] = useState(null);
//     const [installmentAmount, setInstallmentAmount] = useState(null);
//     const [expandedSchemeId, setExpandedSchemeId] = useState(null);
//     const [scheme, setScheme] = useState(null); // Track selected scheme for interest calculation

//     useEffect(() => {
//         const fetchSchemes = async () => {
//             try {
//                 const response = await fetchSchemesByPlanId(planId);
//                 if (response && response.data && Array.isArray(response.data.content)) {
//                     setSchemes(response.data.content);
//                     const images = {};
//                     response.data.content.forEach(scheme => {
//                         const isExternalUrl = scheme.schemeImage.startsWith('http');
//                         const imageUrl = isExternalUrl ? scheme.schemeImage : `http://localhost:8080/E-Insurance/file/view/${scheme.schemeImage}`;
//                         images[scheme.insuranceSchemeId] = imageUrl;
//                     });
//                     setSchemeImages(images);
//                 } else {
//                     setSchemes([]);
//                 }
//             } catch (error) {
//                 setError(error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchSchemes();
//     }, [planId]);

//     const calculateInterest = (scheme) => {
//         const investment = parseFloat(investmentAmount);
//         const term = parseInt(policyTerm, 10);
//         const months = parseInt(installmentPeriod, 10);

//         if (isNaN(investment) || isNaN(term) || isNaN(months)) {
//             setError('Please enter valid numbers for investment amount, policy term, and installment period.');
//             return;
//         }

//         if (investment < scheme.minimumInvestmentAmount || investment > scheme.maximumInvestmentAmount) {
//             setError('Investment amount is out of the valid range.');
//             return;
//         }

//         if (term < scheme.minimumPolicyTerm || term > scheme.maximumPolicyTerm) {
//             setError('Policy term is out of the valid range.');
//             return;
//         }

//         const interest = (investment * scheme.profitRatio * term) / 100;
//         const total = investment + interest;
//         const installmentAmt = total / months;

//         setInterestAmount(interest);
//         setTotalAmount(total);
//         setInstallmentAmount(installmentAmt);
//         setScheme(scheme); // Store the selected scheme for use in the next step
//     };

//     const handleBuyPolicy = () => {
//         navigate('/buy-policy', { state: { scheme, investmentAmount, policyTerm, installmentPeriod, interestAmount, totalAmount, installmentAmount } });
//     };

//     const handleViewMore = (schemeId) => {
//         setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error fetching schemes: {error.message}</p>;

//     return (
//         <div className="container mt-4">
//             <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
//             <div className="row">
//                 {schemes.length > 0 ? (
//                     schemes.map(scheme => (
//                         <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
//                             <div className="card scheme-card">
//                                 <img
//                                     src={schemeImages[scheme.insuranceSchemeId]}
//                                     alt={scheme.insuranceScheme}
//                                     className="scheme-image"
//                                     style={{ width: '80%' }}
//                                 />
//                                 <div className="card-body">
//                                     <h5 className="card-title">{scheme.insuranceScheme}</h5>
//                                     <p className="card-text">{scheme.description}</p>
//                                     <button
//                                         className="btn btn-primary"
//                                         onClick={() => handleViewMore(scheme.insuranceSchemeId)}
//                                     >
//                                         {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
//                                     </button>
//                                     {expandedSchemeId === scheme.insuranceSchemeId && (
//                                         <div className="mt-3">
//                                             <table className="table table-bordered table-striped">
//                                                 <tbody>
//                                                     <tr>
//                                                         <th>Min Policy Term:</th>
//                                                         <td>{scheme.minimumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Policy Term:</th>
//                                                         <td>{scheme.maximumPolicyTerm}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Age:</th>
//                                                         <td>{scheme.minimumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Age:</th>
//                                                         <td>{scheme.maximumAge}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Min Investment:</th>
//                                                         <td>{scheme.minimumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Max Investment:</th>
//                                                         <td>{scheme.maximumInvestmentAmount}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Profit Ratio:</th>
//                                                         <td>{scheme.profitRatio}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>New Registration Commission:</th>
//                                                         <td>{scheme.newRegistrationCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Installment Payment Commission:</th>
//                                                         <td>{scheme.installmentPaymentCommission}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Insurance Plan ID:</th>
//                                                         <td>{scheme.insurancePlanId}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Active:</th>
//                                                         <td>{scheme.active ? 'Yes' : 'No'}</td>
//                                                     </tr>
//                                                     <tr>
//                                                         <th>Documents Required:</th>
//                                                         <td>
//                                                             {scheme.schemeDocument && scheme.schemeDocument.length > 0 ? (
//                                                                 <ul>
//                                                                     {scheme.schemeDocument.map((document) => (
//                                                                         <li key={document.id}>{document.name}</li>
//                                                                     ))}
//                                                                 </ul>
//                                                             ) : (
//                                                                 <p>No documents available</p>
//                                                             )}
//                                                         </td>
//                                                     </tr>
//                                                 </tbody>
//                                             </table>
//                                             <div className="interest-calculator">
//                                                 <h6>Interest Calculator</h6>
//                                                 <div className="form-group">
//                                                     <label htmlFor="investmentAmount">Investment Amount</label>
//                                                     <input
//                                                         type="number"
//                                                         id="investmentAmount"
//                                                         className="form-control"
//                                                         value={investmentAmount}
//                                                         onChange={(e) => setInvestmentAmount(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="policyTerm">Policy Term (Years)</label>
//                                                     <input
//                                                         type="number"
//                                                         id="policyTerm"
//                                                         className="form-control"
//                                                         value={policyTerm}
//                                                         onChange={(e) => setPolicyTerm(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="installmentPeriod">Installment Period (Months)</label>
//                                                     <input
//                                                         type="number"
//                                                         id="installmentPeriod"
//                                                         className="form-control"
//                                                         value={installmentPeriod}
//                                                         onChange={(e) => setInstallmentPeriod(e.target.value)}
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="interestAmount">Interest Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="interestAmount"
//                                                         className="form-control"
//                                                         value={interestAmount !== null ? `$${interestAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="totalAmount">Total Amount</label>
//                                                     <input
//                                                         type="text"
//                                                         id="totalAmount"
//                                                         className="form-control"
//                                                         value={totalAmount !== null ? `$${totalAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <div className="form-group mt-3">
//                                                     <label htmlFor="installmentAmount">Installment Amount (Monthly)</label>
//                                                     <input
//                                                         type="text"
//                                                         id="installmentAmount"
//                                                         className="form-control"
//                                                         value={installmentAmount !== null ? `$${installmentAmount.toFixed(2)}` : 'N/A'}
//                                                         readOnly
//                                                     />
//                                                 </div>
//                                                 <button
//                                                     className="btn btn-secondary mt-3"
//                                                     onClick={() => calculateInterest(scheme)}
//                                                 >
//                                                     Calculate
//                                                 </button>
//                                                 <button
//                                                     className="btn btn-primary mt-3"
//                                                     onClick={handleBuyPolicy}
//                                                     disabled={!interestAmount}
//                                                 >
//                                                     Buy Policy
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     )}
//                                 </div>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <p>No schemes available</p>
//                 )}
//             </div>
//             <div>
//                 <Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button>
//             </div>
//         </div>
//     );
// };

// export default FetchSchemes;

//---------
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSchemesByPlanId } from '../../services/schemeService';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/components/FetchSchemes.css';
import { Button } from 'react-bootstrap';
import './FetchScheme.css';

const FetchSchemes = () => {
    const { planId } = useParams();
    const navigate = useNavigate();
    const [schemes, setSchemes] = useState([]);
    const [schemeImages, setSchemeImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [investmentAmount, setInvestmentAmount] = useState('');
    const [policyTerm, setPolicyTerm] = useState('');
    const [installmentPeriod, setInstallmentPeriod] = useState('');
    const [interestAmount, setInterestAmount] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [installmentAmount, setInstallmentAmount] = useState(null);
    const [expandedSchemeId, setExpandedSchemeId] = useState(null);
    const [scheme, setScheme] = useState(null); // Track selected scheme for interest calculation
    

    useEffect(() => {
        const fetchSchemes = async () => {
            try {
                const response = await fetchSchemesByPlanId(planId);
                if (response && response.data && Array.isArray(response.data.content)) {
                    setSchemes(response.data.content);
                    const images = {};
                    response.data.content.forEach(scheme => {
                        const isExternalUrl = scheme.schemeImage.startsWith('http');
                        const imageUrl = isExternalUrl ? scheme.schemeImage : `http://localhost:8080/E-Insurance/file/view/${scheme.schemeImage}`;
                        images[scheme.insuranceSchemeId] = imageUrl;
                    });
                    setSchemeImages(images);
                } else {
                    setSchemes([]);
                }
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchSchemes();
    }, [planId]);

    const calculateInterest = (scheme) => {
        const investment = parseFloat(investmentAmount);
        const term = parseInt(policyTerm, 10);
        const months = parseInt(installmentPeriod, 10);

        if (isNaN(investment) || isNaN(term) || isNaN(months)) {
            // setError('Please enter valid numbers for investment amount, policy term, and installment period.');
            alert('Please enter valid numbers for investment amount, policy term, and installment period.');
            return;
        }

        if (investment < scheme.minimumInvestmentAmount || investment > scheme.maximumInvestmentAmount) {
            // setError('Investment amount is out of the valid range.');
            alert('Investment amount is out of the valid range.');
            return;
        }

        if (term < scheme.minimumPolicyTerm || term > scheme.maximumPolicyTerm) {
            //setError('Policy term is out of the valid range.');
            alert('Policy term is out of the valid range.');
            return;
        }

        if (months < 1 || months > 12) {
            alert('Installment period must be between 1 and 12 months.');
            return;
        }

        const interest = (investment * scheme.profitRatio ) / 100;
        
        const total = investment + interest;
        const installmentAmt = (investment /( term*12))*installmentPeriod;
console.log(installmentPeriod);

        setInterestAmount(interest);
        setTotalAmount(total);
        setInstallmentAmount(installmentAmt);
        setScheme(scheme); // Store the selected scheme for use in the next step
        console.log(scheme);
    };
   // const handleBuyPolicy = async () => {

        // if (!scheme.active) {
        //     alert('This scheme is not active. You cannot buy a policy for it.');
        //     return;
        // }

//         const role = localStorage.getItem('UserRole');
//         console.log("User role:", role); // Add this line
        
//         if (!scheme.active) {
//             alert('This scheme is not active. You cannot buy a policy for it.');
//             return;
//         }
//         const token = localStorage.getItem('authToken');
//         console.log("Auth token:", token); // Add this line
//         // Check if the token is valid
//         if (!token) {
//             console.log("No token found, redirecting to login.");
//             navigate('/login');
//             return;
//         }
// console.log('wrong login');

//         // const validRoles = ['ROLE_CUSTOMER', 'ROLE_AGENT', 'ROLE_ADMIN', 'ROLE_EMPLOYEE'];
//         const validRoles = ['customer', 'agent', 'admin', 'employee']; // Use lowercase
//         console.log("Valid roles:", validRoles); // Debug log
//     console.log("Checking role:", role); // Debug log

//     if (!validRoles.includes(`ROLE_${role}`)) {
//         console.log("Invalid role, redirecting to login.");
//         navigate('/login');
//         return;
//     }
//     if (role === 'customer') {
//             // Directly navigate to buy-policy for customer
//             navigate('/buy-policy-without', {
//                 state: {
//                     schemeId: scheme.insuranceSchemeId,
//                     scheme,
//                     investmentAmount,
//                     policyTerm,
//                     installmentPeriod,
//                     interestAmount,
//                     totalAmount,
//                     installmentAmount,
                  
                    
//                 }
//             });
//         } else if (role === 'agent') {
//             // Navigate to the registration page for the agent to register the customer
//             navigate('/E-Insurance/agentdashboard/registercustomer', {
//                 state: {
//                     schemeId: scheme.insuranceSchemeId,
//                     scheme,
//                     investmentAmount,
//                     policyTerm,
//                     installmentPeriod,
//                     interestAmount,
//                     totalAmount,
//                     installmentAmount,
//                     agentId: localStorage.getItem('agentId')
//                 }
//             });
//         } else {
//             console.log("Invalid role, redirecting to login.");
//             navigate('/login');
//         }
//     };
const handleBuyPolicy = async () => {
    const role = localStorage.getItem('UserRole'); // Fetch the role
    const token = localStorage.getItem('authToken'); // Fetch the token

    console.log("User role:", role); // Debug log
    console.log("Auth token:", token); // Debug log

    if (!token) {
        console.log("No token found, redirecting to login.");
        navigate('/login/customer');
        return;
    }

    const validRoles = ['customer', 'agent', 'admin', 'employee']; // Use lowercase
    console.log("Valid roles:", validRoles); // Debug log
    console.log("Checking role:", role); // Debug log

    // Check if role is valid
    if (!validRoles.includes(role)) {
        console.log("Invalid role detected. Role:", role); // Log the invalid role
        navigate('/login');
        return;
    }

    console.log("Role is valid. Proceeding to next steps.");

    // Role-specific navigation
    if (role === 'customer') {
        console.log("Navigating to buy-policy for customer."); // Debug log
        navigate('/buy-policy-without', {
            state: {
                schemeId: scheme.insuranceSchemeId,
                scheme,
                investmentAmount,
                policyTerm,
                installmentPeriod,
                interestAmount,
                totalAmount,
                installmentAmount,
            }
        });
    } else if (role === 'agent') {
        console.log("Navigating to agent dashboard for customer registration."); // Debug log
        navigate('/E-Insurance/agentdashboard/registercustomer', {
            state: {
                schemeId: scheme.insuranceSchemeId,
                scheme,
                investmentAmount,
                policyTerm,
                installmentPeriod,
                interestAmount,
                totalAmount,
                installmentAmount,
                agentId: localStorage.getItem('agentId'),
            }
        });
    } else {
        console.log("Unhandled role, redirecting to login."); // Debug log
        navigate('/login');
    }
};

    
  
    const handleViewMore = (schemeId) => {
        // const selectedScheme = schemes.find(scheme => scheme.insuranceSchemeId === schemeId);
        // if (selectedScheme) {
        //     setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
        //     setScheme(selectedScheme); // Set the scheme details for use in BuyPolicy
        // }
        const selectedScheme = schemes.find(scheme => scheme.insuranceSchemeId === schemeId);
        if (selectedScheme) {
            if (!selectedScheme.active) {
                alert('This scheme is inactive. You cannot view more details or buy a policy for it.');
            } else {
                setExpandedSchemeId(expandedSchemeId === schemeId ? null : schemeId);
                setScheme(selectedScheme); // Set the scheme details for use in BuyPolicy
            }
        }
    };
    

    const handleGoBack = () => {
        navigate(-1);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching schemes: {error.message}</p>;

    return (
        <div className="container mt-4">
            <h3 className="mb-4">Schemes for Plan ID: {planId}</h3>
            <div className="row">
                {schemes.length > 0 ? (
                    schemes.map(scheme => (
                        <div key={scheme.insuranceSchemeId} className="col-md-4 mb-4">
                            <div className="card scheme-card">
                                <img
                                    src={schemeImages[scheme.insuranceSchemeId]}
                                    alt={scheme.insuranceScheme}
                                    className="scheme-image"
                                    style={{ width: '80%' }}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{scheme.insuranceScheme}</h5>
                                    <p className="card-text">{scheme.description}</p>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleViewMore(scheme.insuranceSchemeId)}
                                    >
                                        {expandedSchemeId === scheme.insuranceSchemeId ? 'Show Less' : 'View More'}
                                    </button>
                                    {expandedSchemeId === scheme.insuranceSchemeId && (
                                        <div className="mt-3">
                                            <table className="table table-bordered table-striped">
                                                <tbody>
                                                    <tr>
                                                        <th>Min Policy Term:</th>
                                                        <td>{scheme.minimumPolicyTerm}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Max Policy Term:</th>
                                                        <td>{scheme.maximumPolicyTerm}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Min Age:</th>
                                                        <td>{scheme.minimumAge}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Max Age:</th>
                                                        <td>{scheme.maximumAge}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Min Investment:</th>
                                                        <td>{scheme.minimumInvestmentAmount}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Max Investment:</th>
                                                        <td>{scheme.maximumInvestmentAmount}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Profit Ratio:</th>
                                                        <td>{scheme.profitRatio}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>New Registration Commission:</th>
                                                        <td>{scheme.newRegistrationCommission}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Installment Payment Commission:</th>
                                                        <td>{scheme.installmentPaymentCommission}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Insurance Plan ID:</th>
                                                        <td>{scheme.insurancePlanId}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Active:</th>
                                                        <td>{scheme.active ? 'Yes' : 'No'}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Documents Required:</th>
                                                        <td>
                                                            {scheme.schemeDocument && scheme.schemeDocument.length > 0 ? (
                                                                <ul>
                                                                    {scheme.schemeDocument.map((document) => (
                                                                        <li key={document.id}>{document.name}</li>
                                                                    ))}
                                                                </ul>
                                                            ) : (
                                                                <p>No documents available</p>
                                                            )}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <div className="interest-calculator">
                                                <h6>Interest Calculator</h6>
                                                <div className="form-group">
                                                    <label htmlFor="investmentAmount">Investment Amount: from{scheme.minimumInvestmentAmount} to {scheme.maximumInvestmentAmount}</label>
                                                    <input
                                                        type="number"
                                                        id="investmentAmount"
                                                        className="form-control"
                                                        value={investmentAmount}
                                                        onChange={(e) => setInvestmentAmount(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label htmlFor="policyTerm">Policy Term select from {scheme.minimumPolicyTerm} to {scheme.maximumPolicyTerm}</label>
                                                    <input
                                                        type="number"
                                                        id="policyTerm"
                                                        className="form-control"
                                                        value={policyTerm}
                                                        onChange={(e) => setPolicyTerm(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label htmlFor="installmentPeriod">Installment Period select Months from  1 to 12</label>
                                                    <input
                                                        type="number"
                                                        id="installmentPeriod"
                                                        className="form-control"
                                                        value={installmentPeriod}
                                                        onChange={(e) => setInstallmentPeriod(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label htmlFor="interestAmount">Interest Amount</label>
                                                    <input
                                                        type="text"
                                                        id="interestAmount"
                                                        className="form-control"
                                                        value={interestAmount !== null ? `${interestAmount.toFixed(2)}` : 'N/A'}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label htmlFor="totalAmount">Total Amount</label>
                                                    <input
                                                        type="text"
                                                        id="totalAmount"
                                                        className="form-control"
                                                        value={totalAmount !== null ? `${totalAmount.toFixed(2)}` : 'N/A'}
                                                        readOnly
                                                    />
                                                </div>
                                                <div className="form-group mt-3">
                                                    <label htmlFor="installmentAmount">Installment Amount (Monthly)</label>
                                                    <input
                                                        type="text"
                                                        id="installmentAmount"
                                                        className="form-control"
                                                        value={installmentAmount !== null ? `${installmentAmount.toFixed(2)}` : 'N/A'}
                                                        readOnly
                                                    />
                                                </div>
                                                <button
                                                    className="btn btn-secondary mt-3"
                                                    onClick={() => calculateInterest(scheme)}
                                                >
                                                    Calculate
                                                </button>
                                                <button
                                                    className="btn btn-primary mt-3"
                                                    onClick={handleBuyPolicy}
                                                    disabled={!interestAmount}
                                                >
                                                    Buy Policy
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No schemes available</p>
                )}
            </div>
            <div>
                <Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button>
            </div>
        </div>
    );
};

export default FetchSchemes;

// //------

