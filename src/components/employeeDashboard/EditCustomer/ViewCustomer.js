

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Pagination, Container, Alert, Form ,Button} from 'react-bootstrap';
// import { getCustomers } from '../../../services/employeeService';
// import { setAuthToken } from '../../../utils/token';
// import { useNavigate } from 'react-router-dom';
// const ViewCustomer = () => {
//     const navigate=useNavigate();
//     const [customers, setCustomers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [pageSize, setPageSize] = useState(10); // Default page size
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         fetchCustomers(currentPage, pageSize);
//     }, [currentPage, pageSize]);

//     const fetchCustomers = async () => {
//         try {
//             setAuthToken()
//          //   const token = localStorage.getItem('authToken');
//          const data = await getCustomers(currentPage, pageSize);
//             setCustomers(data.content);
//             setCurrentPage(data.page);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError('Failed to fetch customers');
//         }
//     };

//     const handlePageChange = (page) => {
//         if (page >= 0 && page < totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     const handlePageSizeChange = (event) => {
//         setPageSize(Number(event.target.value));
//         setCurrentPage(0); // Reset to first page on page size change
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };


//     return (
//         <Container className="mt-4">
//             <h3>Customer List</h3>
//             {error && <Alert variant="danger">{error}</Alert>}
//             <Form.Group controlId="pageSizeSelect">
//                 <Form.Label>Items per page:</Form.Label>
//                 <Form.Control as="select" value={pageSize} onChange={handlePageSizeChange}>
//                 <option value={1}>1</option>
//                 <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={25}>25</option>
//                     <option value={50}>50</option>
                    
//                 </Form.Control>
//             </Form.Group>
//             <br/>
//             <Table border="5" striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Date of Birth</th>
//                         <th>Phone Number</th>
//                         <th>City</th>
//                         <th>Active</th>
//                         <th>Verified</th>
//                         <th>Registration Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer.customerId}>
//                             <td>{customer.customerId}</td>
//                             <td>{customer.firstName}</td>
//                             <td>{customer.lastName}</td>
//                             <td>{customer.dob}</td>
//                             <td>{customer.phoneNumber}</td>
//                             <td>{customer.cityName}</td>
//                             <td>{customer.active ? 'Yes' : 'No'}</td>
//                             <td>{customer.verified ? 'Yes' : 'No'}</td>
//                             <td>{customer.registrationDate}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Pagination>
//                 <Pagination.Prev
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
//                 />
//                 {[...Array(totalPages).keys()].map(page => (
//                     <Pagination.Item
//                         key={page}
//                         active={page === currentPage}
//                         onClick={() => handlePageChange(page)}
//                     >
//                         {page + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage === totalPages - 1}
//                 />
//             </Pagination>
//             <div><Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button></div>
//         </Container>
        
//     );
// };

// export default ViewCustomer;
//8888888888888888888888888888888888888888888888888888888888888888888888
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Table, Pagination, Container, Alert, Form, Button, Row, Col } from 'react-bootstrap';
// import { getCustomers, searchCustomersById, searchCustomersByName, searchCustomersByActiveStatus } from '../../../services/employeeService';
// import { setAuthToken } from '../../../utils/token';
// import { useNavigate } from 'react-router-dom';

// const ViewCustomer = () => {
//     const navigate = useNavigate();
//     const [customers, setCustomers] = useState([]);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [pageSize, setPageSize] = useState(10);
//     const [error, setError] = useState(null);
//     const [searchId, setSearchId] = useState('');
//     const [searchName, setSearchName] = useState('');
//     const [searchActive, setSearchActive] = useState('');

//     useEffect(() => {
//         fetchCustomers(currentPage, pageSize);
//     }, [currentPage, pageSize]);

//     const fetchCustomers = async () => {
//         try {
//             setAuthToken();
//             const data = await getCustomers(currentPage, pageSize);
//             setCustomers(data.content);
//             setCurrentPage(data.page);
//             setTotalPages(data.totalPages);
//         } catch (err) {
//             setError('Failed to fetch customers');
//         }
//     };

//     const handlePageChange = (page) => {
//         if (page >= 0 && page < totalPages) {
//             setCurrentPage(page);
//         }
//     };

//     const handlePageSizeChange = (event) => {
//         setPageSize(Number(event.target.value));
//         setCurrentPage(0);
//     };

//     const handleGoBack = () => {
//         navigate(-1);
//     };

    
//  // Verify customer handler
//  const handleVerifyCustomer = async (customerId) => {
//     try {
//         setAuthToken();
//         await axios.put(`http://localhost:8080/E-Insurance/employee/verify/${customerId}`,{},{
//             headers: {
//                 Authorization: `Bearer ${localStorage.getItem('authToken')}`
//             }
//         });
//         // Update the customer's verified status in the UI
//         setCustomers(customers.map((customer) =>
//             customer.customerId === customerId ? { ...customer, verified: true } : customer
        
