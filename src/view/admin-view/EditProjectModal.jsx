import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditProjectModal = ({ show, handleClose, project, handleSave }) => {
    const [updatedProject, setUpdatedProject] = useState(project);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(project.image || '');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedProject((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('title', updatedProject.title);
        formData.append('description', updatedProject.description);
        formData.append('tags', JSON.stringify(updatedProject.tags));
        formData.append('technologies', JSON.stringify(updatedProject.technologies));
        
        if (file) {
            const url = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';
            try {
                const result = await axios.post(url, new FormData().append('image', file), {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                formData.append('image', result.data.data.url);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        } else {
            formData.append('image', imageURL);
        }
    
        handleSave(formData);
        handleClose();
    };
    

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={updatedProject.title}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="description"
                            value={updatedProject.description}
                            onChange={handleInputChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFile">
                        <Form.Label>Upload Image</Form.Label>
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        {imageURL && (
                            <img
                                src={imageURL}
                                alt="Preview"
                                style={{ marginTop: '10px', width: '100%', height: 'auto' }}
                            />
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditProjectModal;
