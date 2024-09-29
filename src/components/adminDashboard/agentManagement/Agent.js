

// import React, { useEffect, useState } from 'react';
// import { Button, Form, Spinner, Row, Col } from 'react-bootstrap';
// import { notify } from '../../../utils/globalToast.js';
// import { setAuthToken, adminApiClient } from '../../../utils/token.js';
// import { EditAgentModal } from './AgentModal.js';
// import { useNavigate } from 'react-router-dom';
// import DynamicTable from '../../../../src/sharedComponents/DynamicTable.js';
// import AddAgentModal from './AddAgentModal.js';

// const Agent = () => {
//     const navigate = useNavigate();
//     const [agents, setAgents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     // Modal state
//     const [showModal, setShowModal] = useState(false);
//     const [selectedAgent, setSelectedAgent] = useState(null);
//     const [showAddModal, setShowAddModal] = useState(false); // Add modal state

//     // Pagination states
//     const [page, setPage] = useState(0);
//     const [size, setSize] = useState(5);
//     const [totalPages, setTotalPages] = useState(0);

//     // Search inputs state
//     const [searchId, setSearchId] = useState('');
//     const [searchActiveStatus, setSearchActiveStatus] = useState('');
//     const [searchOption, setSearchOption] = useState(''); // Dropdown state for search type

//     // Fetch agents initially or when pagination changes
//     useEffect(() => {
//         fetchAgents();
//     }, [page, size]);

//     // Fetch all agents or search by filters
//     const fetchAgents = async (params = {}) => {
//         setAuthToken();
//         setLoading(true);
//         try {
//             const response = await adminApiClient.get('/getAllAgents', {
//                 params: {
//                     page: page,
//                     size: size,
//                     sortBy: 'agentId',
//                     direction: 'asc',
//                     ...params // Include search params if provided
//                 }
//             });
//             const data = response.data;
//             setAgents(data.content);
//             setTotalPages(data.totalPages);
//         } catch (error) {
//             setError('Error fetching agents');
//             notify('Error fetching agents', 'danger');
//         } finally {
//             setLoading(false);
//         }
//     };

//     // Handle edit functionality
//     const handleEdit = (agent) => {
//         if (agent && agent.agentId) {
//             setSelectedAgent(agent);
//             setShowModal(true);
//         } else {
//             notify('Invalid agent data', 'danger');
//         }
//     };

//     const handleCloseModal = () => {
//         setShowModal(false);
//         setSelectedAgent(null);
//     };

//     // Handle add agent modal open/close
//     const handleShowAddModal = () => setShowAddModal(true);
//     const handleCloseAddModal = () => setShowAddModal(false);

//     // Handle agent deactivation
//     const handleDeactivate = async (agentId) => {
//         setAuthToken();
//         if (!agentId) {
//             notify('Agent ID must not be null', 'danger');
//             return;
//         }
//         try {
//             await adminApiClient.delete(`/deactivate-agent/${agentId}`);
//             notify('Agent deactivated successfully', 'success');
//             fetchAgents(); // Refresh agents list after deactivation
//         } catch (error) {
//             notify('Error deactivating agent', 'danger');
//         }
//     };

//     // Search by Agent ID
//     const handleSearchById = async () => {
//         if (searchId) {
//             setAuthToken();
//             try {
//                 const response = await adminApiClient.get(`/agentById`, {
//                     params: { agentId: searchId, page, size }
//                 });
//                 const data = response.data;
//                 setAgents(data.content);
//                 setTotalPages(data.totalPages);
//             } catch (error) {
//                 notify('Error searching by agent ID', 'danger');
//             }
//         } else {
//             notify('Please enter a valid Agent ID', 'warning');
//         }
//     };

