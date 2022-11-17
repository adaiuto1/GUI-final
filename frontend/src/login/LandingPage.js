import React, { useEffect } from "react";
import { useState, useContext } from 'react';
import { UserContext } from '../App';
import { createUser, getUser } from "../api/userApi";
// import { AccountList } from "./data/AccountList";

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import { LoginForm, RegisterForm } from './index';

const theme = createTheme();

const formValues = { // add user attributes here
    name:                 '',
    username:             '',
    password:             '',
    passwordConfirmation: '',
    accountType:          ''
}

const LandingPage = ({ setCurrentUser }) => {
    const currentUser = useContext(UserContext);
    const [ values, setValues ] = useState(formValues); 
    const [ active, setActive ] = useState('login');

    const _setValue  = delta => setValues({ ...values, ...delta });
    const _setActive = view  => setActive(view);

    const validateUser = () => {
      if (values.username && values.password) {
        setCurrentUser(values);
      }
      console.log(currentUser)
    }

    const passwordsMatch = () => values.password === values.passwordConfirmation;
    const passwordRegex  = () => (/[a-zA-Z]/).test(values.password) 
                              && (/[0-9]/).test(values.password) 
                              && values.password.length >= 8
                              && values.password.length <= 30;

    const registerUser = () => {
      try {
        passwordsMatch();
      } catch (error) {
        alert("Passwords did not match");
      }
      try {
        passwordRegex();
      } catch (error) {
        alert("Password must contain a letter, a number, and be between 8 and 30 characters");
      }
      // createUser in backend
    }

    return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://images.pexels.com/photos/2077937/pexels-photo-2077937.jpeg?cs=srgb&dl=pexels-luis-quintero-2077937.jpg&fm=jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            { active === 'login' ? <LoginForm values={ values } 
                      onChange={ _setValue }
                      onSubmit={ validateUser }
                      changeView={ _setActive } /> : 
                      <RegisterForm values={ values }
                      onChange={ _setValue }
                      onSubmit={ validateUser }
                      changeView={ _setActive }/> }

          </Grid>
      </Grid>
    </ThemeProvider>
    )
}
export default LandingPage;