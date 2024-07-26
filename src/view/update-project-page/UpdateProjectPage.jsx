import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
    fetchTechnologies,
    getProjectById,
    updateProject,
} from '../../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { technologies } = useSelector((state) => state.technologies);
    const { project } = useSelector((state) => state.projects);
    const { token } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(fetchTechnologies());
        dispatch(getProjectById(id));
    }, [dispatch, id]);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        tags: [],
        technologies: [],
    });

    const [selectedTechs, setSelectedTechs] = useState([]);
    const [newTag, setNewTag] = useState('');
    const [imagenAddHosting, setImagenAddHosting] = useState('');

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                image: project.image || '',
                tags: project.tags ? project.tags.map(tag => tag.tagName) : [],
                technologies: project.technologies
                    ? project.technologies.map(tech => tech.name)
                    : [],
            });
            setSelectedTechs(
                project.technologies
                    ? project.technologies.map(tech => tech.name)
                    : []
            );
            setImagenAddHosting(project.image || '');
        }
    }, [project]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTechChange = (event) => {
        const { value } = event.target;
        if (value && !selectedTechs.includes(value)) {
            setSelectedTechs([...selectedTechs, value]);
        }
    };

    const handleRemoveTech = (tech) => {
        setSelectedTechs(selectedTechs.filter((value) => value !== tech));
    };

    const handleTagChange = (event) => {
        setNewTag(event.target.value);
    };

    const handleUploadImagen = async (e) => {
        const imageUpload = e.target.files[0];
        const url =
            'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';

        if (!imageUpload) {
            console.log('No file selected.');
            return;
        }

        const formData = new FormData();
        formData.append('image', imageUpload);

        try {
            const result = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            const urlImagen = result.data.data.url;
            setImagenAddHosting(urlImagen);
            console.log('Image uploaded successfully:', urlImagen);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleAddTag = () => {
        if (
            formData.tags.length < 5 &&
            newTag.trim() !== '' &&
            !formData.tags.includes(newTag.trim())
        ) {
            setFormData({
                ...formData,
                tags: [...formData.tags, newTag.trim()],
            });
            setNewTag('');
        }
    };

    const handleRemoveTag = (tag) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((t) => t !== tag),
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const dataToSubmit = {
            ...formData,
            technologies: selectedTechs,
            image: imagenAddHosting,
            id,
        };
        console.log('Submitting data:', dataToSubmit);
        dispatch(updateProject(dataToSubmit, token));
        navigate('/myprofile');
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <FormStyled onSubmit={handleSubmit} className="container mt-5">
            <h2 className="mb-4">Editar Proyecto</h2>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">
                    Nombre del Proyecto
                </label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className="form-control"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">
                    Descripción
                </label>
                <textarea
                    id="description"
                    name="description"
                    className="form-control"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="image" className="form-label">
                    Contenido Multimedia
                </label>
                <input
                    type="file"
                    id="image"
                    name="image"
                    className="form-control"
                    onChange={handleUploadImagen}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="technologies" className="form-label">
                    Tecnologías
                </label>
                <select
                    id="technologies"
                    name="technologies"
                    className="form-select"
                    onChange={handleTechChange}
                >
                    <option value="">Seleccione una tecnología</option>
                    {technologies.map((tech) => (
                        <option key={tech.id} value={tech.name}>
                            {tech.name}
                        </option>
                    ))}
                </select>
                <div className="mt-2">
                    {selectedTechs.map((tech, index) => (
                        <span key={`${tech}-${index}`} className="badge me-2">
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
            </div>
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">
                    Etiquetas
                </label>
                <div className="d-flex">
                    <input
                        type="text"
                        id="tags"
                        value={newTag}
                        onChange={handleTagChange}
                        className="form-control me-2"
                        placeholder="Agregar etiqueta"
                    />
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddTag}
                    >
                        Agregar
                    </button>
                </div>
                <div className="mt-2">
                    {formData.tags.map((tag, index) => (
                        <span key={`${tag}-${index}`} className="badge me-2">
                            {tag}
                            <button
                                type="button"
                                className="btn-close btn-close-dark ms-2"
                                aria-label="Remove"
                                onClick={() => handleRemoveTag(tag)}
                            ></button>
                        </span>
                    ))}
                </div>
            </div>
            <button type="submit" className="btn btn-primary">
                Actualizar Proyecto
            </button>
        </FormStyled>
    );
};

const FormStyled = styled.form`
    max-width: 600px;
    margin: 0 auto;
`;

export default UpdateProjectPage;
