import React from "react";
import { Link } from 'react-router-dom';
import { currentUser, setCurrentUser } from "../api/getterApi";
function HomePage() {

    let accountType = currentUser.accountType;
    let acctTypeString = accountType == 1 ? "Tenant" : "Landlord"
    let accountId = currentUser.accountId;
    function logout(){
        setCurrentUser(undefined)
    }
    if (accountType == 1) {
        return (
            <>
                <div className="p-3 mb-5 border rounded bg-light">
                    <header className="text-center">
                        <h1>{acctTypeString + " "}Home Page</h1>
                    </header>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className=" col-4 my-1 text-center">
                            <Link to={"/search_results"}>
                                <button className="btn border border-dark w-100"
                                >Search Properties</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className=" col-4 my-1 text-center">
                            <Link to={"/profile_view/" + accountId}>
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
    else if(accountType == 2){
        return(
            <>
            <div className="p-3 mb-5 border rounded bg-light">
                    <header className="text-center">
                        <h1>{acctTypeString + " "}Home Page</h1>
                    </header>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className=" col-4 my-1 text-center">
                            <Link to={"/my_properties"}>
                                <button className="btn border border-dark w-100"
                                >My Properties</button>
                            </Link>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className=" col-4 my-1 text-center">
                            <Link to={"/profile_view/" + accountId}>
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
            </>)
    }
}
export default HomePage;