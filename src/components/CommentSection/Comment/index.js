
import React, {useState} from "react";
import {Typography, Grid, Avatar, TextField} from "@material-ui/core";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import {replyToComment} from "../action";
import Config from "../../../api/config";

const Comment = (props) => {
    const classes = useStyles();
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [commentTextInput, setCommentTextInput] = useState('');
    const {comment, author, isChildren, postId, commentId, fetchComments, authorImage} = props;

    console.log("#########", comment)

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

    return (
        <>
        <Grid container className={`${classes.cardProfileSection}`}>
            <Grid container className={isChildren ? classes.isChildren : ""}>
            <Grid item lg={1} md={1} sm={1} xs={1}>
            <Avatar className={classes.avatar} alt={'user-image'} src={!!authorImage ? `${Config.BASE_APP_URL}${authorImage}` : require("../../../assets/images/user.jpg")} />
            {/* <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" /> */}
            </Grid>
            <Grid item lg={11} md={11} sm={11} xs={11}>
            <Grid className={classes.verticalCenter}>
                <Typography gutterBottom variant='body1'>{/* !!user ? user.name : '' */ author } </Typography>
                <Typography variant='body2'>{/* !!user ? `@ ${user.user_name}` : '' */ comment }</Typography>
                <Grid container>
                    <Typography className={classes.textButton}>Like</Typography>
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
    })
)


export default Comment;
