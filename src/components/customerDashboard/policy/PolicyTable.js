// import React, { useEffect, useState } from 'react';
// import { getAllPoliciesByCustomerId } from '../../../services/customerService';
// import DynamicTable from '../../sharedComponents/DynamicTable';
// const PolicyTable = () => {
//   const [policies, setPolicies] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 0,
//     size: 10,
//     totalPages: 0
//   });


//   const customerId = localStorage.getItem('customerId'); // Replace 'customerId' with the actual key used

//   useEffect(() => {
//     if (!customerId) {
//       setError('Customer ID not found in localStorage');
//       setLoading(false);
//       return;
//     }

//     const fetchPolicies = async () => {
//         try {
//           const response = await getAllPoliciesByCustomerId(customerId, pagination.page, pagination.size);
//           setPolicies(response.content || []);
//           setPagination(prev => ({
//             ...prev,
//             totalPages: response.totalPages
//           }));
//         } catch (err) {
//           setError('Failed to fetch policies');
//         } finally {
//           setLoading(false);
//         }
//       };
  
//       fetchPolicies();
//     }, [customerId, pagination.page, pagination.size]);

//     const handlePageChange = (newPage) => {
//         if (newPage >= 0 && newPage < pagination.totalPages) {
//           setPagination(prev => ({ ...prev, page: newPage }));
//         }
//       };
    

//   if (loading) return <p>Loading policies...</p>;
//   if (error) return <p>{error}</p>;


//   const columns = [
//     { title: 'Insurance ID', key: 'insuranceId' },
//     { title: 'Scheme Name', key: 'insuranceScheme' },
//     { title: 'Agent ID', key: 'agentId' },
//     { title: 'Claim ID', key: 'claimId' },
//     { title: 'Issued Date', key: 'issuedDate' },
//     { title: 'Maturity Date', key: 'maturityDate' },
//     { title: 'Premium Amount', key: 'premiumAmount' },
//     { title: 'Policy Status', key: 'policyStatus' },
    
//     { title: 'Policy Term', key: 'policyTerm' },
//     { title: 'Installment Period (monthly)', key: 'installmentPeriod' },
//   ];

//   return (
//     <div>
//       <h2>Insurance Policies</h2>
//       <DynamicTable data={policies} columns={columns} />
//       <div>
//         <button
//           disabled={pagination.page === 0}
//           onClick={() => handlePageChange(pagination.page - 1)}
//         >
//           Previous
//         </button>
//         <span> Page {pagination.page + 1} of {pagination.totalPages} </span>
//         <button
//           disabled={pagination.page >= pagination.totalPages - 1}
//           onClick={() => handlePageChange(pagination.page + 1)}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default PolicyTable;
//===============================================================================
// import React, { useEffect, useState } from 'react';
// import { getAllPoliciesByCustomerId, fetchCustomerById } from '../../../services/customerService';
// import DynamicTable from '../../sharedComponents/DynamicTable';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import './PolicyTable.css';


// const PolicyTable = () => {
//   const [policies, setPolicies] = useState([]);
//   const [customer, setCustomer] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 0,
//     size: 10,
//     totalPages: 0
//   });

//   const navigate = useNavigate();
  


//   const [pageSize, setPageSize] = useState(10); // Add state for page size

//   const customerId = localStorage.getItem('customerId'); // Replace 'customerId' with the actual key used

//   useEffect(() => {
//     if (!customerId) {
//       setError('Customer ID not found in localStorage');
//       setLoading(false);
//       return;
//     }

//     const fetchPoliciesAndCustomer = async () => {
//       try {
//         // Fetch customer details
//         const customerResponse = await fetchCustomerById(customerId);
//         setCustomer(customerResponse);

//         // Fetch policies
//         const policiesResponse = await getAllPoliciesByCustomerId(customerId, pagination.page, pageSize);
//         setPolicies(policiesResponse.content || []);
//         setPagination(prev => ({
//           ...prev,
//           totalPages: policiesResponse.totalPages
//         }));
//       } catch (err) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPoliciesAndCustomer();
//   }, [customerId, pagination.page, pageSize]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < pagination.totalPages) {
//       setPagination(prev => ({ ...prev, page: newPage }));
//     }
//   };

//   const handlePageSizeChange = (event) => {
//     const newSize = parseInt(event.target.value, 10);
//     setPageSize(newSize);
//     setPagination(prev => ({
//       ...prev,
//       page: 0, // Reset to the first page when page size changes
//     }));
//   };

//   const handleGoBack = () => {
//     navigate(-1); // Goes back to the previous page
// };

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   // Define columns for customer details and policies
//   const customerColumns = [
//     { title: 'First Name', key: 'firstName' },
//     { title: 'Last Name', key: 'lastName' },
//     { title: 'Email', key: 'email' },
//     { title: 'Active', key: 'active' },
//     { title: 'Date of Birth', key: 'dob' },
//     { title: 'Phone Number', key: 'phoneNumber' },
//     { title: 'City', key: 'cityName' },
//     { title: 'State', key: 'stateName' }
//   ];

