
// import React, { useEffect, useState } from 'react';
// import { Button, Form, Row, Col } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
// import DynamicTable from '../../sharedComponents/DynamicTable';
// import { EmployeeModal, AddEmployeeModal } from './EmployeeModal';
// import './Employee.css';
// import { fetchEmployees, fetchEmployeeById, fetchEmployeesByActiveStatus, deactivateEmployee } from '../../../services/employeeService';

// const Employee = () => {
//     const navigate = useNavigate();
//     const [employees, setEmployees] = useState([]);
//     const [error, setError] = useState(null);
//     const [pageSize, setPageSize] = useState(); // Default page size
//     const [pagination, setPagination] = useState({
//         page: 0,
//         size: 5,
//         totalElements: 0,
//         totalPages: 0,
//         isLast: false
//     });

//     // State for modals
//     const [showModal, setShowModal] = useState(false);
//     const [showAddModal, setShowAddModal] = useState(false);
//     const [selectedEmployee, setSelectedEmployee] = useState(null);

//     // State for search inputs
//     const [employeeId, setEmployeeId] = useState('');
//     const [activeStatus, setActiveStatus] = useState('');
//     const [searchOption, setSearchOption] = useState(''); // Dropdown state for search type
//     const [searchCriteria, setSearchCriteria] = useState('employeeId'); // Default to searching by ID

//     useEffect(() => {
//         fetchEmployeesData();
//     }, [pagination.page, pagination.size]);

