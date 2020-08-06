import React, { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Colors from '../../static/_colors';
import { Link } from 'react-router-dom';
import UserProfile from "../UserProfile";
import { userLogout } from "../../actions/LoginActions";
import { showListDialog } from "../../actions/ListCreateDialogActions";
import Cookie from "js-cookie"
import ListCreation from "../ListCreation"

const SidebarCard = (props) => {
    const classes = useStyles();
    const { items, title, showSeeMoreLink, listCreateDialog, dispatch } = props;


    const handleSignOut = (value) => {
        if (value === "Sign Out") {
            Cookie.remove("rankpage_access_token");
            dispatch(userLogout());
        }
    }

    const handleDialogs = (value) => {
        if(value === "List") {
            dispatch(showListDialog());
        }
    }

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
                            <UserProfile/>
                        )
                    }
                    {
                        !!items && items.length && items.map((item, index) => {
                            if(!!item.route) {
                            return (
                                <Link key={index} to={item.route}>
                                    <ListItem onClick={() => handleSignOut(item.name)} button>
                                        <ListItemIcon className={classes.sideIcon}>
                                            <img alt={`${item.icon}_icon`} src={require(`../../assets/icons/${item.icon}.png`)} />
                                        </ListItemIcon>
                                        <ListItemText
                                            classes={{ primary: classes.text }}
                                            primary={item.name}
                                        />
                                    </ListItem>
                                </Link>
                            )
                            } else {
                                return (
                                    <ListItem key={index} onClick={() => handleDialogs(item.name)} button>
                                        <ListItemIcon className={classes.sideIcon}>
                                            <img alt={`${item.icon}_icon`} src={require(`../../assets/icons/${item.icon}.png`)} />
                                        </ListItemIcon>
                                        <ListItemText
                                            classes={{ primary: classes.text }}
                                            primary={item.name}
                                        />
                                    </ListItem>
                                )
                            }
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
    text: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '1rem',
        lineHeight: '1.3rem',
        color: Colors.black
    }
}))

SidebarCard.defaultProps = {
    title: 'Title',
    menu: [],
    showSeeMoreLink: false,
};

// export default connect(null)(SidebarCard);
export default connect(store => {
    return{
        user: store.user,
    }
  })(SidebarCard)