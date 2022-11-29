import React, { useEffect } from "react";
import { useState } from 'react';
import PropertyResult from "./PropertyResult";
import { PropertyList } from "../data/PropertyList";
import { AccountList } from "../data/AccountList";
import { currentUser, filters, addFilter, clearFilter, searchQuery, setSearchQuery } from "../api/getterApi";
import { Link, useNavigate } from 'react-router-dom';
import { EditFilters } from "./EditFilters";
import {
    Grid, Card,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader, Box, Button, Popover
} from "@mui/material";
import Listing from "./Listing";
export const filterOptions = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
    'Public Transportation', 'Families', 'Low Crime'];
function SearchResults(props) {
    //TODO: filter by owner if using "my properties" route

    let navigate = useNavigate();
    let pageHeader = (props.onlyMine == true) ? "My Properties" : "Search"
    const [query, updateQuery] = useState('');
    const [filters, setFilters] = useState([]);
    const [properties, setProperties] = useState(PropertyList)
    useEffect(() => {
        updateQuery(searchQuery);
    }, [])
    const [anchor, setAnchor] = useState(null);
    const openPopover = (event) => {
        setAnchor(event.currentTarget);
    }
    const addFilter = (newFilter) => {
        setFilters([...filters, newFilter])
    }
    const removeFilter = (r) => {
        let rf = filters.filter(x => x != r);
        setFilters(rf);
    }
    const submitFilterChanges = (event) => {
        if (filters.length > 0) {
            let filteredProperties = []
            properties.forEach(x => {
                let fits = true;
                filters.forEach(filter => {
                    if (!x['tag' + filter]) {
                        fits = false
                    }
                })
                if (fits) {
                    filteredProperties.push(x)
                }
            })
            setProperties([...filteredProperties])
        }
        else{
            setProperties(PropertyList)
        }
        setAnchor(null);
        setFilters([])
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
            <Grid container align="center" width="80%" mx="auto">
                {
                    properties.map(x => {
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