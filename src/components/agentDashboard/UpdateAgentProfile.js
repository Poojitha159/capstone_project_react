import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateAgentProfile = () => {
  // Extract agent ID from URL
  const { id } = useParams();  // This will get the agent ID from the route

  // State to store form data and response
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const [responseMessage, setResponseMessage] = useState('');

  // Fetch the agent details when component loads
  useEffect(() => {
    axios.get(`http://localhost:8080/E-Insurance/agent/agentById/${id}`)
      .then(response => {
        setFormData({
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          phoneNumber: response.data.phoneNumber,
        });
      })
      .catch(error => console.error('Error fetching agent details:', error));
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/E-Insurance/agent/${id}`, formData);
      setResponseMessage('Agent updated successfully!');
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error updating agent:', error);
      setResponseMessage('Failed to update agent.');
    }
  };

  return (
    <div>
      <h2>Update Agent Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>

      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateAgentProfile;
