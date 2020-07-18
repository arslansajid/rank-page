import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid } from '@material-ui/core';

const NotificationTile = (props) => {
    const classes = useStyles();
    const {notification} = props;
    return (
        <>
            <Grid container alignItems="center" className={classes.profileContainer}>
                <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                <Typography>
                <span className={classes.bold}>@randomhandle </span>
                    {notification}
                </Typography>
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
    profileContainer: {
        padding: theme.spacing(2, 0),
        cursor: "pointer",
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

export default connect(mapStateToProps)(NotificationTile);