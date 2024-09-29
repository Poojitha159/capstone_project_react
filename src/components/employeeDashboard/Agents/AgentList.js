// import React, { useState, useEffect } from 'react';
// import { Spinner, Table,Pagination,Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import RegisterAgentModal from './RegisterAgentModal';
// import { useNavigate } from 'react-router-dom';
// import { fetchAgents,fetchAllAgents } from '../../../services/employeeService';
// import './AgentList.css';
// const AgentList = () => {
//     const navigate = useNavigate();
//     const [agents, setAgents] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [currentPage, setCurrentPage] = useState(0);
//     const [totalPages, setTotalPages] = useState(0);
//     const [showModal, setShowModal] = useState(false);


//     useEffect(() => {
//         const fetchAgentsData = async () => {
//             try {
//                 const data = await fetchAgents(currentPage, 5); // Fetch agents with pagination
//                 setAgents(data.content); // Assuming response.data.content contains the list of agents
//                 setTotalPages(data.totalPages); // Assuming response.data.totalPages contains total pages
//                 setLoading(false);
//             } catch (err) {
//                 setError(err);
//                 setLoading(false);
//             }
//         };

//         fetchAgentsData();
//     }, [currentPage]);

//     const handleShowModal = () => setShowModal(true);
//     const handleCloseModal = () => setShowModal(false);

//     const refreshAgents = async () => {
//         try {
//             const data = await fetchAllAgents(); // Fetch all agents
//             setAgents(data.content);
//         } catch (err) {
//             setError(err);
//         }
//     };


//     if (loading) return <Spinner animation="border" />;
//     if (error) return <p>Error loading agents: {error.message}</p>;

//     const handlePageChange = (pageNumber) => {
//         setCurrentPage(pageNumber);
//     };

//     const handleGoBack = () => {
//         navigate(-1); // Goes back to the previous page
//     };



//     return (
//         <div className="container mt-4">
//             <h3 className="centered-heading-container"><u>Agent List</u></h3>

//             <Button variant="primary" onClick={handleShowModal}>
//                 Register Agent
//             </Button>
//             <br/>
//             <br/>
//             <Table border="5" striped bordered hover>
//                 <thead>
//                     <tr>
//                         <th>Agent ID</th>
//                         <th>First Name</th>
//                         <th>Last Name</th>
//                         <th>E Mail</th>
//                         <th>Phone Number</th>
//                         <th>Status</th>
//                         <th>Details</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {agents.map(agent => (
//                         <tr key={agent.agentId}>
//                             <td>{agent.agentId}</td>
//                             <td>{agent.firstName}</td>
//                             <td>{agent.lastName}</td>
//                             <td>{agent.email}</td>
//                             <td>{agent.phoneNumber}</td>
//                             <td>{agent.active ? 'Active' : 'Inactive'}</td>
//                             <td>
//                                 <Link to={`/agent-details/${agent.agentId}`} className="btn btn-info">
//                                     View Details
//                                 </Link>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </Table>

//             <Pagination>
//                 <Pagination.Prev
//                     onClick={() => handlePageChange(currentPage - 1)}
//                     disabled={currentPage === 0}
                   
//                 />
//                 {[...Array(totalPages).keys()].map(pageNumber => (
//                     <Pagination.Item
//                         key={pageNumber}
//                         active={pageNumber === currentPage}
//                         onClick={() => handlePageChange(pageNumber)}
//                     >
//                         {pageNumber + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next
//                     onClick={() => handlePageChange(currentPage + 1)}
//                     disabled={currentPage >= totalPages - 1}
//                 />
//             </Pagination>
//             {/* Register Agent Modal */}
//             <RegisterAgentModal
//                 show={showModal}
//                 handleClose={handleCloseModal}
//                 refreshAgents={refreshAgents}
//             />

// <div><Button onClick={handleGoBack} className="go-back-button">
//                     Go Back!
//                 </Button></div>
//         </div>
//     );
// };

// export default AgentList;

