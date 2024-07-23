import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUserProfile, cancelSubscription } from '../../redux/actions';
import { Link } from 'react-router-dom';
import Cards from '../../components/cards/Cards';
import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const { token, loggedUser } = useSelector((state) => state.auth);
  const { loading, error } = useSelector((state) => state.subscription);

  useEffect(() => {
    dispatch(getUserProfile(token));
  }, [dispatch, token]);

  const handleUnsubscribe = () => {
    setShowModal(true);
  };

  const confirmUnsubscribe = () => {
    if (loggedUser) {
      dispatch(cancelSubscription(loggedUser.id))
        .then(() => {
          dispatch(getUserProfile(token));
          setShowModal(false);
        });
    }
  };

  if (!loggedUser) return <div>Loading ...</div>;

  return (
    <div>
      <div className={styles.banner}>
        <h1 className={styles.title}>Bienvenido</h1>
      </div>
      <div className={styles.profileContainer}>
        <div className={styles.card}>
          <div className="m-3 text-center">
            <img
              className={styles.cardImg}
              src={loggedUser.image}
              alt={loggedUser.userName}
            />
          </div>
          <div className={styles.cardBody}>
            <h2 className="card-title">{loggedUser.userName}</h2>
            <p className="card-text">{loggedUser.email}</p>
            <p className="card-text">{loggedUser.bio}</p>
            <hr />
            <Link to="/myprofile/myfiledproj">
              <button className={styles.btnCustom}>Archivados</button>
            </Link>
            {loggedUser && (
              <Link to="/create">
                <button className={styles.btnCustom}>Crear proyecto</button>
              </Link>
            )}
            {loggedUser.planName === 'Premium' ? (
              <>
                <button
                  className={styles.btnCustom}
                  onClick={handleUnsubscribe}
                  disabled={loading}
                >
                  {loading ? 'Procesando...' : 'Desuscribirse'}
                </button>
                <div
                  className={`modal fade ${showModal ? 'show d-block' : ''}`}
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden={!showModal}
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Confirmar cancelación</h5>
                        <button
                          type="button"
                          className="close"
                          onClick={() => setShowModal(false)}
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <p>¿Estás seguro de que deseas cancelar tu suscripción? Esta acción no se puede deshacer.</p>
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          onClick={() => setShowModal(false)}
                        >
                          Cancelar
                        </button>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={confirmUnsubscribe}
                        >
                          Confirmar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/subscription">
                <button className={styles.btnCustom}>Subscribirse</button>
              </Link>
            )}
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </div>
        <div className={styles.profileContent}>
          <h1>Proyectos:</h1>
          <div className={styles.cardsContainer}>
            <Cards projects={loggedUser.projects} displayButtons={true} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
