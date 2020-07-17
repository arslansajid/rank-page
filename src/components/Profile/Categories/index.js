import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CategoryCard from "../CategoryCard";

const FooterLinks = () => {
    const classes = useStyles();

    return (
        <>
            <Grid container spacing={2}>
                {[...Array(5)].map((category, index) => {
                    return (
                        <Grid key={index} item lg={4} md={4} sm={6} xs={12}>
                            <CategoryCard />
                        </Grid>
                    )
                })}
            </Grid>
            <Grid className={classes.moreText}>
                <Typography variant="h5" gutterBottom>More Lists!</Typography>
                <Typography variant="body1" gutterBottom>Create Lists, Challenges and share your opnion on existing lists to add more categories</Typography>
            </Grid>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    moreText: {
        margin: theme.spacing(6, 0, 6, 0),
        textAlign: 'center'
    }
})
)


export default FooterLinks;