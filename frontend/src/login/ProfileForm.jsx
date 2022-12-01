import React from "react";
import { useState } from "react";
import { UserContext } from "../App";
import { useContext, useEffect } from "react";
import Visibility from '@mui/icons-material/Visibility';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

import {
    Box,
    Typography,
    TextField,
    Grid,
    FormControl,
    Button,
    ToggleButtonGroup,
    ToggleButton,
    Radio,
    RadioGroup,
    Switch
} from '@mui/material';
function ProfileForm({ values, onChange, onSubmit, changeView }) {
    const [change1, setChange1] = useState(false);
    const [change2, setChange2] = useState(false);
    const [change3, setChange3] = useState(false);
    const [change4, setChange4] = useState(false);
    const [change5, setChange5] = useState(false);
    const [change6, setChange6] = useState(false);

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
                <Typography align="center">
                    <Grid>
                        <ToggleButton value="Student"
                            sx={{
                                backgroundColor: change1 ? '#2d78d4' : 'white',
                                "&:hover": change1 ? {
                                    backgroundColor: '#2d78d4'
                                } : {
                                    backgroundColor: 'white'
                                }
                            }}
                            onClick={e => { onChange({ tag1: !values.tag1 }); setChange1(!change1);}}
                        >Student</ToggleButton>
                        <ToggleButton value="Married"
                            sx={{
                                backgroundColor: change2 ? '#2d78d4' : 'white',
                                "&:hover": change2 ? {
                                    backgroundColor: '#2d78d4'
                                } : {
                                    backgroundColor: 'white'
                                }
                            }}
                            onClick={e => { onChange({ tag2: !values.tag2 }); setChange2(!change2);}}
                        >Married</ToggleButton>
                        <ToggleButton value="Night Owl"
                            sx={{
                                backgroundColor: change3 ? '#2d78d4' : 'white',
                                "&:hover": change3 ? {
                                    backgroundColor: '#2d78d4'
                                } : {
                                    backgroundColor: 'white'
                                }
                            }}
                            onClick={e => { onChange({ tag3: !values.tag3 }); setChange3(!change3);}}
                        >Night Owl</ToggleButton>
                        <ToggleButton value="Commuter"
                            sx={{
                                backgroundColor: change4 ? '#2d78d4' : 'white',
                                "&:hover": change4 ? {
                                    backgroundColor: '#2d78d4'
                                } : {
                                    backgroundColor: 'white'
                                }
                            }}
                            onClick={e => { onChange({ tag4: !values.tag4 }); setChange4(!change4);}}
                        >Commuter</ToggleButton>
                        <ToggleButton value="Introvert"
                            sx={{
                                backgroundColor: change5 ? '#2d78d4' : 'white',
                                "&:hover": change5 ? {
                                    backgroundColor: '#2d78d4'
                                } : {
                                    backgroundColor: 'white'
                                }
                            }}
                            onClick={e => { onChange({ tag5: !values.tag5 }); setChange5(!change5);}}
                        >Introvert</ToggleButton>
                        <ToggleButton value="Extrovert"
                            sx={{
                                backgroundColor: change6 ? '#2d78d4' : 'white',
                                "&:hover": change6 ? {
                                    backgroundColor: '#2d78d4'
                                } : {
                                    backgroundColor: 'white'
                                }
                            }}
                            onClick={e => { onChange({ tag6: !values.tag6 }); setChange6(!change6);}}
                        >Extrovert</ToggleButton>
                    </Grid>
                </Typography>
            </ToggleButtonGroup>
            <br/>
            <Typography align="center">Create a bio</Typography>
            {/* <Grid width="100%"></Grid> */}
            <Box width="100%"/>
            <TextField multiline fullWidth rows={4} onChange={e=>onChange({bio: e.target.value})}/>
            <Grid xs={12}>
                <FormControl sx={{ mx: 3 }}>
                    <Typography align="center">Do you smoke?</Typography>
                    <Switch
                    onChange={e=>onChange({smoker:!values.smoker})}></Switch>
                </FormControl>
                <FormControl sx={{ mx: 3 }}>
                    <Typography align="center">Are you Pet-Friendly?</Typography>
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