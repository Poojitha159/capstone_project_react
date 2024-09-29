import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable"; // For adding tables to the PDF
import './CommissionReport.css';

const CommissionReport = () => {
    const agentId = 1;  // Replace with actual agent ID
  const token = localStorage.getItem('authToken');
  const [commissions, setCommissions] = useState([]);

  // Fetch the commission report on component mount
  useEffect(() => {
    const fetchCommissionReport = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/E-Insurance/agent/${agentId}/commissions/report`, {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in Authorization header
          },
        });
        setCommissions(response.data);
      } catch (error) {
        console.error("Error fetching the commission report", error);
      }
    };

    fetchCommissionReport();
  }, [agentId, token]);

  // Function to download the PDF
  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add Title
    doc.text("Commission Report", 20, 10);

    // Define table columns and rows
    const tableColumn = [
      "Commission ID",
      "Commission Type",
      "Issue Date",
      "Amount",
      "Policy ID",
      "Customer Name",
    //   "Customer Last Name",
    ];

    const tableRows = commissions.map((commission) => [
      commission.commissionId,
      commission.commissionType,
      commission.issueDate,
      commission.amount,
      commission.policyId,
      commission.firstName ,
    ]);

    // Add table to PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });

    // Save the PDF
    doc.save("commission_report.pdf");
  };

  return (
    <div>
      <br/><br/>
      <h2>Commission Report</h2>

      {/* Table displaying commission data */}
      <table border="1" cellPadding="10" style={{ marginBottom: "20px" }} className="table-report">
        <thead>
          <tr>
            <th>Commission ID</th>
            <th>Commission Type</th>
            <th>Issue Date</th>
            <th>Amount</th>
            <th>Policy ID</th>
            <th>Customer Name</th>
            {/* <th>Customer Last Name</th> */}
          </tr>
        </thead>
        <tbody className="body-table">
          {commissions.map((commission) => (
            <tr key={commission.commissionId}>
              <td>{commission.commissionId}</td>
              <td>{commission.commissionType}</td>
              <td>{commission.issueDate}</td>
              <td>{commission.amount}</td>
              <td>{commission.policyId}</td>
              <td>{commission.firstName }</td>
              {/* <td>{commission.customerLastName}</td> */}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Button to download PDF */}
      <button 
  onClick={downloadPDF} 
  style={{
    backgroundColor: '#4CAF50', 
    color: 'white', 
    padding: '10px 20px', 
    border: 'none', 
    borderRadius: '5px', 
    cursor: 'pointer', 
    fontSize: '16px',
    marginTop: '20px'
  }}
>
  Download PDF
</button>

    </div>
  );
};

export default CommissionReport;
