import React, { useEffect } from "react";
import { useState } from 'react';
import PropertyResult from "./PropertyResult";
import { PropertyList } from "../data/PropertyList";
import { AccountList } from "../data/AccountList";
import { currentUser, filterOptions, filters, addFilter, clearFilter, searchQuery, setSearchQuery } from "../api/getterApi";
import { Link } from 'react-router-dom';
function SearchResults(props) {
    let properties = (props.onlyMine == true) ?
        PropertyList.filter(x =>
            x.owner == currentUser.accountId)
        : PropertyList;
    let filteredProperties = [];

    console.log('Properties:');
    console.log(properties);

    properties.forEach(x => {
        if (filters.length !== 0) {
            let fitsFilters = true;
            let currTags = [];
            for (let i = 1; i <= 7; i++) {
                if (x['tag' + i]) {
                    currTags.push(filterOptions[i-1])
                }
            }
            filters.forEach(f=>{
                if(!currTags.includes(f)){
                    fitsFilters = false;
                }
            })
            if (!x.address.includes(searchQuery)) { //if address name doesn't include search parameter
                fitsFilters = false;
            }
            if(fitsFilters){
                filteredProperties.push(x);
            }
        }
        else{
            if (x.address.includes(searchQuery)) { //if address name doesn't include search parameter
                filteredProperties.push(x);
            }
        }
    })

    console.log('Filters:')
    console.log(filters);
    let pageHeader = (props.onlyMine == true) ? "My Properties" : "Search"
    const [query, updateQuery] = useState('');
    useEffect(() => {
        updateQuery(searchQuery);
    }, [])
    return (
        <>
            <div className="p-3 border rounded bg-light">
                <Link to="./edit_filters/handleFilters">
                    <button className="float-end my-2">
                        Filter Results
                    </button>
                </Link>
                <Link to="/homepage">
                    <button className="float-start my-2">Back</button>
                </Link>
                <header className="text-center">
                    <h1>{pageHeader}</h1>
                </header>

            </div>
            <div className="text-center">
                <div className="d-block">Search</div>
                <input defaultValue={searchQuery}
                    type="text"
                    name="searchQuery"
                    onChange={x => { updateQuery(x.target.value); setSearchQuery(x.target.value)/*; search(x.target.value)*/}}></input>
                {query.length !== 0 && <h1>Search results for {"'" + query + "'"}</h1>}
                {query.length === 0 && <h1 className="py-4"></h1>} {/* This is purely for spacing purposes */}
                {/* {console.log(filteredProperties)} */}
                <div className="row justify-content-center">
                    <div className="col-6 w-75">
                        <ol className="list-group ">
                            {filteredProperties.length === 0 && <h2>No properties match your search</h2>}
                            {filteredProperties.map((x) =>
                                <Link to={"/property_view/" + x.propertyId} style={{textDecoration: 'none'}}><li className="list-group-item p-0 border-0
                                "><PropertyResult property={x} /></li></Link>
                            )}
                        </ol>
                    </div>
                </div>
            </div>
        </>

    )
}
export default SearchResults;