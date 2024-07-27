// import axios from 'axios';
// import { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchTechnologies } from '../../redux/actions';
// import Toastify from 'toastify-js';
// import 'toastify-js/src/toastify.css';

// const CreateProjectPage = () => {
//   const dispatch = useDispatch();
//   const { technologies } = useSelector((state) => state.technologies);

//   const getToken = () => localStorage.getItem('authToken');

//   useEffect(() => {
//     dispatch(fetchTechnologies());
//   }, [dispatch]);

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     image: '',
//     tags: [],
//     technologies: [],
//   });

//   const [selectedTechs, setSelectedTechs] = useState([]);
//   const [newTag, setNewTag] = useState('');
//   const [imagenAddHosting, setImagenAddHosting] = useState('');

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleTechChange = (event) => {
//     const { value } = event.target;
//     if (!selectedTechs.includes(value)) {
//       const updatedTechs = [...selectedTechs, value];
//       setSelectedTechs(updatedTechs);
//       setFormData({
//         ...formData,
//         technologies: updatedTechs,
//       });
//     }
//   };

//   const handleRemoveTech = (tech) => {
//     const updatedTechs = selectedTechs.filter((value) => value !== tech);
//     setSelectedTechs(updatedTechs);
//     setFormData({
//       ...formData,
//       technologies: updatedTechs,
//     });
//   };

//   const handleTagChange = (event) => {
//     setNewTag(event.target.value);
//   };

//   const handleUploadImagen = async (e) => {
//     const imageUpload = e.target.files[0];
//     const url = `https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3`;

//     if (!imageUpload) return; 

//     try {
//       const formData = new FormData();
//       formData.append('image', imageUpload);

//       const result = await axios.post(url, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       setImagenAddHosting(result.data.data.url);
//     } catch (error) {
//       console.error('Error al subir la imagen:', error);
//     }
//   };

//   const handleAddTag = () => {
//     if (
//       formData.tags.length < 5 &&
//       newTag.trim() !== '' &&
//       !formData.tags.some(tag => tag.tagName === newTag.trim())
//     ) {
//       const updatedTags = [...formData.tags, { tagName: newTag.trim() }];
//       setFormData({
//         ...formData,
//         tags: updatedTags,
//       });
//       setNewTag('');
//     }
//   };

//   const handleRemoveTag = (tagName) => {
//     const updatedTags = formData.tags.filter((t) => t.tagName !== tagName);
//     setFormData({
//       ...formData,
//       tags: updatedTags,
//     });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!formData.title) {
//       alert('El título es obligatorio');
//       return;
//     }

//     if (
//       formData.description === '' ||
//       imagenAddHosting === '' ||
//       formData.tags.length === 0 ||
//       selectedTechs.length === 0
//     ) {
//       if (!window.confirm('Algunos campos están vacíos. ¿Desea continuar?')) {
//         return;
//       }
//     }

//     const dataToSubmit = {
//       ...formData,
//       technologies: selectedTechs,
//       image: imagenAddHosting,
//     };

//     console.log('Datos a enviar al backend:', dataToSubmit); 

//     try {
//       const response = await axios.post(
//         'http://localhost:3001/projects',
//         dataToSubmit,
//         {
//           headers: {
//             Authorization: `Bearer ${getToken()}`,
//           },
//         }
//       );
//       console.log('Se agregó el proyecto:', response.data);
//       window.alert(`${formData.title} agregado a la Base de Datos`);

//       setFormData({
//         title: '',
//         description: '',
//         image: '',
//         tags: [],
//         technologies: [],
//       });
//       setSelectedTechs([]);
//       setImagenAddHosting('');
//     } catch (error) {
//       console.error('Error al agregar el proyecto:', error);
//       console.error('Error detalle:', error.response ? error.response.data : error.message);
//       window.alert('Error al agregar');
//     }
//   };

//   return (
//     <div className="container mt-5">
//       <div className="card">
//         <div className="card-header">
//           <h2>Añadir proyecto</h2>
//         </div>
//         <div className="card-body">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label htmlFor="title" className="form-label">
//                 Nombre del Proyecto
//               </label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="description" className="form-label">
//                 Descripción
//               </label>
//               <textarea
//                 className="form-control"
//                 id="description"
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="image" className="form-label">
//                 Contenido multimedia
//               </label>
//               <input
//                 type="file"
//                 className="form-control"
//                 id="image"
//                 name="image"
//                 onChange={handleUploadImagen}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="technologies" className="form-label">
//                 Tecnologías
//               </label>
//               <select
//                 className="form-select"
//                 id="technologies"
//                 name="technologies"
//                 onChange={handleTechChange}
//               >
//                 <option value="default">Seleccione una tecnología</option>
//                 {technologies.map((tech) => (
//                   <option key={tech.id} value={tech.name}>
//                     {tech.name}
//                   </option>
//                 ))}
//               </select>
//               <div className="mt-2">
//                 {selectedTechs.map((tech) => (
//                   <span key={tech} className="badge me-2">
//                     {tech}
//                     <button
//                       type="button"
//                       className="btn-close ms-1"
//                       onClick={() => handleRemoveTech(tech)}
//                     ></button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div className="mb-3">
//               <label htmlFor="tags" className="form-label">
//                 Etiquetas
//               </label>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="tags"
//                   value={newTag}
//                   onChange={handleTagChange}
//                   placeholder="Agregar etiqueta"
//                 />
//                 <button
//                   type="button"
//                   className="btn btn-primary"
//                   onClick={handleAddTag}
//                 >
//                   Agregar
//                 </button>
//               </div>
//               <div className="mt-2">
//                 {formData.tags.map((tag) => (
//                   <span key={tag.tagName} className="badge me-2">
//                     {tag.tagName}
//                     <button
//                       type="button"
//                       className="btn-close ms-1"
//                       onClick={() => handleRemoveTag(tag.tagName)}
//                     ></button>
//                   </span>
//                 ))}
//               </div>
//             </div>
//             <div className="d-flex justify-content-end">
//               <button type="submit" className="btn btn-success">
//                 Guardar
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateProjectPage;

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTechnologies } from '../../redux/actions';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import styles from './CreateProjectPage.module.css';

