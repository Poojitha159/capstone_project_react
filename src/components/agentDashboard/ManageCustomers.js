


import React, { useState, useEffect } from 'react';
import { Table, Button, Pagination, ButtonGroup, Form } from 'react-bootstrap';
import axios from 'axios';
import './ManageCustomers.css';

const ManageCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage, setCustomersPerPage] = useState(5); // Default customers per page
    const [totalPages, setTotalPages] = useState(0);
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/E-Insurance/agent/all-customer-by-agent?page=${currentPage - 1}&size=${customersPerPage}`, {
                    headers: {
                        'Authorization': `Bearer ${authToken}`
                    }
                });
                console.log('Response:', response.data);
                setCustomers(response.data.content);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error fetching customers:', error);
                if (error.response && error.response.status === 401) {
                    console.error('Unauthorized access - Invalid or missing token');
                }
            }
        };

        fetchCustomers();
    }, [authToken, currentPage, customersPerPage]);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <h2 className="text-center mt-4">Manage Customers</h2>

            <Table striped bordered hover className="mt-4">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>DOB</th>
                        <th>Phone Number</th>
                        <th>City</th>
                        <th>Email</th>
                        <th>Active</th>
                        <th>Verified</th>
                        <th>Registration Date</th>
                        {/* <th>Actions</th> */}
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
                            <td>{customer.email}</td>
                            <td>{customer.active ? 'Yes' : 'No'}</td>
                            <td>{customer.verified ? 'Yes' : 'No'}</td>
                            <td>{customer.registrationDate}</td>
                            {/* <td>
                                <ButtonGroup>
                                    <Button variant="info" size="sm" className="me-2">Edit</Button>
                                    <Button variant="danger" size="sm">Delete</Button>
                                </ButtonGroup>
                            </td> */}

                        </tr>
                    ))}
                </tbody>
            </Table>
            <div>
                {/* Pagination */}
                <Pagination className="justify-content-center mt-3">
                    <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages).keys()].map(page => (
                        <Pagination.Item
                            key={page + 1}
                            active={page + 1 === currentPage}
                            onClick={() => paginate(page + 1)}
                        >
                            {page + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>

                <Form.Group controlId="customersPerPage" className="justify-content-center mt-3">
                    <Form.Label>Customers per page:</Form.Label>
                    <Form.Control
                        as="select"
                        className="custom-dropdownn"  // Apply custom CSS class for styling
                        value={customersPerPage}
                        onChange={(e) => {
                            setCustomersPerPage(Number(e.target.value));
                            setCurrentPage(1); // Reset to first page when size changes
                        }}
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value={50}>50</option>
                    </Form.Control>
                </Form.Group>
            </div>
        </>
    );
};

export default ManageCustomers;

