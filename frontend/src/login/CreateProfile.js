import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { AccountList } from '../data/AccountList';
import { ProfileList } from '../data/ProfileList';
import { useContext } from 'react';
import { UserContext } from '../App';
import ProfileForm from './ProfileForm';
const profileValues = {
    firstName:  '',
    lastName:   '',
    bio:    '',
    smoker: '',
    petFriendly: '',
    tag1:   false,
    tag2:   false,
    tag3:   false,
    tag4:   false,
    tag5:   false,
    tag6:   false
}
function CreateProfile() {
    const currentUser = useContext(UserContext);
    const [ values, setValues ] = useState(profileValues); 
    const _setValue  = delta => {setValues({ ...values, ...delta })
    console.log(values)};
    
    let tags = ['Student', 'Married', 'Early Bird', 'Night Owl', 'Introvert', 'Extrovert'];
    const onSubmit = () =>{

    }
    return (
        <>
        <ProfileForm
        values={values}
        onChange={ _setValue }
        onSubmit={onSubmit}
        />
        </>
    )
}
export default CreateProfile;