import axios from 'axios';
export const uploadFiles = async (fileInputs, uploadedDocuments = [], onUploadComplete) => {
    // Recursively handle file uploads
    const fileEntries = Object.entries(fileInputs);
    
    if (fileEntries.length === 0) {
      // If no files are left to upload, call the onUploadComplete callback
      onUploadComplete(uploadedDocuments);
      return;
    }
  
    const [documentName, file] = fileEntries[0];
    
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        // Call the API to upload the file
        const response = await axios.post("http://localhost:8080/E-Insurance/file/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
  
        if (response && response.data) {
          // Add the uploaded file's details to the uploadedDocuments array
          uploadedDocuments.push({
            documentName,
            documentStatus: "PENDING",
            documentImage: response.data.name,
          });
        }
  
      } catch (error) {
        console.error('Error uploading file ${documentName}:', error);
      }
    }
  
    // Remove the processed file and continue with the next file
    const remainingFiles = Object.fromEntries(fileEntries.slice(1));
    uploadFiles(remainingFiles, uploadedDocuments, onUploadComplete); // Call recursively
  };
