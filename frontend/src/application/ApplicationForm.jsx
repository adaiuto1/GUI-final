import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip } from '@mui/material'
import { useEffect } from 'react';
import { useContext, useState, useParams } from 'react';
import { NavLink } from 'react-router-dom';
import { getProfileById } from '../api';
import { currentUser } from '../api/getterApi';
import { getProperties } from '../api/propertyApi';
import { UserContext } from '../App';
import { PropertyList } from '../data/PropertyList';
export default function ApplicationForm({ values, changeValue, onSubmit, currentProperty, currLord }) {
    let currentUser = useContext(UserContext);
    const [displayProps, setDisplayProps] = useState([])
    const [displayName, setDisplayName] = useState('')
    useEffect(() => {
        changeValue({ applicant: currentUser.user_id })
        getProperties().then(x => {
            setDisplayProps(x.data);
        })
        if (displayProps.includes(x =>
            x.owner != values.landlord
        )) {
            setDisplayProps(displayProps.filter(f =>
                f.owner != values.landlord
            ))
        }
    }, [])
    useEffect(() => {
        getProfileById(values.landlord).then(y => {
            setDisplayName(y.data[0].firstname + " " + y.data[0].lastname)
        })
    }, displayProps)
    return displayName && <>
        <Grid container
            alignItems="center"
            justifyContent="center">
            <Grid item lg={6} md={10} sm={10} mt={"10%"}>
                <Card>
                    <CardHeader title={
                        <Typography variant="h5">Application for {" " + displayName}</Typography>
                    }></CardHeader>
                    <CardContent>
                        <Grid container spacing={2}>
                            <Grid item lg={4} md={4} sm={4} xs={12}>
                                <Typography variant="h6">Property: {currentProperty.address}</Typography>
                                <NavLink to="/properties">
                                    <Button color="primary" variant="contained"
                                        onClick={() => onSubmit()}>Apply</Button>
                                </NavLink>


                            </Grid>
                            <Grid item lg={8} md={8} sm={8} xs={12} sx={{ backgroundColor: '#33333' }}>
                                <>{currentProperty.img &&
                                    <NavLink to={"/property/" + currentProperty.propertyId}>
                                        <img src={currentProperty.img}></img>
                                    </NavLink>}</>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
}
