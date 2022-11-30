import React from 'react'
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip } from '@mui/material'
import ApplicationDisplay from './ApplicationDisplay';
import { useContext } from 'react';
import { UserContext } from '../App';
function ApplicationList({ apps, onApprove, onDecline }) {
    let currentUser = useContext(UserContext)
    return apps.length > 0 && <>
        {
            apps.map(x => {

                if (currentUser.account_type == 2 && x.response == 0) {
                    return (
                        <ApplicationDisplay
                            tenant_id={x.tenant}
                            property_id={x.property_id}
                            status={x.response}
                            onApprove={()=>onApprove(x.id)}
                            onDecline={onDecline} />)
                }
                else if (currentUser.account_type == 1) {
                    return (
                        <ApplicationDisplay
                            tenant_id={x.tenant}
                            property_id={x.property_id}
                            status={+x.response}
                            onApprove={onApprove}
                            onDecline={onDecline} />)
                }
            })
        }
    </>
        ||
        <>No Applications</>
}
export default ApplicationList;