//     // Search by Active Status
//     const handleSearchByActiveStatus = async () => {
//         if (searchActiveStatus !== '') {
//             setAuthToken();
//             try {
//                 const response = await adminApiClient.get(`/agentsByActiveStatus`, {
//                     params: { active: searchActiveStatus === 'true', page, size }
//                 });
//                 const data = response.data;
//                 setAgents(data.content);
//                 setTotalPages(data.totalPages);
//             } catch (error) {
//                 notify('Error searching by active status', 'danger');
//             }
//         } else {
//             notify('Please select an Active Status', 'warning');
//         }
//     };

//     // Common search handler
//     const handleSearch = () => {
//         if (searchOption === 'id') {
//             handleSearchById();
//         } else if (searchOption === 'status') {
//             handleSearchByActiveStatus();
//         } else {
//             notify('Please select a search option', 'warning');
//         }
//     };

//     // Reset filters
//     const handleReset = () => {
//         setSearchId('');
//         setSearchActiveStatus('');
//         setSearchOption('');
//         fetchAgents(); // Fetch agents without any filters
//     };

   
//     if (loading) return <Spinner animation="border" variant="primary" />;

//     if (error) return <p>{error}</p>;

//     const columns = [
//         { title: 'Agent ID', key: 'agentId' },
//         { title: 'Name', key: 'name' },
//         { title: 'Phone Number', key: 'phoneNumber' },
//         { title: 'Active', key: 'active' },
//         { title: 'Email', key: 'email' }
//     ];

//     const actions = (agent) => (
//         <>
//             {agent.active ? (
//                 <Button variant="danger" onClick={() => handleDeactivate(agent.agentId)}>
//                     Deactivate
//                 </Button>
//             ) : (
//                 <span>Activate</span>
//             )}
//             <Button variant="primary" onClick={() => handleEdit(agent)}>
//                 Edit
//             </Button>
//         </>
//     );

//     return (
//         <div className="agent-management">
//             <br/>
//                         <h2>Manage Agents</h2>
//             <br />
//             {/* Add Agent Button */}
//             <Button variant="success" onClick={handleShowAddModal} className="mb-3">
//                 Add Agent
//             </Button>

//             {/* Search Inputs */}
//             <Row className="search-filters" style={{ marginBottom: '20px' }}>
//     <Col xs={3}>
//         <Form.Group>
//             <Form.Label>Select Search Option</Form.Label>
//             <Form.Control
//                 as="select"
//                 value={searchOption}
//                 onChange={(e) => setSearchOption(e.target.value)}
//                 style={{ width: '100px' }} // Smaller dropdown
//             >
//                 <option value="">Select</option>
//                 <option value="id">Search by Agent ID</option>
//                 <option value="status">Search by Active Status</option>
//             </Form.Control>
//         </Form.Group>
//     </Col>

//     {searchOption === 'id' && (
//         <Col xs={3}>
//             <Form.Group>
//                 <Form.Label>Agent ID</Form.Label>
//                 <Form.Control
//                     type="text"
//                     value={searchId}
//                     onChange={(e) => setSearchId(e.target.value)}
//                     placeholder="Enter Agent ID"
//                     style={{ width: '100px' }} // Smaller input
//                 />
//             </Form.Group>
//         </Col>
//     )}

//     {searchOption === 'status' && (
//         <Col xs={3}>
//             <Form.Group>
//                 <Form.Label>Active Status</Form.Label>
//                 <Form.Control
//                     as="select"
//                     value={searchActiveStatus}
//                     onChange={(e) => setSearchActiveStatus(e.target.value)}
//                     style={{ width: '100px' }} // Smaller dropdown
//                 >
//                     <option value="">Select Active Status</option>
//                     <option value="true">Active</option>
//                     <option value="false">Inactive</option>
//                 </Form.Control>
//             </Form.Group>
//         </Col>
//     )}

//     <Col xs={3} className="d-flex align-items-end">
//         <Button variant="primary" onClick={handleSearch} style={{ width: '80px' }}>Search</Button>
//         <Button variant="secondary" className="ml-2" onClick={handleReset} style={{ width: '80px' }}>Reset</Button>
//     </Col>
// </Row>


//             <br />

//             <DynamicTable
//                 data={agents}
//                 columns={columns}
//                 actions={actions}
//             />

            

