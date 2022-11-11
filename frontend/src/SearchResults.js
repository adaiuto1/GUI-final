import React from "react";
import { useState } from 'react';
import PropertyResult from "./PropertyResult";
import { PropertyList } from "./data/PropertyList";
import { AccountList } from "./data/AccountList";
import { currentUser } from "./getterApi";
import {Link} from 'react-router-dom';
function SearchResults(props) {
    let properties = (props.onlyMine == true) ?
                        PropertyList.filter(x=>
                            x.owner == currentUser.accountId)
                            : PropertyList;
    let pageHeader = (props.onlyMine == true) ? "My Properties" : "Search"
    const [query, updateQuery] = useState('');
    var filters = [];
    
    return (
        <>
            <div className="p-3 border rounded bg-light">
            <Link to="/homepage">
                        <button className="float-start my-2">Back</button>
                    </Link>
                <header className="text-center">
                    <h1>{pageHeader}</h1>
                </header>
            </div>
            <div>
            <input type="text"
                name="searchQuery"
                onChange={x => updateQuery(x.target.value)}></input>
            <h1>Search results for {"'" + query + "'"}</h1>
            <div className="row justify-content-center">
                <div className="col-6 w-75">
                    <ol className="list-group ">
                        {properties.map((x) =>
                            <li className="list-group-item p-0 border-0
                                "><PropertyResult property={x} /></li>
                        )}
                    </ol>
                </div>
            </div>
        </div>
        </>
        
    )
}
export default SearchResults;