import React from "react";
import { Link } from 'react-router-dom';
import { clearSearchQuery, clearFilter } from '../api/getterApi';
import { useEffect } from 'react';
import { useContext } from 'react';
import {UserContext} from '../App';

function HomePage({setCurrentUser}) {
    const currentUser = useContext(UserContext);
    console.log(currentUser);
    useEffect(() => {
        clearSearchQuery(); //ensures the search query is empty when the    properties list is re-accessed
        clearFilter(); //ensures the filters are empty when the properties list is re-accessed
    }, [])

    function logout() {
        setCurrentUser(undefined)
    }
    return (
        <>
            <div className="p-3 mb-5 border rounded bg-light">
                <header className="text-center">
                    <h1>{ currentUser.accountType == 1 ? "Tenant " : "Landlord " +" "}Home Page</h1>
                </header>
            </div>
            <div className="container">
                {currentUser.accountType == 1 &&
                <div className="row justify-content-center">
                    <div className=" col-4 my-1 text-center">
                        <Link to={"/search_results"}>
                            <button className="btn border border-dark w-100"
                            >Search Properties</button>
                        </Link>
                    </div>
                </div>
                ||
                <div className="row justify-content-center">
                    <div className=" col-4 my-1 text-center">
                        <Link to={"/my_properties/"}>
                            <button className="btn border border-dark w-100"
                            >My Properties</button>
                        </Link>
                    </div>
                </div>}
                <div className="row justify-content-center">
                    <div className=" col-4 my-1 text-center">
                        <Link to={"/profile_view/" + currentUser.accountId}>
                            <button className="btn border border-dark w-100"
                            >My Profile</button>
                        </Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className=" col-2 my-1 text-center">
                        <Link to={"/"}>
                            <button className="btn border border-dark w-100"
                                onClick={logout}>Logout</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default HomePage;