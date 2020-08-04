
import React, {useState} from "react";
import {Typography, Grid, Avatar, TextField} from "@material-ui/core";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';

const Comment = (props) => {
    const classes = useStyles();
    const [showCommentInput, setShowCommentInput] = useState(false);
    const {comment, id, isChildren} = props;
    return (
        <>
        <Grid container className={`${classes.cardProfileSection}`}>
            <Grid container className={isChildren ? classes.isChildren : ""}>
            <Grid item>
            <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
            </Grid>
            <Grid item>
            <Grid className={classes.verticalCenter}>
                <Typography gutterBottom variant='body1'>{/* !!user ? user.name : '' */ comment} </Typography>
                <Typography variant='body2'>{/* !!user ? `@ ${user.user_name}` : '' */ id }</Typography>
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
                        fullWidth
                        placeholder="Add Comment"
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
    }
    })
)


export default Comment;
