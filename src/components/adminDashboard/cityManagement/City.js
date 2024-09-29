

import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { adminApiClient, setAuthToken } from '../../../utils/token';
import DynamicTable from '../../sharedComponents/DynamicTable';
import CityModal from './CityModal';
import './City.css';

const City = () => {
    const [cities, setCities] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(5); // Default page size
    const navigate = useNavigate();

    useEffect(() => {
        fetchCities();
    }, [currentPage, pageSize]);

    const fetchCities = async () => {
        setAuthToken();
        try {
            const response = await adminApiClient.get('/cities', {
                params: {
                    page: currentPage,
                    size: pageSize,
                    sortBy: 'id',
                    direction: 'asc'
                }
            });
            setCities(response.data.content);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleActivate = async (id) => {
        setAuthToken();
        try {
            await adminApiClient.put(`/city/${id}`);
            setCities(cities.map(city => city.cityId === id ? { ...city, isActive: true } : city));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeactivate = async (id) => {
        setAuthToken();
        try {
            await adminApiClient.delete(`/city/${id}`);
            setCities(cities.map(city => city.cityId === id ? { ...city, isActive: false } : city));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleAddCity = (newCity) => {
        setCities((prevCities) => {
            const updatedCities = [...prevCities, newCity];
            console.log('Updated Cities:', updatedCities); // Debug log
            return updatedCities;
        });
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
        { title: 'City ID', key: 'cityId' },
        { title: 'Name', key: 'name' },
        { title: 'State ID', key: 'stateId' },
        { title: 'Status', key: 'isActive' }
    ];

    // Define actions based on city status
    const actions = (city) => (
        city.isActive ? (
            <button className="deactivate-btn" onClick={() => handleDeactivate(city.cityId)}>Deactivate</button>
        ) : (
            <button className="activate-btn" onClick={() => handleActivate(city.cityId)}>Activate</button>
        )
    );

    return (
        <div className="city-management">
            <br/>
            <h2>Manage Cities</h2>
            {error && <p className="error">{error}</p>}
            <Button variant="primary" onClick={() => setShowModal(true)}>Add City</Button>
            <br />
           <CityModal show={showModal} handleClose={() => setShowModal(false)} addCity={handleAddCity} />
           
           
            <br />
            <DynamicTable data={cities} columns={columns} actions={actions} />
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

export default City;
