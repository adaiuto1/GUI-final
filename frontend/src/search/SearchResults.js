import React, { useEffect } from "react";
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
    CardHeader, Box, Button, Popover
} from "@mui/material";
import Listing from "./Listing";
// export const filterOptions = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
//     'Public Transportation', 'Families', 'Low Crime'];
export const filterOptions = [
    {'name': 'College Town', 'active': false},
    {'name': 'Quiet Neighbourhood', 'active': false}, 
    {'name': 'Community', 'active': false}, 
    {'name': 'Nearby Attractions', 'active': false},
    {'name': 'Public Transportation', 'active': false}, 
    {'name': 'Families', 'active': false}, 
    {'name': 'Low Crime', 'active': false}
];

function SearchResults(props) {
    //TODO: filter by owner if using "my properties" route

    // let PropertyList = getProperties();
    // let PropertyList;
    // getProperties.then(x => PropertyList = x);
    // console.log('PropertyList:')
    // console.log(PropertyList)


    let navigate = useNavigate();
    let pageHeader = (props.onlyMine == true) ? "My Properties" : "Search"
    const [query, updateQuery] = useState('');
    const [filters, setFilters] = useState(fils);
    const [properties, setProperties] = useState('');
    console.log('WOOHOO');
    // getProperties().then(x => setProperties(x));
    useEffect(() => {
        updateQuery(searchQuery);

        console.log('Here!!!')
        getProperties().then(x => setProperties(x));
        console.log('Got Properties!')
        console.log(properties)

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
        console.log('Before (filters): ')
        console.log(filters);
        let rf = fils.filter(x => x != r);
        setFilters(rf);
        console.log('After (rf): ')
        console.log(rf);
        removeFil(r);
    }
    const submitFilterChanges = (event) => {
        getProperties().then(x => setProperties(x)); //reset properties
        
        if (filters.length > 0) {
            console.log('Updating filters:')
            console.log(filters)
            let filteredProperties = []
            properties.forEach(x => {
                let fits = true;
                filters.forEach(filter => {
                    console.log('Checking for filter:')
                    console.log(filter)    
                    if (!x['tag' + filter]) {
                        fits = false
                    }
                })
                if (fits) {
                    filteredProperties.push(x)
                }
            })
            setProperties([...filteredProperties])
            console.log(filteredProperties)
        }
        // else{
        //     setProperties(PropertyList)
        // }
        setAnchor(null);
        // setFilters([])
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

            <header className="text-center">
                <h1>{pageHeader}</h1>
            </header>
            {console.log('RIGHT BEFORE')}
            {console.log(properties)}
            <Grid container align="center" width="80%" mx="auto">
                {
                    properties.data.map(x => {
                        return <>
                            <Grid item key={x} m={2} xs={5} sx={{ height: '40%' }}>
                                <Listing property={x}></Listing>
                            </Grid>
                        </>
                    })
                }
            </Grid>
        </>
    )
}
export default SearchResults;