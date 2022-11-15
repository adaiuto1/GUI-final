import React, { useEffect } from "react";
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearFilter, filters , addFilter, filterOptions} from './getterApi'
function EditFilters() {
    
    function handleToggle(x) {
        if (filters.includes(x.target.id)) {
            filters.splice(filters.indexOf(x.target.id), 1)
        }
        else {
            addFilter(x.target.id)
        }
    }
    return (
        <>
            <div className="p-3 border bg-light">
                <Link to="/search_results">
                    <button className="float-start my-2"
                    onClick={clearFilter}>Cancel</button>
                </Link>
                <header className="text-center">
                    <h1>Edit Search Filters</h1>
                </header>
            </div>
            <div className="w-50 m-auto">
                <div className="rounded border w-50 my-3 float-start">
                    <span>
                        <h4 className="rounded-top bg-dark text-light p-2 px-3">
                            Filter by: </h4>
                    </span>
                    <div className="d-flex flex-wrap">
                        {filterOptions.map(x => {
                            return (
                                <div key={x} className="p-2">
                                    <input className="btn-check"
                                        type="checkbox"
                                        value={filters[{x}] ? "2" : "1"}
                                        id={x}
                                        onChange={event =>
                                            handleToggle(event)
                                        } />
                                    <label className="btn btn-outline-info" htmlFor={x}>
                                        <h5>{x}</h5>
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="rounded border w-50 my-3 float-end">
                    <span>
                        <h4 className="rounded-top bg-dark text-light p-2 px-3">
                            Allows: </h4>
                    </span>
                </div>
                <div>
                    <Link to="/search_results">
                        <button className="btn border border-dark w-100"
                        
                        >Apply Filters</button>
                    </Link>

                </div>
            </div>
        </>
    )
}
export default EditFilters;