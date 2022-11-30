import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip } from '@mui/material'
import ApplicationList from './ApplicationList'
import { getApplications } from "../api/applicationApi";
import { UserContext } from "../App";
function Inbox() {
    let currentUser = useContext(UserContext)
    let [appList, setAppList] = useState([])
    let placeholder = [
       { tenant:147,landlord:148,property_id: 1,approved:false,response:0},
       { tenant:147,landlord:148,property_id: 1,approved:false,response:0},
       { tenant:147,landlord:148,property_id: 1,approved:false,response:0},
       { tenant:147,landlord:148,property_id: 1,approved:false,response:0},
    ]
    useEffect(() => {
        // getApplications().then(x => {
        //      x.data.forEach{m=>{
        //      if(m.landlord == currentUser.user_id){
        //          setAppList(current=>[..current, m])
        //      }
        //}}
        // })
        setAppList(placeholder)
    }, [])
    const onApproval = () =>{

    }
    return <>
        <Box container
            width="75%"
            my="1em"
            mx="auto">
            <Card elevation="5">
                <CardHeader title={<h5>Incoming Applications</h5>} />
                <CardContent width="75%" mx="auto">
                    <ApplicationList
                    apps={appList}/>
                </CardContent>
            </Card>
        </Box>
    </>
        
}
export default Inbox;