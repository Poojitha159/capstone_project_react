// import React, { useState } from "react";
// import axios from "axios";
// import './AgentWithdrawalRequest.css';

// const AgentWithdrawalRequest = () => {
//   const [amount, setAmount] = useState("");
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   // Get the token from localStorage (or sessionStorage)
//   const token = localStorage.getItem("authToken");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!amount ||  isNaN(amount) ||  Number(amount) <= 0) {
//       setError("Please enter a valid amount");
//       return;
//     }

//     try {
//       // Call the backend withdrawal API with token
//       const response = await axios.post(
//         `http://localhost:8080/E-Insurance/agent/withdrawals`,
//         null, // No body required
//         {
//           params: { amount: Number(amount) },
//           headers: {
//             Authorization:` Bearer ${token}`, // Attach the token in the Authorization header
//           },
//         }
//       );

//       setMessage(response.data);
//       setError(""); // Clear error if success
//       setAmount(""); // Clear input after successful submission
//     } catch (error) {
//       if (error.response) {
//         setError(error.response.data.message || "Error processing request");
//       } else {
//         setError("Failed to make the request. Please try again.");
//       }
//       setMessage(""); // Clear success message if error occurs
//     }
//   };

//   return (
//     <div className="agent-withdrawal">
//       <h2>Withdrawal Request</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group-f">
//             <h1>Total commission:{</h1>
//           <label htmlFor="amount">Enter Withdrawal Amount</label>
//           <input
//             type="number"
//             id="amount"
//             value={amount}
//             onChange={(e) => setAmount(e.target.value)}
//             className="form-control"
//             placeholder="Enter amount"
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary-p">
//           Submit Request
//         </button>
//       </form>
      
//       {/* Display success message */}
//       {message && <div className="alert-a alert-success-s mt-3">{message}</div>}

//       {/* Display error message */}
//       {error && <div className="alert-a alert-danger-d mt-3">{error}</div>}
//     </div>
//   );
// };

// export default AgentWithdrawalRequest;


 import React, { useState, useEffect } from "react";
import axios from "axios";
import './AgentWithdrawalRequest.css'; // Import CSS styles

const AgentWithdrawalRequest = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [totalCommission, setTotalCommission] = useState(null);

  // Get the token from localStorage (or sessionStorage)
  const token = localStorage.getItem("authToken");

  // Fetch the total commission when the component loads
  useEffect(() => {
    let id=1;
//     const fetchTotalCommission = async () => {
//       try {
//         const response = await axios.get(http://localhost:8080/E-Insurance/agent/${id}/totalCommission, {
//           headers: {
//             Authorization: Bearer ${token}, // Pass the token in the header
//           },
//         });
//         setTotalCommission(response.data.totalCommission);
//       } catch (error) {
//         setError("Failed to load total commission. Please try again.");
//       }
//     };

//     fetchTotalCommission();
//   }, [token]);

const fetchTotalCommission = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/E-Insurance/agent/${id}/totalCommission`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const totalCommission = response.data;

      if (totalCommission !== null && totalCommission !== undefined) {
        setTotalCommission(totalCommission);
      } else {
        setError("Failed to load total commission. Please try again.");
      }
    } catch (error) {
      setError("Failed to load total commission. Please try again.");
    }
  };
      fetchTotalCommission();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount ||  isNaN(amount)  || Number(amount) <= 0) {
      setError("Please enter a valid amount");
      return;
    }

    try {
      // Call the backend withdrawal API with token
      const response = await axios.post(
        `http://localhost:8080/E-Insurance/agent/withdrawals`,
        null, // No body required
        {
          params: { amount: Number(amount) },
          headers: {
            Authorization:` Bearer ${token}`, // Attach the token in the Authorization header
          },
        }
      );

      setMessage(response.data);
      setError(""); // Clear error if success
      setAmount(""); // Clear input after successful submission

      let id=1;
      // Fetch updated total commission after withdrawal
      const updatedCommissionResponse = await axios.get(`http://localhost:8080/E-Insurance/agent/${id}/totalCommission`, {
        headers: {
          Authorization:` Bearer ${token}`,
        },
      });
      setTotalCommission(updatedCommissionResponse.data);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message || "Error processing request");
      } else {
        setError("Failed to make the request. Please try again.");
      }
      setMessage(""); // Clear success message if error occurs
    }
  };

  return (
    <div className="agent-withdrawal">
      <h2>Withdrawal Request</h2>

      {/* Display total commission */}
      {totalCommission !== null ? (
        <div className="total-commission">
          <p>Total Commission Available: <strong>{totalCommission.toFixed(2)}</strong></p>
        </div>
      ) : (
        <p>Loading total commission...</p>
      )}

      <form onSubmit={handleSubmit}>
      <div className="form-group-f">
            <h1>Total commission:</h1>
          <label htmlFor="amount">Enter Withdrawal Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="form-control"
            placeholder="Enter amount"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary-p">
          Submit Request
        </button>
      </form>
      
      {/* Display success message */}
      {message && <div className="alert-a alert-success-s mt-3">{message}</div>}

      {/* Display error message */}
      {error && <div className="alert-a alert-danger-d mt-3">{error}</div>}
    </div>
  );
};

export default AgentWithdrawalRequest;
