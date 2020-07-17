import React from "react";
import {Typography, TextField, IconButton, Grid, Paper, Button} from "@material-ui/core";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';

const ProfileCover = () => {
    const classes = useStyles();

    return (
        <>
        <Paper elevation={0} className={classes.coverContainer}>
            <Grid container justify="space-between">
                <Grid className={classes.leftside} item lg={6} container justify="space-between">
                    <div>
                        <Avatar className={classes.avatar} alt="Arslan Sajid" src={require("../../../assets/images/Arslan.jpg")} />
                        <Typography variant='body1'>Arslan Sajid</Typography>
                        <Typography variant='body2'>@arslansajid</Typography>
                    </div>
                    <Typography>
                        Staring at the world, roaming the wilds, I am in my favorite world, keep living!
                    </Typography>
                </Grid>
                <Grid item lg={6} container justify="space-between" className={classes.rightside}>
                    <div>
                        <Button className={classes.button} color="inherit" variant="outlined">
                            <SettingsIcon />
                        </Button>
                        <Button className={classes.button} color="inherit" variant="outlined" startIcon={<EditIcon />}>Edit Profile</Button>
                    </div>
                    <Grid container justify="flex-end">
                        <Grid item className={classes.textContainer}>
                            <Typography>200</Typography>
                            <Typography>Following</Typography>
                        </Grid>
                        <Grid item className={classes.textContainer}>
                            <Typography>4k</Typography>
                            <Typography>Fans</Typography>
                        </Grid>
                        <Grid item className={classes.textContainer}>
                            <Typography>32</Typography>
                            <Typography>Lists</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    coverContainer: {
        color: Colors.white,
        minHeight: 200,
        padding: '1em',
        marginBottom: 5,
        backgroundColor: Colors.brandColor,
        background: 'linear-gradient(360deg, rgba(51, 51, 51, 0.81) 2.71%, rgba(255, 255, 255, 0) 97.71%, rgba(255, 255, 255, 0) 97.71%), url(.jpg)',
        borderRadius: 8,
    },
    avatar: {
        marginBottom: 8,
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    leftside: {
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column'
    },
    rightside: {
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
    },
    button: {
        marginLeft: 15,
        borderRadius: 25,
        // width: 50,
        height: 50
    },
    textContainer: {
        marginLeft: 15,
        textAlign: 'center'
    }
    })
)


export default ProfileCover;