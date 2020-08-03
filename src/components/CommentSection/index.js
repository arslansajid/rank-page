import React from "react";
import {Typography, TextField, IconButton, Avatar, Grid} from "@material-ui/core";
import Colors from "../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import CommentTile from "./Comment";
import { addComment } from "./action";

const comments = [  
    {  
      "id":1,
      "comment_text":"asdasdadasdsadsadadsa",
      "author":"Arslan",
      "post_id":1,
      "ancestry":null,
      "archived":false,
      "created_at":"2014-10-16T23:16:44.173Z",
      "updated_at":"2014-10-16T23:16:44.173Z",
      "is_moderated":false,
      "avatar_url":null,
      "slug":null,
      "blog_id":2,
      "children":[  

      ]
    },
    {  
      "id":2,
      "comment_text":"idlsfghlskdhvbsldfhjdslifds\nzf\ndsf\nds\nf\ns\nf\ns\nfds\nfsdjghfsdligjhsepfiguhefdliguhefldiughfeliughnfesg\nf\nsg\ns\ng\ns\ndf\nsd\nf\nsdgsofughlefidughls;uhgsuhg.vskjfhglsiuhg.sfv",
      "author":"Zeshan",
      "post_id":1,
      "ancestry":null,
      "archived":false,
      "created_at":"2014-10-16T23:17:02.270Z",
      "updated_at":"2014-10-16T23:17:02.270Z",
      "is_moderated":false,
      "avatar_url":null,
      "slug":null,
      "blog_id":2,
      "children":[  
        {  
          "id":3,
          "comment_text":"fdsfdsfdsfsdfsfsdf",
          "author":"Haseeb",
          "post_id":1,
          "ancestry":"2",
          "archived":false,
          "created_at":"2014-11-28T17:39:47.059Z",
          "updated_at":"2014-11-28T17:39:47.059Z",
          "is_moderated":false,
          "avatar_url":null,
          "slug":null,
          "blog_id":2,
          "children":[  
            {  
              "id":4,
              "comment_text":"fdsfdsfdsdsfdsfds",
              "author":"Kamran",
              "post_id":1,
              "ancestry":"2/3",
              "archived":false,
              "created_at":"2014-11-28T17:39:53.049Z",
              "updated_at":"2014-11-28T17:39:53.049Z",
              "is_moderated":false,
              "avatar_url":null,
              "slug":null,
              "blog_id":2,
              "children":[  
                {
                  "id":5,
                  "comment_text":"sdfdsfdsfdsfdssdfsdfdsfdsfdsfds",
                  "author":"Javed",
                  "post_id":1,
                  "ancestry":"2/3/4",
                  "archived":false,
                  "created_at":"2014-11-28T17:40:02.032Z",
                  "updated_at":"2014-11-28T17:40:02.032Z",
                  "is_moderated":false,
                  "avatar_url":null,
                  "slug":null,
                  "blog_id":2,
                  "children":[  
                    {
                        "id":6,
                        "comment_text":"sdfdsfdsfdsfdssdfsdfdsfdsfdsfds",
                        "author":"Ali",
                        "post_id":1,
                        "ancestry":"2/3/4",
                        "archived":false,
                        "created_at":"2014-11-28T17:40:02.032Z",
                        "updated_at":"2014-11-28T17:40:02.032Z",
                        "is_moderated":false,
                        "avatar_url":null,
                        "slug":null,
                        "blog_id":2,
                        "children":[  
      
                        ]
                      },
                      {
                        "id":7,
                        "comment_text":"sdfdsfdsfdsfdssdfsdfdsfdsfdsfds",
                        "author":"Shahid",
                        "post_id":1,
                        "ancestry":"2/3/4",
                        "archived":false,
                        "created_at":"2014-11-28T17:40:02.032Z",
                        "updated_at":"2014-11-28T17:40:02.032Z",
                        "is_moderated":false,
                        "avatar_url":null,
                        "slug":null,
                        "blog_id":2,
                        "children":[  
      
                        ]
                      }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]

  const Comment = (props) => {
      var comment = props.comment;
      return (
        <>
            <CommentTile id={comment.id} comment={comment.author} isChildren={props.child} />
            {
                comment.children.length > 0 && (
                    <Comments
                        child={true}
                        comments={comment.children.length ? comment.children: []} />
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

    const addCommentHandler = (commentText) => {
      const data = {
        'share_post_id': 1,
        'comment': commentText,
      }
      addComment(data)
      .then((res) => {
          console.log('res', res)
      })
      .catch((err) => {
          console.log('err', err)
      })
    } 

const CommentSection = () => {
    const classes = useStyles();
    // const newArr = nestComments(comments);
    return (
        <>
        <Grid className={classes.root} container>
            <Grid container alignItems="center" className={classes.commentTextContainer}>
                <Grid item>
                    <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                </Grid>
                <Grid item lg={10}>
                    <TextField
                        margin='dense'
                        variant='outlined'
                        fullWidth
                        placeholder={"Write your comment..."}
                        onKeyPress={(event) => {
                          if(event.key === 'Enter') {
                            addCommentHandler(event.target.value);
                          }
                        }}
                    />
                </Grid>
            </Grid>
            <Comments comments={comments} />
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
        marginRight: 15,
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    })
)


export default CommentSection;