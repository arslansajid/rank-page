import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Typography, Grid, colors , Button} from "@material-ui/core";
import { connect } from 'react-redux';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton ,  EmailShareButton,} from 'react-share';

const ShareSocialLinks = (props) => {
  const {Link} = props;

    const classes = useStyles();
    return (
        <Grid>
          <FacebookShareButton  url={Link} className={classes.icon}>
            <img src = {require('../../assets/icons/socialMedia/facebook1.svg')}/>
          </FacebookShareButton>

          <TwitterShareButton  url={Link} className={classes.icon}>
          <img src = {require('../../assets/icons/socialMedia/twitter.svg')}/>
          </TwitterShareButton>

          <EmailShareButton  url={Link} className={classes.icon}>
            <img src = {require('../../assets/icons/socialMedia/email.svg')}/>
          </EmailShareButton>
        </Grid>
        )
};

const useStyles = makeStyles((theme) =>
    createStyles({
        icon: {
          marginRight : '1rem',
        },
    })
);

ShareSocialLinks.defaultProps = {};

export default connect(null)(ShareSocialLinks);
