import { PropertyList } from "../data/PropertyList";
import { ProfileList } from "../data/ProfileList"
import { AccountList } from "../data/AccountList";
import { Link, useParams } from 'react-router-dom';
import TrueFalseLabel from '../common/TrueFalseLabel';
import { Rating } from '../common/rating';
import { UserContext } from "../App";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import {
    Typography, Card, Grid, Box, CardHeader,
    CardContent,
    Avatar, Chip
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import { filterOptions } from "../api/getterApi";
import { getPropertyById } from "../api/propertyApi";
let ratingValues={
    numRatings: 0,
    ratings: []
}
export const PropertyView = () => {
    let id = useParams().id;
    let currentUser = useContext(UserContext);
    let [currentProperty, setCurrentProperty] = useState('')
    let [currTags, setCurrTags] = useState([])
    let [propertyOwner, setPropertyOwner] = useState({})
    let [rating, setRating] = useState(ratingValues)
    useEffect(() => {
        console.log('Searching for id: ' + id);
        getPropertyById(id).then(x => {
            setCurrentProperty(x);
            console.log('Property should now be: ');
            console.log(x);
        });
        console.log('Got the property!');
        console.log(currentProperty);
        // setCurrentProperty(PropertyList.find(x => x.propertyId == id))
    }, [])
    // useEffect(() => {
    //     console.log('Currently the property is:');
    //     console.log(currentProperty);
    //     let ct = [];
    //     for (let i = 1; i <= 7; i++) {
    //         if (currentProperty.data[0]['tag' + i]) {
    //             ct.push(filterOptions[i - 1])
    //         }
    //     }
    //     setCurrTags(ct)
    //     if (currentProperty.data[0].owner) {
    //         setPropertyOwner(ProfileList.find(x => x.accountId == currentProperty.owner))
    //     }
    //     //CALCULATE RATINGS
    // }, [currentProperty])

    if (!currentProperty) {
        console.log('We are loading')
        return <>Loading...</>
    }
    return currentProperty && <>
        {console.log('Property')}
        {console.log(currentProperty)}
        <Box width="75%" mx="auto" my={4}>
            <Card elevation="10">
                <CardHeader title={<h3>{currentProperty.data[0].address}</h3>} />
                <CardContent>

                    <Grid container rowSpacing={1} mx={3}>
                        <Grid item xs={7.5}>
                            <img src="https://fecteauhomes.com/assets/image-cache/deercreek.0d4bd2b9.311b3eb9.jpg" />
                        </Grid>
                        <Grid item xs={3.5}>
                            <Card elevation="5" rounded={true}>
                                <Box mx={2}>
                                    <h5 item>Owner: {" "}
                                    <Link to={"/profile_view/" + propertyOwner.accountId}
                                    >{propertyOwner.firstName + " " + propertyOwner.lastName}</Link></h5>
                                    <h5 item>Monthly Rent: {" $" + currentProperty.data[0].monthlyRent}</h5>
                                    <h5 item>Capacity: {currentProperty.data[0].capacity}</h5>
                                    <h5 item>Size: {" " + currentProperty.data[0].sqft + "sqft" }</h5>
                                </Box>
                                <Box mx={2}>
                                    <Rating value={Math.floor(currentProperty.data[0].rating)}></Rating>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container>
                                {currentProperty.data[0].tag1 === 1 && <Chip label="College Town"></Chip>}
                                {currentProperty.data[0].tag2 === 1 && <Chip label="Quiet Neighbourhood"></Chip>}
                                {currentProperty.data[0].tag3 === 1 && <Chip label="Community"></Chip>}
                                {currentProperty.data[0].tag4 === 1 && <Chip label="Nearby Attractions"></Chip>}
                                {currentProperty.data[0].tag5 === 1 && <Chip label="Public Transportation"></Chip>}
                                {currentProperty.data[0].tag6 === 1 && <Chip label="Families"></Chip>}
                                {currentProperty.data[0].tag7 === 1 && <Chip label="Low Crime"></Chip>}
                            </Grid>
                        </Grid>
                        <Grid item xs={3.5} my={0}>
                            <Grid item xs={12}>
                                <h5>Allows Smoking: {currentProperty.data[0].allowsSmoking ? "Yes" : "No"}</h5>
                                <h5>Allows Pets: {currentProperty.data[0].allowsPets ? "Yes" : "No"}</h5>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>

            </Card>

        </Box>
    </>
        ||
        <>Loading</>;
};