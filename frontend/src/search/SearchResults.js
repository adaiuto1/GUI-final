import React, { useContext, useEffect } from "react";
import { useState } from 'react';
import PropertyResult from "./PropertyResult";
// import { PropertyList } from "../data/PropertyList";
import { AccountList } from "../data/AccountList";
import { currentUser, filters as fils, addFilter as addFil, removeFilter as removeFil, clearFilter, searchQuery, setSearchQuery } from "../api/getterApi";
import { Link, useNavigate } from 'react-router-dom';
import { EditFilters } from "./EditFilters";
import { getProperties, addProperty } from "../api/propertyApi";
import {
    Grid, Card,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader, Box, Button, Popover, Typography, TextField
} from "@mui/material";
import Listing from "./Listing";
import { UserContext } from "../App";
// export const filterOptions = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
//     'Public Transportation', 'Families', 'Low Crime'];
export const filterOptions = [
    { 'name': 'College Town', 'active': false },
    { 'name': 'Quiet Neighbourhood', 'active': false },
    { 'name': 'Community', 'active': false },
    { 'name': 'Nearby Attractions', 'active': false },
    { 'name': 'Public Transportation', 'active': false },
    { 'name': 'Families', 'active': false },
    { 'name': 'Low Crime', 'active': false }
];

function SearchResults(props) {
    //TODO: filter by owner if using "my properties" route

    // let PropertyList = getProperties();
    // let PropertyList;
    // getProperties.then(x => PropertyList = x);
    let currentUser = useContext(UserContext)
    let navigate = useNavigate();
    let pageHeader = (props.onlyMine == true) ? "My Properties" : "Search"
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState(fils);
    const [properties, setProperties] = useState('');
    const [allProperties, setAllProperties] = useState('');
    // getProperties().then(x => setProperties(x));
    useEffect(() => {
        // updateQuery(searchQuery);

        getProperties().then(x => {
            setProperties(x);
            setAllProperties(x);
            console.log(x)});

        filterOptions.forEach(x => { //resets all tags when page is reloaded
            x.active = false;
        })
    }, [])


    const [anchor, setAnchor] = useState(null);
    const openPopover = (event) => {
        setAnchor(event.currentTarget);
    }
    const addFilter = (newFilter) => {
        console.log("THE NEW FILTER:" + newFilter);
        setFilters([...filters, newFilter])
        addFil(newFilter);
    }
    const removeFilter = (r) => {
        let rf = fils.filter(x => x != r);
        setFilters(rf);
        removeFil(r);
    }
    const submitFilterChanges = (event) => {
        let filteredProperties = { 'data': [] }
        allProperties.data.forEach(x => {
            let fits = true;
            filters.forEach(filter => {
                if (!x['tag' + filter]) {
                    fits = false;
                }
            })
            if (!x.address.includes(query)) {
                fits = false;
            }
            if (fits) {
                filteredProperties.data.push(x)
            }
        })
        setProperties(filteredProperties)
        setAnchor(null);
    }

    const submitQuery = () => {
        let filteredProperties = {'data': []};
        allProperties.data.forEach(x => {
            let fits = true;
            filters.forEach(filter => {
                if (!x['tag' + filter]) {
                    fits = false;
                }
            })
            if (!x.address.includes(query)) {
                fits = false;
            }
            if (fits) {
                filteredProperties.data.push(x)
            }
        })
        setProperties(filteredProperties)
    }

    if(!properties) {
        return <>Loading...</>
    }

    return (
        <>
            <Button
                variant='contained'
                color='primary'
                onClick={openPopover}
                sx={{ float: 'right' }}>Edit Filters</Button>
            <Popover
                open={anchor}
                anchorEl={anchor}
                anchorOrigin={{
                    vertical: 'center',
                    horizontal: 'left'
                }}
                transformOrigin={{
                    vertical: 'center',
                    horizontal: 'center'
                }}
                onClose={submitFilterChanges}
            >
                <EditFilters filterOptions={filterOptions}
                    addFilter={addFilter}
                    removeFilter={removeFilter} />
            </Popover>

            <br />

            <header className="text-center">
                <Typography align="center">
                    <h1>{pageHeader}</h1>
                </Typography>
                <Typography align="center">
                    <TextField onChange={ x => {
                         setQuery(x.target.value);
                    }} /> {/* The Search Bar */}
                </Typography>
                <Typography align="center">
                    <Button variant="contained"
                            onClick={() => submitQuery()}
                    >
                        Search</Button>
                </Typography>
            </header>

            <Grid container align="center" width="80%" mx="auto">
                {
                    properties.data.map(x => {
                        if (currentUser.account_type == 2) {
                            return x.owner == currentUser.user_id && <>
                                <Grid item key={x} m={2} xs={5} sx={{ height: '40%' }}>
                                    <Listing property={x}></Listing>
                                </Grid>
                            </>
                        }
                        else {
                            return <>
                                <Grid item key={x} m={2} xs={5} sx={{ height: '40%' }}>
                                    <Listing property={x}></Listing>
                                </Grid></>
                        }
                    })
                }
            </Grid>
        </>
    )
}
export default SearchResults;