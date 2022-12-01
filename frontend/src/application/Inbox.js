import React, { useContext, useEffect, useState } from "react";
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip } from '@mui/material'
import ApplicationList from './ApplicationList'
import { getApplications, putApplication } from "../api/applicationApi";
import { UserContext } from "../App";
function Inbox() {
    let currentUser = useContext(UserContext);
    let [appList, setAppList] = useState([])
    

    useEffect(() => {
        getApplications().then(x => {
            console.log(x)
            setAppList(x.data)
            console.log(appList)
        })
        if (currentUser.account_type == 1) {
            setAppList(appList.filter(x => +x.tenant == currentUser.user_id))
            console.log(appList)
        }
        else {
            setAppList(appList.filter(x => +x.landlord == currentUser.user_id))

        }
    }, [])
    const onApproval = (values) => {
        let newApp = { ...values, response: 1 };
        console.log(newApp)
        putApplication(+newApp.application_id, newApp)
    }
    const onDenial = (values) => {
        let newApp = { ...values, response: 2 };
        console.log(newApp)
        putApplication(+newApp.application_id, newApp)
    }
    return <>
        <Box container
            width="75%"
            my="1em"
            mx="auto">
            <Card elevation="5">
                <CardHeader title={<h5>{currentUser.account_type == 1 ? "My Applications" :
                    "Incoming Applications"} </h5>} />
                <CardContent width="75%" mx="auto">
                    <ApplicationList
                        onApprove={onApproval}
                        onDecline={onDenial}
                        apps={appList} />
                </CardContent>
            </Card>
        </Box>
    </>

}
export default Inbox;