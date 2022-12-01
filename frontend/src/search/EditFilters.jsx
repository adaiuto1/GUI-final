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
        <Grid m={3}>
            <Typography variant="h5">Filters</Typography>
            <ToggleButtonGroup value="filters">
                <Grid>
                    {
                        filterOptions.map((tag, index) => {
                            return <ToggleButton aria-label={tag.name}
                                value={tag.name}
                                aria-key={tag.name}
                                sx={{
                                    backgroundColor: tag.active ? '#2d78d4' : 'white',
                                    "&:hover": tag.active ? {
                                        backgroundColor: '#2d78d4'
                                    } : {
                                        backgroundColor: 'white'
                                    }
                                }}
                                onClick={() => {
                                    let cf = filterOptions.indexOf(tag) + 1;
                                    if (filters.includes(cf)) {
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