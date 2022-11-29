import { TextArea, Grid, Card, CardHeader, CardContent, Button, Avatars, CardMedia, Typography, Box } from '@mui/material'
import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../App';
import ApplicationForm from './ApplicationForm';
import {PropertyList} from '../data/PropertyList'
//import createApplication
let applicationValues = {
    applicant: '',
    recipient: '',
    property: '',
    message: '',
    approved: false
}
function Application() {
    let id = useParams().id;
    let currProperty = PropertyList.find(x=>x.propertyId==id)
    let currentUser = useContext(UserContext)
    //const applicant = currentUser.userId;
    const [values, setValues] = useState(applicationValues);

    const changeValue = (delta) => {
        setValues({ ...values, ...delta })
        console.log(values)
    }
    const onSubmit = () => {
        console.log(values)
    }
    useEffect(() => {
        changeValue({property:id, recipient:currProperty.owner, applicant:currentUser.user_id})
        //getPropertyById(id).then(x =>changeValue(property:x.propertyId))
    }, [])
    return values['property'] && <>
        <ApplicationForm
            values={values}
            changeValue={changeValue}
            onSubmit={onSubmit}
        >
        </ApplicationForm>
    </>
}
export default Application;