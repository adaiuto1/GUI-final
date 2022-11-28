import React from "react";
import { Link } from 'react-router-dom';
import { clearSearchQuery, clearFilter } from '../api/getterApi';
import { useEffect } from 'react';
import { useContext } from 'react';
import { UserContext } from '../App';
import { NavLink } from "react-router-dom";
import { getNumberOfUsers, getUsers } from '../api/userApi'
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography } from '@mui/material'
function HomePage({ setCurrentUser }) {

    const currentUser = useContext(UserContext);
    console.log(currentUser);
    useEffect(() => {
        clearSearchQuery(); //ensures the search query is empty when the    properties list is re-accessed
        clearFilter(); //ensures the filters are empty when the properties list is re-accessed
    }, [])

    function logout() {
        setCurrentUser(undefined)
    }
    return (
        <>
            <Grid container rows={3} columns={3}>
                <NavLink to="/properties" style={{ textDecoration: 'none' }}>
                    <Card elevation="10" sx={{ marginX: '1em' }}>
                        <CardHeader
                            avatar={<img src="https://cdn0.iconfinder.com/data/icons/places-16/24/house-door-512.png"
                                width="25em" />}
                            title={<h3>Search Properties</h3>} />
                        <CardContent sx={{ backgroundColor: 'white' }}>
                            <Typography variant="p">
                                Browse listings in your area
                            </Typography>
                        </CardContent>
                        <div style={{ maxHeight: '200px' }}>
                            <CardMedia
                                component="img"
                                height="500px"
                                sx={{ objectFit: 'cover' }}
                                image="https://images.pexels.com/photos/2077937/pexels-photo-2077937.jpeg?cs=srgb&dl=pexels-luis-quintero-2077937.jpg&fm=jpg"
                            />
                        </div>

                    </Card>
                </NavLink>
                <NavLink to={"/profile_view/"} style={{ textDecoration: 'none' }}>
                    <Card xs={3} elevation="10">
                        <CardHeader
                            avatar={<img src="https://cdn0.iconfinder.com/data/icons/places-16/24/house-door-512.png"
                                width="25em" />}
                            title={<h3>Profile</h3>} />
                        <CardContent sx={{ backgroundColor: 'white' }}>
                            <Typography variant="p">
                                View and edit your profile
                            </Typography>
                        </CardContent>
                    </Card>
                </NavLink>
            </Grid>
            <Grid container>
                <Button sx={{ width: '40%', marginX: 'auto', marginY:"2%" }}
                    variant="outlined"
                    align="center"
                    onClick={logout}
                >Logout</Button>
            </Grid>
        </>
    )
}
export default HomePage;