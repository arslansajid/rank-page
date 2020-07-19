import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import NotificationTile from "../../components/NotificationTile"

const Notification = () => {
    const classes = useStyles();
		return (
			<>
            <Paper elevation={0} className={classes.container}>

                <Typography variant="h6" gutterBottom>Recent</Typography>
                {[...Array(3)].map((news, index) => {
                    return (
                        <Grid key={index}>
                            <NotificationTile notification={"has started following you!"} />
                        </Grid>
                    )
                })}

                <div className={classes.seperator} />

                <Typography variant="h6" gutterBottom>Earlier</Typography>
                {[...Array(3)].map((news, index) => {
                    return (
                        <Grid key={index}>
                            <NotificationTile notification={"has started following you!"} />
                        </Grid>
                    )
                })}
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
