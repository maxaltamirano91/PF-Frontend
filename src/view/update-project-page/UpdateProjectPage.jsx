import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTechnologies, getProjectById, modifyProject } from '../../redux/actions';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProjectPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { technologies } = useSelector((state) => state.technologies);
    const project = useSelector((state) => state.detail.project); 
    const authToken = useSelector((state) => state.auth.authToken);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        tags: '',
        technologies: [],
    });

    useEffect(() => {
        dispatch(fetchTechnologies());
        dispatch(getProjectById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (project) {
            setFormData({
                title: project.title || '',
                description: project.description || '',
                image: project.image || '',
                tags: project.tags ? project.tags.join(', ') : '',
                technologies: project.technologies ? project.technologies.map(tech => tech.name) : [],
            });
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
        const { value, checked } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            technologies: checked
                ? [...prevState.technologies, value]
                : prevState.technologies.filter((tech) => tech !== value),
        }));
    };

    const handleTagChange = (event) => {
        setFormData({
            ...formData,
            tags: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await dispatch(modifyProject({ ...formData, id, authToken }));
            alert("Proyecto alterado exitosamente");
            navigate(`/home`);
        } catch (error) {
            console.error('Error modifying project:', error);
            // Manejar el error de manera apropiada
        }
    };

    if (!project) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ width: "50%" }} className="mx-auto mt-5">
            <form onSubmit={handleSubmit}>
                <div className="align-items-center">
                    <label htmlFor="title" style={{ color: "white", fontSize: "20px" }}>Título:</label><br />
                    <input type="text" id="title" name="title" style={{ backgroundColor: "#212529", border: "1pt solid #656768", width: "100%", fontSize: "21px" }} className='mb-3' onChange={handleChange} value={formData.title} required /> <br />
                </div>
                <div>
                    <label htmlFor="description" style={{ color: "white", fontSize: "20px" }}>Descripción de proyecto:</label><br />
                    <textarea id="description" name="description" style={{ backgroundColor: "#212529", border: "1pt solid #656768", width: "100%", fontSize: "21px" }} className='mb-3' onChange={handleChange} value={formData.description} required /> <br />
                </div>
                <div>
                    <label htmlFor="technologies" style={{ color: "white", fontSize: "20px" }}>Tecnologías:</label><br />
                    <ul>
                        {technologies.map((tech) => (
                            <li key={tech.id} style={{ display: "inline-block", margin: "9px" }}>
                                <input id={tech.name} name="technologies" type="checkbox" value={tech.name} onChange={handleTechChange} checked={formData.technologies.includes(tech.name)} />
                                <label htmlFor={tech.name} style={{ fontSize: "20px", fontWeight: "bold" }}>{tech.name}</label>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <label htmlFor="tags" style={{ color: "white", fontSize: "20px" }}>Tags:</label><br />
                    <input type="text" id="tags" name="tags" style={{ backgroundColor: "#212529", border: "1pt solid #656768", width: "100%", fontSize: "21px" }} className='mb-3' onChange={handleTagChange} value={formData.tags} required /> <br />
                </div>
                <div>
                    <label htmlFor="image" style={{ color: "white", fontSize: "20px" }}>Imagen representativa:</label><br />
                    <input type="text" id="image" name="image" style={{ backgroundColor: "#212529", border: "1pt solid #656768", width: "100%", fontSize: "21px" }} className='mb-3' onChange={handleChange} value={formData.image} required />
                </div>
                <button type="submit" className='palabra' style={{ cursor: "pointer", border: "0px", borderRadius: "10px", padding: "5px 10px", fontWeight: "bold", fontSize: "20px" }}>Modificar Proyecto</button>
            </form>
        </div>
    );
};

export default UpdateProjectPage;
