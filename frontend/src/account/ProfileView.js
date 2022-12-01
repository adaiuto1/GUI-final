import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { ProfileList } from '../data/ProfileList';
import TrueFalseLabel from '../common/TrueFalseLabel';
import { Paper, Typography, Box, Button, Card, Avatar, CardHeader, CardContent, Grid, Chip, TextField, TextareaAutosize } from '@mui/material';
import { blue } from '@mui/material/colors';
import { deleteProfile, editProfile, getProfileById } from '../api/profileApi';
import { UserContext } from '../App';
import { getProperties } from '../api/propertyApi';
import { deleteUser } from '../api';
function ProfileView() {
    const navigate = useNavigate();
    let currentUser = useContext(UserContext)
    let tags = ['Student', 'Married', 'Early Bird', 'Night Owl', 'Introvert', 'Extrovert'];
    let [currProfile, setCurrProfile] = useState({})
    let [currTags, setCurrTags] = useState([]);
    let [hasTags, setHasTags] = useState(false);
    const addTag = (tag) => {
        setCurrTags([...currTags, tag])
    }
    let id = useParams().id;
    useEffect(()=>{
        setCurrTags([])
        for (let i = 1; i < 6; i++) {
            if (currProfile['tag' + i]) {
                setCurrTags(current=>[...current, tags[i-1]])
            }
        }
    }, [currProfile])
    useEffect(() => {
        getProfileById(id).then(x => {
            console.log(x)
            setCurrProfile(x.data[0]);
            let np = {...x.data[0], firstname: "CHANGEF"}
            console.log(np)
            editProfile(id, np)
        })
    }, [])

    const [view, setView] = useState('view');
    useEffect(() => {
        setView('view');
    }, [])

    const [formValues, setFormValues] = useState(undefined);
    useEffect(() => {
        setFormValues(currProfile);
    }, [])

    const deleteAccount = () =>{
        deleteProfile(currentUser.user_id);
        deleteUser(currentUser.user_id)
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
                                        <Button onClick={ () => { setView('edit') } }>Edit Profile</Button>
                                        </>
                                    }
                                    <Button onClick={()=>deleteAccount()}>Delete Profile</Button>
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
                        <CardHeader avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="owner"></Avatar>}
                            title={<h1>
                                {currProfile.firstname + " " + currProfile.lastname}</h1>
                            }
                        />
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item xs={6}><TextField
                                                onChange={e => { setFormValues({...formValues, firstname: e.target.value}) }}
                                                value={ formValues.firstname }
                                                label={"First Name"} //optional
                                            /></Grid>
                            <Grid item xs={6}><TextField
                                                onChange={e => { setFormValues({...formValues, lastname: e.target.value}) }}
                                                value={ formValues.lastname }
                                                label={"Last Name"} //optional
                                            /></Grid>
                            <Grid item xs={12}><TextField
                                                onChange={e => { setFormValues({...formValues, bio: e.target.value}) }}
                                                value={ formValues.bio }
                                                label={"Bio"} //optional
                                            /></Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )
    }
    
}
export default ProfileView;