import React from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../../PostCard";

const Challenges = () => {
    const classes = useStyles();

    return (
        <>
            {[...Array(3)].map((list, index) => {
                return (
                    <Grid key={index}>
                        <PostCard />
                    </Grid>
                )
            })}
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


export default Challenges;