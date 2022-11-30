import { TextArea, Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box } from '@mui/material'
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import ApplicationForm from './ApplicationForm';
import {PropertyList} from '../data/PropertyList'
import { getPropertyById } from '../api/propertyApi';
import {addApplication, getApplications} from '../api/applicationApi'
//import createApplication
let applicationValues = {
    tenant: '',
    landlord: '',
    property_id: '',
    approved: false,
    response: 'empty'
}
function Application() {
    let id = useParams().id;
    let [currentProperty, setCurrentProperty] = useState({});
    const [values, setValues] = useState(applicationValues);
    let currentUser = useContext(UserContext)
    //const applicant = currentUser.userId;

    const changeValue = (delta) => {
        setValues({ ...values, ...delta })
    }
    const onSubmit = () => {
        
        if(!values.landlord){
            if(currentProperty.owner){
                changeValue({landlord:currentProperty.owner})
            }
            else{
                console.log('no property')
            }
        }
        console.log(values)
        addApplication(values);
    }
    useEffect(() => {
        getPropertyById(id).then(x=>{
            setCurrentProperty(x.data[0]);
        })
        changeValue({property_id:+id, landlord:+currentProperty.owner, tenant:+currentUser.user_id})
    }, [])
    return currentProperty!={} && <>
        <ApplicationForm
            values={values}
            changeValue={changeValue}
            onSubmit={onSubmit}
        >
        </ApplicationForm>
        <Typography>{currentProperty.address}</Typography>
    </>
}
export default Application;