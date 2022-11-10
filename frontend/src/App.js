import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { LoginForm, RegisterForm } from './login';
import { Routes, Route } from 'react-router-dom';

// React functional component
export const App = () => {
  // const [number, setNumber] = useState("")
  // const [values, setValues] = useState([])

  // ENTER YOUR EC2 PUBLIC IP/URL HERE
  const ec2_url = ''
  // CHANGE THIS TO TRUE IF HOSTING ON EC2, MAKE SURE TO ADD IP/URL ABOVE
  const ec2 = false;
  // USE localhost OR ec2_url ACCORDING TO ENVIRONMENT
  const url = ec2 ? ec2_url : 'localhost'

  return <Routes>
          <Route path="/login" element={ <LoginForm /> }></Route>
          <Route path="/register" element={ <RegisterForm /> }></Route>
         </Routes>;
}

export default App;
