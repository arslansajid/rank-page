import React from "react";
import {Typography, TextField, IconButton, Grid} from "@material-ui/core";
import Colors from "../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';

const FooterLinks = () => {
    const classes = useStyles();

    return (
        <>
        <Grid container>
            <Link to='/termandconditions'>
                <Typography className={classes.textLink} variant='body1'>Terms</Typography>
            </Link>
            <Link to ='/privacypolicy'>
            <Typography className={classes.textLink} variant='body1'>Privacy Policy</Typography>
            </Link>
            <a href ='https://www.privacypolicies.com/live/12e249b4-c6a5-4f2d-bbc0-1dcfa9cb1e30'>
                <Typography className={classes.textLink} variant='body1'>Cookies</Typography>
            </a>
            <Link to='/about'>
                <Typography className={classes.textLink} variant='body1'>About us</Typography>
            </Link>
            <Link to='/contact'>
                <Typography className={classes.textLink} variant='body1'>Contact us</Typography>
            </Link>
        </Grid>
        <Typography className={classes.textLink} variant='body1'>© 2020 RankPage</Typography>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    textLink: {
        color: Colors.textGrey,
        margin: theme.spacing(1, 1, 0, 0),
        cursor: 'pointer'
    }
    })
)


export default FooterLinks;