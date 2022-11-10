import './App.css';
import React from 'react';
import axios from 'axios';
import CreateAccount from './CreateAccount';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {accounts} from './Directory'
import { LandlordHomepage } from './components/landlordHomepage';
import { TenantHomepage } from './components/tenantHomepage';
import { Tester } from './components/tester';
import { LandlordProperties } from './components/landlordProperties';
import { AddProperty } from './components/addProperty';

// React functional component
function App() {
  return (
    <Router>
      <div>
        {/* <Link to="/">Home</Link>
        <Link to="/landlordHomepage">Landlord</Link>
        <Link to="/tenantHomepage">Tenant</Link>
        <Link to="/tester">Tester</Link> */}
        {/* {/* <Link to="/create_profile"> Details</Link> */}
      </div>
      <Routes>
        <Route path="/landlordHomepage" element={<LandlordHomepage />} />
        <Route path="/tenantHomepage" element={<TenantHomepage />} />
        <Route path="/" element={<Tester />} />
        <Route path="/properties" element={<LandlordProperties />} />

        <Route path="/addProperty" element={<AddProperty />}></Route>

        {/* <Route path="/create_profile" element={<CreateAccount email="email@email" password="password123" accountType={1}/>} /> */}
      </Routes>


    </Router>
  )
}

export default App;