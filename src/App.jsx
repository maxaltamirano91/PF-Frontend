import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import './App.css';
import HomePage from './view/HomePage';
import Login from './view/Login';
import Register from './view/Register';
import ForgotPassword from './view/ForgotPassword';
import LandingPage from './view/LandingPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
