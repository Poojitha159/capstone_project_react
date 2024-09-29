// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';

// const DocumentModal = ({ show, handleClose, documents, handleVerify }) => {
//   const viewDocument = (documentUrl) => {
//     // This will open the document in a new tab if the document is a URL.
//     window.open(documentUrl, '_blank');
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Policy Documents</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {documents.length > 0 ? (
//           <ul>
//             {documents.map((doc) => (
//               <li key={doc.id} style={{ marginBottom: '10px' }}>
//                 <strong>{doc.documentName}</strong> - Status: {doc.documentStatus} <br />
//                 {/* Button to view document */}
//                 <Button variant="link" onClick={() => viewDocument(doc.documentImage)}>
//                   View Document
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No documents found for this policy.</p>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => handleVerify('REJECTED')}>Reject</Button>
//         <Button variant="primary" onClick={() => handleVerify('APPROVED')}>Approve</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DocumentModal;


//99999999999999999

// import React from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios';

// const DocumentModal = ({ show, handleClose, documents, handleVerify }) => {
//     const viewDocument = async (documentName) => {
//         try {
//           const response = await axios.get(`http://localhost:8080/E-Insurance/file/view/${documentName}`, {
//             responseType: 'blob', // Handle the file as binary
//           });
      
//           // Get the file type (MIME type) from the response headers
//           const contentType = response.headers['content-type'];
      
//           // Create a URL from the binary data and open it in a new tab
//           const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
//           const link = document.createElement('a');
//           link.href = url;
          
//           // If it's a viewable type like an image or PDF, open it in a new tab
//           if (contentType.includes('image') || contentType === 'application/pdf') {
//             link.setAttribute('target', '_blank');
//           }
      
//           link.click(); // Trigger file view/download
//         } catch (error) {
//           console.error('Error fetching document:', error);
//         }
//       };
      
//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Policy Documents</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {documents.length > 0 ? (
//           <ul>
//             {documents.map((doc) => (
//               <li key={doc.id} style={{ marginBottom: '10px' }}>
//                 <strong>{doc.documentName}</strong> - Status: {doc.documentStatus} <br />
//                 {/* Button to view document using the new viewDocument function */}
//                 <Button variant="link" onClick={() => viewDocument(doc.documentImage)}>
//                   View Document
//                 </Button>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No documents found for this policy.</p>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={() => handleVerify('REJECTED')}>Reject</Button>
//         <Button variant="primary" onClick={() => handleVerify('APPROVED')}>Approve</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DocumentModal;

//000000000000000000000

// import React, { useState } from 'react';
// import { Modal, Button } from 'react-bootstrap';
// import axios from 'axios';

// const DocumentModal = ({ show, handleClose, documents, handleVerify }) => {
//   // Initialize state to track the approval status for each document
//   const [documentStatus, setDocumentStatus] = useState(
//     documents.reduce((acc, doc) => {
//       acc[doc.id] = doc.documentStatus || ''; // Initialize with existing status if available
//       return acc;
//     }, {})
//   );

//   // Function to view the document
//   const viewDocument = async (documentName) => {
//     try {
//       const response = await axios.get(`http://localhost:8080/E-Insurance/file/view/${documentName}`, {
//         responseType: 'blob', // Handle the file as binary
//       });

//       // Get the file type (MIME type) from the response headers
//       const contentType = response.headers['content-type'];

//       // Create a URL from the binary data and open it in a new tab
//       const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
//       const link = document.createElement('a');
//       link.href = url;

//       // If it's a viewable type like an image or PDF, open it in a new tab
//       if (contentType.includes('image') || contentType === 'application/pdf') {
//         link.setAttribute('target', '_blank');
//       }

//       link.click(); // Trigger file view/download
//     } catch (error) {
//       console.error('Error fetching document:', error);
//     }
//   };

//   // Function to handle the approval or rejection of a document
//   const handleStatusChange = (documentId, status) => {
//     setDocumentStatus((prevStatus) => ({
//       ...prevStatus,
//       [documentId]: status,
//     }));
//   };

//   // Function to submit the status for all documents (if needed in the parent component)
//   const handleSubmitAll = () => {
//     const updatedDocuments = documents.map((doc) => ({
//       ...doc,
//       documentStatus: documentStatus[doc.id], // Include the updated status in the document data
//     }));
//     handleVerify(updatedDocuments); // Call the handleVerify method with the updated documents
//   };

//   return (
//     <Modal show={show} onHide={handleClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Policy Documents</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         {documents.length > 0 ? (
//           <ul>
//             {documents.map((doc) => (
//               <li key={doc.id} style={{ marginBottom: '20px' }}>
//                 <strong>{doc.documentName}</strong> - Status: {documentStatus[doc.id] || 'Pending'} <br />
//                 {/* Button to view document using the viewDocument function */}
//                 <Button variant="link" onClick={() => viewDocument(doc.documentImage)}>
//                   View Document
//                 </Button>
//                 <div className="d-flex">
//                   {/* Approve button */}
//                   <Button
//                     variant={documentStatus[doc.id] === 'APPROVED' ? 'success' : 'outline-success'}
//                     onClick={() => handleStatusChange(doc.id, 'APPROVED')}
//                     style={{ marginRight: '10px' }}
//                   >
//                     Approve
//                   </Button>

//                   {/* Reject button */}
//                   <Button
//                     variant={documentStatus[doc.id] === 'REJECTED' ? 'danger' : 'outline-danger'}
//                     onClick={() => handleStatusChange(doc.id, 'REJECTED')}
//                   >
//                     Reject
//                   </Button>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p>No documents found for this policy.</p>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={handleClose}>
//           Close
//         </Button>
//         <Button variant="primary" onClick={handleSubmitAll}>
//           Submit All
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default DocumentModal;
//111111111111111111111111111111111111111111111111
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const DocumentModal = ({ show, handleClose, documents, handleVerify }) => {
  // Initialize state to track the approval status for each document
  const [documentStatus, setDocumentStatus] = useState(
    documents.reduce((acc, doc) => {
      acc[doc.id] = doc.documentStatus || ''; // Initialize with existing status if available
      return acc;
    }, {})
  );

  // Filter documents to show only those with REJECT, REJECTED, or PENDING status
  const filteredDocuments = documents.filter((doc) =>
    ['REJECT', 'REJECTED', 'PENDING'].includes(doc.documentStatus)
  );

  // Function to view the document
  const viewDocument = async (documentName) => {
    try {
      const response = await axios.get(`http://localhost:8080/E-Insurance/file/view/${documentName}`, {
        responseType: 'blob', // Handle the file as binary
      });

      const contentType = response.headers['content-type'];

      const url = window.URL.createObjectURL(new Blob([response.data], { type: contentType }));
      const link = document.createElement('a');
      link.href = url;

      // If it's a viewable type like an image or PDF, open it in a new tab
      if (contentType.includes('image') || contentType === 'application/pdf') {
        link.setAttribute('target', '_blank');
      }

      link.click(); // Trigger file view/download
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  // Function to handle the approval or rejection of a document
  const handleStatusChange = (documentId, status) => {
    setDocumentStatus((prevStatus) => ({
      ...prevStatus,
      [documentId]: status,
    }));
  };

  // Function to submit the status for all documents (if needed in the parent component)
  const handleSubmitAll = () => {
    const updatedDocuments = filteredDocuments.map((doc) => ({
      ...doc,
      documentStatus: documentStatus[doc.id], // Include the updated status in the document data
    }));
    handleVerify(updatedDocuments); // Call the handleVerify method with the updated documents
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Policy Documents</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {filteredDocuments.length > 0 ? (
          <ul>
            {filteredDocuments.map((doc) => (
              <li key={doc.id} style={{ marginBottom: '20px' }}>
                <strong>{doc.documentName}</strong> - Status: {documentStatus[doc.id] || 'Pending'} <br />
                {/* Button to view document using the viewDocument function */}
                <Button variant="link" onClick={() => viewDocument(doc.documentImage)}>
                  View Document
                </Button>
                <div className="d-flex">
                  {/* Approve button */}
                  <Button
                    variant={documentStatus[doc.id] === 'APPROVED' ? 'success' : 'outline-success'}
                    onClick={() => handleStatusChange(doc.id, 'APPROVED')}
                    style={{ marginRight: '10px' }}
                  >
                    Approve
                  </Button>

                  {/* Reject button */}
                  <Button
                    variant={documentStatus[doc.id] === 'REJECTED' ? 'danger' : 'outline-danger'}
                    onClick={() => handleStatusChange(doc.id, 'REJECTED')}
                  >
                    Reject
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>Documents verified.</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmitAll}>
          Submit All
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentModal;
