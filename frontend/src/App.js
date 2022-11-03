import './App.css';
import React from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {accounts} from './Directory'
// React functional component


function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create_profile"> Details</Link>
      </div>
      <Routes>
        <Route path="/create_profile" element={<CreateAccount email="email@email" password="password123" accountType={1}/>} />
      </Routes>
    </Router>
  )
}

export default App;