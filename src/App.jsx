import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import './App.css';
import HomePage from './view/HomePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