//   const policyColumns = [
//     { title: 'Insurance ID', key: 'insuranceId' },
//     { title: 'Scheme Name', key: 'insuranceScheme' },
//     { title: 'Agent ID', key: 'agentId' },
//     { title: 'Claim ID', key: 'claimId' },
//     { title: 'Issued Date', key: 'issuedDate' },
//     { title: 'Maturity Date', key: 'maturityDate' },
//     { title: 'Premium Amount', key: 'premiumAmount' },
//     { title: 'Policy Status', key: 'policyStatus' },
//     { title: 'Policy Term', key: 'policyTerm' },
//     { title: 'Installment Period (monthly)', key: 'installmentPeriod' },
//   ];

//   return (
//     <div>
//       <h2>Customer Details</h2>
//       {customer ? (
//         <DynamicTable data={[customer]} columns={customerColumns} />
//       ) : (
//         <p>No customer details available</p>
//       )}

//       <h2>Insurance Policies</h2>


//       <DynamicTable data={policies} columns={policyColumns} />
//       <div className="pagination-controls"> 
//       <button
//           disabled={pagination.page === 0}
//           onClick={() => handlePageChange(pagination.page - 1)}
//         >
//           Previous
//         </button>
//         <span> Page {pagination.page + 1} of {pagination.totalPages} </span>
//         <button
//           disabled={pagination.page >= pagination.totalPages - 1}
//           onClick={() => handlePageChange(pagination.page + 1)}
//         >
//           Next
//         </button>
//       </div>
//       <div>
//         <label htmlFor="pageSize">Page Size: </label>
//         <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
//         <option value={1}>1</option>
//         <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={30}>30</option>
          
//         </select>
//       </div>
//       <div><Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button></div>
//     </div>
//   );
// };

// export default PolicyTable;
// //===========================

// import React, { useEffect, useState } from 'react';
// //import { getAllPoliciesByCustomerId, fetchCustomerById, getCustomerDetailsByPolicyId } from '../../../services/customerService'; // Import the method you provided
// import { getAllPoliciesByCustomerId, fetchCustomerById ,getCustomerDetailsByPolicyId} from '../../../services/customerService';
// import DynamicTable from '../../sharedComponents/DynamicTable';
// import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap';
// import './PolicyTable.css';

// const PolicyTable = () => {
//   const [policies, setPolicies] = useState([]);
//   const [customer, setCustomer] = useState(null);
//   const [installments, setInstallments] = useState([]);
//   const [selectedPolicyId, setSelectedPolicyId] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 0,
//     size: 10,
//     totalPages: 0,
//   });

//   const navigate = useNavigate();
//   const [pageSize, setPageSize] = useState(10);
//   const customerId = localStorage.getItem('customerId');

//   const customerColumns = [
//     { title: 'First Name', key: 'firstName' },
//     { title: 'Last Name', key: 'lastName' },
//     { title: 'Email', key: 'email' },
//     { title: 'Active', key: 'active' },
//     { title: 'Date of Birth', key: 'dob' },
//     { title: 'Phone Number', key: 'phoneNumber' },
//     { title: 'City', key: 'cityName' },
//     { title: 'State', key: 'stateName' }
//   ];


//   useEffect(() => {
//     if (!customerId) {
//       setError('Customer ID not found in localStorage');
//       setLoading(false);
//       return;
//     }

//     const fetchPoliciesAndCustomer = async () => {
//       try {
//         const customerResponse = await fetchCustomerById(customerId);
//         setCustomer(customerResponse);

//         const policiesResponse = await getAllPoliciesByCustomerId(customerId, pagination.page, pageSize);
//         setPolicies(policiesResponse.content || []);
//         setPagination((prev) => ({
//           ...prev,
//           totalPages: policiesResponse.totalPages,
//         }));
//       } catch (err) {
//         setError('Failed to fetch data');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPoliciesAndCustomer();
//   }, [customerId, pagination.page, pageSize]);

//   const handlePageChange = (newPage) => {
//     if (newPage >= 0 && newPage < pagination.totalPages) {
//       setPagination((prev) => ({ ...prev, page: newPage }));
//     }
//   };

