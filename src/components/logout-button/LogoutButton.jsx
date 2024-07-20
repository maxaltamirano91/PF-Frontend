import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../redux/actions';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logoutUser());
    if (isAuthenticated) logout();
    navigate('/login')
  };

  return (
    <button onClick={handleLogout} className="dropdown-item">
      Salir
    </button>
  );
};

export default LogoutButton;