import React, { useState, useEffect } from 'react';
import { Spinner, Pagination, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import RegisterAgentModal from './RegisterAgentModal';
import { useNavigate } from 'react-router-dom';
import { fetchAgents, fetchAllAgents } from '../../../services/employeeService';
import { deactivateAgent } from '../../../services/employeeService';
import EditAgentModal from './EditAgentModal';
import './AgentList.css';
import DynamicTable from '../../sharedComponents/DynamicTable';
import { fetchAgentById,fetchAgentsByActiveStatus } from '../../../services/employeeService';

const AgentList = () => {
    const navigate = useNavigate();
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false); // State for edit modal
    const [selectedAgentId, setSelectedAgentId] = useState(null); // Track selected agent ID
    const [agentId, setAgentId] = useState('');
const [activeStatus, setActiveStatus] = useState(false);
    useEffect(() => {
        const fetchAgentsData = async () => {
            try {
                const data = await fetchAgents(currentPage, 5); // Fetch agents with pagination
                setAgents(data.content); // Assuming response.data.content contains the list of agents
                setTotalPages(data.totalPages); // Assuming response.data.totalPages contains total pages
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchAgentsData();
    }, [currentPage]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // Handle agent deactivation
    const handleDeactivateAgent = async (agentId) => {
        if (window.confirm("Are you sure you want to deactivate this agent?")) {
            try {
                await deactivateAgent(agentId); // Call API to deactivate the agent
                refreshAgents(); // Refresh the agents list after deactivation
            } catch (err) {
                setError("Error deactivating agent");
            }
        }
    };

    const refreshAgents = async () => {
        try {
            const data = await fetchAllAgents(); // Fetch all agents
            setAgents(data.content);
        } catch (err) {
            setError(err);
        }
    };

    const handleEditAgent = (agentId) => {
        setSelectedAgentId(agentId);
        setShowEditModal(true); // Show the edit modal
    };

    const handleCloseEditModal = () => setShowEditModal(false);

    const handleSearchById = async () => {
        if (agentId) {
            try {
                const data = await fetchAgentById(agentId);
                setAgents([data]); // Assuming the response is a single agent
            } catch (err) {
                setError("Error fetching agent");
            }
        }
    };
    
    const handleSearchByStatus = async () => {
        console.log("Searching by active status:", activeStatus);
        try {
            const data = await fetchAgentsByActiveStatus(activeStatus);
            setAgents(data.content);
        } catch (err) {
            console.error("Error fetching agents:", err);
            setError("Error fetching agents");
        }
    };
    
    const handleReset = () => {
        setAgentId('');
        setActiveStatus(false);
        refreshAgents(); // Fetch all agents again
    };
    

    if (loading) return <Spinner animation="border" />;
    if (error) return <p>Error loading agents: {error.message}</p>;

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleGoBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    // Define columns for DynamicTable
    const columns = [
        { title: 'Agent ID', key: 'agentId' },
        { title: 'First Name', key: 'firstName' },
        { title: 'Last Name', key: 'lastName' },
        // { title: 'E Mail', key: 'email' },
        { title: 'Phone Number', key: 'phoneNumber' },
        { title: 'Status', key: 'active' },
        { title: 'Details', key: 'agentId' } // Special column for actions
    ];

    // Define actions for each row
    const actions = (agent) => (
        <div className="d-flex justify-content-between">
            <Button 
                variant="info" 
                onClick={() => handleEditAgent(agent.agentId)}
            >
                Edit
            </Button>
            <Button 
                variant="danger" 
                onClick={() => handleDeactivateAgent(agent.agentId)}
                disabled={!agent.active} // Disable button if the agent is already deactivated
            >
                Deactivate
            </Button>
        </div>
    );
    
    return (
        <div className="container mt-4">
            <h3 className="centered-heading-container"><u>Agent List</u></h3>

            <div className="d-flex align-items-center mb-3">
            <div className="me-2">
                <input
                    type="text"
                    placeholder="Search by Agent ID"
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    className="form-control"
                />
                <Button variant="primary" onClick={handleSearchById}>
                    Search by ID
                </Button>
            </div>
            <div className="me-2">
                <select
                    value={activeStatus}
                    onChange={(e) => setActiveStatus(e.target.value === 'true')}
                    className="form-select"
                >
                    <option value="">Select Active Status</option>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </select>
                <Button variant="primary" onClick={handleSearchByStatus}>
                    Search by Status
                </Button>
            </div>
            <Button variant="secondary" onClick={handleReset}>
                Reset
            </Button>
        </div>

            <Button variant="primary" onClick={handleShowModal}>
                Register Agent
            </Button>
            <br />
            <br />
            <DynamicTable
                data={agents}
                columns={columns}
                actions={actions}
            />
            <Pagination>
                <Pagination.Prev
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                />
                {[...Array(totalPages).keys()].map(pageNumber => (
                    <Pagination.Item
                        key={pageNumber}
                        active={pageNumber === currentPage}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages - 1}
                />
            </Pagination>
            {/* Register Agent Modal */}
            <RegisterAgentModal
                show={showModal}
                handleClose={handleCloseModal}
                refreshAgents={refreshAgents}
            />

 {/* Edit Agent Modal */}
 {selectedAgentId && (
                <EditAgentModal
                    agentId={selectedAgentId}
                    show={showEditModal}
                    handleClose={handleCloseEditModal}
                    refreshAgents={refreshAgents}
                />
            )}

        </div>
    );
};

export default AgentList;
