import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Colors from '../../static/_colors';
import { Link  } from 'react-router-dom';
import NotificationIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';
import { connect } from 'react-redux';

const SidebarCard = (props) => {
    const classes = useStyles();
    const {items, title, showSeeMoreLink, user} = props;
    return (
        <>
            <Card className={classes.root} variant="outlined">
                <Grid container justify="space-between" className={classes.title}>
                    <Typography gutterBottom>
                        {title}
                    </Typography>
                    {
                        showSeeMoreLink && (
                            <Typography gutterBottom className={classes.seeMoreLinks}>
                                See More
                            </Typography>
                        )
                    }
                </Grid>
                <Grid className={classes.cardContent}>
                    {
                        title === "Profile" && (
                            <Link to="/profile">
                                <Grid container className={classes.profileContainer}>
                                    <Avatar className={classes.avatar} alt="Arslan Sajid" src={require("../../assets/images/Arslan.jpg")} />
                                    <Grid className={classes.center}>
                                        <Typography variant='body1'>{!!user ? user.name : "Sign In / Register"}</Typography>
                                        <Typography variant='body2'>{!!user ? `@ ${user.user_name}` : null}</Typography>
                                    </Grid>
                                </Grid>
                            </Link>
                        )
                    }
                    {
                        !!items && items.length && items.map((item, index) => {
                            return (
                                <Link key={index} to={item.route}>
                                    <ListItem onClick={() => console.log(item.name)} button>
                                        <ListItemIcon className={classes.sideIcon}>
                                            {/* <NotificationIcon /> */}
                                            <img src = {require(`../../assets/icons/${item.icon}.png`)}/>
                                        </ListItemIcon>
                                        {/* <ListItemText  className = {classes.text}>{item.name}</ListItemText> */}
                                        <ListItemText 
                                        classes={{ primary: classes.text}}
                                        primary={item.name}
                                        />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </Grid>
            </Card>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 100,
        background: Colors.background,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
        marginTop: 8,
      },
      center: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
      },
      title: {
          padding: '0.5em 1em',
          borderBottom: `1px solid ${Colors.border}`,
      },
      seeMoreLinks: {
        cursor: "pointer"
      },
      cardContent: {
          padding: theme.spacing(1, 0, 1, 0),
      },
      sideIcon: {
          minWidth: 35,
      },
      profileContainer: {
          padding: theme.spacing(1, 2),
          cursor: "pointer",
      },
      avatar: {
          marginRight: 15,
          width: theme.spacing(6),
        height: theme.spacing(6),
      },
      text : {
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '1rem',
        lineHeight: '1.3rem',
        color: '#333333'
      }
}))

SidebarCard.defaultProps = {
    title: 'Title',
    menu: [],
    showSeeMoreLink: false,
};

function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

export default connect(mapStateToProps)(SidebarCard);