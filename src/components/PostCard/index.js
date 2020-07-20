import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Grid, IconButton, Menu, MenuItem, Avatar, Button } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Colors from '../../static/_colors';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import LikeIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';
import DragandDrop from '../DragandDrop';

const PostCard = () => {
    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Hide</MenuItem>
                <MenuItem onClick={handleClose}>Show</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>

            <Card elevation={0} className={classes.root}>
                <Grid container alignItems="center" justify="space-between" className={classes.cardSection}>
                    <Typography className='smallFont'>
                        Tom Holland Challenged you
                </Typography>
                    <IconButton onClick={handleClick}>
                        <MoreIcon />
                    </IconButton>
                </Grid>
                <Grid container className={classes.cardProfileSection}>
                    <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    {/* <Avatar className={classes.avatar} alt="Arslan Sajid" src={require("../../assets/images/Arslan.jpg")} /> */}
                    <Grid className={classes.verticalCenter}>
                        <Typography variant='body1' className='mediumFont'>Arslan Sajid</Typography>
                        <Typography variant='body2' className='smallFont'>@arslansajid</Typography>
                    </Grid>
                </Grid>
                <Grid className={classes.cardProfileSection}>
                    <Typography variant='h6' className={`${classes.heading} space-2`}>Who Is the Coolest Actor in the World Right Now? </Typography>
                    <Typography variant='body2' className='smallFont'>• 9 July 2020 at 12:30 AM</Typography>
                </Grid>
                <Grid className={classes.cardProfileSection} style={{ minHeight: 200 }}>
                    <DragandDrop />

                    <Grid container alignItems="center" justify="center" className={classes.showMoreContainer}>
                        <Button onClick={() => setExpanded(!expanded)} variant="text" className={classes.showMoreText}>{expanded ? "Collapse" : "Click to Expand"}</Button>
                    </Grid>
                </Grid>
                
                {/* <CardContent> */}
                <Grid container justify="space-between" alignItems="center" className={classes.cardProfileSection}>
                    <Typography variant='body1' className='smallFont'><span className={classes.likeMain}><LikeIcon color='primary' className={classes.likeIcon} /></span>Arslan sajid and 23 others</Typography>
                    <Typography variant='body2' className='smallFont'>16 Comments • 2 Shares</Typography>
                </Grid>
                {/* </CardContent> */}
                <CardActions>
                    <Grid container justify="space-between">
                        <Button className={classes.weight} startIcon={<LikeIcon />}>Like</Button>
                        <Button className={classes.weight} startIcon={<CommentIcon />}>Comment</Button>
                        <Button className={classes.weight} startIcon={<ShareIcon />}>Share</Button>
                    </Grid>
                </CardActions>
            </Card>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    root: {
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
        margin: theme.spacing(1, 0)
    },
    cardSection: {
        paddingLeft: '1em',
        borderBottom: '1px solid rgba(38, 38, 38, 0.12)',
    },
    cardProfileSection: {
        borderBottom: '1px solid rgba(38, 38, 38, 0.12)',
        padding: '1em',
        position: 'relative'
    },
    avatar: {
        marginRight: 15,
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    heading: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: '1.167rem'
    },
    likeIcon: {
        height: '0.85rem',
        width: '0.85rem',
        margin: 0,
        padding: 0,
    },
    likeMain: {
        background: Colors.iconBackGround,
        borderRadius: 15,
        padding: '9px 7px 7px 9px',
        marginRight: 5,
    },
    weight: {
        fontWeight: 600,
    },
    showMoreContainer: {
        position: 'absolute',
        width: 'calc(100% - 48px)',
        bottom: 30,
        minHeight: 40,
        color: Colors.white,
        background: 'linear-gradient(360deg, rgba(51, 51, 51, 0.81) 2.71%, rgba(255, 255, 255, 0) 97.71%, rgba(255, 255, 255, 0) 97.71%)',
    },
    showMoreText: {
        backgroundColor: "transparent",
        color: Colors.white,
        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent"
        }
    },
    verticalCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
    },
})
)


export default PostCard;