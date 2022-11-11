import React, { useEffect } from "react";
import axios from "axios";
import { useState } from 'react';
import { Route, Routes, BrowserRouter, Link, Navigate } from 'react-router-dom';
import { AccountList } from "./data/AccountList";
import { currentUser, setCurrentUser } from "./getterApi";
function LandingPage() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    function login(){
        let curr = AccountList.find((x)=>
        x.email == email && x.password == password);
        setCurrentUser(curr.accountId);
        console.log(currentUser)
    }
    return (
        <>
            <div className="p-3 border rounded bg-light">
                <header className="text-center">
                    <h1>ffff</h1>
                </header>
            </div>
            <div className="container pt-5">
                <h2 className="text-center">Login</h2>
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
                    <Link to={AccountList.find((x)=>
                        x.email == email && x.password == password) ? '/homepage' : "/"}
                        onClick={login}>
                        <button className="btn border border-dark float-center"
                        >Login</button>
                    </Link>
                    <div className="float-end text-end">
                        <p className="my-0">Don't have an account?</p>
                        <Link to={"/create_account/" + (AccountList.length + 1)}>Create Account</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default LandingPage;