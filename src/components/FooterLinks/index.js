import React from "react";
import {Typography, TextField, IconButton, Grid} from "@material-ui/core";
import Colors from "../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';

const FooterLinks = () => {
    const classes = useStyles();

    return (
        <>
        <Grid container>
            <Typography className={classes.textLink} variant='body1'>Terms</Typography>
            <Typography className={classes.textLink} variant='body1'>Privacy Policy</Typography>
            <Typography className={classes.textLink} variant='body1'>Cookies</Typography>
            <Typography className={classes.textLink} variant='body1'>About us</Typography>
            <Typography className={classes.textLink} variant='body1'>Contact us</Typography>
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