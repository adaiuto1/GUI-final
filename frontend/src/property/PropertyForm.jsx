import React from "react";
import { UserContext } from "../App";
import { useContext, useState, useEffect } from "react";
import { Box } from "@mui/system";
import { Checkbox, FormControl, Button, FormControlLabel, FormLabel, Grid, Input, Menu, MenuItem, TextField, Switch, Typography } from "@mui/material";
import { addProperty } from '../api/propertyApi'

function PropertyForm({ values, onChange, onSubmit }) {
    let [made, setMade] = useState(false)
    const tagOptions = ['College Town', 'Quiet Neighbourhood', 'Community', 'Nearby Attractions',
        'Public Transportation', 'Families', 'Low Crime'];

    let currentUser = useContext(UserContext);

    useEffect(() => {
        onChange({ owner: currentUser.user_id, img: 'https://fecteauhomes.com/assets/image-cache/deercreek.0d4bd2b9.311b3eb9.jpg' })
    }, [])
    return <>
        <Box container>
            <Grid m={5}>
                <TextField
                    label="Address"
                    required
                    value={values.address}
                    id="Address"
                    onChange={e => onChange({ address: e.target.value })}>
                </TextField>
                <TextField
                    label="Monthly Rent"
                    type="text"
                    required
                    value={values.monthlyRent}
                    id="MonthlyRent"
                    onChange={e => onChange({ monthlyRent: +e.target.value })}>
                </TextField>
                <TextField
                    label="Capacity"
                    type="text"
                    required
                    value={values.capacity}
                    id="Capacity"
                    onChange={e => onChange({ capacity: +e.target.value })}>
                </TextField>
                <TextField
                    label="Size (sqft)"
                    type="text"
                    required
                    value={values.sqft}
                    id="Size"
                    onChange={e => onChange({ sqft: +e.target.value })}>
                </TextField>

                <br/>

                <FormControl>
                    <Typography>This Property Allows Smoking</Typography>
                    <Switch
                        value={values.smoking}
                        onChange={e => onChange({ allowsSmoking: e.target.checked })}></Switch>
                </FormControl>
                <FormControl>
                    <Typography>This Property Allows Pets</Typography>
                    <Switch label="Pet Friendly"
                        value={values.petFriendly}
                        onChange={e => onChange({ allowsPets: e.target.checked })}></Switch>
                </FormControl>
                <Grid>
                    {
                        tagOptions.map(x => {
                            return <>
                                <FormControlLabel value={x}
                                    label={x}
                                    control={<Checkbox
                                        onChange={e => {
                                            let t = 'tag' + (+tagOptions.indexOf(x) + 1);
                                            onChange({ [t]: e.target.checked })
                                        }}></Checkbox>} />
                            </>
                        })
                    }
                </Grid>
                {setMade ? <>
                    <Button onClick={() => {
                        onSubmit()
                        setMade(true)
                    }}>Submit</Button>
                </>
                    :
                    <Typography variant="success">Success!</Typography>
                }
            </Grid>
            {
                made && <>Success!  </>
            }
        </Box>
    </>
}
export default PropertyForm