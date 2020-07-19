import React from "react";
import { Link } from 'react-router-dom';
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
            <Grid className={classes.mainContainer}>
                <Grid container justify="space-between">
                    <div>
                        {/* <Avatar className={classes.avatar} alt="Arslan Sajid" src={require("../../../assets/images/Arslan.jpg")} /> */}
                        <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        <Typography variant='body1' className = {classes.bold}>Arslan Sajid</Typography>
                        <Typography variant='body2' className = {classes.font}>@arslansajid</Typography>
                    </div>
                    <div>
                        <Button className={classes.buttonSettings} color="inherit">
                            <SettingsIcon />
                        </Button>
                        <Link to="/edit-profile">
                            <Button className={classes.buttonEdit} color="inherit" variant="outlined" startIcon={<EditIcon />}>Edit Profile</Button>
                        </Link>
                    </div>
                    
                </Grid>
                <Grid container justify="space-between">
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Typography className = {classes.introText}>
                        Staring at the world, roaming the wilds, I am in my favorite world, keep living!
                    </Typography>
                    </Grid>
                    <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Grid container justify="flex-end">
                        <Grid item className={classes.textContainer}>
                            <Typography className = {classes.font}>200</Typography>
                            <Typography className = {classes.font}>Following</Typography>
                        </Grid>
                        <Grid item className={classes.textContainer}>
                            <Typography className = {classes.font}>4k</Typography>
                            <Typography className = {classes.font}>Fans</Typography>
                        </Grid>
                        <Grid item className={classes.textContainer}>
                            <Typography className = {classes.font}>32</Typography>
                            <Typography className = {classes.font}>Lists</Typography>
                        </Grid>
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
        padding: '1em',
        marginBottom: 8,
        backgroundColor: Colors.brandColor,
        background: 'linear-gradient(360deg, rgba(51, 51, 51, 0.81) 2.71%, rgba(255, 255, 255, 0) 97.71%, rgba(255, 255, 255, 0) 97.71%), url(.jpg)',
        borderRadius: 8,
    },
    mainContainer: {
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    avatar: {
        marginBottom: 8,
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    leftside: {
        display: 'flex',
    },
    buttonSettings: {
        border : '2px solid',
        borderRadius: '50%',
        height: 40,
        width : 40,
        borderRadius : 50,
    },
    buttonEdit : {
        marginLeft: 15,
        border : '2px solid',
        borderRadius : 20,

    },
    textContainer: {
        marginLeft: 20,
        textAlign: 'center',
        fontSize: '0.75rem',
    },
    bold : {
        fontWeight: 'bold',
    },
    font : {
        fontSize: '0.75rem'
    },
    introText : {
        opacity: 0.8,
        fontSize: '0.75rem'
    },
    })
)


export default ProfileCover;