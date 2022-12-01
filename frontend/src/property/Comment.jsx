import React from "react";
import {
    Typography, Card, Grid, Box, CardHeader,
    CardContent,
    Avatar, Chip, Button, FormControl,
    InputLabel, Select, MenuItem, TextField
} from "@mui/material";
import { useState, useEffect } from "react";
import { getProfileById } from "../api";
import { NavLink } from "react-router-dom";
import { blue } from "@mui/material/colors";
import { useContext } from "react";
import { UserContext } from "../App";
export const Comment = ({ comment, deleteComment }) => {
    let currentUser = useContext(UserContext)
    let [user, setUser] = useState({})
    useEffect(() => {
        getProfileById(comment.user_id).then(x => {
            setUser(x.data[0])
            console.log(user)
        }
        )
    }, [])
    return user && <>
        <Grid container>
            <Grid item xs={12}>
                <Card>
                    <CardHeader title={
                        <><Typography sx={{float:'left'}}>{user.firstname + " " + user.lastname}</Typography>
                            {   (currentUser.user_id == user.user_id
                                || currentUser.account_type == 2) &&
                                <Button variant="contained"
                                color='warning'
                                label="DELETE"
                                sx={{ float: 'right' }}
                                onClick={()=>{deleteComment(comment.comment_id)}}>Delete</Button>}</>}
                        avatar={<NavLink to={"/profile_view/" + user.user_id}>
                            <Avatar sx={{ bgcolor: blue[500] }} aria-label="owner"></Avatar>
                        </NavLink>}>
                    </CardHeader>
                    <CardContent>
                        <Typography variant="h6">
                            {comment.comment}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </>
}