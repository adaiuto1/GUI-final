import './App.css';
import React from 'react';
import axios from 'axios';
import { LoginForm, RegisterForm } from './login';
import { Routes, Route } from 'react-router-dom';

// React functional component
export const App = () => {
  // const [number, setNumber] = useState("")
  // const [values, setValues] = useState([])


  return <Routes>
          <Route path="/login" element={ <LoginForm /> }></Route>
          <Route path="/register" element={ <RegisterForm /> }></Route>
         </Routes>;
}

export default App;