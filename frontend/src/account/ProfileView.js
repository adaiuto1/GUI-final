import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { ProfileList } from '../data/ProfileList';
import TrueFalseLabel from '../common/TrueFalseLabel';
import { Paper, Typography, Box, Button, Card, Avatar, CardHeader, CardContent, Grid, Chip, TextField, TextareaAutosize } from '@mui/material';
import { blue } from '@mui/material/colors';
import { deleteProfile, editProfile, getProfileById } from '../api/profileApi';
import { UserContext } from '../App';
import { deleteProperty, getProperties } from '../api/propertyApi';
import { deleteUser } from '../api';
import {FormControl, Switch, FormControlLabel, Checkbox} from '@mui/material';
function ProfileView() {
    const navigate = useNavigate();
    let currentUser = useContext(UserContext)
    let tags = ['Student', 'Married', 'Night Owl', 'Commuter', 'Introvert', 'Extrovert'];
    let [currProfile, setCurrProfile] = useState({})
    let [currTags, setCurrTags] = useState([]);
    let [hasTags, setHasTags] = useState(false);
    const [view, setView] = useState('view');
    // const [formValues, setFormValues] = useState(undefined);
    

    const addTag = (tag) => {
        setCurrTags([...currTags, tag])
    }
    let id = useParams().id;
    useEffect(() => {
        setCurrTags([])
        for (let i = 1; i <= 6; i++) {
            if (currProfile['tag' + i]) {
                setCurrTags(current => [...current, tags[i - 1]])
            }
        }
    }, [currProfile])
    useEffect(() => {
        getProfileById(id).then(x => {
            console.log('Current User:')
            console.log(x)
            setCurrProfile(x.data[0]);
        })
        setView('view');
    }, [])

    const deleteAccount = () => {
        getProperties().then(x=>{
            x.data.forEach(p=>{
             if(p.owner == currentUser.user_id){
                deleteProperty(p.propertyId)
             }
            })
         })
        deleteProfile(currentUser.user_id);
        deleteUser(currentUser.user_id);
        
        navigate('/')
    }
    const saveChanges = () => {
        editProfile(currentUser.user_id, currProfile);
        setView('view');
    }
    if (view === 'view') {
        return (
            (currTags &&
            <>
                <Box width="66%" mx="auto" my={4}>
                    <Card elevation="10">
                        <CardHeader avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="owner"></Avatar>}
                            title={<h1>
                                {currProfile.firstname + " " + currProfile.lastname}</h1>
                            }
                        />
                        <CardContent>
                            <Grid container rowSpacing={1}>
                                <Grid item xs={false}>
                                    <img xs={false} src="https://img.icons8.com/pastel-glyph/2x/person-male--v2.png" />
                                </Grid>
                                <Grid item xs={6} sx={{ overflowY: 'scroll' }}>
                                    <Typography variant="p"
                                    >
                                        {currProfile.bio}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container>
                                        {currTags.map(x => <>
                                            <Chip key={x}
                                                label={x}></Chip>
                                        </>)}
                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    {
                                        currProfile.user_id === currentUser.user_id &&<>
                                        <Button variant="contained" onClick={ () => { setView('edit') } }>Edit Profile</Button>
                                        </>
                                    }
                                    <Button variant="contained" onClick={()=>deleteAccount()}>Delete Profile</Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <h5>Smoker: {currProfile.smoker ? "Yes" : "No"}</h5>
                                    <h5>Pet Friendly: {currProfile.petFriendly ? "Yes" : "No"}</h5>
                                </Grid>
                            </Grid>
                        </CardContent>
                                
                    </Card>
                </Box>
            </>)
            ||
            <>Loading...</>
        )
    } else if (view === 'edit') {
        return (
            <Box width="66%" mx="auto" my={4}>
                    <Card elevation="10">
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}><TextField
                                                onChange={e => { setCurrProfile({...currProfile, firstname: e.target.value}) }}
                                                value={ currProfile.firstname }
                                                label={"First Name"} //optional
                                            /></Grid>
                            <Grid item xs={6}><TextField
                                                onChange={e => { setCurrProfile({...currProfile, lastname: e.target.value}) }}
                                                value={ currProfile.lastname }
                                                label={"Last Name"} //optional
                                            /></Grid>
                            <Grid item xs={12}><TextField
                                                multiline
                                                fullWidth
                                                rows={4}
                                                onChange={e => { setCurrProfile({...currProfile, bio: e.target.value}) }}
                                                value={ currProfile.bio }
                                                label={"Bio"} //optional
                                            /></Grid>
                            <Typography align="center">
                                {currProfile.smoker ?
                                <FormControl>
                                    <Typography>Do you smoke?</Typography>
                                    <Switch defaultChecked
                                        value={currProfile.smoker}
                                        onChange={e => setCurrProfile({ ...currProfile, smoker: e.target.checked })}>
                                    </Switch>
                                </FormControl>
                                :
                                <FormControl>
                                    <Typography>Do you smoke?</Typography>
                                    <Switch
                                        value={currProfile.smoker}
                                        onChange={e => setCurrProfile({ ...currProfile, smoker: e.target.checked })}>
                                    </Switch>
                                </FormControl>
                                }
                                {currProfile.petFriendly ?
                                <FormControl>
                                    <Typography>Are you Pet-Friendly?</Typography>
                                    <Switch label="Pet Friendly" defaultChecked
                                        value={currProfile.petFriendly}
                                        onChange={e => setCurrProfile({ ...currProfile, petFriendly: e.target.checked })}>
                                    </Switch>
                                </FormControl>
                                :
                                <FormControl>
                                    <Typography>Are you Pet-Friendly?</Typography>
                                    <Switch label="Pet Friendly"
                                        value={currProfile.petFriendly}
                                        onChange={e => setCurrProfile({ ...currProfile, petFriendly: e.target.checked })}>
                                    </Switch>
                                </FormControl>
                                }
                            </Typography>
                            <Typography align="center">
                                <Grid>
                                    {currProfile.tag1 ? 
                                    <FormControlLabel value={currProfile.tag1}
                                                    label={"Student"}
                                                    control={<Checkbox defaultChecked
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag1: e.target.checked });
                                                    }}></Checkbox>} />
                                    :
                                    <FormControlLabel value={currProfile.tag1}
                                                    label={"Student"}
                                                    control={<Checkbox
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag1: e.target.checked });
                                                    }}></Checkbox>} />
                                    }
                                    {currProfile.tag2 ?
                                    <FormControlLabel value={currProfile.tag2}
                                                    label={"Married"}
                                                    control={<Checkbox defaultChecked
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag2: e.target.checked });
                                                    }}></Checkbox>} />
                                    :
                                    <FormControlLabel value={currProfile.tag2}
                                                    label={"Married"}
                                                    control={<Checkbox
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag2: e.target.checked });
                                                    }}></Checkbox>} />
                                    }
                                    {currProfile.tag3 ?
                                    <FormControlLabel value={currProfile.tag3}
                                                    label={"Night Owl"}
                                                    control={<Checkbox defaultChecked
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag3: e.target.checked });
                                                    }}></Checkbox>} />
                                    :
                                    <FormControlLabel value={currProfile.tag3}
                                                    label={"Night Owl"}
                                                    control={<Checkbox
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag3: e.target.checked });
                                                    }}></Checkbox>} />
                                    }
                                    {currProfile.tag4 ? 
                                    <FormControlLabel value={currProfile.tag4}
                                                    label={"Commuter"}
                                                    control={<Checkbox defaultChecked
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag4: e.target.checked });
                                                    }}></Checkbox>} />
                                    :
                                    <FormControlLabel value={currProfile.tag4}
                                                    label={"Commuter"}
                                                    control={<Checkbox
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag4: e.target.checked });
                                                    }}></Checkbox>} />
                                    }
                                    {currProfile.tag5 ?
                                    <FormControlLabel value={currProfile.tag5}
                                                    label={"Introvert"}
                                                    control={<Checkbox defaultChecked
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag5: e.target.checked });
                                                    }}></Checkbox>} />
                                    :
                                    <FormControlLabel value={currProfile.tag5}
                                                    label={"Introvert"}
                                                    control={<Checkbox
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag5: e.target.checked });
                                                    }}></Checkbox>} />
                                    }
                                    {currProfile.tag6 ?
                                    <FormControlLabel value={currProfile.tag6}
                                                    label={"Extrovert"}
                                                    control={<Checkbox defaultChecked
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag6: e.target.checked });
                                                    }}></Checkbox>} />
                                    :
                                    <FormControlLabel value={currProfile.tag6}
                                                    label={"Extrovert"}
                                                    control={<Checkbox
                                                    onChange={e => {
                                                        setCurrProfile({ ...currProfile, tag6: e.target.checked });
                                                    }}></Checkbox>} />
                                    }
                                </Grid>
                            </Typography>
                            <Typography align="center">
                                <Button
                                    variant="contained"
                                    onClick={() => {
                                        saveChanges();
                                }}>Submit</Button>
                            </Typography>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )
    }
    
}
export default ProfileView;