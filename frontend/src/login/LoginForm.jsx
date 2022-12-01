import Visibility from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Box,
    Avatar,
    Typography,
    TextField,
    FormControlLabel,
    Grid,
    FormControl, 
    Button, 
    OutlinedInput, 
    InputLabel, 
    InputAdornment,
    IconButton,
    Link } from '@mui/material'

export const LoginForm = ({ values, onChange, onSubmit, changeView }) => {
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
            <Button
                type="button"
                fullWidth
                variant="contained"
                disabled={ !(!!values.username && !!values.password) }
                sx={{ mt: 3, mb: 2 }}
                onClick={ () => onSubmit() }>Sign In</Button>
            <Typography align='center'>
                <Link onClick={ () => changeView('register') } variant="body2">
                {"Don't have an account? Sign Up"}
                </Link>
            </Typography>
        </Box>
        </Box>
    )
}