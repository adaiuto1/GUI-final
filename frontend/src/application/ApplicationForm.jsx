import { Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box, FormControl, Menu, MenuItem, Select, Chip } from '@mui/material'
import { useEffect } from 'react';
import { useContext, useState, useParams } from 'react';
import { currentUser } from '../api/getterApi';
import { UserContext } from '../App';
import { PropertyList } from '../data/PropertyList';
export default function ApplicationForm({ values, changeValue, onSubmit }) {
    let currentUser = useContext(UserContext);
    const [displayProps, setDisplayProps] = useState(PropertyList.filter(x=>x.owner!=values.recipient))
    useEffect(()=>{
        changeValue({applicant:currentUser.user_id})
    }, [])
    return <>
        <Box container>
            <Card sx={{ width: '50%', marginX: 'auto', marginY: '5em' }}>
                <select
                defaultValue={values.property}
                onChange={(e)=>changeValue({property:e.target.value})}>
                    {displayProps.map(x => {
                        return <>
                            <option value={x.propertyId}
                            >{x.address}</option>
                        </>
                    })}
                </select>
                <br></br>
                <Button color="primary" onClick={() => onSubmit()}>Apply</Button>

            </Card>
        </Box>
    </>
}
