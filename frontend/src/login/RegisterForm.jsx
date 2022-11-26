import Visibility from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
    Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Grid,
    Select,
    FormControl,
    Button,
    MenuItem,
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
    Link,
    FormLabel,
    RadioGroup,
    Radio } from '@mui/material';
import { Navigate, NavLink } from 'react-router-dom';
const userTypes = {
    'tenant': 1,
    'landlord': 2
}

export const RegisterForm = ({ values, onChange, onSubmit, changeView }) => {
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
                value={ values.username }
                onChange={ e => onChange({ username: e.target.value }) }/>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={ values.password }
                onChange={ e => onChange({ password: e.target.value }) }/>
            <TextField
                margin="normal"
                required
                fullWidth
                name="password-confirmation"
                label="Password Confirmation"
                type="password"
                id="password-confirmation"
                autoComplete="current-password"
                value={ values.passwordConfirmation }
                onChange={ e => onChange({ passwordConfirmation: e.target.value }) }/>
            <FormControl>
                {/* <FormLabel id="demo-radio-buttons-group-label"></FormLabel> */}
                <RadioGroup
                    // aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="tenant"
                    name="user-types"
                    onChange={ e => onChange({userType: userTypes[e.target.value]}) }>
                    <FormControlLabel value="tenant" control={<Radio />} label="Tenant" />
                    <FormControlLabel value="landlord" control={<Radio />} label="Landlord" />
                </RadioGroup>
            </FormControl>
            <NavLink to="create_profile">
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={ () => onSubmit() }>Register</Button></NavLink>
            <Grid container>
            <Grid item>
                <Link onClick={ () => changeView('login') } variant="body2">
                {"Already have an account? Login"}
                </Link>
            </Grid>
            </Grid>
        </Box>
        </Box>
    )
}