//         ));
//     } catch (err) {
//         setError('Failed to verify customer');
//     }
// };

//     // Search handlers
//     const handleSearchById = async () => {
//         try {
//             setAuthToken();
//             const customer = await searchCustomersById(searchId);
//             setCustomers([customer]);
//             setTotalPages(1);
//             setCurrentPage(0);
//         } catch (err) {
//             setError('Failed to fetch customer by ID');
//         }
//     };

//     const handleSearchByName = async () => {
//         try {
//             setAuthToken();
//             const data = await searchCustomersByName(searchName, 0, pageSize);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//             setCurrentPage(0);
//         } catch (err) {
//             setError('Failed to fetch customers by name');
//         }
//     };

//     const handleSearchByActiveStatus = async () => {
//         try {
//             setAuthToken();
//             const data = await searchCustomersByActiveStatus(searchActive, 0, pageSize);
//             setCustomers(data.content);
//             setTotalPages(data.totalPages);
//             setCurrentPage(0);
//         } catch (err) {
//             setError('Failed to fetch customers by active status');
//         }
//     };

//     return (
//         <Container className="mt-4">
//             <h3>Customer List</h3>
//             {/* {error && <Alert variant="danger">{error}</Alert>} */}

//             {/* Search Fields in a Row */}
//             <Row className="mb-3">
//                 <Col md={4}>
//                     <Form.Group controlId="searchById">
//                         <Form.Label>Search by ID</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter customer ID"
//                             value={searchId}
//                             onChange={(e) => setSearchId(e.target.value)}
//                         />
//                         <Button variant="primary" onClick={handleSearchById} className="mt-2">
//                             Search
//                         </Button>
//                     </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                     <Form.Group controlId="searchByName">
//                         <Form.Label>Search by Name</Form.Label>
//                         <Form.Control
//                             type="text"
//                             placeholder="Enter name"
//                             value={searchName}
//                             onChange={(e) => setSearchName(e.target.value)}
//                         />
//                         <Button variant="primary" onClick={handleSearchByName} className="mt-2">
//                             Search
//                         </Button>
//                     </Form.Group>
//                 </Col>
//                 <Col md={4}>
//                     <Form.Group controlId="searchByActive">
//                         <Form.Label>Search by Active Status</Form.Label>
//                         <Form.Control
//                             as="select"
//                             value={searchActive}
//                             onChange={(e) => setSearchActive(e.target.value)}
//                         >
//                             <option value="">Select</option>
//                             <option value="true">Active</option>
//                             <option value="false">Inactive</option>
//                         </Form.Control>
//                         <Button variant="primary" onClick={handleSearchByActiveStatus} className="mt-2">
//                             Search
//                         </Button>
//                     </Form.Group>
//                 </Col>
//             </Row>

//             {/* Pagination Size */}
//             <Form.Group controlId="pageSizeSelect" className="mb-3">
//                 <Form.Label>Items per page:</Form.Label>
//                 <Form.Control as="select" value={pageSize} onChange={handlePageSizeChange}>
//                     <option value={1}>1</option>
//                     <option value={5}>5</option>
//                     <option value={10}>10</option>
//                     <option value={25}>25</option>
//                     <option value={50}>50</option>
//                 </Form.Control>
//             </Form.Group>

//             {/* Customer Table */}
//             <Table striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>Date of Birth</th>
//                         <th>Phone Number</th>
//                         <th>City</th>
//                         <th>Active</th>
//                         <th>Verified</th>
//                         <th>Registration Date</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map((customer) => (
//                         <tr key={customer.customerId}>
//                             <td>{customer.customerId}</td>
//                             <td>{customer.firstName}</td>
//                             <td>{customer.lastName}</td>
//                             <td>{customer.dob}</td>
//                             <td>{customer.phoneNumber}</td>
//                             <td>{customer.cityName}</td>
//                             <td>{customer.active ? 'Yes' : 'No'}</td>
//                             <td>{customer.verified ? 'Yes' : 'No'}</td>
//                             <td>{customer.registrationDate}</td>
//                             <td>
//                                 {!customer.verified && (
//                                     <Button variant="success" onClick={() => handleVerifyCustomer(customer.customerId)}>
//                                         Verify
//                                     </Button>
//                                 )}
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             {/* Pagination Controls */}
//             <Pagination>
//                 <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
//                 {[...Array(totalPages).keys()].map((page) => (
//                     <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
//                         {page + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
//             </Pagination>

//             <Button onClick={handleGoBack} className="mt-3">
//                 Go Back!
//             </Button>
//         </Container>
//     );
// };

// export default ViewCustomer;
//888888888888888888888888888


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination, Container, Form, Button, Row, Col } from 'react-bootstrap';
import { getCustomers, searchCustomersById, searchCustomersByName, searchCustomersByActiveStatus } from '../../../services/employeeService';
import { setAuthToken } from '../../../utils/token';
import { useNavigate } from 'react-router-dom';

