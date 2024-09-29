// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Pagination } from 'react-bootstrap';
// import './AgentQueries.css';

// const AgentQueries = () => {
//     const [queries, setQueries] = useState([]);
//     const [reply, setReply] = useState('');
//     const [selectedQuery, setSelectedQuery] = useState(null); // Default should be null
//     const [currentPage, setCurrentPage] = useState(1);
//     const [queriesPerPage] = useState(5);
//     const [agentId] = useState(1); // Replace with actual agent ID logic
//     const authToken = localStorage.getItem('authToken'); // Replace with actual token retrieval logic.

//     // Fetch queries from the server on component mount
//     useEffect(() => {
//         const fetchQueries = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8080/E-Insurance/agent/queries`, {
//                     headers: {
//                         Authorization: `Bearer ${authToken}`,
//                     },
//                 });
//                 console.log('Queries Response:', response.data); // Log the response data
//                 setQueries(response.data);
//             } catch (error) {
//                 console.error('Error fetching queries:', error);
//             }
//         };
//         fetchQueries();
//     }, [agentId, authToken]);

//     const handleReplyChange = (e) => setReply(e.target.value);

//     const handleReplySubmit = async () => {
//         console.log('Submitting reply for query:', selectedQuery); // Debugging statement
//         try {
//             await axios.post(
//                 'http://localhost:8080/E-Insurance/agent/contact/reply',
//                 {
//                     contactMessageId: selectedQuery, // ID of the selected query
//                     agentId,
//                     replyMessage: reply,
//                 },
//                 {
//                     headers: {
//                         Authorization: `Bearer ${authToken}`,
//                     },
//                 }
//             );
//             console.log('Reply submitted successfully'); // Debugging statement
//             setReply(''); // Clear the reply text after submitting
//             setSelectedQuery(null); // Clear the selected query after submission
//         } catch (error) {
//             console.error('Error submitting reply:', error);
//         }
//     };

//     const handleReplyClick = (queryId) => {
//         console.log(`Replying to query with ID: ${queryId}`);
//         setSelectedQuery(queryId); // Set the selected query
//     };

//     // Pagination logic
//     const indexOfLastQuery = currentPage * queriesPerPage;
//     const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
//     const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);
//     const totalPages = Math.ceil(queries.length / queriesPerPage);

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);

//     return (
//         <div className='container-qu'>
//             <h2>Contact Queries</h2>
//             <table className="table-qu">
//                 <thead>
//                     <tr className='qu'>
//                         <th>Customer ID</th>
//                         <th>Customer Message</th>

//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody className='qu'>
//                     {currentQueries.map((query) => (
//                         <tr key={query.id}> {/* Make sure this matches the API response */}
//                             <td>{query.customerId}</td> {/* Ensure this is the correct property */}
//                             <td>{query.message}</td>
//                             <td>
//                                 <button onClick={() => handleReplyClick(query.id)}>Reply</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//             {/* Pagination Component */}
//             <Pagination className='qu'>
//                 <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
//                 <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
//                 {[...Array(totalPages).keys()].map(page => (
//                     <Pagination.Item
//                         key={page + 1}
//                         active={page + 1 === currentPage}
//                         onClick={() => paginate(page + 1)}
//                     >
//                         {page + 1}
//                     </Pagination.Item>
//                 ))}
//                 <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
//                 <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
//             </Pagination>

//             {selectedQuery !== null && (
//                 <div>
//                     <h3>Reply to Query {selectedQuery}</h3>
//                     <textarea value={reply} onChange={handleReplyChange} />
//                     <button onClick={handleReplySubmit}>Submit Reply</button>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default AgentQueries;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pagination } from 'react-bootstrap';
import './AgentQueries.css';

const AgentQueries = () => {
    const [queries, setQueries] = useState([]);
    const [reply, setReply] = useState('');
    const [selectedQuery, setSelectedQuery] = useState(null); // Default should be null
    const [currentPage, setCurrentPage] = useState(1);
    const [queriesPerPage] = useState(5);
    const [agentId] = useState(1); // Replace with actual agent ID logic
    const authToken = localStorage.getItem('authToken'); // Replace with actual token retrieval logic.

    // Fetch queries from the server on component mount
    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/E-Insurance/agent/queries`, {
                    headers: {
                        Authorization:` Bearer ${authToken}`,
                    },
                });
                console.log('Queries Response:', response.data); // Log the response data
                setQueries(response.data);
            } catch (error) {
                console.error('Error fetching queries:', error);
            }
        };
        fetchQueries();
    }, [agentId, authToken]);

    const handleReplyChange = (e) => setReply(e.target.value);

    const handleReplySubmit = async () => {
        console.log('Submitting reply for query:', selectedQuery); // Debugging statement
        try {
            await axios.post(
                `http://localhost:8080/E-Insurance/agent/contact/reply`,
                {
                    contactMessageId: selectedQuery, // ID of the selected query
                    agentId,
                    replyMessage: reply,
                },
                {
                    headers: {
                        Authorization:` Bearer ${authToken}`,
                    },
                }
            );
            console.log('Reply submitted successfully'); // Debugging statement
            setReply(''); // Clear the reply text after submitting
            setSelectedQuery(null); // Clear the selected query after submission
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    const handleReplyClick = (queryId) => {
       // console.log(Replying to query with ID: `${queryId}`);
        setSelectedQuery(queryId); // Set the selected query
    };

    const handleCancelReply = () => {
        setReply(''); // Clear the reply text
        setSelectedQuery(null); // Hide the reply form
    };

    // Pagination logic
    const indexOfLastQuery = currentPage * queriesPerPage;
    const indexOfFirstQuery = indexOfLastQuery - queriesPerPage;
    const currentQueries = queries.slice(indexOfFirstQuery, indexOfLastQuery);
    const totalPages = Math.ceil(queries.length / queriesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            <h2>Contact Queries</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Message</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {currentQueries.map((query) => (
                        <tr key={query.id}> {/* Make sure this matches the API response */}
                            <td>{query.customerId}</td> {/* Ensure this is the correct property */}
                            <td>{query.message}</td>
                            <td>
                                <button onClick={() => handleReplyClick(query.id)}>Reply</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
{/* Pagination Component */}
            <Pagination>
                <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
                <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
                {[...Array(totalPages).keys()].map(page => (
                    <Pagination.Item
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => paginate(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
                <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
                <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
            </Pagination>

            {selectedQuery !== null && (
                <div>
                    <h3>Reply to Query {selectedQuery}</h3>
                    <textarea value={reply} onChange={handleReplyChange} />
                    <div style={{ marginTop: '10px' }}>
                        <button onClick={handleReplySubmit}>Submit Reply</button>
                        <button onClick={handleCancelReply} style={{ marginLeft: '10px' }}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgentQueries;