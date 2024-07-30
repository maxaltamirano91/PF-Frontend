import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import {
    fetchTechnologies,
    getProjectById,
    updateProject,
} from '../../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './UpdateProjectPage.module.css';

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
        event.preventDefault();
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
        <div className={`w-100 h-100 d-flex justify-content-center align-items-center ${styles.container}`}>
            <div className={`card ${styles.card}`}>
                <div className={`card-header ${styles.header}`}>
                    <h2>Editar Proyecto</h2>
                </div>
                <div className="card-body d-flex">
                    <form onSubmit={handleSubmit} className="flex-grow-1 me-3">
                        <div className="mb-3">
                            <label htmlFor="title" className={`form-label ${styles.inheritColor}`}>
                                Nombre del Proyecto
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className={`form-label ${styles.inheritColor}`}>
                                Descripción
                            </label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className={`form-label ${styles.inheritColor}`}>
                                Contenido Multimedia
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                id="image"
                                name="image"
                                onChange={handleUploadImagen}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="technologies" className={`form-label ${styles.inheritColor}`}>
                                Tecnologías
                            </label>
                            <select
                                className="form-select"
                                id="technologies"
                                name="technologies"
                                onChange={handleTechChange}
                            >
                                <option value="default">Seleccione una tecnología</option>
                                {technologies.map((tech) => (
                                    <option key={tech.id} value={tech.name}>
                                        {tech.name}
                                    </option>
                                ))}
                            </select>
                            <div className="mt-2">
                                {selectedTechs.map((tech) => (
                                    <span key={tech} className={`badge ${styles.techBadge} me-2`}>
                                        {tech}
                                        <button
                                            type="button"
                                            className={`btn-close ms-1 ${styles.btnClose}`}
                                            onClick={() => handleRemoveTech(tech)}
                                        ></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="tags" className={`form-label ${styles.inheritColor}`}>
                                Etiquetas
                            </label>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="tags"
                                    value={newTag}
                                    onChange={handleTagChange}
                                    placeholder="Agregar etiqueta"
                                />
                                <button
                                    type="button"
                                    className={`btn btn-primary ${styles.addButton}`}
                                    onClick={handleAddTag}
                                >
                                    Agregar
                                </button>
                            </div>
                            <div className="mt-2">
                                {formData.tags.map((tag) => (
                                    <span key={tag} className={`badge ${styles.tagBadge} me-2`}>
                                        #{tag}
                                        <button
                                            type="button"
                                            className={`btn-close ms-1 ${styles.btnClose}`}
                                            onClick={() => handleRemoveTag(tag)}
                                        ></button>
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className="d-flex justify-content-end">
                            <button type="submit" className="btn btn-success">
                                Actualizar Proyecto
                            </button>
                        </div>
                    </form>
                    {imagenAddHosting && (
                        <div className={styles.imageContainer}>
                            <h4 className={styles.imagePreviewLabel}>Image preview</h4>
                            <img src={imagenAddHosting} alt="Imagen seleccionada" className={styles.imagePreview} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UpdateProjectPage;
