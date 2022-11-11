import './App.css';
import React from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { accounts } from './Directory'
import ProfileView from './ProfileView';
import CreateProfile from './CreateProfile';
import LandingPage from './LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css" />
      <Router>
        <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/create_account/:id' element={<CreateAccount/>}></Route>
        <Route path='/create_profile/:id' element={<CreateProfile/>}></Route>
        <Route path='/profile_view/:id' element={<ProfileView/>}></Route>
        </Routes>
      </Router>
      
    </>
  )
}

export default App;