import './App.css';
import React from 'react';
import axios from 'axios';
import CreateAccount from './account/CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { accounts } from './data/Directory'
import ProfileView from './account/ProfileView';
import CreateProfile from './account/CreateProfile';
import LandingPage from './login/LandingPage';
import HomePage from './login/HomePage';
import EditFilters from './search/EditFilters';
import 'bootstrap/dist/css/bootstrap.min.css';
import SearchResults from './search/SearchResults';
import { PropertyView } from './property/PropertyView';

function App() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css" />
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}></Route>
          <Route path='/homepage' element={<HomePage/>}></Route>
          <Route path='/create_account/:id' element={<CreateAccount/>}></Route>
          <Route path='/create_profile/:id' element={<CreateProfile/>}></Route>
          <Route path='/profile_view/:id' element={<ProfileView/>}></Route>
          <Route path='/search_results' element={<SearchResults/>}></Route>
          <Route path='/search_results/edit_filters/:cb' element={<EditFilters/>}></Route>
          <Route path='/my_properties/edit_filters/:cb' element={<EditFilters/>}></Route>
          <Route path='/my_properties' element={<SearchResults onlyMine={true}/>}></Route>
          <Route path='/property_view/:id' element={<PropertyView />}></Route>
        </Routes> 
      </Router>
    </>
  )
}

export default App;