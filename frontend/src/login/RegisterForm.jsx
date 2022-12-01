import Visibility from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Grid,
    FormControl,
    Button,
    Link,
    RadioGroup,
    Radio
} from '@mui/material';
import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
const userTypes = {
    'tenant': 1,
    'landlord': 2
}

export const RegisterForm = ({ values, onChange, onSubmit, view, changeView }) => {
    const [usernameError, setUsernameError] = useState('');
    const [password1Error, setPassword1Error] = useState('');
    const [password2Error, setPassword2Error] = useState('');

    return (
        <Box
            sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Register
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={values.username}
                    helperText={usernameError}
                    error={!!usernameError}
                    onChange={ e => {
                        const newVal = e.target.value;
                        if (newVal.match(/[%<>\\$'"  !#]/)) {
                            setUsernameError("Forbidden character");
                        } else if (newVal.length < 8) {
                            setUsernameError("Username must be at least 8 characters");
                        } else {
                            setUsernameError("");
                        }
                        onChange({ username: newVal })
                }}/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={values.password}
                    helperText={password1Error}
                    error={!!password1Error}
                    onChange={ e => {
                        const newVal = e.target.value;
                        onChange({ password: newVal })
                        if (newVal.match(/ /)) {
                            setPassword1Error("Password cannot contain spaces");
                        } else if (newVal.length < 8) {
                            setPassword1Error("Password must be at least 8 characters long");
                        } else {
                            setPassword1Error('');
                        }
                    }}/>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password-confirmation"
                    label="Password Confirmation"
                    type="password"
                    id="password-confirmation"
                    autoComplete="current-password"
                    value={values.passwordConfirmation}
                    helperText={password2Error}
                    error={!!password2Error}
                    onChange={ e => {
                        const newVal = e.target.value;
                        onChange({ passwordConfirmation: newVal })
                        if (newVal !== values.password) {
                            setPassword2Error('Passwords do not match')
                        } else {
                            setPassword2Error('');
                        }
                    }}/>
                <FormControl>
                    {/* <FormLabel id="demo-radio-buttons-group-label"></FormLabel> */}
                    <RadioGroup
                        // aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="tenant"
                        name="user-types"
                        onChange={e => onChange({ userType: userTypes[e.target.value] })}>
                        <FormControlLabel value="tenant" control={<Radio />} label="Tenant" />
                        <FormControlLabel value="landlord" control={<Radio />} label="Landlord" />
                    </RadioGroup>
                </FormControl>
                { view === 'register' && <><Button
                    type="button"
                    fullWidth
                    variant="contained"
                    disabled={ !(!!values.username && !!values.password && !!values.passwordConfirmation && !usernameError && !password1Error && !password2Error) }
                    sx={{ mt: 3, mb: 2 }}
                    
                    onClick={() => onSubmit()}>Register</Button>

                <Grid container>
                    <Grid item>
                        <Link onClick={() => changeView('login')} variant="body2">
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Grid></> }     
            </Box>
        </Box>
    )
}