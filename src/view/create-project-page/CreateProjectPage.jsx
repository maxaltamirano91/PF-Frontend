import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTechnologies } from '../../redux/actions';

const CreateProjectPage = () => {
  const dispatch = useDispatch();
  const { technologies } = useSelector((state) => state.technologies);

  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  useEffect(() => {
    dispatch(fetchTechnologies());
  }, [dispatch]);

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
      urlImagen = result.data.data.url;
      setImagenAddHosting(urlImagen);
    } catch (error) {
      console.log(error);
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

    if (!formData.title) {
      alert('El título es obligatorio');
      return;
    }

    if (
      formData.description === '' ||
      imagenAddHosting === '' ||
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
    console.log(dataToSubmit);

    try {
      const response = await axios.post(
        '/projects',
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log('Se agregó el proyecto:', response.data);
      window.alert(`${formData.title} agregado a la Base de Datos`);

      setFormData({
        title: '',
        description: '',
        image: '',
        tags: [],
        technologies: [],
      });
      setSelectedTechs([]);
      setNewTag('');
      setImagenAddHosting('');
    } catch (error) {
      console.error('Error al agregar el proyecto:', error);
      window.alert('Error al agregar');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h2>Añadir proyecto</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Nombre del Proyecto</label>
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
              <label htmlFor="description" className="form-label">Descripción</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Contenido multimedia</label>
              <input
                type="file"
                className="form-control"
                id="image"
                name="image"
                onChange={handleUploadImagen}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="technologies" className="form-label">Tecnologías</label>
              <select className="form-select" id="technologies" name="technologies" onChange={handleTechChange}>
                <option value="default">Seleccione una tecnología</option>
                {technologies.map((tech) => (
                  <option key={tech.id} value={tech.name}>
                    {tech.name}
                  </option>
                ))}
              </select>
              <div className="mt-2">
                {selectedTechs.map((tech) => (
                  <span key={tech} className="badge me-2">
                    {tech}
                    <button
                      type="button"
                      className="btn-close ms-1"
                      onClick={() => handleRemoveTech(tech)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="tags" className="form-label">Etiquetas</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  id="tags"
                  value={newTag}
                  onChange={handleTagChange}
                  placeholder="Agregar etiqueta"
                />
                <button type="button" className="btn btn-primary" onClick={handleAddTag}>
                  Agregar
                </button>
              </div>
              <div className="mt-2">
                {formData.tags.map((tag) => (
                  <span key={tag} className="badge me-2">
                    {tag}
                    <button
                      type="button"
                      className="btn-close ms-1"
                      onClick={() => handleRemoveTag(tag)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success">
                Guardar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProjectPage;