//   const handlePageSizeChange = (event) => {
//     const newSize = parseInt(event.target.value, 10);
//     setPageSize(newSize);
//     setPagination((prev) => ({
//       ...prev,
//       page: 0,
//     }));
//   };

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   // const fetchInstallments = async (policyId) => {
//   //   try {
//   //     setLoading(true);
//   //     // Use the provided method to fetch customer details, policy, and installments
//   //     const customerDetails = await getCustomerDetailsByPolicyId(policyId);
//   //     console.log('Customer Details Response:', customerDetails); // Debugging
//   //     // Set the installments from the response
//   //     const policy = customerDetails.insurancePolicies.find((p) => p.insuranceId === policyId);
//   //     if (policy) {
//   //       console.log('Installments:', policy.payments); // Debugging log
//   //       setInstallments(policy.payments || []);
//   //     } else {
//   //       console.warn('No policy found for the given policy ID');
//   //     }
  

//   //     setSelectedPolicyId(policyId);
//   //   } catch (err) {
//   //     setError('Failed to fetch installment details');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const fetchInstallments = async (policyId) => {
//     console.log('fetchInstallments called with policy ID:', policyId); // Debugging log
//     try {
//       setLoading(true);
//       // Fetch customer, policy, and installment details using the provided endpoint
//       const customerDetails = await getCustomerDetailsByPolicyId(policyId);
  
//       console.log('Customer Details Response:', customerDetails); // Debugging log
  
//       // Check if the response contains the policy and payments
//       const policy = customerDetails.insurancePolicies.find((p) => p.insuranceId === policyId);
//       if (policy) {
//         console.log('Installments:', policy.payments); // Debugging log
//         setInstallments(policy.payments || []);
//       } else {
//         console.warn('No policy found for the given policy ID');
//       }
  
//       setSelectedPolicyId(policyId);
//     } catch (err) {
//       console.error('Error fetching installments:', err); // Log the error
//       setError('Failed to fetch installment details');
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>{error}</p>;

//   const policyColumns = [
//     { title: 'Insurance ID', key: 'insuranceId' },
//     { title: 'Scheme Name', key: 'insuranceScheme' },
//     { title: 'Agent ID', key: 'agentId' },
//     { title: 'Claim ID', key: 'claimId' },
//     { title: 'Issued Date', key: 'issuedDate' },
//     { title: 'Maturity Date', key: 'maturityDate' },
//     { title: 'Premium Amount', key: 'premiumAmount' },
//     { title: 'Policy Status', key: 'policyStatus' },
//     { title: 'Policy Term', key: 'policyTerm' },
//     { title: 'Installment Period (monthly)', key: 'installmentPeriod' },
//     {
//       title: 'View Installments',
//       key: 'viewInstallments',
//       render: (policy) => (
//         <Button onClick={() => fetchInstallments(policy.insuranceId)}>View Installments</Button>
//       ),
//     },
    
//   ];

//   const installmentColumns = [
//     { title: 'Installment Number', key: 'installmentNumber' },
//     { title: 'Installment Date', key: 'installmentDate' },
//     { title: 'Installment Amount', key: 'installmentAmount' },
//     { title: 'Payment Status', key: 'paymentStatus' },
//     { title: 'Paid Date', key: 'paidDate' },
//   ];

//   return (
//     <div>
//       <h2>Customer Details</h2>
//       {customer ? <DynamicTable data={[customer]} columns={customerColumns} /> : <p>No customer details available</p>}

//       <h2>Insurance Policies</h2>
//       <DynamicTable data={policies} columns={policyColumns} />

//       <div className="pagination-controls">
//         <button disabled={pagination.page === 0} onClick={() => handlePageChange(pagination.page - 1)}>
//           Previous
//         </button>
//         <span>
//           {' '}
//           Page {pagination.page + 1} of {pagination.totalPages}{' '}
//         </span>
//         <button
//           disabled={pagination.page >= pagination.totalPages - 1}
//           onClick={() => handlePageChange(pagination.page + 1)}
//         >
//           Next
//         </button>
//       </div>
//       <div>
//         <label htmlFor="pageSize">Page Size: </label>
//         <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
//           <option value={1}>1</option>
//           <option value={5}>5</option>
//           <option value={10}>10</option>
//           <option value={20}>20</option>
//           <option value={30}>30</option>
//         </select>
//       </div>
//       <div>
//         <Button onClick={handleGoBack} className="go-back-button">
//           Go Back!
//         </Button>
//       </div>

//       {selectedPolicyId && (
//         <div>
//           <h2>Installment Details for Policy ID: {selectedPolicyId}</h2>
//           {installments.length > 0 ? (
//       <DynamicTable data={installments} columns={installmentColumns} />
//     ) : (
//       <p>No installment details available for this policy.</p>
//     )}        </div>
//       )}
//     </div>
//   );
// };

// export default PolicyTable;
//===================

import React, { useEffect, useState } from 'react';
import { getAllPoliciesByCustomerId, fetchCustomerById, getCustomerDetailsByPolicyId } from '../../../services/customerService';
import DynamicTable from '../../sharedComponents/DynamicTable';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './PolicyTable.css';

