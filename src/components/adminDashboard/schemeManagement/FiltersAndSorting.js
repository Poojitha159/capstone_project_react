// import React, { useState } from 'react';
// import { Form, Button, Col, Row } from 'react-bootstrap';

// const FiltersAndSorting = ({ onApplyFilters }) => {
//     const [minInvestment, setMinInvestment] = useState('');
//     const [maxInvestment, setMaxInvestment] = useState('');
//     const [minAge, setMinAge] = useState('');
//     const [maxAge, setMaxAge] = useState('');
//     const [sortBy, setSortBy] = useState('insuranceSchemeId');
//     const [sortDirection, setSortDirection] = useState('asc');

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Filters submitted:', { minInvestment, maxInvestment, minAge, maxAge, sortBy, sortDirection }); // Debugging
//         onApplyFilters({ minInvestment, maxInvestment, minAge, maxAge, sortBy, sortDirection });
//     };

//     return (
//         <Form onSubmit={handleSubmit} className="mb-4">
//             <Row>
//                 <Col md={3}>
//                     <Form.Group>
//                         <Form.Label>Min Investment</Form.Label>
//                         <Form.Control type="number" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} />
//                     </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                     <Form.Group>
//                         <Form.Label>Max Investment</Form.Label>
//                         <Form.Control type="number" value={maxInvestment} onChange={(e) => setMaxInvestment(e.target.value)} />
//                     </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                     <Form.Group>
//                         <Form.Label>Min Age</Form.Label>
//                         <Form.Control type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
//                     </Form.Group>
//                 </Col>
//                 <Col md={3}>
//                     <Form.Group>
//                         <Form.Label>Max Age</Form.Label>
//                         <Form.Control type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
//                     </Form.Group>
//                 </Col>
//             </Row>
//             <Row className="mt-3">
//                 <Col md={6}>
//                     <Form.Group>
//                         <Form.Label>Sort By</Form.Label>
//                         <Form.Control as="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
//                         <option value="insuranceSchemeId">select</option>
//                             <option value="insuranceSchemeId">ID</option>
//                             <option value="insuranceScheme">Name</option>
//                             <option value="minimumInvestmentAmount">Min Investment</option>
//                         </Form.Control>
//                     </Form.Group>
//                 </Col>
//                 <Col md={6}>
//                     <Form.Group>
//                         <Form.Label>Sort Direction</Form.Label>
//                         <Form.Control as="select" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
//                             <option value="asc">Ascending</option>
//                             <option value="desc">Descending</option>
//                         </Form.Control>
//                     </Form.Group>
//                 </Col>
//             </Row>
//             <Button type="submit" className="mt-3">Apply Filters</Button>
//         </Form>
//     );
// };

// export default FiltersAndSorting;
//8888888888888888888888888888888888888888888

import React, { useState } from 'react';
import { Form, Button, Col, Row } from 'react-bootstrap';

const FiltersAndSorting = ({ onApplyFilters }) => {
    const [minInvestment, setMinInvestment] = useState('');
    const [maxInvestment, setMaxInvestment] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [sortBy, setSortBy] = useState('insuranceSchemeId');
    const [sortDirection, setSortDirection] = useState('asc');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Filters submitted:', { minInvestment, maxInvestment, minAge, maxAge, sortBy, sortDirection }); // Debugging
        onApplyFilters({ minInvestment, maxInvestment, minAge, maxAge, sortBy, sortDirection });
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-4">
            <Row>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Min Investment</Form.Label>
                        <Form.Control type="number" value={minInvestment} onChange={(e) => setMinInvestment(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Max Investment</Form.Label>
                        <Form.Control type="number" value={maxInvestment} onChange={(e) => setMaxInvestment(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Min Age</Form.Label>
                        <Form.Control type="number" value={minAge} onChange={(e) => setMinAge(e.target.value)} />
                    </Form.Group>
                </Col>
                <Col md={3}>
                    <Form.Group>
                        <Form.Label>Max Age</Form.Label>
                        <Form.Control type="number" value={maxAge} onChange={(e) => setMaxAge(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Sort By</Form.Label>
                        <Form.Control as="select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="insuranceSchemeId">select</option>
                            <option value="insuranceSchemeId">ID</option>
                            <option value="insuranceScheme">Name</option>
                            <option value="minimumInvestmentAmount">Min Investment</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
                <Col md={6}>
                    <Form.Group>
                        <Form.Label>Sort Direction</Form.Label>
                        <Form.Control as="select" value={sortDirection} onChange={(e) => setSortDirection(e.target.value)}>
                            <option value="asc">Ascending</option>
                            <option value="desc">Descending</option>
                        </Form.Control>
                    </Form.Group>
                </Col>
            </Row>
            <Button type="submit" className="mt-3">Apply Filters</Button>
        </Form>
    );
};

export default FiltersAndSorting;
