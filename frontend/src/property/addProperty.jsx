import React from 'react'
import {Card, Box, Typography, Grid} from '@mui/material'
import {useState, useEffect, useContext} from 'react'
import { UserContext } from '../App'
import PropertyForm from './PropertyForm'
const propertyValues ={
    address: '',
	propertyId: undefined,
	monthlyRent:0,
	owner:undefined,
	ratingSum:0,
	numRatings:0,
	allowsPets:false,
	allowsSmoking:false,
	img:'',
	tag1:false,
	tag2:false,
	tag3:false,
	tag4:false,
	tag5:false,
	tag6:false,
}
export const AddProperty = () =>{
    let currentUser = useContext(UserContext);
    let [values, setValues] = useState(propertyValues);
    const changeValue = (delta)=>{
        setValues({...values, ...delta})
        console.log(values)
    }
    const onSubmit = ()=>{
        //FIXME
    }
    return<>
        <PropertyForm values={values}
        onChange={changeValue}
        onSubmit={onSubmit}></PropertyForm>
    </>
}
export default AddProperty;