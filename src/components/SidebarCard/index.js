import React, { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, ListItem, ListItemText, ListItemIcon } from '@material-ui/core';
import Colors from '../../static/_colors';
import { Link } from 'react-router-dom';
import UserProfile from "../UserProfile";
import { userLogout } from "../../actions/LoginActions";
import { showListDialog } from "../../actions/ListCreateDialogActions";
import { showPoolDialog } from "../../actions/PoolCreateDialogActions";
import Cookie from "js-cookie"
import ListCreation from "../ListCreation"
import TrendingCard from "../TrendingCard"
import axiosInstance from "../../api/api.config";

const SidebarCard = (props) => {
    const classes = useStyles();
    const { items, title, showSeeMoreLink, seeMoreLinkUrl, trendingLists, listCreateDialog, dispatch } = props;


    const handleSignOut = (value) => {
        if (value === "Sign Out") {
            axiosInstance.defaults.headers['Authorization'] = ``;
            Cookie.remove("rankpage_access_token");
            dispatch(userLogout());
        }
    }

    const handleDialogs = (value) => {
        if(value === "List") {
            dispatch(showListDialog());
        }
        if(value === "Pool") {
            dispatch(showPoolDialog());
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
                            <Link to={seeMoreLinkUrl}>
                                <Typography gutterBottom className={classes.seeMoreLinks}>
                                    See More
                                </Typography>
                            </Link>
                        )
                    }
                </Grid>
                <Grid className={showSeeMoreLink ? classes.cardContentTrending : classes.cardContent}>
                    {
                        !!trendingLists && trendingLists.length && trendingLists.map((trendingItem, index) => {
                            return (
                                <TrendingCard
                                    key={index}
                                    trendingItem={trendingItem}
                                />
                            )
                        })
                    }
                    {
                        title === "Profile" && (
                            <UserProfile/>
                        )
                    }
                    {
                        !!items && items.length && items.map((item, index) => {
                            if(!!item.route) {

                                if(!props.user && item.name === 'Sign Out'){
                                    return null
                                } 
                                else {
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
                                }
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
    cardContentTrending: {
        padding: theme.spacing(2),
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