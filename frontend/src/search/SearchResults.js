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
    CardHeader, Box, Button, Popover, Typography, TextField, FormControl, MenuItem,
    InputLabel, Select,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import Listing from "./Listing";
import { UserContext } from "../App";
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

    let currentUser = useContext(UserContext)
    let navigate = useNavigate();
    let pageHeader = (currentUser.account_type === 2) ? "My Properties" : "Search"
    const [query, setQuery] = useState('');
    const [filters, setFilters] = useState(fils);
    const [properties, setProperties] = useState('');
    const [allProperties, setAllProperties] = useState('');
    const [sort, setSort] = useState('Alphabetical');
    useEffect(() => {
        getProperties().then(x => {
            x.data.sort((a, b) => a.address.localeCompare(b.address));
            setProperties(x);
            setAllProperties(x);
        });

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
        let filteredProperties = { 'data': [] };
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

    const applySort = (event) => {
        setSort(event.target.value)
        if (event.target.value === "Alphabetical") {
            properties.data.sort((a, b) => a.address.localeCompare(b.address))
        } else if (event.target.value === "Low Rating") {
            properties.data.sort(function (a, b) {
                if (a.ratingSum / a.numRatings < b.ratingSum / b.numRatings)
                    return -1;
                if (a.ratingSum / a.numRatings > b.ratingSum / b.numRatings)
                    return 1;
                return 0;
            });
        } else if (event.target.value === "High Rating") {
            properties.data.sort(function (a, b) {
                if (a.ratingSum / a.numRatings > b.ratingSum / b.numRatings)
                    return -1;
                if (a.ratingSum / a.numRatings < b.ratingSum / b.numRatings)
                    return 1;
                return 0;
            });
        }
    }

    if (!properties) {
        return <>Loading...</>
    }

    return (
        <>
            <Grid container mx={3} align="center" justifyContent="center">
                <Grid container mt={4}>
                    <Grid item xs={4} sm={3} lg={1}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            onClick={() => navigate('/')}>Home</Button>
                    </Grid>

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
                </Grid>

                <Grid container m={3} spacing={2}>
                    <Grid item xs={2} align="right">
                        <Typography variant="h6" >
                            {pageHeader}
                        </Typography>
                    </Grid>
                    <Grid item xs={11} md={7}>
                        <TextField
                            fullWidth onChange={x => {
                                setQuery(x.target.value);
                            }} />
                    </Grid>
                    <Grid item>
                            <Button variant="contained"
                                onClick={() => submitQuery()}>
                                Search</Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent={"center"}>
                    <Typography align="center">
                        <FormControl variant="standard">
                            <InputLabel>Sorted By</InputLabel>
                            <Select
                                value={sort}
                                onChange={event => applySort(event)}
                            >
                                <MenuItem value="Alphabetical">Alphabetical</MenuItem>
                                <MenuItem value="Low Rating">Low Rating</MenuItem>
                                <MenuItem value="High Rating">High Rating</MenuItem>
                            </Select>
                        </FormControl>
                    </Typography>
                    <Grid item xs={4} sm={3} lg={1}>
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            onClick={openPopover}
                            sx={{ float: 'right' }}>Edit Filters</Button>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent={"center"} >
                    {
                        properties.data.map(x => {
                            if (currentUser.account_type == 2) {
                                return x.owner == currentUser.user_id && <>
                                    <Grid item key={x} xs={11} md={5}>
                                        <Listing property={x}></Listing>
                                    </Grid>
                                </>
                            }
                            else {
                                return <>
                                    <Grid item key={x} xs={11} md={5}>
                                        <Listing property={x}></Listing>
                                    </Grid></>
                            }
                        })
                    }
                </Grid>
            </Grid>

        </>
    )
}
export default SearchResults;