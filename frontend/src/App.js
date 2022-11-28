import './App.css';
import React, { createContext, useState } from 'react';
import CreateAccount from './login/CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { accounts } from './data/Directory'
import ProfileView from './account/ProfileView';
import CreateProfile from './login/CreateProfile';
import LandingPage from './login/LandingPage';
import HomePage from './login/HomePage';
import EditFilters from './search/EditFilters';
import SearchResults from './search/SearchResults';
import Application from './application/Application';

export const UserContext = createContext();

export const App = () => {
  const [ currentUser, setCurrentUser ] = useState(undefined);

  const _setCurrentUser = user => setCurrentUser(user);

  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={ <LandingPage setCurrentUser={ _setCurrentUser }/> }></Route>
          <Route path='/profile/:id' element={<CreateProfile/>}></Route>
        </Routes>
      </Router>
  )}

    console.log(currentUser);
  return (
    <UserContext.Provider value={ currentUser }>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="bootstrap/dist/css/bootstrap.min.css" />
      <Router>
        <Routes>
          <Route path='/' element={<HomePage setCurrentUser={ _setCurrentUser }/>} />
          {/* <Route path='/' element={<HomePage/>}></Route> */}
          <Route path='/create_account/:id' element={<CreateAccount/>}></Route>
          <Route path='/create_profile/:id' element={<CreateProfile/>}></Route>
          <Route path='/profile_view/:id' element={<ProfileView/>}></Route>
          <Route path='/properties' element={<SearchResults/>}></Route>
          <Route path='/apply/:id' element={<Application/>}></Route>
          {/* <Route path='/property_view/:id' element={<PropertyView />}></Route> */}
        </Routes> 
      </Router>
    </UserContext.Provider>
  )
}

export default App;