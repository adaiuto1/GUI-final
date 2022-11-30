import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link, useParams } from 'react-router-dom';
import { AccountList } from '../data/AccountList';
import { ProfileList } from '../data/ProfileList';
import { useContext } from 'react';
import { UserContext } from '../App';
import ProfileForm from './ProfileForm';
let profileValues={n: 'n'}

function CreateProfile({changeView}) {
    const currentUser = useContext(UserContext);
    const [ values, setValues ] = useState(profileValues); 
    const _setValue  = delta => {setValues({ ...values, ...delta })
    console.log(values)};
    
    let tags = ['Student', 'Married', 'Early Bird', 'Night Owl', 'Introvert', 'Extrovert'];
    
    return (
        <>
        <ProfileForm
        values={values}
        onChange={ _setValue }
        // onSubmit={onSubmit}
        />
        </>
    )
}
export default CreateProfile;