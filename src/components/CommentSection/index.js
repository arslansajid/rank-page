import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import moment from 'moment';
import {Typography, TextField, IconButton, Avatar, Grid} from "@material-ui/core";
import Colors from "../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import CommentTile from "./Comment";
import { addComment, getComments } from "./action";
import Config from "../../api/config";

  const Comment = (props) => {
      var comment = props.comment;
      return (
        <>
            <CommentTile
              postId={comment.share_post_id}
              commentId={comment.id}
              author={comment.user.user_name}
              authorImage={comment.user.profile_image}
              comment={comment.comment}
              commentTime={moment(comment.created_at).format("hh:mm A")}
              isChildren={props.child}
              fetchComments={props.fetchComments}
            />
            {
              !!comment.replies && comment.replies.length > 0 && (
                  <Comments
                    child={true}
                    comments={comment.replies.length ? comment.replies : []} />
              )
            }
        </>
      )
  }
  
  const Comments = (props) => {
      return (
        props.comments.map((comment, index) => {
            return <Comment key={index} comment={comment} {...props} />
        })
      )
    };

const CommentSection = (props) => {
    const classes = useStyles();
    const {postId, user} = props;
    const [comments, setComments] = useState([]);
    const [commentTextInput, setCommentTextInput] = useState('');

    useEffect(() => {
      fetchComments();
    }, [])

    const fetchComments = () => {
      getComments({'post_id': postId})
      .then((res) => {
        console.log(res);
        setComments(res.data.data.comments)
      })
      .catch((err) => {
        console.log(err);
      })
    }

    const addCommentHandler = () => {
      const data = {
        'share_post_id': postId,
        'comment': commentTextInput,
      }
      addComment(data)
      .then((res) => {
          console.log('res', res)
          setCommentTextInput('');
          fetchComments();
      })
      .catch((err) => {
          console.log('err', err);
          setCommentTextInput('');
      })
    } 

    return (
        <>
        <Grid className={classes.root} container>
            <Grid container alignItems="center" className={classes.commentTextContainer}>
                <Grid item lg={1} md = {1} sm = {1} xs = {1}>
                    {/* <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" /> */}
                    <Avatar className={classes.avatar} alt={!!user ? user.name : 'image'} src={!!user && user.profile_image ? `${Config.BASE_APP_URL}${user.profile_image}` : require("../../assets/images/user.jpg")} />
                </Grid>
                <Grid item lg={11} md = {11} sm = {11} xs={11}>
                    <TextField
                        margin='dense'
                        variant='outlined'
                        className = {classes.alingment}
                        placeholder={"Write your comment..."}
                        value={commentTextInput}
                        onChange={(e) => setCommentTextInput(e.target.value)}
                        onKeyPress={(event) => {
                          if(event.key === 'Enter' && event.target.value.length) {
                            addCommentHandler();
                          }
                        }}
                    />
                </Grid>
            </Grid>
            <Comments comments={comments} fetchComments={() => fetchComments()} {...props} />
        </Grid>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: Colors.background,
        borderTop: '1px solid rgba(38, 38, 38, 0.12)',
    },
    textLink: {
        color: Colors.textGrey,
        margin: theme.spacing(1, 1, 0, 0),
        cursor: 'pointer'
    },
    commentTextContainer: {
        padding: '1em',
    },
    avatar: {
        // marginRight: 15,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    alingment : {
      width: '96%',
      marginLeft: '4%',
    },

    })
)

function mapStateToProps(state) {
  return {
      user: state.user,
  };
}

export default connect(mapStateToProps)(CommentSection);