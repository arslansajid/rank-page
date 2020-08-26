import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import NotificationTile from "../../components/NotificationTile";
import {getNotifications} from "./action"

const Notification = () => {
    const classes = useStyles();
    const [notifications, setNotifications] = useState([])

    useEffect(() => {
        const data = {
            page: 1
        }
        getNotifications(data)
        .then((res) => {
            setNotifications(res.data.data)
        })
        .catch((err) => {
            console.log(err)
            alert("Error fetching notifications!")
        })
    }, [])

		return (
			<>
            <Paper elevation={0} className={classes.container}>

                <Typography variant="h6" gutterBottom>Recent</Typography>
                {!!notifications && notifications.length > 0 ? notifications.map((notification, index) => {
                    return (
                        <Grid key={index}>
                            <NotificationTile notification={notification.body} time={notification.created_at} />
                        </Grid>
                    )
                })
            :
            <Typography variant="h6" align="center" gutterBottom>No Notifications here...</Typography>
            }

                {/* <div className={classes.seperator} />

                <Typography variant="h6" gutterBottom>Earlier</Typography>
                {[...Array(3)].map((news, index) => {
                    return (
                        <Grid key={index}>
                            <NotificationTile notification={"has started following you!"} time={new Date()} />
                        </Grid>
                    )
                })} */}
            </Paper>
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
    }
    })
)

export default Notification;
