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
    Avatar, Chip, Button, FormControl,
    InputLabel, Select, MenuItem, TextField
} from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect } from "react";
import { filterOptions } from "../api/getterApi";
import { editProperty, getPropertyById } from "../api/propertyApi";
import { getProfileById } from "../api";
import { deleteProperty } from '../api/propertyApi'
import { createComment, deleteComment, getCommentsByProperty } from "../api/commentApi";

export const PropertyView = () => {
    let id = useParams().id;
    let currentUser = useContext(UserContext);
    let [currentProperty, setCurrentProperty] = useState('')
    let [currTags, setCurrTags] = useState([])
    let [propertyOwner, setPropertyOwner] = useState({})
    let [comment, setComment] = useState()
    const [newRating, setNewRating] = useState(0);
    const [ratingSubmitted, setRatingSubmitted] = useState(false);
    useEffect(() => {
        
        getPropertyById(id).then(x => {
            console.log(x)
            setCurrentProperty(x);
            getProfileById(x.data[0].owner).then(x => {
                setPropertyOwner(x.data[0])
            })
            console.log(x.data[0].propertyId)
            
        });
        // setCurrentProperty(PropertyList.find(x => x.propertyId == id))
    }, [])

    const deleteProp = () => {
        deleteProperty(currentProperty.data[0].propertyId)
    }
    const submitRating = () => {
        console.log('Before:')
        console.log(currentProperty.data[0].ratingSum)
        console.log(currentProperty.data[0].numRatings)
        console.log(newRating)
        currentProperty.data[0].ratingSum += newRating;
        currentProperty.data[0].numRatings += 1;
        console.log(currentProperty);
        console.log(currentProperty.data[0]);
        editProperty(currentProperty.data[0].propertyId, currentProperty.data[0]);
        console.log('After:')
        console.log(currentProperty.data[0].ratingSum)
        console.log(currentProperty.data[0].numRatings)
        setRatingSubmitted(true);
    }
    const _deleteComment = (id)=>{
        deleteComment(id)
    }
    const submitReview = (x)=>{
        let newReview = {
            property_id: currentProperty.data[0].propertyId,
            user_id: currentUser.user_id,
            comment: comment,
            comment_id: ''
        }
        console.log(newReview)
        createComment(newReview)
        createComment({...newReview, comment: "comment2"})
    }
    if (!currentProperty) {
        return <>Loading...</>
    }
    return currentProperty && <>
        <Box width="75%" mx="auto" my={4}>
            <Card elevation="10">
                <CardHeader title={<><h3>{currentProperty.data[0].address}</h3>
                    {currentUser.user_id == propertyOwner.user_id && <>
                        <Button variant="contained" color="primary">Edit</Button>
                        <>
                            {currentUser.account_type == 2 && <Button onClick={() => deleteProp()}>Delete</Button>
                            }</>
                    </>}</>} />
                <CardContent>
                    <Grid container rowSpacing={1} mx={3}>
                        <Grid item xs={7.5}>
                            <img src="https://fecteauhomes.com/assets/image-cache/deercreek.0d4bd2b9.311b3eb9.jpg" />
                        </Grid>
                        <Grid item xs={3.5}>
                            <Card elevation="5" rounded={true}>
                                <Box mx={2}>
                                    <h5 item>Owner: {" "}
                                        <Link to={"/profile_view/" + propertyOwner.user_id}
                                        >{propertyOwner.firstname + " " + propertyOwner.lastname}</Link></h5>
                                    <h5 item>Monthly Rent: {" $" + currentProperty.data[0].monthlyRent}</h5>
                                    <h5 item>Capacity: {currentProperty.data[0].capacity}</h5>
                                    <h5 item>Size: {" " + currentProperty.data[0].sqft + "sqft"}</h5>

                                </Box>
                                <Box mx={2}>
                                    <Rating value={Math.floor(currentProperty.data[0].ratingSum / currentProperty.data[0].numRatings)}></Rating>
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
                        <Grid width="100%">
                            {/* This is for spacing */}
                        </Grid>
                        
                        {currentUser.account_type === 1 ?
                        <Typography align="center">
                            {ratingSubmitted ? 
                            <Grid item xs={10}>
                                <Card elevation="5">
                                    <h5>Rating Submitted</h5>
                                </Card>
                            </Grid>
                            :
                            <Grid item xs={10}>
                                <Card elevation="5">
                                    <h5>Leave a Rating</h5>
                                    <FormControl variant="standard">
                                        <InputLabel>Rating</InputLabel>
                                        <Select 
                                            value={newRating}
                                            onChange={(event) => setNewRating(event.target.value)}
                                        >
                                            <MenuItem value={1}>1 star</MenuItem>
                                            <MenuItem value={2}>2 stars</MenuItem>
                                            <MenuItem value={3}>3 stars</MenuItem>
                                            <MenuItem value={4}>4 stars</MenuItem>
                                            <MenuItem value={5}>5 stars</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Rating value={newRating}></Rating>
                                    <Button
                                        onClick={() => {
                                            if (newRating > 0) {
                                                submitRating();
                                            }
                                        }}
                                    >
                                        Submit</Button>
                                </Card>
                            </Grid>
                            }
                        </Typography>
                        :
                        <></>
                        }
                        <>
                            {
                                currentUser.account_type == 1 ? <>
                                    <TextField
                                        label={"Leave a comment!"}
                                        onChange={e=>setComment(e.target.value)}></TextField>
                                        <Button variant="contained" color="primary"
                                        onClick={()=>submitReview()}>Comment</Button>
                                        <Button variant="contained" color="primary"
                                        onClick={()=>_deleteComment(9)}>delete comment</Button>
                                </> : <> </>
                        }
                        </>
                    </Grid>
                </CardContent>
            </Card>
        </Box>
    </>
        ||
        <>Loading</>;
};