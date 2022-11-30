import React from 'react'
import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip } from '@mui/material'
import ApplicationDisplay from './ApplicationDisplay';
import { useContext } from 'react';
import { UserContext } from '../App';
function ApplicationList({ apps, onApprove, onDecline }) {
    return apps.length > 0 && <>

        {
            apps.map(x => {
                if (x.response == 0) {
                    return (
                        <ApplicationDisplay
                            tenant_id={x.tenant}
                            property_id={x.property_id}
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