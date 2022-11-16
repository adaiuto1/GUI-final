import './App.css';
import React, { createContext, useState } from 'react';
import CreateAccount from './CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { accounts } from './Directory'
import ProfileView from './ProfileView';
import CreateProfile from './CreateProfile';
import LandingPage from './LandingPage';
import HomePage from './HomePage';
import EditFilters from './EditFilters';
import SearchResults from './SearchResults';

export const UserContext = createContext();

export const App = () => {
  const [ currentUser, setCurrentUser ] = useState(undefined);

  const _setCurrentUser = user => setCurrentUser(user);

  if (!currentUser) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={ <LandingPage setCurrentUser={ _setCurrentUser }/> }></Route>
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
          <Route path='/' element={<h1>Logged in!</h1>} />
          {/* <Route path='/' element={<HomePage/>}></Route> */}
          <Route path='/create_account/:id' element={<CreateAccount/>}></Route>
          <Route path='/create_profile/:id' element={<CreateProfile/>}></Route>
          <Route path='/profile_view/:id' element={<ProfileView/>}></Route>
          <Route path='/search_results' element={<SearchResults/>}></Route>
          <Route path='/search_results/edit_filters/:cb' element={<EditFilters/>}></Route>
          <Route path='/my_properties' element={<SearchResults onlyMine={true}/>}></Route>
          <Route path='/property_view/:id' element={<PropertyView />}></Route>
        </Routes> 
      </Router>
    </UserContext.Provider>
  )
}

export default App;