import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import {Grid, IconButton, Menu, MenuItem, Avatar, Button} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import MoreIcon from '@material-ui/icons/MoreVert';
import LikeIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/ChatBubbleOutline';
import ShareIcon from '@material-ui/icons/Share';

const PostCard = () => {
    const classes = useStyles();

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
                <Typography>
                    Title
                </Typography>
                <IconButton onClick={handleClick}>
                    <MoreIcon />
                </IconButton>
            </Grid>
            <Grid container className={classes.cardProfileSection}>
                <Avatar className={classes.avatar} alt="Arslan Sajid" src={require("../../assets/images/Arslan.jpg")} />
                <div>
                    <Typography variant='body1'>Arslan Sajid</Typography>
                    <Typography variant='body2'>@arslansajid</Typography>
                </div>
            </Grid>
            <Grid className={classes.cardProfileSection}>
                <Typography variant='body1'>Who Is the Coolest Actor in the World Right Now? </Typography>
                <Typography variant='body2'>• 9 July 2020 at 12:30 AM</Typography>
            </Grid>
            <Grid className={classes.cardProfileSection} style={{minHeight:  200}}>

            </Grid>
                {/* <CardContent> */}
                    <Grid container justify="space-between" className={classes.cardProfileSection}>
                        <Typography variant='body1'>Arslan sajid and 23 others</Typography>
                        <Typography variant='body2'>16 Comments • 2 Shares</Typography>
                    </Grid>
                {/* </CardContent> */}
                <CardActions>
                    <Grid container justify="space-between">
                        <Button startIcon={<LikeIcon />}>Like</Button>
                        <Button startIcon={<CommentIcon />}>Comment</Button>
                        <Button startIcon={<ShareIcon />}>Share</Button>
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
        padding: '1em'
    },
    avatar: {
        marginRight: 15,
        width: theme.spacing(6),
      height: theme.spacing(6),
    }
    })
)


export default PostCard;