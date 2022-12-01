import { PropertyList } from "../data/PropertyList";
import { ProfileList } from "../data/ProfileList"
import { AccountList } from "../data/AccountList";
import { Link, useParams, useNavigate } from 'react-router-dom';
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
    let navigate = useNavigate();
    let currentUser = useContext(UserContext);
    let [currentProperty, setCurrentProperty] = useState('')
    let [currTags, setCurrTags] = useState([])
    let [propertyOwner, setPropertyOwner] = useState({})
    let [comment, setComment] = useState()
    let [comments, setComments] = useState([])
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
            getCommentsByProperty(id).then(x=>{
                console.log(x)
            })
        });
    }, [])
    const deleteProp = () => {
        deleteProperty(currentProperty.data[0].propertyId)
    }
    const submitRating = () => {
        currentProperty.data[0].ratingSum += newRating;
        currentProperty.data[0].numRatings += 1;
        editProperty(currentProperty.data[0].propertyId, currentProperty.data[0]);
        setRatingSubmitted(true);
    }
    const _deleteComment = (id) => {
        deleteComment(id)
    }
    const submitReview = (x) => {
        let newReview = {
            property_id: currentProperty.data[0].propertyId,
            user_id: currentUser.user_id,
            comment: comment,
            comment_id: ''
        }
        console.log(newReview)
        createComment(newReview)
        getCommentsByProperty(59).then(x=>{
            console.log(x.data)
        })
    }
    if (!currentProperty) {
        return <>Loading...</>
    }
    return currentProperty && <>
        <Box width="80%" mx="auto" my={4}>
            <Card elevation="10"
            >
                <CardHeader
                    sx={{ bgcolor: 'text.primary', color: 'secondary.contrastText' }}
                    title={<><h3>{currentProperty.data[0].address}</h3>
                        {currentUser.user_id == propertyOwner.user_id && <>
                            <Button variant="contained" color="primary">Edit</Button>
                            <>
                                {currentUser.account_type == 2 && <Button onClick={() =>{ deleteProp(); navigate('/properties')}}>Delete</Button>
                                }</>
                        </>}</>} />
                <CardContent>
                    <Grid container Spacing={2} mx={3}>
                        <Grid item xs={7}>

                            <Box item component="img"
                                src="https://fecteauhomes.com/assets/image-cache/deercreek.0d4bd2b9.311b3eb9.jpg" />

                        </Grid>
                        <Grid item xs={11} md={3}>
                            <Card elevation="5" rounded={true}>
                                <Box mx={2}>
                                    <Typography variant="h6">
                                        Owner: {" "}
                                        <Link to={"/profile_view/" + propertyOwner.user_id}
                                        >{propertyOwner.firstname + " " + propertyOwner.lastname}</Link>
                                    </Typography>
                                    <Typography variant="h6">Monthly Rent: {" $" + currentProperty.data[0].monthlyRent}</Typography>
                                    <Typography variant="h6">Capacity: {currentProperty.data[0].capacity}</Typography>
                                    <Typography variant="h6">Size: {" " + currentProperty.data[0].sqft + "sqft"}</Typography>


                                </Box>
                                <Box mx={2}>
                                    <Rating value={Math.floor(currentProperty.data[0].ratingSum / currentProperty.data[0].numRatings)}></Rating>
                                </Box>
                            </Card>
                        </Grid>
                        <Grid item xs={5} md={3} lg={3} xl={3} mt={2}>
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
                        <Grid item xs={5} my={0}>
                            <h5>Allows Smoking: {currentProperty.data[0].allowsSmoking ? "Yes" : "No"}</h5>
                            <h5>Allows Pets: {currentProperty.data[0].allowsPets ? "Yes" : "No"}</h5>

                        </Grid>
                        <Grid width="100%">
                            {/* This is for spacing */}
                        </Grid>
                        {currentUser.account_type === 1 ?
                            <>
                                {ratingSubmitted ?
                                    <Grid item xs={10} sm={5} md={4} lg={3} xl={2}>
                                        <Typography variant="h6">
                                            Rating Submitted!
                                        </Typography>
                                    </Grid>
                                    :
                                    <Grid item xs={11} sm={5} md={4} lg={3} xl={2}
                                        align="center"
                                        justifyContent="center">

                                        <Typography variant="h6" mb={2}>Leave a Rating</Typography>
                                        <FormControl variant="standard">
                                            <InputLabel>Rating</InputLabel>
                                            <Select
                                                sx={{ marginX: '1em' }}
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
                                        <br></br>
                                        <Button
                                            onClick={() => {
                                                if (newRating > 0) {
                                                    submitRating();
                                                }
                                            }}
                                        >
                                            Submit</Button>
                                    </Grid>
                                }</>
                            :
                            <></>
                        }
                        <>
                            {
                                currentUser.account_type == 1 ? <>
                                    <Grid item container xs={11} sm={6} md={7} lg={8} xl={9} spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                fullWidth
                                                label={"Leave a comment"}
                                                onChange={e => setComment(e.target.value)}></TextField>
                                        </Grid>
                                        <Grid item>

                                            <Button variant="contained" color="primary"
                                                onClick={() => submitReview()}>Comment</Button>
                                        </Grid>

                                    </Grid>
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