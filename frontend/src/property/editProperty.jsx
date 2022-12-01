import React from 'react'
import {Card, Box, Typography, Grid} from '@mui/material'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../App'
import PropertyForm from './PropertyForm'
import { getPropertyById, editProperty } from '../api/propertyApi'
import { useNavigate, useParams } from 'react-router-dom'
const propertyValues ={
    address: '',
    city:'Dallas',
    zipcode:'75219',
	// propertyId: undefined,
	monthlyRent:0,
	owner:0,
	ratingSum:0.0,
	numRatings:0,
    capacity:0,
    sqft:0,
	allowsPets:false,
	allowsSmoking:false,
	img:"https://via.placeholder.com/140x100",
	tag1:false,
	tag2:false,
	tag3:false,
	tag4:false,
	tag5:false,
	tag6:false,
    tag7:false
}
export const EditProperty = () => {
    let currentUser = useContext(UserContext);
    const navigate = useNavigate();
    let id = useParams().id;

    const [currentProperty, setCurrentProperty] = useState('');
    const [values, setValues] = useState(propertyValues);

    useEffect(() => {
        getPropertyById(id).then(x => {
            setCurrentProperty(x);
            setValues(x.data[0]);
        });
    }, []);

    const changeValue = (delta)=>{
        setValues({...values, ...delta})
    }
    const onSubmit = ()=>{
        editProperty(id, values).then(navigate('/'));
    }
    return<>
        <PropertyForm values={values}
        onChange={changeValue}
        onSubmit={onSubmit}></PropertyForm>
    </>
}