import React from 'react'
import {Card, Box, Typography, Grid} from '@mui/material'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../App'
import PropertyForm from './PropertyForm'
import { addProperty } from '../api/propertyApi'
import { useNavigate } from 'react-router-dom'
const propertyValues ={
    address: '',
    city:'Dallas',
    zipcode:'75219',
	// propertyId: undefined,
	monthlyRent:0,
	owner:0, //FIXME fix this
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
export const AddProperty = () =>{
    let currentUser = useContext(UserContext);
    const navigate = useNavigate();

    let [values, setValues] = useState(propertyValues);
    const changeValue = (delta)=>{
        setValues({...values, ...delta})
        console.log(values)
    }
    const onSubmit = ()=>{
        addProperty(values).then(navigate('/properties'));
    }
    return<>
        <PropertyForm values={values}
        onChange={changeValue}
        onSubmit={onSubmit}></PropertyForm>
    </>
}
export default AddProperty;