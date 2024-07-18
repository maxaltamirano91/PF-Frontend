import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    if (isAuthenticated) logout({ returnTo: window.location.origin });
  };

  return (
    <button onClick={handleLogout} className="btn btn-secondary">
      Salir
    </button>
  );
};

export default LogoutButton;
