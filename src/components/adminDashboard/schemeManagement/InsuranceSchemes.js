
import React, { useState, useEffect } from 'react';
import { Button, Alert, Table, Spinner, ButtonGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchInsuranceSchemes, updateSchemeStatus } from '../../../services/schemeService';
import AddScheme from './AddScheme';
import EditSchemeModal from './EditSchemeModal';
import './InsuranceScheme.css'; 

const InsuranceSchemes = () => {
    const [schemes, setSchemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({
        page: 1,
        size: 5,
        totalElements: 0,
        totalPages: 0,
        isLast: false
    });
    const [showAddSchemeModal, setShowAddSchemeModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [showEditSchemeModal, setShowEditSchemeModal] = useState(false);
    const [selectedScheme, setSelectedScheme] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchSchemes();
    }, [pagination.page, pagination.size]); // Fetch schemes on pagination changes

    const fetchSchemes = async () => {
        setLoading(true);
        setError(null); // Clear previous errors
        try {
            console.log("Fetching schemes with pagination:", pagination); // Debugging line
    
            const data = await fetchInsuranceSchemes(pagination.page, pagination.size); // Pass both page and size
            setSchemes(data.content);
            setPagination(prev => ({
                ...prev,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                isLast: data.isLast
            }));
        } catch (err) {
            console.error("Error fetching insurance schemes:", err); // Log the error
            setError(err.response ? err.response.data.message : err.message || 'An error occurred while fetching schemes.');
        } finally {
            setLoading(false);
        }
    };
    

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= pagination.totalPages) {
            setPagination(prev => ({ ...prev, page: newPage }));
        }
    };

    const handlePageSizeChange = (event) => {
        const newSize = Number(event.target.value);
        setPagination(prev => ({
            ...prev,
            size: newSize,
            page: 1 // Reset to first page when size changes
        }));
    };

    

    const handleShowDetailsModal = (scheme) => {
        setSelectedScheme(scheme);
        setShowDetailsModal(true);
    };

    const handleToggleStatus = async (schemeId, currentStatus) => {
        try {
            const newStatus = !currentStatus; // Toggle the status 
            await updateSchemeStatus(schemeId, newStatus);
            fetchSchemes(); // Refresh the list 
        } catch (error) {
            console.error('Failed to update scheme status:', error.message);
            setError('Failed to update scheme status.'); // Set error state 
        }
    };

    const renderSchemes = () => {
        if (loading) {
            return <Spinner animation="border" />;
        }

        if (error) {
            return <Alert variant="danger">{error}</Alert>;
        }

        if (!schemes.length) {
            return <Alert variant="info">No schemes found.</Alert>;
        }

        return (
            <Table striped bordered hover>
            
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {schemes.map((scheme) => (
                        <tr key={scheme.insuranceSchemeId}>
                            <td>{scheme.insuranceSchemeId}</td>
                            <td>{scheme.insuranceScheme}</td>
                            <td>{scheme.description}</td>
                            <td>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <Button className="btn-neutral btn-sm" onClick={() => handleShowDetailsModal(scheme)}>
                                        ViewDetails
                                    </Button>
                                    <Button className="btn-neutral btn-sm" onClick={() => {
                                        setSelectedScheme(scheme);
                                        setShowEditSchemeModal(true);
                                    }}>
                                        Edit
                                    </Button>
                                    <Button className="custom-button btn-sm"
                                        variant={scheme.active ? 'danger' : 'success'}
                                        onClick={() => handleToggleStatus(scheme.insuranceSchemeId, scheme.active)}
                                    >
                                        {scheme.active ? 'Deactivate' : 'Activate'}
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center', fontSize: '36px', fontWeight: 'bold', color: '#333' }}> 
    Manage Insurance Scheme 
</h1>
            <Button variant="primary" onClick={() => setShowAddSchemeModal(true)}>Add New Scheme</Button>
            {renderSchemes()}

            <div className="pagination-controls">
                <ButtonGroup className="mb-2">
                    <Button
                        onClick={() => handlePageChange(pagination.page - 1)}
                        disabled={pagination.page === 1}
                        variant="outline-secondary"
                    >
                        Previous
                    </Button>
                    <Button
                        onClick={() => handlePageChange(pagination.page + 1)}
                        disabled={pagination.isLast}
                        variant="outline-secondary"
                    >
                        Next
                    </Button>
                </ButtonGroup>
                <div className="pagination-info mb-2">
                    Page {pagination.page} of {pagination.totalPages} | Total Schemes: {pagination.totalElements}
                </div>
                <select value={pagination.size} onChange={handlePageSizeChange}>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
            </div>

            <AddScheme show={showAddSchemeModal} handleClose={() => setShowAddSchemeModal(false)} />
            <EditSchemeModal
                show={showEditSchemeModal}
                handleClose={() => setShowEditSchemeModal(false)}
                scheme={selectedScheme}
                onUpdate={fetchSchemes} // Callback to refresh the list after editing 
            />
            <br/>
            <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Scheme Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedScheme && (
                        <div>
                            <p><strong>Name:</strong> {selectedScheme.insuranceScheme}</p>
                            <p><strong>Description:</strong> {selectedScheme.description}</p>
                            <p><strong>Minimum Investment:</strong> {selectedScheme.minimumInvestmentAmount}</p>
                            <p><strong>Maximum Investment:</strong> {selectedScheme.maximumInvestmentAmount}</p>
                            <p><strong>Minimum Age:</strong> {selectedScheme.minimumAge}</p>
                            <p><strong>Maximum Age:</strong> {selectedScheme.maximumAge}</p>
                            <p><strong>Profit Ratio:</strong> {selectedScheme.profitRatio}</p>
                            <p><strong>New Registration Commission:</strong> {selectedScheme.newRegistrationCommission}</p>
                            <p><strong>Installment Payment Commission:</strong> {selectedScheme.installmentPaymentCommission}</p>
                            <p><strong>Active:</strong> {selectedScheme.active ? 'Yes' : 'No'}</p>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default InsuranceSchemes;
