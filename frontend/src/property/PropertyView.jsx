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
        //getPropertyById(id).then(x=>setCurrentProperty(x))
        setCurrentProperty(PropertyList.find(x => x.propertyId == id))
    }, [])
    useEffect(() => {
        let ct = [];
        for (let i = 1; i <= 7; i++) {
            if (currentProperty['tag' + i]) {
                ct.push(filterOptions[i - 1])
            }
        }
        setCurrTags(ct)
        if (currentProperty.owner) {
            setPropertyOwner(ProfileList.find(x => x.accountId == currentProperty.owner))
        }
        //CALCULATE RATINGS
    }, [currentProperty])

    return currentProperty && <>
        <Box width="75%" mx="auto" my={4}>
            <Card elevation="10">
                <CardHeader title={<h3>{currentProperty.address}</h3>} />
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
                                    <h5 item>Monthly Rent: {" $" + currentProperty.monthlyRent}</h5>
                                    <h5 item>Capacity: {currentProperty.capacity}</h5>
                                    <h5 item>Size: {" " + currentProperty.sqft + "sqft" }</h5>
                                </Box>
                                <Box mx={2}>
                                    <Rating value={Math.floor(currentProperty.rating)}></Rating>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={5}>
                            <Grid container>
                                {currTags.map(x => <>
                                    <Chip key={x}
                                        label={x}></Chip>
                                </>)}
                            </Grid>
                        </Grid>
                        <Grid item xs={3.5} my={0}>
                            <Grid item xs={12}>
                                <h5>Allows Smoking: {currentProperty.allowsSmoking ? "Yes" : "No"}</h5>
                                <h5>Allows Pets: {currentProperty.allowsPets ? "Yes" : "No"}</h5>
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