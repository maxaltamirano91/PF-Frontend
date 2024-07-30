// import { useState, useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import {
// 	getProjectById,
// 	getUserProfile,
// 	deleteProject,
// } from '../../redux/actions'
// import { Button, Modal } from 'react-bootstrap'
// import Toastify from 'toastify-js'
// import 'toastify-js/src/toastify.css'
// import styles from './ProjectDetailPage.module.css'

// const ProjectDetailPage = () => {
// 	const navigate = useNavigate()
// 	const { id } = useParams()
// 	const { project } = useSelector((state) => state.projects)
// 	const { token, loggedUser } = useSelector((state) => state.auth)
// 	const dispatch = useDispatch()

// 	const [show, setShow] = useState(false)

// 	useEffect(() => {
// 		dispatch(getProjectById(id))
// 		dispatch(getUserProfile(token))
// 	}, [dispatch, id, token])

// 	const handleEdit = () => {
// 		navigate(`/modProject/${id}`)
// 	}

// 	const handleShow = () => {
// 		setShow(true)
// 	}

// 	const handleClose = () => setShow(false)

// 	const fileProject = () => {
// 		dispatch(deleteProject(id, token))
// 		Toastify({
// 			text: 'Proyecto archivado',
// 			duration: 3000,
// 			close: true,
// 			gravity: 'top',
// 			position: 'center',
// 			backgroundColor: '#4CAF50',
// 			stopOnFocus: true,
// 		}).showToast()
// 		navigate('/myprofile')
// 	}

// 	if (!project) return null

// 	return (
// 		<div className="container mt-5">
// 			<section className={styles.card}>
// 				<div className={styles.cardImageContainer}>
// 					<img
// 						className={styles.cardImage}
// 						src={project?.image}
// 						alt={project?.title}
// 					/>
// 				</div>
// 				<div className={styles.cardDetail}>
// 					<h1 className={styles.cardDetailTitle}>{project?.title}</h1>
// 					<p className={styles.cardDetailDesc}>{project?.description}</p>

// 					{project?.tags && (
// 						<div className={styles.tagsContainer}>
// 							{project?.tags.map((tag) => (
// 								<span key={tag.id} className={styles.tagText}>
// 									#{tag.tagName}
// 								</span>
// 							))}
// 						</div>
// 					)}

// 					<hr className={styles.divider} />

// 					{project?.technologies && (
// 						<div className={styles.technologiesContainer}>
// 							{project?.technologies.map((tech) => (
// 								<button
// 									key={tech.id}
// 									className={`btn ${styles.techButton}`}
// 									disabled
// 								>
// 									{tech.name}
// 								</button>
// 							))}
// 						</div>
// 					)}

// 					{loggedUser?.id !== undefined &&
// 						loggedUser?.id === project?.userId && (
// 							<div className={styles.buttonsContainer}>
// 								<button
// 									className={`btn btn-primary `}
// 									onClick={handleEdit}
// 									style={{ textDecoration: 'none', margin: '10px' }}
// 								>
// 									Modificar
// 								</button>
// 								<button
// 									className={`btn btn-secondary `}
// 									onClick={handleShow}
// 									style={{ textDecoration: 'none', margin: '10px' }}
// 								>
// 									Archivar
// 								</button>
// 								<Modal show={show} onHide={handleClose}>
// 									<Modal.Header closeButton>
// 										<Modal.Title>Confirmación</Modal.Title>
// 									</Modal.Header>
// 									<Modal.Body>
// 										¿Estás seguro que deseas archivar el proyecto?
// 									</Modal.Body>
// 									<Modal.Footer>
// 										<Button variant="secondary" onClick={handleClose}>
// 											Cancelar
// 										</Button>
// 										<Button variant="danger" onClick={fileProject}>
// 											Aceptar
// 										</Button>
// 									</Modal.Footer>
// 								</Modal>							
// 							</div>
// 						)}
// 				</div>
// 			</section>
// 		</div>
// 	)
// }

