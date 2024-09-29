import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WithdrawalRequestTable = () => {
  const [withdrawalRequests, setWithdrawalRequests] = useState([]);
  const authToken = localStorage.getItem('authToken'); // Retrieve the token from localStorage or any storage you use

  useEffect(() => {
    // Fetch all withdrawal requests from the backend
    fetchWithdrawalRequests();
  }, []);

  const fetchWithdrawalRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8080/E-Insurance/admin/withdrawal-requests', {
        headers: {
          Authorization: `Bearer ${authToken}` // Add authToken in the request headers
        }
      });
      console.log(response);
      setWithdrawalRequests(response.data);
    } catch (error) {
      console.error('Error fetching withdrawal requests:', error);
    }
  };

  const approveRequest = async (withdrawalId) => {
    try {
      await axios.put(`http://localhost:8080/E-Insurance/admin/withdrawals/${withdrawalId}/approval`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}` // Add authToken in the request headers
        }
      });
      fetchWithdrawalRequests(); // Refresh the list after approval
    } catch (error) {
      console.error('Error approving withdrawal request:', error);
    }
  };

  const rejectRequest = async (withdrawalId) => {
    try {
      await axios.put(`http://localhost:8080/E-Insurance/admin/withdrawal/${withdrawalId}/reject`, {}, {
        headers: {
          Authorization: `Bearer ${authToken}` // Add authToken in the request headers
        }
      });
      fetchWithdrawalRequests(); // Refresh the list after rejection
    } catch (error) {
      console.error('Error rejecting withdrawal request:', error);
    }
  };

  return (
    <div>
      <h2>Withdrawal Requests</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Agent</th>
            <th>Request Type</th>
            <th>Amount</th>
            <th>Request Date</th>
            <th>Status</th>
            <th>Approved At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {withdrawalRequests.map((request) => (
            <tr key={request.withdrawalRequestId}>
              <td>{request.withdrawalRequestId}</td>
              <td>{request.agentId}</td>
              <td>{request.requestType}</td>
              <td>{request.amount}</td>
              <td>{new Date(request.requestDate).toLocaleString()}</td>
              <td>{request.status}</td>
              <td>{request.approvedAt ? new Date(request.approvedAt).toLocaleString() : 'N/A'}</td>
              <td>
                {request.status === 'PENDING' && (
                  <>
                   <div style={{ display: 'flex', gap: '10px' }}>
    <button style={{ backgroundColor: 'green', color: 'white' }} onClick={() => approveRequest(request.withdrawalRequestId)}>
        Approve
    </button>
    <button style={{ backgroundColor: 'red', color: 'white' }} onClick={() => rejectRequest(request.withdrawalRequestId)}>
        Reject
    </button>
</div>

                  </>
                )}
                {request.status !== 'PENDING' && (
                  <span>{request.status}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WithdrawalRequestTable;