const PolicyTable = () => {
  const [policies, setPolicies] = useState([]);
  const [customer, setCustomer] = useState(null);
  const [installments, setInstallments] = useState([]);
  const [selectedPolicyId, setSelectedPolicyId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 0,
    size: 10,
    totalPages: 0,
  });

  const navigate = useNavigate();
  const [pageSize, setPageSize] = useState(10);
  const customerId = localStorage.getItem('customerId');

  const customerColumns = [
    { title: 'First Name', key: 'firstName' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Email', key: 'email' },
    { title: 'Active', key: 'active' },
    { title: 'Date of Birth', key: 'dob' },
    { title: 'Phone Number', key: 'phoneNumber' },
    { title: 'City', key: 'cityName' },
    { title: 'State', key: 'stateName' },
  ];

  useEffect(() => {
    if (!customerId) {
      setError('Customer ID not found in localStorage');
      setLoading(false);
      return;
    }

    const fetchPoliciesAndCustomer = async () => {
      try {
        console.log('Fetching customer and policies for customerId:', customerId); // Debugging
        const customerResponse = await fetchCustomerById(customerId);
        setCustomer(customerResponse);
        console.log('Customer fetched:', customerResponse);

        const policiesResponse = await getAllPoliciesByCustomerId(customerId, pagination.page, pageSize);
        console.log('Policies fetched:', policiesResponse.content); // Debugging
        setPolicies(policiesResponse.content || []);
        setPagination((prev) => ({
          ...prev,
          totalPages: policiesResponse.totalPages,
        }));
      } catch (err) {
        setError('Failed to fetch data');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoliciesAndCustomer();
  }, [customerId, pagination.page, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);
    setPageSize(newSize);
    setPagination((prev) => ({
      ...prev,
      page: 0,
    }));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const fetchInstallments = async (policyId) => {
    console.log('fetchInstallments called with policy ID:', policyId); // Debugging
    try {
      setLoading(true);
      const customerDetails = await getCustomerDetailsByPolicyId(policyId);
      console.log('Customer Details Response:', customerDetails); // Debugging

      const policy = customerDetails.insurancePolicies.find((p) => p.insuranceId === policyId);
      if (policy) {
        console.log('Installments:', policy.payments); // Debugging
        setInstallments(policy.payments || []);
      } else {
        console.warn('No policy found for the given policy ID');
      }

      setSelectedPolicyId(policyId);
    } catch (err) {
      console.error('Error fetching installments:', err);
      setError('Failed to fetch installment details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const policyColumns = [
    { title: 'Insurance ID', key: 'insuranceId' },
    { title: 'Scheme Name', key: 'insuranceScheme' },
    { title: 'Agent ID', key: 'agentId' },
    { title: 'Claim ID', key: 'claimId' },
    { title: 'Issued Date', key: 'issuedDate' },
    { title: 'Maturity Date', key: 'maturityDate' },
    { title: 'Premium Amount', key: 'premiumAmount' },
    { title: 'Policy Status', key: 'policyStatus' },
    { title: 'Policy Term', key: 'policyTerm' },
    { title: 'Installment Period (months)', key: 'installmentPeriod' },
    // {
    //   title: 'View Installments',
    //   key: 'viewInstallments',
    //   render: (policy) => (
    //     <Button onClick={() => fetchInstallments(policy.insuranceId)}>View Installments</Button>
    //   ),
    // },
  ];

  const installmentColumns = [
    { title: 'Installment Number', key: 'installmentNumber' },
    { title: 'Installment Date', key: 'installmentDate' },
    { title: 'Installment Amount', key: 'installmentAmount' },
    { title: 'Payment Status', key: 'paymentStatus' },
    { title: 'Paid Date', key: 'paidDate' },
  ];

  return (
    <div>
      <h2>Customer Details</h2>
      {customer ? <DynamicTable data={[customer]} columns={customerColumns} /> : <p>No customer details available</p>}

      <h2>Insurance Policies</h2>
      <DynamicTable data={policies} columns={policyColumns} />

      <div className="pagination-controls">
        <button disabled={pagination.page === 0} onClick={() => handlePageChange(pagination.page - 1)}>
          Previous
        </button>
        <span>
          {' '}
          Page {pagination.page + 1} of {pagination.totalPages}{' '}
        </span>
        <button
          disabled={pagination.page >= pagination.totalPages - 1}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          Next
        </button>
      </div>
      <div>
        <label htmlFor="pageSize">Page Size: </label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={1}>1</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
        </select>
      </div>
    

      {selectedPolicyId && (
        <div>
          <h2>Installment Details for Policy ID: {selectedPolicyId}</h2>
          {installments.length > 0 ? (
            <DynamicTable data={installments} columns={installmentColumns} />
          ) : (
            <p>No installment details available for this policy.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PolicyTable;