// export default ProjectDetailPage


// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Modal } from 'react-bootstrap';
// import Toastify from 'toastify-js';
// import 'toastify-js/src/toastify.css';
// import styles from './ProjectDetailPage.module.css';
// import { getProjectById, getUserProfile, deleteProject } from '../../redux/actions';
// import UpdateProjectPage from '../update-project-page/UpdateProjectPage'

// const ProjectDetailPage = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { project } = useSelector((state) => state.projects);
//     const { token, loggedUser } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();

//     const [show, setShow] = useState(false);
//     const [editModalShow, setEditModalShow] = useState(false);

//     useEffect(() => {
//         dispatch(getProjectById(id));
//         dispatch(getUserProfile(token));
//     }, [dispatch, id, token]);

//     const handleEdit = () => {
//         setEditModalShow(true);
//     };

//     const handleShow = () => {
//         setShow(true);
//     };

//     const handleClose = () => {
//         setShow(false);
//         setEditModalShow(false);
//     };

//     const fileProject = () => {
//         dispatch(deleteProject(id, token));
//         Toastify({
//             text: 'Proyecto archivado',
//             duration: 3000,
//             close: true,
//             gravity: 'top',
//             position: 'center',
//             backgroundColor: '#4CAF50',
//             stopOnFocus: true,
//         }).showToast();
//         navigate('/myprofile');
//     };

//     if (!project) return null;

//     return (
//         <div className="container mt-5">
//             <section className={styles.card}>
//                 <div className={styles.cardImageContainer}>
//                     <img
//                         className={styles.cardImage}
//                         src={project?.image}
//                         alt={project?.title}
//                     />
//                 </div>
//                 <div className={styles.cardDetail}>
//                     <h1 className={styles.cardDetailTitle}>{project?.title}</h1>
//                     <p className={styles.cardDetailDesc}>{project?.description}</p>

//                     {project?.tags && (
//                         <div className={styles.tagsContainer}>
//                             {project?.tags.map((tag) => (
//                                 <span key={tag.id} className={styles.tagText}>
//                                     #{tag.tagName}
//                                 </span>
//                             ))}
//                         </div>
//                     )}

//                     <hr className={styles.divider} />

//                     {project?.technologies && (
//                         <div className={styles.technologiesContainer}>
//                             {project?.technologies.map((tech) => (
//                                 <button
//                                     key={tech.id}
//                                     className={`btn ${styles.techButton}`}
//                                     disabled
//                                 >
//                                     {tech.name}
//                                 </button>
//                             ))}
//                         </div>
//                     )}

//                     {loggedUser?.id !== undefined &&
//                         loggedUser?.id === project?.userId && (
//                             <div className={styles.buttonsContainer}>
//                                 <button
//                                     className={`btn btn-primary `}
//                                     onClick={handleEdit}
//                                     style={{ textDecoration: 'none', margin: '10px' }}
//                                 >
//                                     Modificar
//                                 </button>
//                                 <button
//                                     className={`btn btn-secondary `}
//                                     onClick={handleShow}
//                                     style={{ textDecoration: 'none', margin: '10px' }}
//                                 >
//                                     Archivar
//                                 </button>
                                
                                
//                                 <Modal show={editModalShow} onHide={handleClose} className={styles.customModal} >
//                                     <Modal.Header closeButton>
//                                         <Modal.Title>Modificar Proyecto</Modal.Title>
//                                     </Modal.Header>
//                                     <Modal.Body>
//                                         <UpdateProjectPage />
//                                     </Modal.Body>
//                                     <Modal.Footer>
//                                         <Button variant="secondary" onClick={handleClose}>
//                                             Cerrar
//                                         </Button>
//                                     </Modal.Footer>
//                                 </Modal>

                                
//                                 <Modal show={show} onHide={handleClose}>
//                                     <Modal.Header closeButton>
//                                         <Modal.Title>Confirmación</Modal.Title>
//                                     </Modal.Header>
//                                     <Modal.Body>
//                                         ¿Estás seguro que deseas archivar el proyecto?
//                                     </Modal.Body>
//                                     <Modal.Footer>
//                                         <Button variant="secondary" onClick={handleClose}>
//                                             Cancelar
//                                         </Button>
//                                         <Button variant="danger" onClick={fileProject}>
//                                             Aceptar
//                                         </Button>
//                                     </Modal.Footer>
//                                 </Modal>
//                             </div>
//                         )}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default ProjectDetailPage;

// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { Button, Modal } from 'react-bootstrap';
// import Toastify from 'toastify-js';
// import 'toastify-js/src/toastify.css';
// import styles from './ProjectDetailPage.module.css';
// import { getProjectById, getUserProfile, deleteProject } from '../../redux/actions';
// import UpdateProjectPage from '../update-project-page/UpdateProjectPage';

// const ProjectDetailPage = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const { project } = useSelector((state) => state.projects);
//     const { token, loggedUser } = useSelector((state) => state.auth);
//     const dispatch = useDispatch();

//     const [show, setShow] = useState(false);
//     const [editModalShow, setEditModalShow] = useState(false);

//     useEffect(() => {
//         dispatch(getProjectById(id));
//         dispatch(getUserProfile(token));
//     }, [dispatch, id, token]);

//     const handleEdit = () => setEditModalShow(true);
//     const handleShow = () => setShow(true);
//     const handleClose = () => {
//         setShow(false);
//         setEditModalShow(false);
//     };

//     const fileProject = () => {
//         dispatch(deleteProject(id, token));
//         Toastify({
//             text: 'Proyecto archivado',
//             duration: 3000,
//             close: true,
//             gravity: 'top',
//             position: 'center',
//             backgroundColor: '#4CAF50',
//             stopOnFocus: true,
//         }).showToast();
//         navigate('/myprofile');
//     };

//     if (!project) return null;

//     return (
//         <div className="container mt-5">
//             <section className={styles.card}>
//                 <div className={styles.cardImageContainer}>
//                     <img
//                         className={styles.cardImage}
//                         src={project?.image}
//                         alt={project?.title}
//                     />
//                 </div>
//                 <div className={styles.cardDetail}>
//                     <h1 className={styles.cardDetailTitle}>{project?.title}</h1>
//                     <p className={styles.cardDetailDesc}>{project?.description}</p>

//                     {project?.tags && (
//                         <div className={styles.tagsContainer}>
//                             {project?.tags.map((tag) => (
//                                 <span key={tag.id} className={styles.tagText}>
//                                     #{tag.tagName}
//                                 </span>
//                             ))}
//                         </div>
//                     )}

//                     <hr className={styles.divider} />

//                     {project?.technologies && (
//                         <div className={styles.technologiesContainer}>
//                             {project?.technologies.map((tech) => (
//                                 <button
//                                     key={tech.id}
//                                     className={`btn ${styles.techButton}`}
//                                     disabled
//                                 >
//                                     {tech.name}
//                                 </button>
//                             ))}
//                         </div>
//                     )}

//                     {loggedUser?.id !== undefined &&
//                         loggedUser?.id === project?.userId && (
//                             <div className={styles.buttonsContainer}>
//                                 <Button variant="primary" onClick={handleEdit} style={{ margin: '10px' }}>
//                                     Modificar
//                                 </Button>
//                                 <Button variant="secondary" onClick={handleShow} style={{ margin: '10px' }}>
//                                     Archivar
//                                 </Button>

//                                 <Modal show={editModalShow} onHide={handleClose} className={styles.customModal}>
//                                     <Modal.Header closeButton>
//                                         <Modal.Title>Modificar Proyecto</Modal.Title>
//                                     </Modal.Header>
//                                     <Modal.Body>
//                                         <UpdateProjectPage />
//                                     </Modal.Body>
//                                 </Modal>

