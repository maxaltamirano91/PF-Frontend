import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { setAuthToken, fetchError } from '../redux/actions';

const useAuth0TokenHandler = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently({
            audience: 'tu_audience_de_auth0', // Reemplaza con tu audiencia de Auth0
          });

          // Verifica que el token sea un JWT
          const decodedToken = parseJwt(token);
          console.log(decodedToken); // Muestra el payload decodificado del JWT

          dispatch(setAuthToken(token));
        } catch (error) {
          dispatch(fetchError(error.message));
        }
      }
    };

    getToken();
  }, [isAuthenticated, getAccessTokenSilently, dispatch]);

  // Función para decodificar un JWT (puedes usar una biblioteca como jwt-decode)
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

};

export default useAuth0TokenHandler;