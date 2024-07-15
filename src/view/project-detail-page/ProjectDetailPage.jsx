import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../redux/actions'; 

const Detail = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const project = useSelector((state) => state.detail.project); 
  const loading = useSelector((state) => state.detail.loading); 
  const error = useSelector((state) => state.detail.error);     

  useEffect(() => {
    dispatch(getProjectById(id)); 
  }, [dispatch, id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center mt-5">Error: {error}</p>;
  if (!project) return null;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="card">
            <img src={project.image} className="card-img-top" alt={project.title} />
            <div className="card-body">
              <h5 className="card-title">{project.title}</h5>
              <p className="card-text">{project.description}</p>
              {project.tags && (
                <ul className="list-group list-group-flush">
                  {project.tags.map((tag, index) => (
                    <li key={index} className="list-group-item">{tag}</li>
                  ))}
                </ul>
              )}
              {project.technologies && (
                <ul>
                  {project.technologies.map((tech) => (
                    <li key={tech.id}>{tech.name}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
