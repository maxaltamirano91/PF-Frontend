import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button onClick={() => loginWithRedirect()} className="btn btn-primary">
      Ingresar con Auth0
    </button>
  );
};

export default LoginButton;
