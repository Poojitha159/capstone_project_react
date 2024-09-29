
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import DynamicTable from '../../sharedComponents/DynamicTable';
import { adminApiClient, setAuthToken } from '../../../utils/token';
import PlanModal from './PlanModal';
import './Plan.css'; // Add your styles

const Plan = () => {
    const [plans, setPlans] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0); // Pagination state
    const [pageSize, setPageSize] = useState(5); // Page size state
    const [totalPages, setTotalPages] = useState(0); // Total pages for pagination control

    const [searchId, setSearchId] = useState(''); // State for Plan ID search
    const [searchName, setSearchName] = useState(''); // State for Plan Name search

    const [searchType, setSearchType] = useState('id'); // State for search type (ID or Name)
const [searchValue, setSearchValue] = useState(''); // State for the input value


    const navigate = useNavigate();

    useEffect(() => {
        fetchPlans(); // Fetch plans when component mounts or when page or pageSize changes
    }, [currentPage, pageSize]);

    const fetchPlans = async () => {
        setAuthToken();
        try {
            const response = await adminApiClient.get('/getAllPlans', {
                params: {
                    page: currentPage,
                    size: pageSize,
                    sortBy: 'insurancePlanId',
                    direction: 'asc'
                }
            });
            setPlans(response.data.content);
            setTotalPages(response.data.totalPages); // Update total pages
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearch = async () => {
        setAuthToken();
        try {
            let response;
            if (searchType === 'id' && searchValue) {
                response = await adminApiClient.get(`/${searchValue}`);
                setPlans([response.data]); // Set the plan result directly
            } else if (searchType === 'name' && searchValue) {
                response = await adminApiClient.get('/searchByName', {
                    params: { name: searchValue }
                });
                setPlans(response.data); // Set the plans based on search results
            } else {
                fetchPlans(); // Fetch all plans if no search value is provided
            }
        } catch (err) {
            setError(err.message);
        }
    };
    

    const searchPlanById = async () => {
        if (searchId) {
            setAuthToken();
            try {
                const response = await adminApiClient.get(`/${searchId}`);
                setPlans([response.data]); // Set the plan result directly
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const searchPlanByName = async () => {
        if (searchName) {
            setAuthToken();
            try {
                const response = await adminApiClient.get('/searchByName', {
                    params: { name: searchName }
                });
                setPlans(response.data); // Set the plans based on search results
            } catch (err) {
                setError(err.message);
            }
        }
    };

    const handleActivate = async (id) => {
        setAuthToken();
        try {
            await adminApiClient.put(`/activatePlan/${id}`);
            setPlans(plans.map(plan => plan.insurancePlanId === id ? { ...plan, active: true } : plan));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeactivate = async (id) => {
        setAuthToken();
        try {
            await adminApiClient.delete(`/deactivatePlan/${id}`);
            setPlans(plans.map(plan => plan.insurancePlanId === id ? { ...plan, active: false } : plan));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    const handleAddPlan = (newPlan) => {
        setPlans([...plans, newPlan]);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0); // Reset to the first page when page size changes
    };

    // Reset search fields and reload all plans
    

    // Define columns configuration
    const columns = [
        { title: 'Plan ID', key: 'insurancePlanId' },
        { title: 'Name', key: 'name' },
        { title: 'Status', key: 'active' }
    ];

    // Define actions based on plan status
    const actions = (plan) => (
        plan.active ? (
            <button className="deactivate-btn" onClick={() => handleDeactivate(plan.insurancePlanId)}>
                Deactivate
            </button>
        ) : (
            <button className="activate-btn" onClick={() => handleActivate(plan.insurancePlanId)}>
                Activate
            </button>
        )
    );

    const handleReset = () => {
        setSearchType('id');   // Reset to default search type
        setSearchValue('');    // Clear the search value
        fetchPlans();          // Reload all plans
    };
    

    return (
        <div className="insurance-plan-management">
            <h2>Manage Insurance Plans</h2>
            
            {error && <p className="error">{error}</p>}

            {/* Add Plan Button */}
            <Button variant="primary" onClick={() => setShowModal(true)}>Add Insurance Plan</Button>
            <PlanModal show={showModal} handleClose={() => setShowModal(false)} addPlan={handleAddPlan} />

            {/* Search Inputs */}
            <Row className="search-filters" style={{ marginBottom: '20px', alignItems: 'center' }}>
    {/* Dropdown for Search Type */}
    <Col xs={3}>
        <Form.Group>
            <Form.Label>Search By</Form.Label>
            <Form.Control
                as="select"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
            >
                <option value="id">Plan ID</option>
                <option value="name">Plan Name</option>
            </Form.Control>
        </Form.Group>
    </Col>

    {/* Input Field for Search with Reduced Width */}
    <Col xs={4}> {/* Decreased width from 5 to 4 */}
        <Form.Group>
            <Form.Label>Search Value</Form.Label>
            <Form.Control
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Enter search value"
            />
        </Form.Group>
    </Col>

    {/* Search Button */}
    <Col xs={2}>
        <Button variant="primary" className="mt-4" onClick={handleSearch}>
            Search
        </Button>
    </Col>

    {/* Reset Button */}
    <Col xs={2}>
        <Button variant="secondary" className="mt-4" onClick={handleReset}>
            Reset
        </Button>
    </Col>
</Row>


            <DynamicTable
                data={plans}
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
                    disabled={currentPage >= totalPages - 1}
                >
                    Next
                </Button>

                <Form.Group>
                    <Form.Label>Items per page</Form.Label>
                    <Form.Control as="select" value={pageSize} onChange={handlePageSizeChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </Form.Control>
                </Form.Group>
            </div>

          
        </div>
    );
};

export default Plan;
