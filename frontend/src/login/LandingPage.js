import React, { useEffect } from "react";
import { useState, useContext } from 'react';
import { UserContext } from '../App';
import { createUser, getUser } from "../api/userApi";
import { Navigate } from "react-router-dom";
// import { AccountList } from "./data/AccountList";

import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProfileForm from "./ProfileForm";
import { LoginForm, RegisterForm } from './index';

const theme = createTheme();

const formValues = { // add user attributes here
  username: '',
  password: '',
  passwordConfirmation: '',
  userType: 1
};
const profileFormValues = {
  firstName:  '',
  lastName:   '',
  bio:    '',
  smoker: '',
  petFriendly: '',
  tag1:   false,
  tag2:   false,
  tag3:   false,
  tag4:   false,
  tag5:   false,
  tag6:   false
}
const LandingPage = ({ setCurrentUser }) => {
  const currentUser = useContext(UserContext);
  const [values, setValues] = useState(formValues);
  const [active, setActive] = useState('login');
  const [profileValues, setProfileValues] = useState(profileFormValues)

  const _setValue = delta => setValues({ ...values, ...delta });
  const _setProfileValue = delta => setProfileValues({...profileValues, ...delta})
  const _setActive = view => setActive(view);

  const validateUser = () => {
    if (values.username && values.password) { // update logic to check password
      setCurrentUser(values);
    }
    console.log(currentUser)
  }

  const checkFields = () => values.username && values.password && values.passwordConfirmation && values.userType;
  const passwordsMatch = () => values.password === values.passwordConfirmation;
  const passwordRegex = () => (/[a-zA-Z]/).test(values.password)
    && (/[0-9]/).test(values.password)
    && values.password.length >= 8
    && values.password.length <= 30;

  const registerUser = () => {
    // check if username already exists
    try { 
      checkFields()
    } catch (error) {
      alert("Please enter a value for each field!");
    }
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
    let users =
      createUser({ username: values.username, password: values.password, account_type: values.userType });
    // .then() // getUserByUsername.id
    // .catch((error) => alert(error));
    setActive('createProfile')
  }
  const registerProfile = () =>{
    console.log(profileValues)
    setActive('login')
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
          {active === 'login' ? <LoginForm values={values}
            onChange={_setValue}
            onSubmit={validateUser}
            changeView={_setActive} /> :
            <RegisterForm values={values}
              onChange={_setValue}
              onSubmit={registerUser}
              changeView={_setActive} />}
          {active === 'createProfile' ?
          <ProfileForm changeView={_setActive}
          values={profileValues}
          onChange={_setProfileValue}
          onSubmit={registerProfile}
          /> : <></>}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
export default LandingPage;