import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Colors from '../../static/_colors';
import { Link  } from 'react-router-dom';
import NotificationIcon from '@material-ui/icons/NotificationsNone';
import Avatar from '@material-ui/core/Avatar';

const SidebarCard = (props) => {
    const classes = useStyles();
    const {items, title} = props;
    return (
        <>
            <Grid className={classes.root} variant="outlined">
                <Grid className={classes.title}>
                    <Typography gutterBottom>
                        {title}
                    </Typography>
                </Grid>
                <Grid className={classes.cardContent}>
                    {
                        title === "Profile" && (
                            <Grid container className={classes.profileContainer}>
                                <Avatar className={classes.avatar} alt="Arslan Sajid" src={require("../../assets/images/Arslan.jpg")} />
                                <div>
                                    <Typography variant='body1'>Arslan Sajid</Typography>
                                    <Typography variant='body2'>@arslansajid</Typography>
                                </div>
                            </Grid>
                        )
                    }
                    {
                        !!items && items.length && items.map((item, index) => {
                            return (
                                <Link key={index} to={item.route}>
                                    <ListItem onClick={() => console.log(item.name)} button>
                                        <ListItemIcon className={classes.sideIcon}>
                                            <NotificationIcon />
                                        </ListItemIcon>
                                        <ListItemText primary={item.name} />
                                    </ListItem>
                                </Link>
                            )
                        })
                    }
                </Grid>
            </Grid>
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
      title: {
          padding: '0.5em 1em',
          borderBottom: `1px solid ${Colors.border}`
      },
      cardContent: {
          padding: theme.spacing(1, 0, 1, 0),
      },
      sideIcon: {
          minWidth: 35,
      },
      profileContainer: {
          padding: theme.spacing(1, 2),
      },
      avatar: {
          marginRight: 15,
          width: theme.spacing(6),
        height: theme.spacing(6),
      }
}))

SidebarCard.defaultProps = {
    title: 'Title',
    menu: [],
};

export default SidebarCard;