//             {/* Pagination Controls */}
//             <div className="pagination-controls">
//                 <button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
//                 <span> Page {page + 1} of {totalPages} </span>
//                 <button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</button>
//             </div>

//             {/* Edit Modal */}
//             {selectedAgent && (
//                 <EditAgentModal
//                     show={showModal}
//                     handleClose={handleCloseModal}
//                     agent={selectedAgent}
//                     onUpdate={fetchAgents}
//                 />
//             )}

//             {/* Add Agent Modal */}
//             <AddAgentModal
//                 show={showAddModal}
//                 handleClose={handleCloseAddModal}
//                 onAdd={fetchAgents} // Callback to refresh agents after adding
//             />

//         </div>
//     );
// };

// export default Agent;


import React, { useEffect, useState } from 'react';
import { Button, Form, Spinner, Row, Col } from 'react-bootstrap';
import { notify } from '../../../utils/globalToast.js';
import { setAuthToken, adminApiClient } from '../../../utils/token.js';
import { EditAgentModal } from './AgentModal.js';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../../../src/sharedComponents/DynamicTable.js';
import AddAgentModal from './AddAgentModal.js';

const Agent = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false); // Add modal state

    // Pagination states
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);

    // Search inputs state
    const [searchId, setSearchId] = useState('');
    const [searchActiveStatus, setSearchActiveStatus] = useState('');
    const [searchOption, setSearchOption] = useState(''); // Dropdown state for search type

    useEffect(() => {
        fetchAgents();
    }, [page, size]);

    const fetchAgents = async (params = {}) => {
        setAuthToken();
        setLoading(true);
        try {
            const response = await adminApiClient.get('/getAllAgents', {
                params: {
                    page: page,
                    size: size,
                    sortBy: 'agentId',
                    direction: 'asc',
                    ...params // Include search params if provided
                }
            });
            const data = response.data;
            setAgents(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            setError('Error fetching agents');
            notify('Error fetching agents', 'danger');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (agent) => {
        if (agent && agent.agentId) {
            setSelectedAgent(agent);
            setShowModal(true);
        } else {
            notify('Invalid agent data', 'danger');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedAgent(null);
    };

    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    const handleDeactivate = async (agentId) => {
        setAuthToken();
        if (!agentId) {
            notify('Agent ID must not be null', 'danger');
            return;
        }
        try {
            await adminApiClient.delete(`/deactivate-agent/${agentId}`);
            notify('Agent deactivated successfully', 'success');
            fetchAgents(); // Refresh agents list after deactivation
        } catch (error) {
            notify('Error deactivating agent', 'danger');
        }
    };

    const handleSearchById = async () => {
        if (searchId) {
            setAuthToken();
            try {
                const response = await adminApiClient.get(`/agentById`, {
                    params: { agentId: searchId, page, size }
                });
                const data = response.data;
                setAgents(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                notify('Error searching by agent ID', 'danger');
            }
        } else {
            notify('Please enter a valid Agent ID', 'warning');
        }
    };

    const handleSearchByActiveStatus = async () => {
        if (searchActiveStatus !== '') {
            setAuthToken();
            try {
                const response = await adminApiClient.get(`/agentsByActiveStatus`, {
                    params: { active: searchActiveStatus === 'true', page, size }
                });
                const data = response.data;
                setAgents(data.content);
                setTotalPages(data.totalPages);
            } catch (error) {
                notify('Error searching by active status', 'danger');
            }
        } else {
            notify('Please select an Active Status', 'warning');
        }
    };

    const handleSearch = () => {
        if (searchOption === 'id') {
            handleSearchById();
        } else if (searchOption === 'status') {
            handleSearchByActiveStatus();
        } else {
            notify('Please select a search option', 'warning');
        }
    };

    const handleReset = () => {
        setSearchId('');
        setSearchActiveStatus('');
        setSearchOption('');
        fetchAgents(); // Fetch agents without any filters
    };

    if (loading) return <Spinner animation="border" variant="primary" />;

    if (error) return <p>{error}</p>;

    const columns = [
        { title: 'Agent ID', key: 'agentId' },
        { title: 'Name', key: 'name' },
        { title: 'Phone Number', key: 'phoneNumber' },
        { title: 'Active', key: 'active' },
        { title: 'Email', key: 'email' }
    ];

    const actions = (agent) => (
        <>
            {agent.active ? (
                <Button variant="danger" onClick={() => handleDeactivate(agent.agentId)} className="me-2">
                    Deactivate
                </Button>
            ) : (
                <span>Activate</span>
            )}
            <Button variant="warning" onClick={() => handleEdit(agent)}>
                Edit
            </Button>
        </>
    );

    return (
        <div className="agent-management">
          
            <h2>Manage Agents</h2>
           
            <Button variant="success" onClick={handleShowAddModal} className="mb-3">
                Add Agent
            </Button>

            {/* Search Inputs */}
            <Row className="search-filters" style={{ marginBottom: '20px' }}>
                <Col xs={3}>
                    <Form.Group>
                        <Form.Label>Select Search Option</Form.Label>
                        <Form.Control
                            as="select"
                            value={searchOption}
                            onChange={(e) => setSearchOption(e.target.value)}
                            style={{ width: '100px' }} // Smaller dropdown
                        >
                            <option value="">Select</option>
                            <option value="id">Search by Agent ID</option>
                            <option value="status">Search by Active Status</option>
                        </Form.Control>
                    </Form.Group>
                </Col>

                {searchOption === 'id' && (
                    <Col xs={3}>
                        <Form.Group>
                            <Form.Label>Agent ID</Form.Label>
                            <Form.Control
                                type="text"
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                placeholder="Enter Agent ID"
                                style={{ width: '100px' }} // Smaller input
                            />
                        </Form.Group>
                    </Col>
                )}

                {searchOption === 'status' && (
                    <Col xs={3}>
                        <Form.Group>
                            <Form.Label>Active Status</Form.Label>
                            <Form.Control
                                as="select"
                                value={searchActiveStatus}
                                onChange={(e) => setSearchActiveStatus(e.target.value)}
                                style={{ width: '100px' }} // Smaller dropdown
                            >
                                <option value="">Select Active Status</option>
                                <option value="true">Active</option>
                                <option value="false">Inactive</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                )}

                <Col xs={3} className="d-flex align-items-end">
                    <Button variant="primary" onClick={handleSearch} style={{ width: '80px' }}>Search</Button>
                    <Button variant="secondary" className="ml-2" onClick={handleReset} style={{ width: '80px' }}>Reset</Button>
                </Col>
            </Row>


            <DynamicTable
                data={agents}
                columns={columns}
                actions={actions}
            />

            {/* Pagination Controls */}
            <div className="pagination-controls">
                <Button disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</Button>
                <span> Page {page + 1} of {totalPages} </span>
                <Button disabled={page === totalPages - 1} onClick={() => setPage(page + 1)}>Next</Button>
            </div>

              {/* Page Size Selection */}
              <Row className="page-size-selection" style={{ marginBottom: '20px' }}>
                <Col xs={3}>
                    <Form.Group>
                        <Form.Label>Items per page</Form.Label>
                        <Form.Control
                            as="select"
                            value={size}
                            onChange={(e) => {
                                setSize(Number(e.target.value));
                                setPage(0); // Reset to first page on size change
                            }}
                        >
                            <option value={1}>1</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>

            {/* Edit Modal */}
            {selectedAgent && (
                <EditAgentModal
                    show={showModal}
                    handleClose={handleCloseModal}
                    agent={selectedAgent}
                    onUpdate={fetchAgents}
                />
            )}

            {/* Add Agent Modal */}
            <AddAgentModal
                show={showAddModal}
                handleClose={handleCloseAddModal}
                onAdd={fetchAgents} // Callback to refresh agents after adding
            />
        </div>
    );
};

export default Agent;
