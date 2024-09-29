


import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap'; 

import '../../styles/components/InsurancePlans.css';
import { useNavigate } from 'react-router-dom';

import { fetchAllPlans } from '../../services/planService';
import '../../styles/components/InsurancePlans.css';

const InsurancePlans = () => {
    const [plans, setPlans] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch insurance plans from the service
        const loadPlans = async () => {
            try {
                const plansData = await fetchAllPlans();
                console.log('API Response:', plansData);  // Log the response data
                setPlans(plansData);
            } catch (error) {
                console.error('Error fetching insurance plans:', error);
            }
        };
        
        loadPlans();
    }, []);

    const handleSelect = (planId) => {
        navigate(`/schemes/${planId}`);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
                Insurance Plans
            </Dropdown.Toggle>

            {/* <Dropdown.Menu >
                {plans.length > 0 ? (
                    plans.map(plan => (
                        <Dropdown.Item  className="custom-dropdown-item" key={plan.insurancePlanId} onClick={() => handleSelect(plan.insurancePlanId)}>
                            {plan.name}
                        </Dropdown.Item>
                    ))
                ) : (
                    <Dropdown.Item disabled>No plans available</Dropdown.Item>
                )}
            </Dropdown.Menu> 
            */}

<Dropdown.Menu>
    {plans.length > 0 ? (
        plans.map(plan => (
            <Dropdown.Item
                key={plan.insurancePlanId}
                onClick={() => handleSelect(plan.insurancePlanId)}
                className="custom-dropdown-item" // Use a custom class if needed
            >
                {plan.name}
            </Dropdown.Item>
        ))
    ) : (
        <Dropdown.Item disabled>No plans available</Dropdown.Item>
    )}
</Dropdown.Menu>

        </Dropdown>
    );
};

export default InsurancePlans;
