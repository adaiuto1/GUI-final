import React from 'react'
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip, Avatar, ButtonGroup } from '@mui/material'
import { useState, useContext, useEffect } from 'react';
import { getProfileById } from '../api';
import { getPropertyById } from '../api/propertyApi';
import { blue } from '@mui/material/colors';
import { NavLink } from 'react-router-dom';
import { red } from '@mui/material/colors';
function ApplicationDisplay({ tenant_id, property_id, onApprove, onDecline }) {

    let [tName, setTName] = useState('noName');
    let [pAdd, setPAdd] = useState('');
    useEffect(() => {
        setTName("Tenant Seventy")

        // getProfileById(tenant_id).then(x=>{
        //     setTName(x.data[0].firstname + " " + x.data[0].lastname)
        // });
        getPropertyById(property_id).then(x => {
            setPAdd(x.data[0].address)
        })
    }, [])
    return pAdd && <>
        <Card elevation="10">
            <CardHeader
                avatar={<NavLink to={"/profile/" + tenant_id}>
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="tenant" />
                </NavLink>}
                title={<Typography variant="h6">
                    {tName} : {pAdd}
                </Typography>}>
            </CardHeader>
            <CardContent>
                <Box container
                    mt="0"
                    mb='1em'
                    >
                    <Button color="success"
                        variant="contained"
                        label="Approve">Approve</Button>
                    <Button color="error"
                        variant="contained"
                        label="Approve">Deny</Button></Box>
            </CardContent>

        </Card>
    </>
}
export default ApplicationDisplay;