//     const fetchEmployeesData = async () => {
//         try {
//             const data = await fetchEmployees(pagination.page, pagination.size);
//             setEmployees(data.content);
//             setPagination({
//                 page: data.page,
//                 size: data.size,
//                 totalElements: data.totalElements,
//                 totalPages: data.totalPages,
//                 isLast: data.isLast
//             });
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchById = async () => {
//         if (!employeeId) return;  // If no input, return
//         try {
//             const employee = await fetchEmployeeById(employeeId);
//             setEmployees([employee]);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleSearchByActiveStatus = async () => {
//         if (activeStatus === '') return;  // If no input, return
//         try {
//             const data = await fetchEmployeesByActiveStatus(activeStatus, pagination.page, pagination.size);
//             setEmployees(data.content);
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const handleReset = async () => {
//         setEmployeeId('');        // Reset Employee ID
//         setActiveStatus('');      // Reset Active Status
//         setSearchOption('');      // Reset search option
//         await fetchEmployeesData(); // Fetch all employees back
//     };

    // const handleDeactivate = async (id) => {
    //     try {
    //         await deactivateEmployee(id);
    //         setEmployees(employees.map(emp => emp.employeeId === id ? { ...emp, isActive: false } : emp));
    //     } catch (err) {
    //         setError(err.message);
    //     }
    // };

//     const handleEdit = (employee) => {
//         setSelectedEmployee(employee);
//         setShowModal(true);
//     };

//     const handleAdd = () => {
//         setShowAddModal(true);
//     };

//     const handleUpdate = async () => {
//         await fetchEmployeesData();
//     };

//     const handleAddEmployee = async () => {
//         await fetchEmployeesData();
//     };

//     const handlePageChange = (newPage) => {
//         if (newPage >= 0 && newPage < pagination.totalPages) {
//             setPagination(prev => ({
//                 ...prev,
//                 page: newPage
//             }));
//         }
//     };

//     const handlePageSizeChange = (event) => {
//         setPagination(prev => ({
//             ...prev,
//             size: Number(event.target.value),
//             page: 0 // Reset to the first page when page size changes
//         }));
//     };

  

//     // Define columns configuration
//     const columns = [
//         { title: 'ID', key: 'employeeId' },
//         { title: 'Name', key: 'firstName' },
//         { title: 'Last Name', key: 'lastName' },
//         { title: 'Status', key: 'active' },
//         { title: 'Username', key: 'username' },
//         { title: 'Email', key: 'email' }
//     ];

//     const actions = (employee) => (
//         <div className="d-flex">
//             {employee.active && (
//                 <Button
//                     variant="danger"
//                     onClick={() => handleDeactivate(employee.employeeId)}
//                     className="me-2" // Add margin to the right
//                 >
//                     Deactivate
//                 </Button>
//             )}
//             <Button
//                 variant="warning"
//                 onClick={() => handleEdit(employee)}
//             >
//                 Edit
//             </Button>
//         </div>
//     );

//     const handleSearch = async () => {
//         if (searchCriteria === 'employeeId') {
//             await handleSearchById();
//         } else if (searchCriteria === 'activeStatus') {
//             await handleSearchByActiveStatus();
//         }
//     };

//     return (
//         <div>
//             <br/>
//             <br/>
//             <h2>Employee Management</h2>
           
//             <Row>
//                 <Col md={12}>
//                     <div className="search-container">
//                         {/* Dropdown for selecting search criteria */}
//                         <Form.Group className="mb-3">
//                             <Form.Label>Select Search Criteria</Form.Label>
//                             <Form.Select
//                                 className="form-select-sm"
//                                 value={searchCriteria}
//                                 onChange={(e) => setSearchCriteria(e.target.value)}
//                             >
//                                 <option value="employeeId">Search by ID</option>
//                                 <option value="activeStatus">Search by Active Status</option>
//                             </Form.Select>
//                         </Form.Group>

//                         {/* Search input field */}
//                         <Form.Group className="mb-3">
//                             <Form.Label>{searchCriteria === 'employeeId' ? 'Employee ID' : 'Active Status'}</Form.Label>
//                             <Form.Control
//                                 className="form-control-sm"
//                                 type="text"
//                                 placeholder={searchCriteria === 'employeeId' ? 'Enter Employee ID' : 'Enter Active Status (true/false)'}
//                                 value={searchCriteria === 'employeeId' ? employeeId : activeStatus}
//                                 onChange={(e) => {
//                                     if (searchCriteria === 'employeeId') setEmployeeId(e.target.value);
//                                     else setActiveStatus(e.target.value);
//                                 }}
//                             />
//                         </Form.Group>

//                         {/* Search and Reset buttons */}
//                         <div className="search-buttons">
//                             <Button onClick={handleSearch} variant="primary" className="btn-sm">
//                                 Search
//                             </Button>
//                             <Button onClick={handleReset} variant="secondary" className="btn-sm">
//                                 Reset
//                             </Button>
//                             {/* <div className="d-flex justify-content-end mt-3"> */}
//                 <Button
//                     onClick={handleAdd}
//                     style={{ width: '150px' }} // Adjust width as needed
//                     className="button button-success"
//                 >
//                     Add Employee
//                 </Button>
//             {/* </div> */}
//                         </div>
//                     </div>
//                 </Col>
//             </Row>


          
          
//             {error && <p className="error">{error}</p>}
//             <DynamicTable
//                 data={employees}
//                 columns={columns}
//                 actions={actions}
//             />
//             <div className="pagination-controls">
//                 <Button
//                     onClick={() => handlePageChange(pagination.page - 1)}
//                     disabled={pagination.page === 0}
//                     size="sm"  // Set pagination buttons to small size
//                 >
//                     Previous
//                 </Button>
//                 <span>Page {pagination.page + 1} of {pagination.totalPages}</span>
//                 <Button
//                     onClick={() => handlePageChange(pagination.page + 1)}
//                     disabled={pagination.isLast}
//                     size="sm"  // Set pagination buttons to small size
//                 >
//                     Next
//                 </Button>
//                 <br />
//                 <Form.Group>
//                     <Form.Label>Items per page</Form.Label>
//                     <Form.Control
//                         as="select"
//                         size="sm"  // Set items per page dropdown to small size
//                         value={pageSize}
//                         onChange={handlePageSizeChange}
//                     >
//                         <option value={1}>1</option>
//                         <option value={5}>5</option>
//                         <option value={10}>10</option>
//                         <option value={20}>20</option>
//                     </Form.Control>
//                 </Form.Group>
//             </div>

//             {/* Edit Employee Modal */}
//             <EmployeeModal
//                 show={showModal}
//                 handleClose={() => setShowModal(false)}
//                 employee={selectedEmployee}
//                 onUpdate={handleUpdate}
//             />
//             {/* Add Employee Modal */}
//             <AddEmployeeModal
//                 show={showAddModal}
//                 handleClose={() => setShowAddModal(false)}
//                 onAdd={handleAddEmployee}
//             />

            
//         </div>
//     );
// };

// export default Employee;


import React, { useEffect, useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DynamicTable from '../../sharedComponents/DynamicTable';
import { EmployeeModal, AddEmployeeModal } from './EmployeeModal';
import './Employee.css';
import { fetchEmployees, fetchEmployeeById, fetchEmployeesByActiveStatus, deactivateEmployee } from '../../../services/employeeService';

const Employee = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [error, setError] = useState(null);
    const [pageSize, setPageSize] = useState(); // Default page size
    const [pagination, setPagination] = useState({
        page: 0,
        size: 5,
        totalElements: 0,
        totalPages: 0,
        isLast: false
    });

    // State for modals
    const [showModal, setShowModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    // State for search inputs
    const [employeeId, setEmployeeId] = useState('');
    const [activeStatus, setActiveStatus] = useState('');
    const [searchCriteria, setSearchCriteria] = useState('employeeId'); // Default to searching by ID

    useEffect(() => {
        fetchEmployeesData();
    }, [pagination.page, pagination.size]);

    const fetchEmployeesData = async () => {
        try {
            const data = await fetchEmployees(pagination.page, pagination.size);
            setEmployees(data.content);
            setPagination({
                page: data.page,
                size: data.size,
                totalElements: data.totalElements,
                totalPages: data.totalPages,
                isLast: data.isLast
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearchById = async () => {
        if (!employeeId) return;  // If no input, return
        try {
            const employee = await fetchEmployeeById(employeeId);
            setEmployees([employee]);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleSearchByActiveStatus = async () => {
        if (activeStatus === '') return;  // If no input, return
        try {
            const data = await fetchEmployeesByActiveStatus(activeStatus, pagination.page, pagination.size);
            setEmployees(data.content);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleReset = async () => {
        setEmployeeId('');        // Reset Employee ID
        setActiveStatus('');      // Reset Active Status
        await fetchEmployeesData(); // Fetch all employees back
    };

    const handleDeactivate = async (id) => {
        try {
            await deactivateEmployee(id); // Call the service to deactivate the employee
    
            // Update the local state to reflect the change immediately
            setEmployees((prevEmployees) =>
                prevEmployees.map(emp =>
                    emp.employeeId === id ? { ...emp, active: false } : emp
                )
            );
    
            // Optionally, provide feedback to the user
            alert('Employee deactivated successfully.'); // or use toast notifications
        } catch (err) {
            setError(err.message);
            alert('Failed to deactivate employee.'); // or use toast notifications
        }
    };
    

    const handleEdit = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
    };

    const handleAdd = () => {
        setShowAddModal(true);
    };

    const handleUpdate = async () => {
        await fetchEmployeesData();
    };

    const handleAddEmployee = async () => {
        await fetchEmployeesData();
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pagination.totalPages) {
            setPagination(prev => ({
                ...prev,
                page: newPage
            }));
        }
    };

    const handlePageSizeChange = (event) => {
        setPagination(prev => ({
            ...prev,
            size: Number(event.target.value),
            page: 0 // Reset to the first page when page size changes
        }));
    };

    // Define columns configuration
    const columns = [
        { title: 'ID', key: 'employeeId' },
        { title: 'Name', key: 'firstName' },
        { title: 'Last Name', key: 'lastName' },
        { title: 'Status', key: 'active' },
        { title: 'Username', key: 'username' },
        { title: 'Email', key: 'email' }
    ];

    const actions = (employee) => (
        <div className="d-flex">
            {employee.active && (
                <Button
                    variant="danger"
                    onClick={() => handleDeactivate(employee.employeeId)}
                    className="me-2" // Add margin to the right
                >
                    Deactivate
                </Button>
            )}
            <Button
                variant="warning"
                onClick={() => handleEdit(employee)}
            >
                Edit
            </Button>
        </div>
    );

    const handleSearch = async () => {
        if (searchCriteria === 'employeeId') {
            await handleSearchById();
        } else if (searchCriteria === 'activeStatus') {
            await handleSearchByActiveStatus();
        }
    };

    return (
        <div>
            
            <h2>Employee Management</h2>

            <Row className="mb-3">
                <Col md={4}>
                    {/* Dropdown for selecting search criteria */}
                    <Form.Group>
                        <Form.Label>Select Search Criteria</Form.Label>
                        <Form.Select
                            className="formm-select-sm"
                            value={searchCriteria}
                            onChange={(e) => setSearchCriteria(e.target.value)}
                        >
                            <option value="employeeId">Search by ID</option>
                            <option value="activeStatus">Search by Active Status</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
                <Col md={4}>
                    {/* Search input field */}
                    <Form.Group>
                        <Form.Label>{searchCriteria === 'employeeId' ? 'Employee ID' : 'Active Status'}</Form.Label>
                        <Form.Control
                            className="formm-control-sm"
                            type="text"
                            placeholder={searchCriteria === 'employeeId' ? 'Enter Employee ID' : 'Enter Active Status (true/false)'}
                            value={searchCriteria === 'employeeId' ? employeeId : activeStatus}
                            onChange={(e) => {
                                if (searchCriteria === 'employeeId') setEmployeeId(e.target.value);
                                else setActiveStatus(e.target.value);
                            }}
                        />
                    </Form.Group>
                </Col>
                <Col md={4}>
                    {/* Align buttons in a flex container */}
                    <div className="button-containerr">
                        <Button onClick={handleSearch} variant="primary" className="btn-sm">
                            Search
                        </Button>
                        <Button onClick={handleReset} variant="secondary" className="btn-sm">
                            Reset
                        </Button>
                        <Button
                            onClick={handleAdd}
                            style={{ width: '150px' }} // Adjust width as needed
                            className="button button-success"
                        >
                            Add Employee
                        </Button>
                    </div>
                </Col>
            </Row>

            {error && <p className="error">{error}</p>}
            <DynamicTable
                data={employees}
                columns={columns}
                actions={actions}
            />
            <div className="pagination-controlsss">
                <Button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 0}
                    size="sm"  // Set pagination buttons to small size
                >
                    Previous
                </Button>
                <span>Page {pagination.page + 1} of {pagination.totalPages}</span>
                <Button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.isLast}
                    size="sm"  // Set pagination buttons to small size
                >
                    Next
                </Button>
                <br />
                <Form.Group>
                    <Form.Label>Items per page</Form.Label>
                    <Form.Control
                        as="select"
                        size="sm"  // Set items per page dropdown to small size
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        <option value={1}>1</option>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </Form.Control>
                </Form.Group>
            </div>

            {/* Edit Employee Modal */}
            <EmployeeModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                employee={selectedEmployee}
                onUpdate={handleUpdate}
            />
            {/* Add Employee Modal */}
            <AddEmployeeModal
                show={showAddModal}
                handleClose={() => setShowAddModal(false)}
                onAdd={handleAddEmployee}
            />
        </div>
    );
};

export default Employee;
