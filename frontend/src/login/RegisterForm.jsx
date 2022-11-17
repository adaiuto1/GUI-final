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
    Link
} from '@mui/material'
import { createUser } from '../api/userApi';

export const RegisterForm = ({ values, onChange, onSubmit, changeView }) => {
    function onSubmit() {
        createUser(values)
        changeView('login')
    }
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
                Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={values.name}
                    onChange={e => onChange({ name: e.target.value })} />
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
                    onChange={e => onChange({ username: e.target.value })} />
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
                    onChange={e => onChange({ password: e.target.value })} />
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
                    onChange={e => onChange({ passwordConfirmation: e.target.value })} />
                <Select
                    
                    name="accountType"
                    fullWidth
                    label="Account Type"
                    id="accountType"
                    defaultValue={0}
                    onChange={e => onChange({ accountType: e.target.value })}>
                        <MenuItem value={0}></MenuItem>
                        <MenuItem value={1}>Tenant</MenuItem>
                        <MenuItem value={2}>Landlord</MenuItem>
                </Select>
                <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={()=>onSubmit()}>Register</Button>
                <Grid container>
                    <Grid item>
                        <Link onClick={() => changeView('login')} variant="body2">
                            {"Already have an account? Login"}
                        </Link>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}