//                                 <Modal show={show} onHide={handleClose}>
//                                     <Modal.Header closeButton>
//                                         <Modal.Title>Confirmación</Modal.Title>
//                                     </Modal.Header>
//                                     <Modal.Body>
//                                         ¿Estás seguro que deseas archivar el proyecto?
//                                     </Modal.Body>
//                                     <Modal.Footer>
//                                         <Button variant="secondary" onClick={handleClose}>
//                                             Cancelar
//                                         </Button>
//                                         <Button variant="danger" onClick={fileProject}>
//                                             Aceptar
//                                         </Button>
//                                     </Modal.Footer>
//                                 </Modal>
//                             </div>
//                         )}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default ProjectDetailPage;


import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Toastify from 'toastify-js';
import 'toastify-js/src/toastify.css';
import styles from './ProjectDetailPage.module.css';
import { getProjectById, getUserProfile, deleteProject } from '../../redux/actions';
import UpdateProjectPage from '../update-project-page/UpdateProjectPage';

const ProjectDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { project } = useSelector((state) => state.projects);
    const { token, loggedUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [showArchiveModal, setShowArchiveModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);

    useEffect(() => {
        dispatch(getProjectById(id));
        dispatch(getUserProfile(token));
    }, [dispatch, id, token]);

    const handleEdit = () => setShowEditModal(true);
    const handleShowArchiveModal = () => setShowArchiveModal(true);
    const handleClose = () => {
        setShowArchiveModal(false);
        setShowEditModal(false);
    };

    const archiveProject = () => {
        dispatch(deleteProject(id, token));
        Toastify({
            text: 'Proyecto archivado',
            duration: 3000,
            close: true,
            gravity: 'top',
            position: 'center',
            backgroundColor: '#4CAF50',
            stopOnFocus: true,
        }).showToast();
        navigate('/myprofile');
    };

    if (!project) return null;

    return (
        <div className="container mt-5">
            <section className={styles.card}>
                <div className={styles.cardImageContainer}>
                    <img
                        className={styles.cardImage}
                        src={project?.image}
                        alt={project?.title}
                    />
                </div>
                <div className={styles.cardDetail}>
                    <h1 className={styles.cardDetailTitle}>{project?.title}</h1>
                    <p className={styles.cardDetailDesc}>{project?.description}</p>

                    {project?.tags && (
                        <div className={styles.tagsContainer}>
                            {project?.tags.map((tag) => (
                                <span key={tag.id} className={styles.tagText}>
                                    #{tag.tagName}
                                </span>
                            ))}
                        </div>
                    )}

                    <hr className={styles.divider} />

                    {project?.technologies && (
                        <div className={styles.technologiesContainer}>
                            {project?.technologies.map((tech) => (
                                <button
                                    key={tech.id}
                                    className={`btn ${styles.techButton}`}
                                    disabled
                                >
                                    {tech.name}
                                </button>
                            ))}
                        </div>
                    )}

                    {loggedUser?.id !== undefined &&
                        loggedUser?.id === project?.userId && (
                            <div className={styles.buttonsContainer}>
                                <Button variant="primary" onClick={handleEdit} style={{ margin: '10px' }}>
                                    Modificar
                                </Button>
                                <Button variant="secondary" onClick={handleShowArchiveModal} style={{ margin: '10px' }}>
                                    Archivar
                                </Button>

                                {showEditModal && (
                                    <div className={styles.modalOverlay} onClick={handleClose}>
                                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                            
                                            <UpdateProjectPage />
                                        </div>
                                    </div>
                                )}

                                {showArchiveModal && (
                                    <div className={styles.modalOverlay} onClick={handleClose}>
                                        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                            <h2>Confirmación</h2>
                                            <p>¿Estás seguro que deseas archivar el proyecto?</p>
                                            <Button variant="secondary" onClick={handleClose}>
                                                Cancelar
                                            </Button>
                                            <Button variant="danger" onClick={archiveProject}>
                                                Aceptar
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                </div>
            </section>
        </div>
    );
};

export default ProjectDetailPage;
