import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { makeStyles, fade } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Grid, IconButton, Menu, MenuItem, Avatar, Button, Popover, Popper, Paper, ButtonGroup } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
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
import { showSignIn } from "../../actions/SignInFormActions";
import { setPostId, setPostOrder } from "../../actions/SelectedPostAction";
import { LikeUnlikePost, reportUser, blockUser, unfollowUser, followUser } from "./action";
import ShareCard from './share'
import moment from "moment";
import Config from "../../api/config";

import LikeReactIcon from "../../assets/icons/icon/social/like.svg";
import LoveReactIcon from "../../assets/icons/icon/social/love.svg";
import ThinkReactIcon from "../../assets/icons/icon/social/think.svg";

const PostCard = (props) => {
    const classes = useStyles();
    const { user, post, showTabs, hideMenu, dispatch } = props;
    const [activeTab, setActiveTab] = useState(1);
    const [showComments, setShowComments] = useState(!!showTabs ? true : false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [activeTabAccountPrivacy, setActiveTabAccountPrivacy] = useState(1);
    const [isLiked, setIsLiked] = useState(post.likes_count.includes("You"));
    const [likeMessage, setLikeMessage] = useState(post.likes_count);
    const [followState, setFollowState] = useState(post.user && post.user.is_followed ? true : false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElPopover, setAnchorElPopover] = React.useState(null);

    const toggleFollowState = () => {
        setFollowState(!followState);
    }

    const handlePopoverOpen = (event) => {
        setAnchorElPopover(event.currentTarget);
    };

    const handlePopoverClose = (event) => {
        console.log("###########", event.preventDefault())
        event.preventDefault();
        setAnchorElPopover(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const likeHandler = (reactId, event) => {
        handlePopoverClose(event)
        const data = {
            'share_post_id': post.id,
            'like_type': reactId
        }
        LikeUnlikePost(data)
        .then((res) => {
            console.log('res', res)
            setLikeMessage(res.data.data.like_string)
            setIsLiked(res.data.message.includes("unliked") ? false : true);
            //custome like handling
        //     if(likeMessage.length) {
        //     if(!(res.data.message.includes("unliked"))) {
        //         setLikeMessage('You, ' + likeMessage)
        //         // window.alert("1")
        //     } else {
        //         setLikeMessage(post.likes_count)
        //         // window.alert("2")
        //     }

        //     if(post.likes_count === 'You likes this') {
        //         setLikeMessage('')
        //         // window.alert("3")
        //     }
        // }
        //     else {
        //         setLikeMessage('You likes this')
        //     }
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    const blockUserHandler = () => {
        const data = {
            'block_user_id': post.user ? post.user.id : "",
        }
        blockUser(data)
        .then((res) => {
            console.log('res', res)
            window.alert("User blocked");
            handleClose();
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    const reportUserHandler = () => {
        const data = {
            'report_user_id': post.user ? post.user.id : "",
        }
        reportUser(data)
        .then((res) => {
            console.log('res', res)
            window.alert(res.data.message);
            handleClose();
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    const unfollowUserHandler = () => {
        const data = {
            'unfollow_user_id': post.user ? post.user.id : "",
        }
        unfollowUser(data)
        .then((res) => {
            console.log('res', res)
            window.alert(res.data.message);
            handleClose();
            toggleFollowState();
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    const followUserHandler = () => {
        const data = {
            "follow_user_id": post.user ? post.user.id : "",
        }
        followUser(data)
        .then((res) => {
            console.log("res", res)
            window.alert(res.data.message)
            handleClose();
            toggleFollowState();
        })
        .catch((err) => {
            console.log("err", err)
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
    console.log("POST LIKE COUNT", post.like_count)

    return (
        <>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => reportUserHandler()}>Report</MenuItem>
                <MenuItem onClick={() => blockUserHandler()}>Block User</MenuItem>
                <MenuItem onClick={() => followState ? unfollowUserHandler() : followUserHandler()}>{followState ? "Unfollow" : "Follow"} User</MenuItem>
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
                onClose={e => handlePopoverClose(e)}
                // disableRestoreFocus
            >
                {/* <ClickAwayListener onClickAway={handlePopoverClose}> */}
                    <Grid className={classes.reactContainer} component={Paper} elevation={1} container justify="space-between">
                        <Button className={classes.reactIcon} onClick={(event) => !!user ? likeHandler(1, event) : dispatch(showSignIn())} startIcon={<img className={classes.reactIcon} src={LikeReactIcon} />}></Button>
                        <Button className={classes.reactIcon} onClick={(event) => !!user ?likeHandler(2, event) : dispatch(showSignIn())} className={classes.reactIcon} startIcon={<img className={classes.weight} src={LoveReactIcon} />}></Button>
                        <Button className={classes.reactIcon} onClick={(event) => !!user ? likeHandler(3, event) : dispatch(showSignIn())} startIcon={<img className={classes.reactIcon} src={ThinkReactIcon} />}></Button>
                    </Grid>
                {/* </ClickAwayListener> */}
            </Popover>

            {
                showShareDialog && (
                    <Dialog
                        title={"Share List"}
                        open={showShareDialog}
                        message={ <ShareCard 
                            post = {post} 
                            close={() => setShowShareDialog(false)}
                             /> }
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
                    {!hideMenu && ( //menu hidden when postcard is displayed on user list page
                        <IconButton onClick={handleClick}>
                            <MoreIcon />
                        </IconButton>
                    )}
                </Grid>
                <Link to={`/user-detail/${post.user? post.user.id : "1"}/lists`}>
                    <Grid container className={classes.cardProfileSection}>
                        <Avatar className={classes.avatar} alt="avatar-image" src={post.user.profile_image ? `${Config.BASE_APP_URL}${post.user.profile_image}` : require('../../assets/icons/placeholder.png')} />
                        <Grid className={classes.verticalCenter}>
                            <Typography variant='body1' className='mediumFont'>{!!post.user ? post.user.name : ''}</Typography>
                            <Typography variant='body2' className='smallFont'>{!!post.user ? `@ ${post.user.user_name}` : ''}</Typography>
                        </Grid>
                    </Grid>
                </Link>
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
                {
                    !showTabs && (
                        <Grid container alignItems="center" justify="center" className={classes.showMoreContainer}>
                            <Link to={{
                                    pathname: `/list-detail/${post.id}`,
                                    'postId': post.id
                                }}>
                                <Button onClick={() => dispatch(setPostId(post.id))} variant="text" className={classes.showMoreText}>Click to Expand</Button>
                            </Link> 
                        </Grid>
                    )
                }
                </Grid>

                {/* <CardContent> */}
                <Grid container justify="space-between" alignItems="center" className={classes.cardProfileSection}>
                {likeMessage.length ? (<Typography variant='body1' className='smallFont'><span className={classes.likeMain}><LikeIcon color='primary' className={classes.likeIcon} /></span>{likeMessage}</Typography>) : <Typography>{"  "}</Typography>}
                    <Typography variant='body2' className='smallFont'>{!!post.comments_count ? post.comments_count : 0} Comments • {!!post.share_count ? post.share_count : 0} Shares</Typography>
                </Grid>
                {/* </CardContent> */}
                <CardActions>
                    <Grid container justify="space-between">
                        <Button
                            onMouseEnter={!!user && handlePopoverOpen}
                            // onMouseLeave={handlePopoverClose}
                            onClick={(e) => !!user ? handlePopoverOpen(e) : dispatch(showSignIn())} className={classes.weight} startIcon={<LikeIcon color={isLiked ? 'primary' : 'inherit'} />}>
                                <Typography color={isLiked ? "primary" : "inherit"}>Like</Typography>
                            </Button>
                        <Button onClick={() => !!user ? setShowComments(!showComments) : dispatch(showSignIn())} className={classes.weight} startIcon={<CommentIcon />}>Comment</Button>
                        <Button onClick={() => !!user ? setShowShareDialog(!showShareDialog) : dispatch(showSignIn())} className={classes.weight} startIcon={<ShareIcon />}>Share</Button>
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
        minHeight: 50,
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
        bottom: 24,
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
