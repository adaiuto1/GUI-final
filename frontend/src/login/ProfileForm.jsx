import React from "react";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
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
    OutlinedInput,
    InputLabel,
    InputAdornment,
    IconButton,
    Link,
    ToggleButtonGroup,
    ToggleButton,
    Radio,
    RadioGroup,
    Switch
} from '@mui/material';
import { currentUser } from "../api/getterApi";
function ProfileForm({ values, onChange, onSubmit, changeView }) {
    
    return <>
        <Box
                sx={{
                    my: 8,
                    mx: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
            <Typography component="h1" variant="h5">
                Create Profile
            </Typography>
            <TextField sx={{ mx: 3 }}
                margin="normal"
                required
                fullWidth
                id="firstname"
                label="First name"
                name="firstname"
                autoComplete="firstname"
                autoFocus
                value={values.firstname}
                onChange={e => onChange({ firstname: e.target.value })} />
            <TextField sx={{ mx: 3 }}
                margin="normal"
                required
                fullWidth
                id="lastname"
                label="Last name"
                name="lastname"
                autoComplete="lastname"
                autoFocus
                value={values.lastname}
                onChange={e => onChange({ lastname: e.target.value })} />
            <ToggleButtonGroup sx={{ mx: 3 }} color="primary">
                <Grid>
                    <ToggleButton value="Student"
                        onClick={e => onChange({ tag1: !values.tag1 })}
                    >Student</ToggleButton>
                    <ToggleButton value="Married"
                        onClick={e => onChange({ tag2: !values.tag2 })}
                    >Married</ToggleButton>
                    <ToggleButton value="Night Owl"
                        onClick={e => onChange({ tag3: !values.tag3 })}
                    >Night Owl</ToggleButton>
                    <ToggleButton value="Commuter"
                        onClick={e => onChange({ tag4: !values.tag4 })}
                    >Commuter</ToggleButton>
                    <ToggleButton value="Introvert"
                        onClick={e => onChange({ tag5: !values.tag5 })}
                    >Introvert</ToggleButton>
                    <ToggleButton value="Extrovert"
                        onClick={e => onChange({ tag6: !values.tag6 })}
                    >Extrovert</ToggleButton>
                </Grid>
            </ToggleButtonGroup>
            <Grid container m={3}>
                <Typography>Create a bio</Typography>
                <TextField onChange={e=>onChange({bio: e.target.value})}/>
                <FormControl>
                    <Typography>Do you smoke?</Typography>
                    <Switch
                    onChange={e=>onChange({smoker:!values.smoker})}></Switch>
                    <Typography>Are you Pet-Friendly?</Typography>
                    <Switch onChange={e=>onChange({petFriendly:!values.petFriendly})}></Switch>
                </FormControl>
            </Grid>
            
            <Button
                type="button"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, mx: 5 }}
                onClick={() => onSubmit()}>Complete Profile</Button>
        </Box>
    </>
}
export default ProfileForm;