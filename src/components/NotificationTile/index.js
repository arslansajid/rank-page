import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid } from '@material-ui/core';
import moment from 'moment';
import Config from "../../api/config";
import { withRouter } from "react-router-dom";

const NotificationTile = (props) => {
    const classes = useStyles();
    const {notification, time, history} = props;

    const redirectToRespectivePage = () => {
        let notificationType = notification.notification_type;
        if(notificationType === 2) { //for list
            history.push(`/list-detail/${notification.id}`)
        }
    }

    return (
        <>
            <Grid container alignItems="center" justify="space-between" className={classes.profileContainer} onClick={() => redirectToRespectivePage()}>
                <Grid className={classes.row}>
                    <Avatar className={classes.avatar} src={notification.user.profile_image ? `${Config.BASE_APP_URL}${notification.user.profile_image}` : require("../../assets/images/user.jpg")} />
                    <Typography>
                    {/* <span className={classes.bold}>@randomhandle </span> */}
                        @{notification.body}
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

export default withRouter(connect(mapStateToProps)(NotificationTile));