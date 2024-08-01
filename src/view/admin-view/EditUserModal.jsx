import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EditUserModal = ({ show, handleClose, user, handleSave }) => {
  const [formData, setFormData] = useState({ ...user });
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState(user.image || '');

  useEffect(() => {
    setFormData({ ...user });
    setImageURL(user.image || '');
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageURL(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleAddLink = () => {
    setFormData((prevData) => ({
      ...prevData,
      links: [...(prevData.links || []), { name: '', url: '', userId: prevData.id }],
    }));
  };

  const handleRemoveLink = (index) => {
    setFormData((prevData) => {
      return{
      ...prevData,
      links: prevData.links.filter((_, i) => i !== index),}
    });
  };

  const handleLinkChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      links: prevData.links.map((link, i) =>
        i === index ? { ...link, [name]: value } : link
      ),
    }));
  };

  const handleSubmit = async () => {
    const updatedData = { ...formData };
    if (file) {
      const uploadUrl = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';
      const uploadData = new FormData();
      uploadData.append('image', file);
      try {
        const result = await axios.post(uploadUrl, uploadData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        updatedData.image = result.data.data.url; // URL de la imagen subida
      } catch (error) {
        console.error('Error uploading image:', error);
        return; // Salir si hay un error
      }
    }

    handleSave(updatedData);
    handleClose();
  };

  const socialPlatforms = [
    { name: 'GitHub', value: 'github' },
    { name: 'LinkedIn', value: 'linkedin' },
    { name: 'YouTube', value: 'youtube' },
    { name: 'Facebook', value: 'facebook' },
    { name: 'Twitter', value: 'twitter' },
    { name: 'Google', value: 'google' },
  ];

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formUserName">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              type="text"
              name="userName"
              value={formData.userName || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formBio">
            <Form.Label>Bio</Form.Label>
            <Form.Control
              type="text"
              name="bio"
              value={formData.bio || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formAboutMe">
            <Form.Label>Acerca de mí</Form.Label>
            <Form.Control
              type="text"
              name="aboutMe"
              value={formData.aboutMe || ''}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formPlan">
            <Form.Label>Plan</Form.Label>
            <Form.Control
              as="select"
              name="planName"
              value={formData.planName || ''}
              onChange={handleChange}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </Form.Control>
          </Form.Group>

          {/* Enlaces */}
          <Form.Group controlId="formLinks">
            <Form.Label>Redes Sociales</Form.Label>
            {formData.links && formData.links.map((link, index) => (
              <div key={index} className="mb-3">
                <Form.Group>
                  <Form.Label>Plataforma</Form.Label>
                  <Form.Control
                    as="select"
                    name="name"
                    value={link.name || ''}
                    onChange={(e) => handleLinkChange(index, e)}
                  >
                    <option value="" disabled>Seleccionar una plataforma</option>
                    {socialPlatforms.map((platform) => (
                      <option key={platform.value} value={platform.value}>
                        {platform.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group>
                  <Form.Label>URL</Form.Label>
                  <Form.Control
                    type="url"
                    name="url"
                    value={link.url || ''}
                    onChange={(e) => handleLinkChange(index, e)}
                    placeholder="https://example.com"
                  />
                </Form.Group>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveLink(index)}
                  className="mt-2"
                >
                  Eliminar
                </Button>
              </div>
            ))}
            <Button
              variant="primary"
              onClick={handleAddLink}
            >
              Agregar Link
            </Button>
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Imagen de Perfil</Form.Label>
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
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
