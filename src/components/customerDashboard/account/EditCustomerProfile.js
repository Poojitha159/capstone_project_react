import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
//import { fetchCustomerDetails, updateCustomerDetails } from '../services/customerService'; // Import your service functions
import { fetchCustomerDetails,updateCustomerDetails } from '../../../services/customerService';
import './EditCustomerProfile.css';
const EditCustomerProfile = () => {
  const { customerId } = useParams(); // Get customerId from URL params
  const [customer, setCustomer] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    phoneNumber: '',
    isActive: true
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const customerId = localStorage.getItem('customerId');

        const data = await fetchCustomerDetails(customerId); // Fetch customer details
        setCustomer(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomer({
      ...customer,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!customer.phoneNumber || isNaN(customer.phoneNumber)) {
      setError('Phone number is required and must be a valid number.');
      return;
    }

    try {
        const customerId = localStorage.getItem('customerId');
      await updateCustomerDetails(customerId, customer); // Update customer details
      alert('Customer details updated successfully');
      navigate('/customer-dashboard')
    } catch (err) {
      setError(err.message);
    }
  };
  const handleGoBack = () => {
    navigate(-1); // Goes back to the previous page
};

  if (loading) return <p>Loading...</p>;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <div className="container mt-4">
      <h2>Edit Customer Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            value={customer.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            value={customer.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="dob"
            value={customer.dob}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={customer.phoneNumber}
            onChange={handleChange}
            required
            isInvalid={!customer.phoneNumber || isNaN(customer.phoneNumber)}
          />
          <Form.Control.Feedback type="invalid">
            Phone number is required and must be a valid number.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="formActive">
          <Form.Check
            type="checkbox"
            name="isActive"
            label="Active"
            checked={customer.isActive}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
      <div><Button onClick={handleGoBack} className="go-back-button">
                    Go Back!
                </Button></div>
    </div>
  );
};

export default EditCustomerProfile;
