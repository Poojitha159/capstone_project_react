

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import StateModal from './StateModal';
import DynamicTable from '../../sharedComponents/DynamicTable';
import { adminApiClient, setAuthToken } from '../../../utils/token';
import './State.css';

const State = () => {
    const [states, setStates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Default page size

    const navigate = useNavigate();

    useEffect(() => {
        fetchStates();
    }, [currentPage, pageSize]); // Refetch states when currentPage or pageSize changes

    const fetchStates = async () => {
        setAuthToken();
        try {
            const response = await adminApiClient.get('/viewAllstates', {
                params: {
                    page: currentPage,
                    size: pageSize, // Include pageSize in the request
                    sortBy: 'stateId',
                    direction: 'asc'
                }
            });
            console.log('Fetched states:', response.data); // Log the data
            setStates(response.data.content);
            setTotalPages(response.data.totalPages); // Set total pages for pagination control
        } catch (error) {
            console.error('Error fetching states:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleActivate = async (id) => {
        setAuthToken();
        try {
            const response = await adminApiClient.put(`/state/${id}`);
            alert(response.data);  // Display success message or handle accordingly
            setStates(states.map(state =>
                state.stateId === id ? { ...state, isActive: true } : state
            ));
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'An error occurred';
            alert(`Error activating state: ${errorMessage}`);
        }
    };

    const handleDeactivate = async (id) => {
        setAuthToken();
        try {
            const response = await adminApiClient.delete(`/deactivate-state/${id}`);
            alert(response.data);  // Display success message or handle accordingly
            setStates(states.map(state =>
                state.stateId === id ? { ...state, isActive: false } : state
            ));
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'An error occurred';
            alert(`Error deactivating state: ${errorMessage}`);
        }
    };

    const handleCreateState = async (stateName) => {
        setAuthToken();
        try {
            await adminApiClient.post('/create-state', { name: stateName });
            alert('State created successfully');
            await fetchStates();  // Ensure fetchStates is awaited
            setShowModal(false);
        } catch (error) {
            const errorMessage = error.response?.data || error.message || 'An error occurred';
            alert(`Error creating state: ${errorMessage}`);
        }
    };

   

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
            setCurrentPage(newPage);
        }
    };

    const handlePageSizeChange = (event) => {
        setPageSize(parseInt(event.target.value, 10));
        setCurrentPage(0); // Reset to first page when page size changes
    };

    // Define columns configuration
    const columns = [
        { title: 'State ID', key: 'stateId' },
        { title: 'State Name', key: 'name' },
        { title: 'Is Active', key: 'isActive' },
    ];

    // Define actions based on state status
    const actions = (state) => (
        state.isActive ? (
            <button className="deactivate" onClick={() => handleDeactivate(state.stateId)}>
                Deactivate
            </button>
        ) : (
            <button className="activate" onClick={() => handleActivate(state.stateId)}>
                Activate
            </button>
        )
    );

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching states: {error.message}</p>;

    return (
        <div>
            <br/>
            <h2>States Management</h2>
            <Button onClick={() => setShowModal(true)} className="create-state-btn">
                Create State
            </Button>
            <br />
            <StateModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onCreate={handleCreateState}
            />
            <br />
           
            <DynamicTable
                data={states}
                columns={columns}
                actions={actions}
            />
            <div className="pagination-controls">
                <Button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    Previous
                </Button>
                <span>Page {currentPage + 1} of {totalPages}</span>
                <Button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                >
                    Next
                </Button>
                <Form.Group>
                <Form.Label>Items per page</Form.Label>
                <Form.Control as="select" value={pageSize} onChange={handlePageSizeChange}  className="small-select">
                <option value={1}>1</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    
                </Form.Control>
            </Form.Group>
            </div>
          
        </div>
    );
};

export default State;
