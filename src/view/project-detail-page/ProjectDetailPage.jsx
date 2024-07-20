import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProjectById, getUserProfile, deleteProject } from '../../redux/actions';
import styles from './ProjectDetailPage.module.css';  

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
