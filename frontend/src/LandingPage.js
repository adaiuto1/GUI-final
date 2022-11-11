import React from "react";
import axios from "axios";
import { useState } from 'react';
import { Route, Routes, BrowserRouter, Link } from 'react-router-dom';
import { AccountList } from "./data/AccountList";
function LandingPage() {
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    return (
        <>
            <div className="p-3 border rounded bg-light">
                <header className="text-center">
                    <h1>Welcome</h1>
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
                    <Link to="/homepage">
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