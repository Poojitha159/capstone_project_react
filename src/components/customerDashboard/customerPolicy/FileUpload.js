import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');
    const token = localStorage.getItem('authToken'); // Get your auth token if needed

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file to upload.");
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("description", description); // Append description if needed

        try {
            const response = await axios.post('http://localhost:8080/E-Insurance/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`, // Include token if required
                },
            });
            console.log("File uploaded successfully:", response.data);
            alert("File uploaded successfully!");
            // Handle further actions if needed, e.g., refresh document list
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="fileUpload">
                <Form.Label>Choose File</Form.Label>
                <Form.Control type="file" onChange={handleFileChange} />
            </Form.Group>
            <Form.Group controlId="fileDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter a description for the file"
                    value={description}
                    onChange={handleDescriptionChange}
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Upload
            </Button>
        </Form>
    );
};

export default FileUpload;
