import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { accounts } from './Directory';
function CreateAccount(props){
    let acctType = (props.accountType == 1) ? "Tenant" : "Landlord";
    let newAccount = {
        email: props.email,
        password: props.password,
        accountType: acctType,
        firstName: "",
        lastName: "",
        age: 0,
        bio: "",
        tags: []
    }
    function handleChange(e){
        newAccount[e.target.name] = e.target.value;
    }
    function createNewAccount(){
        accounts.push(newAccount);
    }
    return(
        <div>
            <h1>Edit Tenant Profile</h1>
            <label>First Name</label>
            <input type="text" name="firstName" onChange={(e) =>handleChange(e)}></input>
            <br />
            <label>Last Name</label>
            <input type="text" name="lastName" onChange={(e) =>handleChange(e)}></input>
            <br />
            <label>Age</label>
            <input type="text" name="age" onChange={(e) =>handleChange(e)}></input>
            <br />
            <label>Bio</label>
            <input type="text" name="bio" onChange={(e) =>handleChange(e)}></input>
            <br />
            <button to="/" onClick={createNewAccount()}>Create Account</button>
        </div>
    )
}
export default CreateAccount;