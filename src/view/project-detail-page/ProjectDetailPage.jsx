// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate, useParams } from 'react-router-dom'
// import {
// 	getProjectById,
// 	getUserProfile,
// 	deleteProject,
// } from '../../redux/actions'

// const ProjectDetailPage = () => {
// 	const navigate = useNavigate()
// 	const { id } = useParams()
// 	const { project } = useSelector((state) => state.projects)
// 	const { token, loggedUser } = useSelector((state) => state.auth)
// 	const dispatch = useDispatch()

// 	const handleEdit = () => {
// 		navigate(`/modProject/${id}`)
// 	}

// 	useEffect(() => {
// 		console.log(id, { token })
// 		dispatch(getProjectById(id))
// 		dispatch(getUserProfile({ token }))
// 	}, [dispatch, id])

// 	const DeleteProject = () => {
// 		dispatch(deleteProject(id, { token }))
// 		alert('Proyecto eliminado exitosamente')
// 		navigate('/home')
// 	}

// 	if (!project) return null

// 	return (
// 		project && (
// 			<div className="container mt-5">
// 				<div className="row">
// 					<div className="col-md-8 mx-auto">
// 						<div className="card">
// 							<img
// 								src={project?.image}
// 								className="card-img-top"
// 								alt={project?.title}
// 							/>
// 							<div className="card-body">
// 								<h5 className="card-title">{project?.title}</h5>
// 								<p className="card-text">{project?.description}</p>
// 								{project?.tags && (
// 									<ul className="list-group list-group-flush">
// 										{project?.tags.map((tag, index) => (
// 											<li key={index} className="list-group-item">
// 												{tag}
// 											</li>
// 										))}
// 									</ul>
// 								)}
// 								{project?.technologies && (
// 									<ul>
// 										{project?.technologies.map((tech) => (
// 											<li key={tech.id}>{tech.name}</li>
// 										))}
// 									</ul>
// 								)}
// 								{loggedUser?.id !== undefined ? (
// 									loggedUser?.id === project?.userId ? (
// 										<div>
// 											<button
// 												className="btn btn-primary mt-3"
// 												onClick={handleEdit}
// 											>
// 												Edit Project
// 											</button>
// 											<button
// 												className="btn btn-custom border"
// 												onClick={DeleteProject}
// 												style={{ textDecoration: 'none', margin: '10px' }}
// 											>
// 												Eliminar
// 											</button>
// 										</div>
// 									) : null
// 								) : null}
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</div>
// 		)
// 	)
// }

// export default ProjectDetailPage

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate, useParams } from 'react-router-dom';
// import { getProjectById, getUserProfile, deleteProject } from '../../redux/actions';
// import styles from './ProjectDetailPage.module.css'; // Ensure you use CSS Modules

// const ProjectDetailPage = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { project } = useSelector((state) => state.projects);
//   const { token, loggedUser } = useSelector((state) => state.auth);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProjectById(id));
//     dispatch(getUserProfile(token));
//   }, [dispatch, id, token]);

//   const handleEdit = () => {
//     navigate(`/modProject/${id}`);
//   };

//   const handleDelete = () => {
//     dispatch(deleteProject(id, token));
//     alert('Proyecto eliminado exitosamente');
//     navigate('/home');
//   };

//   if (!project) return null;

//   return (
//     <div className="container mt-5">
//       <section className={styles.card}>
//         <div className={styles.cardImageContainer}>
//           <img
//             className={styles.cardImage}
//             src={project.image}
//             alt={project.title}
//           />
//         </div>
//         <div className={styles.cardDetail}>
//           <button
//             type="button"
//             className={`btn-close ${styles.closeButton}`}
//             aria-label="Close"
//             onClick={() => navigate('/home')}
//           ></button>
//           <p className={styles.cardDetailCaption}>PROJECT</p>
//           <h1 className={styles.cardDetailTitle}>{project.title}</h1>
//           <p className={styles.cardDetailDesc}>{project.description}</p>

//           {project.tags && (
//             <div className={styles.tagsContainer}>
//               {project.tags.map((tag, index) => (
//                 <button
//                   key={index}
//                   className={`btn ${styles.tagButton}`}
//                   disabled
//                 >
//                   {tag}
//                 </button>
//               ))}
//             </div>
//           )}

//           <hr className={styles.divider} />

//           {project.technologies && (
//             <ul>
//               {project.technologies.map((tech) => (
//                 <li key={tech.id}>{tech.name}</li>
//               ))}
//             </ul>
//           )}

//           {loggedUser.id !== undefined && loggedUser.id === project.userId && (
//             <div className={styles.buttonsContainer}>
//               <button
//                 className={`btn ${styles.modifyButton}`}
//                 onClick={handleEdit}
//                 style={{ textDecoration: 'none', margin: '10px' }}
//               >
//                 Modificar
//               </button>
//               <button
//                 className={`btn ${styles.deleteButton}`}
//                 onClick={handleDelete}
//                 style={{ textDecoration: 'none', margin: '10px' }}
//               >
//                 Eliminar
//               </button>
//             </div>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ProjectDetailPage;


import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, getUserProfile, deleteProject } from '../../redux/actions';
import styles from './ProjectDetailPage.module.css'; // Ensure you use CSS Modules

const ProjectDetailPage = () => {
const navigate = useNavigate();
const { id } = useParams();
const { project } = useSelector((state) => state.projects);
const { token, loggedUser } = useSelector((state) => state.auth);
const dispatch = useDispatch();

useEffect(() => {
    dispatch(getProjectById(id));
    dispatch(getUserProfile(token));
}, [dispatch, id, token]);

const handleEdit = () => {
    navigate(`/modProject/${id}`);
};

const handleDelete = () => {
    dispatch(deleteProject(id, token));
    alert('Proyecto eliminado exitosamente');
    navigate('/home');
};

if (!project) return null;

return (
    <div className="container mt-5">
    <section className={styles.card}>
        <div className={styles.cardImageContainer}>
        <img
            className={styles.cardImage}
            src={project.image}
            alt={project.title}
        />
        </div>
        <div className={styles.cardDetail}>
        <button
            type="button"
            className={`btn-close ${styles.closeButton}`}
            aria-label="Close"
            onClick={() => navigate('/home')}
        ></button>
        <p className={styles.cardDetailCaption}>PROJECT</p>
        <h1 className={styles.cardDetailTitle}>{project.title}</h1>
        <p className={styles.cardDetailDesc}>{project.description}</p>

        {project.tags && (
            <div className={styles.tagsContainer}>
            {project.tags.map((tag, index) => (
                <button
                key={index}
                className={`btn ${styles.tagButton}`}
                disabled
                >
                {tag}
                </button>
            ))}
            </div>
        )}

        <hr className={styles.divider} />

        {project.technologies && (
            <div className={styles.technologiesContainer}>
            {project.technologies.map((tech) => (
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

        {loggedUser.id !== undefined && loggedUser.id === project.userId && (
            <div className={styles.buttonsContainer}>
            <button
                className={`btn ${styles.modifyButton}`}
                onClick={handleEdit}
                style={{ textDecoration: 'none', margin: '10px' }}
            >
                Modificar
            </button>
            <button
                className={`btn ${styles.deleteButton}`}
                onClick={handleDelete}
                style={{ textDecoration: 'none', margin: '10px' }}
            >
                Eliminar
            </button>
            </div>
        )}
        </div>
    </section>
    </div>
  );
};

export default ProjectDetailPage;
