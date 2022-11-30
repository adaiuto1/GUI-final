import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { ProfileList } from '../data/ProfileList';
import TrueFalseLabel from '../common/TrueFalseLabel';
import { Paper, Typography, Box, Card, Avatar, CardHeader, CardContent, Grid, Chip } from '@mui/material';
import { blue } from '@mui/material/colors';
import { getProfileById } from '../api/profileApi';
function EditButton(props) {
    if (props.isMyAcct) {
        return (
            <button id="editProfileBtn">Edit Profile</button>
        )
    }
}

function ProfileView() {
    let tags = ['Student', 'Married', 'Early Bird', 'Night Owl', 'Introvert', 'Extrovert'];
    let [currProfile, setCurrProfile] = useState({})
    let id = useParams().id;
    //REPLACE WITH API CALL
    useEffect(()=>{
        getProfileById(id).then(x=>console.log(x))
    }, [])
    let currTags = [];
    for (let i = 1; i < 6; i++) {
        if (currProfile['tag' + i]) {
            currTags.push(tags[i])
        }
    }
    return (
        <>
            <Box width="66%" mx="auto" my={4}>
                <Card elevation="10">
                    <CardHeader avatar={<Avatar sx={{ bgcolor: blue[500] }} aria-label="owner"></Avatar>}
                        title={<h1>
                            {currProfile.firstName + " " + currProfile.lastName}</h1>
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
                                hj
                            </Grid>
                        </Grid>
                    </CardContent>

                </Card>

            </Box>
        </>
    )
}
export default ProfileView;