import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Colors from '../../static/_colors';
import { Link  } from 'react-router-dom';
import NotificationIcon from '@material-ui/icons/NotificationsNone';

const SidebarCard = (props) => {
    const classes = useStyles();
    const {items, title} = props;
    return (
        <>
            <Card className={classes.root} variant="outlined">
                <Grid className={classes.title}>
                    <Typography gutterBottom>
                        {title}
                    </Typography>
                </Grid>
                <CardContent className={classes.cardContent}>
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
                </CardContent>
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
      title: {
          padding: '0.5em 1em',
          borderBottom: `1px solid ${Colors.border}`
      },
      cardContent: {
          padding: '0 1em 1em 1em',
      },
      sideIcon: {
          minWidth: 35,
      }
}))

SidebarCard.defaultProps = {
    title: 'Title',
    menu: [],
};

export default SidebarCard;