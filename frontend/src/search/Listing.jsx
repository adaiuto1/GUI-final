import {
    Grid, Card,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader, Avatar, Typography, Chip
} from "@mui/material";
import { blue } from "@mui/material/colors";
import React from "react";
import { NavLink } from "react-router-dom";
import { filterOptions } from "./SearchResults";
function Listing({ property }) {
    let currTags = [];
    for (let i = 1; i < 7; i++) {
        if (property['tag' + i]) {
            currTags.push(filterOptions[i])
        }
    }
    return <>
        <Card>
            <CardHeader avatar={
                <NavLink to={"/profile_view/" + property.owner}>
                    <Avatar sx={{ bgcolor: blue[500] }} aria-label="owner"></Avatar>
                </NavLink>
            }
                title={<h2>{property.address}</h2>}>
            </CardHeader>
            <img src={property.img} style={{ width: '100%', height: '150px', objectFit: 'cover' }}></img>
            <CardContent>
                <Grid container>
                    {currTags.map(x => <>
                        <Chip key={x}
                            label={x}></Chip>
                    </>)}
                </Grid>
                <Grid mt={3}>
                    <NavLink to={'/property/' + property.propertyId}>
                        <button>View Details</button>
                        <br></br>
                    </NavLink>
                    <button>Contact Owner</button>
                </Grid>
            </CardContent>
        </Card>
    </>
}
export default Listing;