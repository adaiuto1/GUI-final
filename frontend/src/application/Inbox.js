import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip } from '@mui/material'
import ApplicationList from './ApplicationList'
import { getApplications } from "../api/applicationApi";
import { UserContext } from "../App";
function Inbox() {
    let currentUser = useContext(UserContext)
    let [appList, setAppList] = useState([])
    let placeholder = [
       { id: 0, tenant:146,landlord:148,property_id: 1,approved:false,response:0},
       { id: 1, tenant:147,landlord:148,property_id: 1,approved:false,response:0},
       { id: 2, tenant:147,landlord:145,property_id: 1,approved:false,response:2},
       { id: 3, tenant:147,landlord:148,property_id: 1,approved:false,response:1},
    ]
    useEffect(() => {
        // getApplications().then(x => {
        //      x.data.forEach{m=>{
        //      if(m.landlord == currentUser.user_id){
        //          setAppList(current=>[..current, m])
        //      }
        //}}
        // })
        if(currentUser.account_type == 1){
            setAppList(placeholder.filter(x=>+x.tenant==currentUser.user_id))
            console.log(appList)
        }
        else{
            setAppList(placeholder.filter(x=>+x.landlord==currentUser.user_id))

        }
    }, [])
    const onApproval = (id) =>{
        console.log(id)
    }
    const onDenial = (id) =>{
        
    }
    return <>
        <Box container
            width="75%"
            my="1em"
            mx="auto">
            <Card elevation="5">
                <CardHeader title={<h5>{currentUser.account_type==1? "My Applications":
                "Incoming Applications"} </h5>} />
                <CardContent width="75%" mx="auto">
                    <ApplicationList
                    onApprove={onApproval}
                    onDecline={onDenial}
                    apps={appList}/>
                </CardContent>
            </Card>
        </Box>
    </>
        
}
export default Inbox;