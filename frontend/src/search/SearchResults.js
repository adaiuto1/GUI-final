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
    let properties = PropertyList;
    let navigate = useNavigate();
    let pageHeader = (props.onlyMine == true) ? "My Properties" : "Search"
    const [query, updateQuery] = useState('');
    useEffect(() => {
        updateQuery(searchQuery);
    }, [])
    const [anchor, setAnchor] = useState(null);
    const openPopover = (event) => {
        setAnchor(event.currentTarget);
    }
    const submitFilterChanges = (event) => {
        setAnchor(null);
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
                <EditFilters filters={filterOptions} />
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