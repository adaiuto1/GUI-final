import PropertyResult from "./PropertyResult";
import { properties } from './Directory';
import React from "react";
import {useState} from 'react';
function SearchResults() {
    let p = properties[0];
    let sortedResults = [p, p, p, p, p, p, p, p];
    const [query, updateQuery] = useState('');
    return (
        <div id="searchResultsPage">
            <input type="text"
            name="searchQuery"
            onChange={x => updateQuery(x.target.value)}></input>
            <h1>Search results for {"'" + query + "'"}</h1>
            <div id="searchResultsBox">
                <ol>
                    {sortedResults.map((x) =>
                        <li><PropertyResult property={x}/></li>
                    )}
                </ol>
            </div>


        </div>
    )
}
export default SearchResults;