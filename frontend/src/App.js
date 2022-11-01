import './App.css';
import React from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount';
import PropertyResult from './PropertyResult';
import SearchResults from './SearchResults';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
// React functional component


function App() {
  return (
    <Router>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create_profile"> Details</Link>
        <Link to="/search_results">SR</Link>
      </div>
      <Routes>
        <Route path="/create_profile" element={<CreateAccount email="email@email" password="password123" accountType={1}/>} />
        <Route path="/search_results" element={<SearchResults/>}></Route>
      </Routes>
    </Router>


  )
}

export default App;