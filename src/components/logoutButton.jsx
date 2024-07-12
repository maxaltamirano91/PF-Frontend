import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button onClick={() => logout({ returnTo: window.location.origin })} className="btn btn-secondary">
      Salir
    </button>
  );
};

export default LogoutButton;
