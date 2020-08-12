import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import SearchInput from "../../components/Common/SearchInput";
import Card from '@material-ui/core/Card';
import CategoryIcon from '@material-ui/icons/Category';
import LikeIcon from '@material-ui/icons/Whatshot';
import RecommendedIcon from '@material-ui/icons/ThumbUpAlt';
import CompetitionIcon from '@material-ui/icons/FitnessCenter';

const Explore = () => {
    const classes = useStyles();
    return (
        <>
            <Grid className="space-2">
                <SearchInput whiteInput={true} place />
            </Grid>
            <Link to="/categories">
                <Card variant="outlined" className={classes.card}>
                    <CategoryIcon fontSize="large" className={classes.icon} />
                    <Typography variant="h6">Categories</Typography>
                </Card>
            </Link>

            <Grid container justify="space-between">
                <Grid item xs={6}>
                    <Link to="trending">
                        <Card variant="outlined" className={`${classes.card} ${classes.left}`}>
                            <LikeIcon fontSize="large" className={classes.icon} />
                            <Typography variant="h6">Trending</Typography>
                        </Card>
                    </Link>
                </Grid>
                <Grid item xs={6}>
                    <Link to="/recommended">
                        <Card variant="outlined" className={`${classes.card} ${classes.right}`}>
                            <RecommendedIcon fontSize="large" className={classes.icon} />
                            <Typography variant="h6">Recommended</Typography>
                        </Card>
                    </Link>
                </Grid>
            </Grid>

            <Link to="/competitions">
                <Card variant="outlined" className={classes.card}>
                    <CompetitionIcon fontSize="large" className={classes.icon} />
                    <Typography variant="h6">Contests</Typography>
                </Card>
            </Link>
        </>
    );
}

const useStyles = makeStyles((theme) => ({
    container: {
        minHeight: 100,
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
        marginTop: 8,
        padding: "1em"
    },
    seperator: {
        // backgroundColor: 'rgba(38, 38, 38, 0.12)',
        width: '100%',
        height: 1,
        margin: "1em 0 1em"
    },
    card: {
        height: 150,
        marginBottom: 10,
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: {
        width: '95%'
    },
    right: {
        width: '95%',
        marginLeft: '5%'
    },
    icon: {
        color: Colors.brandColor,
    }
})
)

export default Explore;
