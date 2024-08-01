import { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditProjectModal = ({ show, handleClose, project, handleSave, technologies }) => {
    const [updatedProject, setUpdatedProject] = useState(project);
    const [file, setFile] = useState(null);
    const [imageURL, setImageURL] = useState(project.image || '');
    const [selectedTechs, setSelectedTechs] = useState(project.technologies ? project.technologies.map(tech => tech.name) : []);
    const [newTag, setNewTag] = useState('');
    const [tags, setTags] = useState(project.tags ? project.tags.map(tag => tag.tagName) : []);

    useEffect(() => {
        setUpdatedProject(project);
        setImageURL(project.image || '');
        setSelectedTechs(project.technologies ? project.technologies.map(tech => tech.name) : []);
        setTags(project.tags ? project.tags.map(tag => tag.tagName) : []);
    }, [project]);

    const handleTechChange = (event) => {
        const { value } = event.target;
        if (value && !selectedTechs.includes(value)) {
            setSelectedTechs([...selectedTechs, value]);
        }
    };

    const handleRemoveTech = (tech) => {
        setSelectedTechs(selectedTechs.filter(t => t !== tech));
    };

    const handleTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleAddTag = () => {
        if (newTag.trim() !== '' && !tags.includes(newTag.trim())) {
            setTags([...tags, newTag.trim()]);
            setNewTag('');
        }
    };

    const handleRemoveTag = (tag) => {
        setTags(tags.filter(t => t !== tag));
    };

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
        formData.append('tags', JSON.stringify(tags)); // Convert array to JSON string
    formData.append('technologies', JSON.stringify(selectedTechs));

        if (file) {
            const url = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';
            try {
                const imageData = new FormData();
                imageData.append('image', file);
                const result = await axios.post(url, imageData, {
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
        await handleSave(formData,updatedProject.id);
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
                    <Form.Group controlId="formTechnologies">
                        <Form.Label>Technologies</Form.Label>
                        <Form.Control
                            as="select"
                            onChange={handleTechChange}
                        >
                            <option value="">Select a technology</option>
                            {technologies.map((tech) => (
                                <option key={tech.id} value={tech.name}>
                                    {tech.name}
                                </option>
                            ))}
                        </Form.Control>
                        <div className="mt-2">
                            {selectedTechs.map((tech) => (
                                <span key={tech} className="badge bg-primary me-2">
                                    {tech}
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white ms-2"
                                        aria-label="Remove"
                                        onClick={() => handleRemoveTech(tech)}
                                    ></button>
                                </span>
                            ))}
                        </div>
                    </Form.Group>
                    <Form.Group controlId="formTags">
                        <Form.Label>Tags</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                type="text"
                                value={newTag}
                                onChange={handleTagChange}
                                className="form-control me-2"
                                placeholder="Add a tag"
                            />
                            <Button variant="primary" onClick={handleAddTag}>
                                Add
                            </Button>
                        </div>
                        <div className="mt-2">
                            {tags.map((tag) => (
                                <span key={tag} className="badge bg-secondary me-2">
                                    {tag}
                                    <button
                                        type="button"
                                        className="btn-close btn-close-white ms-2"
                                        aria-label="Remove"
                                        onClick={() => handleRemoveTag(tag)}
                                    ></button>
                                </span>
                            ))}
                        </div>
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