const CreateProjectPage = () => {
  const dispatch = useDispatch();
  const { technologies } = useSelector((state) => state.technologies);

  const getToken = () => localStorage.getItem('authToken');

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
      const updatedTechs = [...selectedTechs, value];
      setSelectedTechs(updatedTechs);
      setFormData({
        ...formData,
        technologies: updatedTechs,
      });
    }
  };

  const handleRemoveTech = (tech) => {
    const updatedTechs = selectedTechs.filter((value) => value !== tech);
    setSelectedTechs(updatedTechs);
    setFormData({
      ...formData,
      technologies: updatedTechs,
    });
  };

  const handleTagChange = (event) => {
    setNewTag(event.target.value);
  };

  const handleUploadImagen = async (e) => {
    const imageUpload = e.target.files[0];
    const url = 'https://api.imgbb.com/1/upload?key=54253385757dc7d196411b16962bfda3';

    if (!imageUpload) return;

    try {
      const formData = new FormData();
      formData.append('image', imageUpload);

      const result = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setImagenAddHosting(result.data.data.url);
    } catch (error) {
      console.error('Error al subir la imagen:', error);
    }
  };

  const handleAddTag = () => {
    if (
      formData.tags.length < 5 &&
      newTag.trim() !== '' &&
      !formData.tags.some((tag) => tag.tagName === newTag.trim())
    ) {
      const updatedTags = [...formData.tags, { tagName: newTag.trim() }];
      setFormData({
        ...formData,
        tags: updatedTags,
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagName) => {
    const updatedTags = formData.tags.filter((t) => t.tagName !== tagName);
    setFormData({
      ...formData,
      tags: updatedTags,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title) {
      Toastify({
        text: 'El título es obligatorio',
        backgroundColor: 'red',
      }).showToast();
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

    console.log('Datos a enviar al backend:', dataToSubmit);

    try {
      const response = await axios.post(
        'http://localhost:3001/projects',
        dataToSubmit,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      console.log('Se agregó el proyecto:', response.data);
      Toastify({
        text: `${formData.title} agregado a la Base de Datos`,
        backgroundColor: 'green',
      }).showToast();

      setFormData({
        title: '',
        description: '',
        image: '',
        tags: [],
        technologies: [],
      });
      setSelectedTechs([]);
      setImagenAddHosting('');
    } catch (error) {
      console.error('Error al agregar el proyecto:', error);
      console.error(
        'Error detalle:',
        error.response ? error.response.data : error.message
      );
      Toastify({
        text: 'Error al agregar',
        backgroundColor: 'red',
      }).showToast();
    }
  };

  return (
    <div className={`w-100 h-100 d-flex justify-content-center align-items-center ${styles.container}`}>
      <div className={`card ${styles.card}`}>
        <div className={`card-header ${styles.header}`}>
          <h2>Añadir proyecto</h2>
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
                Contenido multimedia
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
                  <span key={tag.tagName} className={`badge ${styles.tagBadge} me-2`}>
                    {tag.tagName}
                    <button
                      type="button"
                      className={`btn-close ms-1 ${styles.btnClose}`}
                      onClick={() => handleRemoveTag(tag.tagName)}
                    ></button>
                  </span>
                ))}
              </div>
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className={`btn btn-green-moon ${styles.buttonLike}`}>
                Guardar
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

export default CreateProjectPage;
