
import React, {useState} from "react";
import { connect } from 'react-redux';
import {Typography, Grid, Avatar, TextField, Popover, Paper, Button} from "@material-ui/core";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import { showSignIn } from "../../../actions/SignInFormActions";
import {replyToComment, likeComment} from "../action";
import Config from "../../../api/config";

import LikeReactIcon from "../../../assets/icons/icon/social/like.svg";
import LoveReactIcon from "../../../assets/icons/icon/social/love.svg";
import ThinkReactIcon from "../../../assets/icons/icon/social/think.svg";

const Comment = (props) => {
    const classes = useStyles();
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentTextInput, setCommentTextInput] = useState('');
    const [isLiked, setIsLiked] = useState(false);
    const [anchorElPopover, setAnchorElPopover] = useState(null);
    const {comment, commentTime, author, isChildren, postId, commentId, fetchComments, authorImage, user, dispatch} = props;

    console.log("#########", comment)

    const handlePopoverOpen = (event) => {
        setAnchorElPopover(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorElPopover(null);
    };

    const replyToCommentHandler = () => {
        const data = {
            'share_post_id': postId,
            'comment_id': commentId,
            'comment': commentTextInput,
          }
        replyToComment(data)
        .then((res) => {
            console.log(res);
            setCommentTextInput('');
            fetchComments();
        })
        .catch((err) => {
            console.log(err);
            setCommentTextInput('');
        })
    }

    const likeHandler = (reactId) => {
        handlePopoverClose()
        const data = {
            'comment_id': commentId,
            'like_type': reactId
        }
        likeComment(data)
        .then((res) => {
            console.log('res', res)
            // window.alert(res.data.message)
            // setLikeMessage(res.data.data.like_string)
            setIsLiked(res.data.message.includes("unliked") ? false : true);
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    return (
        <>
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
            disableRestoreFocus //this was the fix for scroll to top on like
        >
            {/* <ClickAwayListener onClickAway={handlePopoverClose}> */}
                <Grid className={classes.reactContainer} component={Paper} elevation={1} container justify="space-between">
                    <Button className={classes.reactIcon} onClick={(event) => !!user ? likeHandler(1, event) : dispatch(showSignIn())} startIcon={<img className={classes.reactIcon} src={LikeReactIcon} />}></Button>
                    <Button className={classes.reactIcon} onClick={(event) => !!user ?likeHandler(2, event) : dispatch(showSignIn())} className={classes.reactIcon} startIcon={<img className={classes.weight} src={LoveReactIcon} />}></Button>
                    <Button className={classes.reactIcon} onClick={(event) => !!user ? likeHandler(3, event) : dispatch(showSignIn())} startIcon={<img className={classes.reactIcon} src={ThinkReactIcon} />}></Button>
                </Grid>
            {/* </ClickAwayListener> */}
        </Popover>

        <Grid container className={`${classes.cardProfileSection}`}>
            <Grid container className={isChildren ? classes.isChildren : ""}>
            <Grid item lg={1} md={1} sm={1} xs={1}>
            <Avatar className={classes.avatar} alt={'user-image'} src={!!authorImage ? `${Config.BASE_APP_URL}${authorImage}` : require("../../../assets/images/user.jpg")} />
            {/* <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" /> */}
            </Grid>
            <Grid item lg={11} md={11} sm={11} xs={11}>
            <Grid className={classes.verticalCenter}>
                <Grid container justify="space-between">
                    <Typography gutterBottom variant='body1'>{/* !!user ? user.name : '' */ author } </Typography>
                    <Typography gutterBottom variant='body2'>{commentTime} </Typography>
                </Grid>
                <Typography variant='body2'>{/* !!user ? `@ ${user.user_name}` : '' */ comment }</Typography>
                <Grid container>
                    <Typography onClick={(e) => handlePopoverOpen(e)} color={isLiked ? "primary" : "inherit"} className={classes.textButton}>Like</Typography>
                    <Typography onClick={() => setShowCommentInput(!showCommentInput)} className={classes.textButton}>Reply</Typography>
                </Grid>
            </Grid>
            {
                showCommentInput && (
                    <TextField
                        margin='dense'
                        variant='outlined'
                        // fullWidth
                        className={classes.fullWidth}
                        placeholder="Reply to comment"
                        value={commentTextInput}
                        onChange={(e) => setCommentTextInput(e.target.value)}
                        onKeyPress={(event) => {
                            if(event.key === 'Enter' && event.target.value.length) {
                              replyToCommentHandler();
                            }
                          }}
                    />
                )
            }
            </Grid>
            </Grid>
        </Grid>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    cardProfileSection: {
        borderBottom: '1px solid rgba(38, 38, 38, 0.12)',
        padding: '1em',
        position: 'relative'
    },
    isChildren: {
        marginLeft: 40,
    },
    verticalCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
        width : '96%',
        marginLeft : '4%',
    },
    avatar: {
        marginRight: 15,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    textButton: {
        cursor: "pointer",
        fontSize: '0.8em',
        color: Colors.brandColor,
        margin: theme.spacing(1, 2, 0, 0),

        "&:hover": {
            color: Colors.textGrey,
        }
    },
    fullWidth: {
        width : '96%',
        marginLeft : '4%',
    },
    paper: {
        padding: theme.spacing(1),
      },
    reactIcon: {
        cursor: 'pointer',
        "&:hover": {
            backgroundColor: "transparent"
        }
    },
    })
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
  }
  
  export default connect(mapStateToProps)(Comment);
