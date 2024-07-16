import axios from 'axios';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTechnologies, getProjectById, modifyProject } from '../../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { technologies } = useSelector((state) => state.technologies);
    const project = useSelector((state) => state.detail.project);
    const authToken = useSelector((state) => state.auth.authToken);

    const getToken = () => {
        return localStorage.getItem('authToken');
    };

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
                tags: project.tags ? [...project.tags] : [],
                technologies: project.technologies ? [...project.technologies.map(tech => tech.name)] : [],
            });
            setSelectedTechs(project.technologies ? [...project.technologies.map(tech => tech.name)] : []);
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
        if (!selectedTechs.includes(value)) {
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
        const url = `https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3`;
        let urlImagen = null;

        try {
            const formData = new FormData();
            formData.append('image', imageUpload);

            const result = await axios.post(url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            urlImagen = await result.data.data.url;
        } catch (error) {
            console.log(error);
        }
        setImagenAddHosting(urlImagen);
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

        if (!formData.title) {
            alert('El título es obligatorio');
            return;
        }

        if (
            formData.description === '' ||
            formData.image === '' ||
            formData.tags.length === 0 ||
            selectedTechs.length === 0
        ) {
            if (!window.confirm('Algunos campos están vacíos. ¿Desea continuar?')) {
                return;
            }
        }

        const dataToSubmit = {
            ...formData,
            technologies: selectedTechs,
            image: imagenAddHosting,
        };

        try {
            const response = await axios.put(
                `http://localhost:3001/projects/${id}`,
                dataToSubmit,
                {
                    headers: {
                        Authorization: `Bearer ${getToken()}`,
                    },
                }
            );
            console.log('Se modificó el proyecto:', response.data);
            window.alert(`${formData.title} actualizado en la Base de Datos`);

            navigate(`/home`);
        } catch (error) {
            console.error('Error al modificar el proyecto:', error);
            window.alert('Error al modificar');
        }
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <FormStyled onSubmit={handleSubmit}>
            <div className="form-header">
                <span>Editar proyecto</span>
            </div>

            <div className="form-body">
                <div className="form-field">
                    <label>Nombre del Proyecto</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-field mt-2">
                    <label>Descripción</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-field mt-2">
                    <label>Contenido multimedia</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleUploadImagen}
                        placeholder="subir imagen"
                    />
                </div>

                <div className="form-field mt-2">
                    <label>Tecnologías</label>
                    <select name="technologies" onChange={handleTechChange}>
                        <option value="default">Seleccione una tecnología</option>
                        {technologies.map((tech) => (
                            <option key={tech.id} value={tech.name}>
                                {tech.name}
                            </option>
                        ))}
                    </select>

                    {selectedTechs.map((tech) => (
                        <div key={tech} className="techList my-1">
                            <span className="itemTech">{tech}</span>
                            <button
                                className="btn btn-outline-danger remove mx-2"
                                type="button"
                                onClick={() => handleRemoveTech(tech)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                </div>

                <div className="form-field mt-2">
                    <label>Etiquetas</label>
                    <div className="tag-input">
                        <input
                            type="text"
                            value={newTag}
                            onChange={handleTagChange}
                            placeholder="Agregar etiqueta"
                        />
                        <button type="button" onClick={handleAddTag}>
                            Agregar
                        </button>
                    </div>
                    <div className="tag-list">
                        {formData.tags.map((tag) => (
                            <div key={tag} className="tag-item">
                                <span>{tag}</span>
                                <button type="button" onClick={() => handleRemoveTag(tag)}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="form-footer">
                <button className="submit" type="submit">
                    Guardar cambios
                </button>
            </div>
        </FormStyled>
    );
};

export default UpdateProjectPage;

const FormStyled = styled.form`
    max-width: 350px;
    margin: auto;
    margin-top: 56px;
    border: 1px solid #0000004d;
    border-radius: 20px;
    button {
        border-radius: 12px;
    }

    .form-header {
        font-weight: 600;
        border-bottom: 1px solid #0000004d;
        padding: 12px;
    }

    .form-body {
        padding: 12px;
    }
    .form-field {
        display: flex;
        flex-direction: column;
    }
    .form-field-image {
        display: inline-flex;
        flex-direction: column;
        span {
            font-weight: 600;
        }
    }
    .form-footer {
        display: flex;
        justify-content: end;
        border-top: 1px solid #0000004d;
        padding: 12px;
    }
    .tag-input {
        display: flex;
        gap: 8px;
    }
    .tag-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 8px;
    }
    .tag-item {
        display: flex;
        align-items: center;
        background-color: #e0e0e0;
        padding: 4px 8px;
        border-radius: 16px;
    }
`;
