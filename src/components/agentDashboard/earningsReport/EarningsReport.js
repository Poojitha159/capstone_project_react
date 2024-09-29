import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './EarningsReport.css';

const EarningsReport = () => {
    const [withdrawalRequests, setWithdrawalRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Helper function to get auth token
    const getAuthToken = () => {
        return localStorage.getItem('authToken');
    };

    // Fetch agentId (this should come from the logged-in agent's session or token)
    const getAgentId = () => {
        return localStorage.getItem('agentId');
    };

    useEffect(() => {
        const fetchWithdrawalRequests = async () => {
            try {
                const agentId = getAgentId();
                const response = await axios.get(
                     `http://localhost:8080/E-Insurance/agent/${agentId}/withdrawal-requests`,
{
                        headers: {
                            Authorization: `Bearer ${getAuthToken()}`,
                        },
                    }
                );
                setWithdrawalRequests(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching withdrawal requests:', err);
                setError('Failed to load withdrawal requests. Please try again.');
                setLoading(false);
            }
        };

        fetchWithdrawalRequests();
    }, []);

    // Calculate total amount from approved requests only
    const calculateTotalAmount = () => {
        return withdrawalRequests
            .filter(request => request.status === 'APPROVED') // Filter for approved requests
            .reduce((total, request) => total + request.amount, 0);
    };

    // Function to download table as PDF
    const downloadPDF = () => {
        const input = document.getElementById('withdrawalTable');
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const imgWidth = 190; // Image width in PDF
            const pageHeight = pdf.internal.pageSize.height;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
            let heightLeft = imgHeight;

            let position = 0;

            pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;

            while (heightLeft >= 0) {
                position = heightLeft - imgHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 10, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;
            }

            pdf.save('withdrawal_requests.pdf');
        });
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return (
        <div>
            <br />
            <h2>Your Withdrawal Requests</h2>
            {withdrawalRequests.length === 0 ? (
                <p>No withdrawal requests found.</p>
            ) : (
                <>
                    <button onClick={downloadPDF} style={{ marginBottom: '20px' }}>Download PDF</button>
                    <div id="withdrawalTable" style={{ display: 'block' }}>
                        <table>
                            <thead>
                                <tr>
                                    <th>Request ID</th>
                                    <th>Amount</th>
                                    <th>Request Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {withdrawalRequests.map((request) => (
                                    <tr key={request.withdrawalRequestId}>
                                        <td>{request.withdrawalRequestId}</td>
                                        <td>{request.amount}</td>
                                        <td>{new Date(request.requestDate).toLocaleString()}</td>
                                        <td>{request.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td colSpan="2" style={{ textAlign: 'right' }}>Total Earnings:</td>
                                    <td colSpan="3">{calculateTotalAmount().toFixed(2)}</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </>
            )}
        </div>
    );
};

export default EarningsReport;