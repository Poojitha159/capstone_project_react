import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
    const [agent, setAgent] = useState({
        agentId: '',
        name: '',
        phoneNumber: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    
    const agentId = 1; // Replace this with actual logic to get agentId
    
    // Fetch agent data from the backend
    useEffect(() => {
        const fetchAgentData = async () => {
            try {
                const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
                const response = await axios.get(`http://localhost:8080/E-Insurance/agent/agentById/${agentId}`, {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request headers
                    }
                });
                setAgent(response.data); // Set the response data into state
            } catch (error) {
                console.error("Error fetching agent data:", error);
            }
        };

        fetchAgentData();
    }, [agentId]);

    // Handle form input changes
    const handleChange = (e) => {
        setAgent({
            ...agent,
            [e.target.name]: e.target.value
        });
    };

    // Define the handleSubmit function to submit the form data
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('authToken'); // Get the auth token if needed
            const response = await axios.put(`http://localhost:8080/E-Insurance/agent/${agent.agentId}`, agent, {
                headers: {
                    Authorization: `Bearer ${token}` // Include token if required by the backend
                }
            });
            setAgent(response.data); // Update the state with the updated agent data
            setIsEditing(false); // Exit editing mode
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Error updating agent profile:', error);
            alert('Failed to update profile');
        }
    };

    return (
        <div>
            <h1>Manage Profile</h1>
            {!isEditing ? (
                <div>
                    <p><strong>Agent ID:</strong> {agent.agentId}</p>
                    <p><strong>Name:</strong> {agent.name}</p> {/* Render the name */}
                    <p><strong>Phone Number:</strong> {agent.phoneNumber}</p>
                    <button onClick={() => setIsEditing(true)}>Edit Profile</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name:</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={agent.name}  // Bind name to the input value
                            onChange={handleChange}
                            className="form-control" 
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Phone Number:</label>
                        <input 
                            type="text" 
                            name="phoneNumber" 
                            value={agent.phoneNumber} 
                            onChange={handleChange} 
                            className="form-control" 
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save</button>
                    <button 
                        type="button" 
                        className="btn btn-secondary" 
                        onClick={() => setIsEditing(false)}
                    >
                        Cancel
                    </button>
                </form>
            )}
        </div>
    );
};

export default Profile;

