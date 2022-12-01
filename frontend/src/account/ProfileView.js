import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { ProfileList } from '../data/ProfileList';
import TrueFalseLabel from '../common/TrueFalseLabel';
import { Paper, Typography, Box, Button, Card, Avatar, CardHeader, CardContent, Grid, Chip } from '@mui/material';
import { blue } from '@mui/material/colors';
import { deleteProfile, editProfile, getProfileById } from '../api/profileApi';
import { UserContext } from '../App';
import { getProperties } from '../api/propertyApi';
import { deleteUser } from '../api';
function ProfileView() {
    let currentUser = useContext(UserContext)
    let tags = ['Student', 'Married', 'Early Bird', 'Night Owl', 'Introvert', 'Extrovert'];
    let [currProfile, setCurrProfile] = useState({})
    let [currTags, setCurrTags] = useState([]);
    let [hasTags, setHasTags] = useState(false);
    const addTag = (tag) => {
        setCurrTags([...currTags, tag])
    }
    let id = useParams().id;
    useEffect(() => {
        setCurrTags([])
        for (let i = 1; i < 6; i++) {
            if (currProfile['tag' + i]) {
                setCurrTags(current => [...current, tags[i - 1]])
            }
        }
    }, [currProfile])
    useEffect(() => {
        getProfileById(id).then(x => {
            console.log(x)
            setCurrProfile(x.data[0]);
        })
    }, [])
    const deleteAccount = () => {
        deleteProfile(currentUser.user_id);
        deleteUser(currentUser.user_id)
    }
    return (
        currTags &&
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
                            <Grid item xs={6}>
                                <img src="https://img.icons8.com/pastel-glyph/2x/person-male--v2.png" />
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
                                    currProfile.user_id == currentUser.user_id && <>

                                        <Button>Edit Profile</Button>
                                        <Button onClick={() => deleteAccount()}>Delete Account</Button>

                                    </>
                                }
                            </Grid>
                        </Grid>
                    </CardContent>

                </Card>
            </Box>
        </>
        ||
        <>Loading...</>
    )
}
export default ProfileView;