const ViewCustomer = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [error, setError] = useState(null);
    const [searchId, setSearchId] = useState('');
    const [searchName, setSearchName] = useState('');
    const [searchActive, setSearchActive] = useState('');

    useEffect(() => {
        fetchCustomers(currentPage, pageSize);
    }, [currentPage, pageSize]);

    const fetchCustomers = async () => {
        try {
            setAuthToken();
            const data = await getCustomers(currentPage, pageSize);
            setCustomers(data.content);
            setCurrentPage(data.page);
            setTotalPages(data.totalPages);
        } catch (err) {
            setError('Failed to fetch customers');
        }
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0);
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    // Verify customer handler
    const handleVerifyCustomer = async (customerId) => {
        try {
            setAuthToken();
            await axios.put(`http://localhost:8080/E-Insurance/employee/verify/${customerId}`,{},{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            // Update the customer's verified status in the UI
            setCustomers(customers.map((customer) =>
                customer.customerId === customerId ? { ...customer, verified: true } : customer
            ));
        } catch (err) {
            setError('Failed to verify customer');
        }
    };

    // Search handlers
    const handleSearchById = async () => {
        try {
            setAuthToken();
            const customer = await searchCustomersById(searchId);
            setCustomers([customer]);
            setTotalPages(1);
            setCurrentPage(0);
        } catch (err) {
            setError('Failed to fetch customer by ID');
        }
    };

    const handleSearchByName = async () => {
        try {
            setAuthToken();
            const data = await searchCustomersByName(searchName, 0, pageSize);
            setCustomers(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(0);
        } catch (err) {
            setError('Failed to fetch customers by name');
        }
    };

    const handleSearchByActiveStatus = async () => {
        try {
            setAuthToken();
            const data = await searchCustomersByActiveStatus(searchActive, 0, pageSize);
            setCustomers(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(0);
        } catch (err) {
            setError('Failed to fetch customers by active status');
        }
    };

    // Navigate to customer policies
    const handleViewPolicies = (customerId) => {
        navigate(`/customer-policies/${customerId}`);
    };

    return (
        
        <Container className="mt-4">
            <h3>Customer List</h3>

            {/* Search Fields in a Row */}
            <Row className="mb-3">
                <Col md={4}>
                    <Form.Group controlId="searchById">
                        <Form.Label>Search by ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter customer ID"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleSearchById} className="mt-2">
                            Search
                        </Button>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="searchByName">
                        <Form.Label>Search by Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter name"
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                        <Button variant="primary" onClick={handleSearchByName} className="mt-2">
                            Search
                        </Button>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    <Form.Group controlId="searchByActive">
                        <Form.Label>Search by Active Status</Form.Label>
                        <Form.Control
                            as="select"
                            value={searchActive}
                            onChange={(e) => setSearchActive(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </Form.Control>
                        <Button variant="primary" onClick={handleSearchByActiveStatus} className="mt-2">
                            Search
                        </Button>
                    </Form.Group>
                </Col>
            </Row>

            {/* Pagination Size */}
            <Form.Group controlId="pageSizeSelect" className="mb-3">
                <Form.Label>Items per page:</Form.Label>
                <Form.Control as="select" value={pageSize} onChange={handlePageSizeChange}>
                    <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                </Form.Control>
            </Form.Group>

            {/* Customer Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Date of Birth</th>
                        <th>Phone Number</th>
                        <th>City</th>
                        <th>Active</th>
                        <th>Verified</th>
                        <th>Registration Date</th>
                        <th>Actions</th> {/* New actions column for "Verify" and "View Policies" */}
                    </tr>
                </thead>
                <tbody>
                    {customers.map((customer) => (
                        <tr key={customer.customerId}>
                            <td>{customer.customerId}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.dob}</td>
                            <td>{customer.phoneNumber}</td>
                            <td>{customer.cityName}</td>
                            <td>{customer.active ? 'Yes' : 'No'}</td>
                            <td>{customer.verified ? 'Yes' : 'No'}</td>
                            <td>{customer.registrationDate}</td>
                            <td>
                                {!customer.verified && (
                                    <Button variant="success" onClick={() => handleVerifyCustomer(customer.customerId)} className="mb-2">
                                        Verify
                                    </Button>
                                )}
                                <Button variant="info" onClick={() => handleViewPolicies(customer.customerId)}>
                                    View Policies
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Pagination Controls */}
            <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 0} />
                {[...Array(totalPages).keys()].map((page) => (
                    <Pagination.Item key={page} active={page === currentPage} onClick={() => handlePageChange(page)}>
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages - 1} />
            </Pagination>

            <Button onClick={handleGoBack} className="mt-3">
                Go Back!
            </Button>
        </Container>
        
    );
};

export default ViewCustomer;
