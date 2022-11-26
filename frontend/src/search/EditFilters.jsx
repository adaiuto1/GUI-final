import {
    Grid, Card, Box,
    CardMedia,
    CardContent,
    CardActions,
    CardHeader, Avatar, Typography, Chip,
    ToggleButton, ToggleButtonGroup
} from "@mui/material";
export const EditFilters = ({ filters: filters, onClose: onClose, addFilter: addFilter }) => {

    return <>

        <Grid m={3}>
            <Typography variant="h5">Filters</Typography>
            <ToggleButtonGroup color="primary">
                <Grid>
                    {
                        filters.map(tag => {
                            return <ToggleButton aria-label={tag}
                                value={tag}
                                aria-key={tag}
                                onClick={()=>addFilter(filters.indexOf(tag) + 1)}>{tag}</ToggleButton>
                        })
                    }
                </Grid>
            </ToggleButtonGroup>
        </Grid>
    </>
}