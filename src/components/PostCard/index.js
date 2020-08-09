import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Grid, IconButton, Menu, MenuItem, Avatar, Button, Popover, Popper, Paper, ButtonGroup } from '@material-ui/core';
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
import CommentSection from '../CommentSection';
import Dialog from '../Common/Dialog';
import { connect } from "react-redux";
import { LikeUnlikePost } from "./action";
import moment from "moment";

import LikeReactIcon from "../../assets/icons/icon/social/like.svg";
import LoveReactIcon from "../../assets/icons/icon/social/love.svg";
import ThinkReactIcon from "../../assets/icons/icon/social/think.svg";

const PostCard = (props) => {
    const classes = useStyles();
    const { user, post, showTabs } = props;
    const [activeTab, setActiveTab] = useState(1);
    const [showComments, setShowComments] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);

    const [anchorElPopover, setAnchorElPopover] = React.useState(null);

    const handlePopoverOpen = (event) => {
        setAnchorElPopover(event.currentTarget);
    };

    const handlePopoverClose = (event) => {
        setAnchorElPopover(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const likeHandler = (reactId) => {
        handlePopoverClose();
        const data = {
            'share_post_id': post.id,
            'like_type': reactId
        }
        LikeUnlikePost(data)
        .then((res) => {
            console.log('res', res)
            setIsLiked(res.data.message.includes("unliked") ? false : true);
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    const onTabChangeHandler = (selected) => {
        setActiveTab(selected);
        // if(selected === 1) {
        //     props.history.push('/profile/lists');
        // } else if(selected === 2) {
        //     props.history.push('/profile/challenges');
        // } else if(selected === 3) {
        //     props.history.push('/profile/categories');
        // }
    }

    console.log("POST DATA", post)

    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Report</MenuItem>
                <MenuItem onClick={handleClose}>Block User</MenuItem>
                <MenuItem onClick={handleClose}>Unfollow User</MenuItem>
            </Menu>

            
            <Popover
                id="mouse-over-popover"
                classes={{
                paper: classes.paper,
                }}
                open={Boolean(anchorElPopover)}
                anchorEl={anchorElPopover}
                anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
                }}
                transformOrigin={{
                vertical: 'center',
                horizontal: 'left',
                }}
                onClose={handlePopoverClose}
                // disableRestoreFocus
            >
                {/* <ClickAwayListener onClickAway={handlePopoverClose}> */}
                    <Grid className={classes.reactContainer} component={Paper} elevation={1} container justify="space-between">
                        <Button className={classes.reactIcon} onClick={() => likeHandler(1)} startIcon={<img className={classes.reactIcon} src={LikeReactIcon} />}></Button>
                        <Button className={classes.reactIcon} onClick={() => likeHandler(2)} className={classes.reactIcon} startIcon={<img className={classes.weight} src={LoveReactIcon} />}></Button>
                        <Button className={classes.reactIcon} onClick={() => likeHandler(3)} startIcon={<img className={classes.reactIcon} src={ThinkReactIcon} />}></Button>
                    </Grid>
                {/* </ClickAwayListener> */}
            </Popover>

            {
                showShareDialog && (
                    <Dialog
                        title={"Share List"}
                        open={showShareDialog}
                        message={"Share"}
                        applyForm={() => setShowShareDialog(false)}
                        cancelForm={() => setShowShareDialog(false)}
                        hideActions={true}
                    />
                )
            }
            

            <Card elevation={0} className={classes.root}>
                <Grid container alignItems="center" justify="space-between" className={classes.cardSection}>
                    <Typography className='smallFont'>
                    {!!post.description ? post.description : ''}
                </Typography>
                    <IconButton onClick={handleClick}>
                        <MoreIcon />
                    </IconButton>
                </Grid>
                <Grid container className={classes.cardProfileSection}>
                    <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                    <Grid className={classes.verticalCenter}>
                        <Typography variant='body1' className='mediumFont'>{!!post.user ? post.user.name : ''}</Typography>
                        <Typography variant='body2' className='smallFont'>{!!post.user ? `@ ${post.user.user_name}` : ''}</Typography>
                    </Grid>
                </Grid>
                <Grid className={classes.cardProfileSection}>
                    <Typography variant='h6' className={`${classes.heading} space-2`}>{!!post.title && post.title} </Typography>
                    <Typography variant='body2' className='smallFont'>• {moment(post.updated_at).format("DD MMM YYYY")} at {moment(post.updated_at).format("hh:mm A")}</Typography>
                </Grid>
                {
                    !!showTabs && (
                        <Grid className={classes.cardProfileSection}>
                            <Grid container justify="space-between">
                                <Button className={classes.buttons} onClick={() => onTabChangeHandler(1)}>
                                    <Typography className={activeTab === 1 ? classes.tabselected : classes.tab}>Author</Typography>
                                </Button>
                                <Button onClick={() => onTabChangeHandler(2)}>
                                    <Typography className={activeTab === 2 ? classes.tabselected : classes.tab}>Your</Typography>
                                </Button>
                                <Button onClick={() => onTabChangeHandler(3)}>
                                    <Typography className={activeTab === 3 ? classes.tabselected : classes.tab}>Mutual</Typography>
                                </Button>
                                <Button onClick={() => onTabChangeHandler(4)}>
                                    <Typography className={activeTab === 4 ? classes.tabselected : classes.tab}>All</Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    )
                }
                <Grid className={classes.cardProfileSection}>
                    <DragandDrop listItems={post.list_items} />

                    <Grid container alignItems="center" justify="center" className={classes.showMoreContainer}>
                        <Link to={`/list-detail/${post.id}`}>
                            <Button variant="text" className={classes.showMoreText}>Click to Expand</Button>
                        </Link> 
                    </Grid>
                </Grid>

                {/* <CardContent> */}
                <Grid container justify="space-between" alignItems="center" className={classes.cardProfileSection}>
                    <Typography variant='body1' className='smallFont'><span className={classes.likeMain}><LikeIcon color='primary' className={classes.likeIcon} /></span>{!!post.likes_count && post.likes_count}</Typography>
                    <Typography variant='body2' className='smallFont'>{!!post.comments_count ? post.comments_count : 0} Comments • {!!post.share_count ? post.share_count : 0} Shares</Typography>
                </Grid>
                {/* </CardContent> */}
                <CardActions>
                    <Grid container justify="space-between">
                        <Button
                            // onMouseEnter={handlePopoverOpen}
                            // onMouseLeave={handlePopoverClose}
                            onClick={(e) => handlePopoverOpen(e)} className={classes.weight} startIcon={<LikeIcon color={isLiked ? 'primary' : 'inherit'} />}>Like</Button>
                        <Button onClick={() => setShowComments(!showComments)} className={classes.weight} startIcon={<CommentIcon />}>Comment</Button>
                        <Button onClick={() => setShowShareDialog(!showShareDialog)} className={classes.weight} startIcon={<ShareIcon />}>Share</Button>
                    </Grid>
                </CardActions>
                {
                showComments && (
                    <CommentSection postId={post.id} />
                )
            }
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
        cursor: 'pointer',

        "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent"
        }
    },
    showMoreContainer: {
        position: 'absolute',
        width: 'calc(100% - 40px)',
        bottom: '15%',
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
      paper: {
        padding: theme.spacing(1),
      },
      reactContainer: {
          zIndex: 111,
      },
      reactIcon: {
          cursor: 'pointer',
          "&:hover": {
            //you want this to be the same as the backgroundColor above
            backgroundColor: "transparent"
        }
      },
    tabselected: {
        fontWeight: 600
    },
})
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(PostCard);
