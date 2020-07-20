import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid, Button } from '@material-ui/core';

const SearchTile = (props) => {
    const classes = useStyles();
    return (
        <>
            <Grid container alignItems="center" justify="space-between" className={classes.profileContainer}>
                <div className={classes.row}>
                    <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <div>
                        <Typography className={classes.bold}>
                            Arslan Sajid
                        </Typography>
                        <Typography variant="body2">
                            @arslansajid
                        </Typography>
                    </div>
                </div>
                <Button color="primary" variant="outlined">Follow</Button>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    verticalCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
    },
    row: {
        display: 'flex'
    },
    profileContainer: {
        padding: theme.spacing(2, 0),
        borderBottom: '1px solid rgba(38, 38, 38, 0.12)',
    },
    avatar: {
        marginRight: 15,
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    bold: {
        fontWeight: 'bold'
    }
}))

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(SearchTile);