import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CreateProfile from './CreateProfile';
import { AccountList } from '../data/AccountList';
function CreateAccount(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [accountType, setAccountType] = useState(0);
    const [userId, setUserId] = useState(AccountList.length + 1);
    const [valid, setValid] = useState(false);
    let accountId = useParams().id;
    function submitCredentials() {
        setValid(true);
        let newAccount = {
            email: email,
            password: password,
            accountType: accountType,
            accountId: accountId
        }
        AccountList.push(newAccount);
        console.log(AccountList);
    }
    return (
        <>
            <div className="p-3 border rounded bg-light">
                <header className="text-center">
                    <h1>Create New Account</h1>
                </header>
            </div>
            <div className="container pt-5">
                <div className="input-group mb-3 w=50">
                    <input type="text"
                        className="form-control text-center"
                        placeholder="Email"
                        onChange={x => setEmail(x.target.value)}></input>
                </div>
                <div className="input-group mb-3">
                    <input type="password"
                        className="form-control text-center"
                        placeholder="Password"
                        onChange={x => setPassword(x.target.value)}></input>
                </div>
                <div>
                    <select className="form-select w-50"
                        onChange={x => setAccountType(+x.target.value)}>
                        <option value="0">Account Type</option>
                        <option value="1">Tenant</option>
                        <option value="2">Landlord</option>
                    </select>
                </div>
                <Link to={"/create_profile/" + (AccountList.length + 1)}>
                    <button className="btn border border-dark float-end"
                        onClick={submitCredentials}
                    >Create Account</button>
                </Link>


            </div>
        </>
    )

}
export default CreateAccount;