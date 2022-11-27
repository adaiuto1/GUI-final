import {
    Grid, Card, Box,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader, Avatar, Typography, Chip,
    ToggleButton, ToggleButtonGroup
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
            <ToggleButtonGroup color="primary">
                <Grid>
                    {
                        filterOptions.map(tag => {
                            return <ToggleButton aria-label={tag}
                                value={tag}
                                aria-key={tag}
                                onClick={() => {
                                    let cf = filterOptions.indexOf(tag) + 1;
                                    if (filters.includes(cf)) {
                                        removeFilter(cf)
                                    }
                                    else {
                                        addFilter(cf)
                                    }
                                }}>{tag}</ToggleButton>
                        })
                    }
                </Grid>
            </ToggleButtonGroup>
        </Grid>
    </>
}