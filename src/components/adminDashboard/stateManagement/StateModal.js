// src/components/StateModal.js
import React, { useState } from 'react';
import './StateModal.css'; // Make sure the path is correct

const StateModal = ({ isOpen, onClose, onCreate }) => {
    const [stateName, setStateName] = useState('');
    const [error, setError] = useState(''); // To handle validation error messages


    const handleInputChange = (e) => {
        setStateName(e.target.value);
    };

    const handleSubmit = () => {
        // onCreate(stateName);
        // setStateName('');
        if (stateName.trim() === '') {
            setError('State name is required.');
            return;
        }
        onCreate(stateName);
        setStateName('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                
                <h3>Create New State</h3>
                <label>
                    State Name:
                    <input
                        type="text"
                        value={stateName}
                        onChange={handleInputChange}
                    />
                </label>
                {error && <p className="error-message">{error}</p>} {/* Display error message */}
                <button className="btn btn-primary" onClick={handleSubmit}>
                    Submit
                </button>
                <button className="btn btn-secondary" onClick={onClose}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default StateModal;
