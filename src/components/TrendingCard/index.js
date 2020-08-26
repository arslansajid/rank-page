import React, { useEffect , useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography, Grid, ListItem, ListItemText, ListItemIcon, Avatar } from '@material-ui/core';
import Colors from '../../static/_colors';
import { Link } from 'react-router-dom';
import Cookie from "js-cookie"

import Config from "../../api/config";

const TrendingCard = (props) => {
    const classes = useStyles();
    const { trendingItem, dispatch } = props;

    return (
        <Link to={`/list-detail/${trendingItem.id}`}>
            <Card className={classes.root} variant="outlined">
                <Grid container className={classes.imagesContainer}>
                    {
                        trendingItem.list_items.map((item, index) => {
                            return (
                                <div key={index}>
                                    {
                                        !!item.image_url 
                                        ?
                                        <img key={index} src={`${item.image_url}`} className={classes.listImage} />
                                        :
                                        <img key={index} src={require('../../assets/icons/placeholder.png')} className={classes.listImage} />
                                    }
                                </div>
                            )
                        })
                    }
                </Grid>
                <Grid className={classes.cardContent}>
                    <Typography gutterBottom>{trendingItem.title}</Typography>
                    <Grid container alignItems="center">
                        <Avatar className={classes.avatar} alt="avatar-image" src={trendingItem.user.profile_image ? `${Config.BASE_APP_URL}${trendingItem.user.profile_image}` : require('../../assets/icons/placeholder.png')} />
                        <Typography>@{trendingItem.user.user_name}</Typography>
                    </Grid>
                </Grid>
            </Card>
        </Link>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 100,
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
        marginBottom: 8,
    },
    imagesContainer: {
        padding: '0.5em',
        borderBottom: `1px solid ${Colors.border}`,
        flexWrap: 'noWrap',
        overflow: 'scroll',
        maxWidth: 310
    },
    seeMoreLinks: {
        cursor: "pointer"
    },
    cardContent: {
        padding: theme.spacing(1.5),
    },
    sideIcon: {
        minWidth: 35,
    },
    profileContainer: {
        padding: theme.spacing(1, 2),
        cursor: "pointer",
    },
    avatar: {
        marginRight: 10,
        width: theme.spacing(5),
        height: theme.spacing(5),
    },
    text: {
        fontStyle: 'normal',
        fontWeight: '500',
        fontSize: '1rem',
        lineHeight: '1.3rem',
        color: Colors.black
    },
    row: {
        display: "flex",
        alignItems: 'center'
    },
    listImage: {
        width: 55,
        height: 55,
        objectFit: 'cover'
    }
}))

TrendingCard.defaultProps = {
    title: 'Title',
    menu: [],
    showSeeMoreLink: false,
};

// export default connect(null)(TrendingCard);
export default connect(store => {
    return{
        user: store.user,
    }
  })(TrendingCard)