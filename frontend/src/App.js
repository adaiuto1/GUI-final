import './App.css';
import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
// import { accounts } from './data/Directory'
import ProfileView from './account/ProfileView';
import LandingPage from './login/LandingPage';
import HomePage from './login/HomePage';
import { EditFilters } from './search/EditFilters';
import SearchResults from './search/SearchResults';
import { PropertyView } from './property/PropertyView';
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
          <Route path='/' element={<HomePage setCurrentUser={ _setCurrentUser }/>} />
          {/* <Route path='/' element={<HomePage/>}></Route> */}
          <Route path='/profile_view/:id' element={<ProfileView/>}></Route>
          <Route path='/properties' element={<SearchResults/>}></Route>
          <Route path='/my_properties' element={<SearchResults onlyMine={true}/>}></Route>
          /* <Route path='/property/:id' element={<PropertyView />}></Route> */
        </Routes> 
      </Router>
    </UserContext.Provider>
  )
}

export default App;