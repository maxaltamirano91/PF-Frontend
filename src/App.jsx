import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './App.css';

import Error from './components/Error';
import HomePage from './view/HomePage';
import Login from './view/Login';
import Register from './view/Register';
import ForgotPassword from './view/ForgotPassword';
import LandingPage from './view/LandingPage';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
// import TestComponent from './components/TestComponent';
import Page404 from './view/Page404';
import ModProject from './view/ModProject';
import Users from './components/User/Users';
import AddProjectForm from './view/createForm';
import useAuth0TokenHandler from './hooks/useAuth0TokenHandler';
import { useAuth0 } from '@auth0/auth0-react';
import Detail from './view/Detail';

function App() {
  const { isLoading } = useAuth0();
  const { fetchError } = useSelector((state) => state.errors);

  // Asegúrate de que este hook se llame siempre en cada renderizado
  useAuth0TokenHandler();

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div>
        {fetchError && <Error error={fetchError} />}
        <NavBar />
        <Routes className="App">
          <Route path="/" element={<LandingPage />} />
          <Route path="/create" element={<AddProjectForm />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/modProject" element={<ModProject />} />
          <Route path="/*" element={<Page404 />} />
          <Route path="/users" element={<Users />} />
		  <Route path="/project/detail/:id" element={<Detail />} />
        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;
