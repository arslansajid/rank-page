import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Typography, TextField, IconButton, Grid, Paper, Button } from "@material-ui/core";
import Colors from "../../../static/_colors";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import SettingsIcon from '@material-ui/icons/Settings';
import EditIcon from '@material-ui/icons/Edit';
import InfoIcon from '@material-ui/icons/Info';
import { connect } from "react-redux";
import { showSignIn } from "../../../actions/SignInFormActions";
import { showSignUp } from "../../../actions/SignUpFormActions";
import { getUserData, followUser, unfollowUser } from './actions'
import Config from "../../../api/config";

const ProfileCover = (props) => {

    const classes = useStyles();
    const { user, isUserDetail, dispatch, userData } = props;
    const [followState, setFollowState] = useState(false);

    console.log("###########", {
        userData,
        followState
    })

    useEffect(() => {
        setFollowState(userData && userData.is_followed ? true : false)
    }, [userData])

    const toggleFollowState = () => {
        setFollowState(!followState);
    }
    
    const followUserHandler = () => {
        const data = {
            "follow_user_id": userData.id
        }
        followUser(data)
            .then((res) => {
                console.log("res", res)
                window.alert(res.data.message)
                toggleFollowState();
            })
            .catch((err) => {
                console.log("err", err)
            })
    }

    const unfollowUserHandler = () => {
        const data = {
            'unfollow_user_id': userData.id
        }
        unfollowUser(data)
        .then((res) => {
            console.log('res', res)
            window.alert(res.data.message);
            toggleFollowState();
        })
        .catch((err) => {
            console.log('err', err)
        })
    }

    return (
        <>
            <Paper elevation={0} className={classes.coverContainer}
                style={isUserDetail
                    ?
                    !!userData && userData.cover_image ? {
                        backgroundImage: `url(${`${Config.BASE_APP_URL}${(user.cover_image)}`})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        minHeight: 200,
                    }
                    : {}
                    :
                    !!user && user.cover_image ? {
                    backgroundImage: `url(${`${Config.BASE_APP_URL}${(user.cover_image)}`})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    minHeight: 200,
                } : {}
            }
            >
                <Grid className={classes.mainContainer}>
                    <Grid container justify="space-between">
                        <div>
                            <Avatar className={classes.avatar} alt={!!userData ? userData.name : 'image'} src={!!userData && userData.profile_image ? `${Config.BASE_APP_URL}${userData.profile_image}` : require("../../../assets/images/user.jpg")} />
                            <Typography variant='body1' className={classes.bold}>{!!userData && userData.name ? userData.name : ''}</Typography>
                            <Typography variant='body2' className={classes.font}>{!!userData && userData.user_name ? `@ ${userData.user_name}` : ''}</Typography>
                        </div>
                        {
                            !!isUserDetail ?
                                <div>
                                    <Button className={classes.buttonSettings} color="inherit">
                                        <InfoIcon />
                                    </Button>
                                    <Button
                                        onClick={() => followState ? unfollowUserHandler() : followUserHandler()}
                                        className={classes.buttonEdit}
                                        color="inherit"
                                        variant="outlined"
                                    >
                                        {followState ? "Unfollow" : "Follow"}
                                    </Button>
                                </div>
                                :
                                !!user ?
                                    <div>
                                        <Link to="/settings">
                                            <Button className={classes.buttonSettings} color="inherit">
                                                <SettingsIcon />
                                            </Button>
                                        </Link>
                                        <Link to="/edit-profile">
                                            <Button className={classes.buttonEdit} color="inherit" variant="outlined" startIcon={<EditIcon />}>Edit Profile</Button>
                                        </Link>
                                    </div>
                                    :
                                    <div>
                                        <Button className={classes.buttonEdit} color="inherit" variant="outlined" onClick={() => dispatch(showSignUp())}>
                                            Register
                                        </Button>
                                        <Button className={classes.buttonEdit} color="inherit" variant="outlined" onClick={() => dispatch(showSignIn())}>
                                            Sign In
                                        </Button>
                                    </div>
                        }
                    </Grid>
                    <Grid container justify="space-between">
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Typography className={classes.introText}>
                                {!!userData && userData.bio ? userData.bio : 'No Bio Added'}
                            </Typography>
                        </Grid>
                        <Grid item lg={6} md={6} sm={12} xs={12}>
                            <Grid container justify="flex-end">
                                <Link to="/followers">
                                    <Grid item className={classes.textContainer}>
                                        <Typography className={classes.font}>{!!userData && userData.followings ? userData.followings : 0}</Typography>
                                        <Typography className={classes.font}>Following</Typography>
                                    </Grid>
                                </Link>
                                <Link to="/fans">
                                    <Grid item className={classes.textContainer}>
                                        <Typography className={classes.font}>{!!userData && userData.followers ? userData.followers : 0}</Typography>
                                        <Typography className={classes.font}>Fans</Typography>
                                    </Grid>
                                </Link>
                                {/* <Link to="/followers"> */}
                                    <Grid item className={classes.textContainer}>
                                        <Typography className={classes.font}>{!!userData && userData.total_lists ? userData.total_lists : 0}</Typography>
                                        <Typography className={classes.font}>Lists</Typography>
                                    </Grid>
                                {/* </Link> */}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    coverContainer: {
        color: Colors.white,
        padding: '1em',
        marginBottom: 8,
        backgroundColor: Colors.brandColor,
        background: 'linear-gradient(360deg, rgba(51, 51, 51, 0.81) 2.71%, rgba(255, 255, 255, 0) 97.71%, rgba(255, 255, 255, 0) 97.71%), url(.jpg)',
        borderRadius: 8,
        overflow: 'hidden'
    },
    mainContainer: {
        minHeight: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    avatar: {
        marginBottom: 8,
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    leftside: {
        display: 'flex',
    },
    buttonSettings: {
        border: '2px solid',
        borderRadius: '50%',
        height: 40,
        width: 40,
        borderRadius: 50,
    },
    buttonEdit: {
        marginLeft: 15,
        border: '2px solid',
        borderRadius: 20,

    },
    textContainer: {
        marginLeft: 20,
        textAlign: 'center',
        fontSize: '0.75rem',
    },
    bold: {
        fontWeight: 'bold',
    },
    font: {
        fontSize: '0.75rem'
    },
    introText: {
        opacity: 0.8,
        fontSize: '0.75rem'
    },
})
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(ProfileCover);