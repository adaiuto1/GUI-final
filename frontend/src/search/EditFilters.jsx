import {
    Grid, Card, Box,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader, Avatar, Typography, Chip,
    ToggleButton, ToggleButtonGroup, styled
} from "@mui/material";
import { filters } from "../api/getterApi";
export const EditFilters = ({
    filterOptions: filterOptions,
    onClose: onClose,
    addFilter: addFilter,
    removeFilter: removeFilter }) => {

    return <>
        {/* {console.log("The tags")}
        {console.log(filterOptions)} */}
        <Grid m={3}>
            <Typography variant="h5">Filters</Typography>
            <ToggleButtonGroup value="filters">
                <Grid>
                    {
                        filterOptions.map((tag, index) => {
                            // console.log(tag)
                            return <ToggleButton aria-label={tag.name}
                                value={tag.name}
                                aria-key={tag.name}
                                sx={{
                                    backgroundColor: tag.active ? 'blue' : 'white',
                                    "&:hover": tag.active ? {
                                        backgroundColor: 'blue'
                                    } : {
                                        backgroundColor: 'white'
                                    }
                                }}
                                onClick={() => {
                                    let cf = filterOptions.indexOf(tag) + 1;
                                    if (filters.includes(cf)) {
                                        console.log('BONJOUR')
                                        removeFilter(cf)
                                    }
                                    else {
                                        addFilter(cf)
                                    }
                                    console.log('Current filters:')
                                    console.log(filters)
                                    tag.active = !tag.active;
                                }}>{tag.name}</ToggleButton>
                        })
                    }
                </Grid>
            </ToggleButtonGroup>
        </Grid>
    </>
}