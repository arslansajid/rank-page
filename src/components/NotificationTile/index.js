import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid } from '@material-ui/core';
import moment from 'moment';

const NotificationTile = (props) => {
    const classes = useStyles();
    const {notification, time} = props;
    return (
        <>
            <Grid container alignItems="center" justify="space-between" className={classes.profileContainer}>
                <Grid className={classes.row}>
                    <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <Typography>
                    <span className={classes.bold}>@randomhandle </span>
                        {notification}
                    </Typography>
                </Grid>
                <Typography>
                    {moment(time).format("hh:mm A")}
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
    },
    row: {
        display: "flex",
        alignItems: "center"
    }
}))

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(NotificationTile);