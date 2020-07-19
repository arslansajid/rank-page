import React, { useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Avatar, Typography, Grid } from '@material-ui/core';
import Dialog from "../Common/Dialog";
import SignIn from "../SignIn";
import SignUp from "../SignUp/step1.js";
import SignUpStep2 from "../SignUp/step2.js";
import SelectCategories from "../SignUp/selectCategories";
import RecoverAccount from "../RecoverAccount";
import Success from "../RecoverAccount/sucees";
import Colors from '../../static/_colors';
import { Link } from 'react-router-dom';

const UserProfile = (props) => {
    const classes = useStyles();
    const {user} = props;
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignUpStep2, setShowSignUpStep2] = useState(false);
    const [showSelectCategories, setShowSelectCategories] = useState(false);
    const [showRecoveryModal, setShowRecoveryModal] = useState(false);
    const [showRecoverySuccess, setShowRecoverySuccess] = useState(false);
    const [value, setValue] = useState();

    const registerData = (data) => {
        setValue(data)
    }

    const switchToSignUp = () => {
        setShowSignIn(false);
        setShowSignUp(true);
    }

    return (
        <>
            {
                showSignIn && (
                    <Dialog
                        title={"Sign In"}
                        open={showSignIn}
                        message={
                            <SignIn
                                showSignUp={() => switchToSignUp()}
                                showRecoveryModal={() => {
                                    setShowRecoveryModal(true);
                                    setShowSignIn(false)
                                }}
                                closeSignIn={() => setShowSignIn(false)}
                            />
                        }
                        applyForm={() => setShowSignIn(false)}
                        cancelForm={() => setShowSignIn(false)}
                        hideActions={true}
                    />
                )
            }
            {
                showSignUp && (
                    <Dialog
                        title={"Sign Up"}
                        open={showSignUp}
                        hideActions={true}
                        message={
                            <SignUp
                                moveToNext={() => {
                                    setShowSignUp(false);
                                    setShowSignUpStep2(true)
                                }}
                                getData={(value) => registerData(value)}
                            />
                        }
                        applyForm={() => setShowSignUp(false)}
                        cancelForm={() => setShowSignUp(false)}
                    />
                )
            }
            {
                showSignUpStep2 && (
                    <Dialog
                        title={"Sign Up"}
                        open={showSignUpStep2}
                        message={<SignUpStep2
                            registerData={value}
                            showCatergories = {() =>  {setShowSignUpStep2(false) ; setShowSelectCategories(true)}}
                            
                        />}
                        applyForm={() => { setShowSignUp(true); setShowSignUpStep2(false) }}
                        backAction={() => { setShowSignUp(true); setShowSignUpStep2(false) }}
                        hideActions={true}
                    />
                )
            }
                        {
                showSelectCategories && (
                    <Dialog
                        title={"Select Categories"}
                        open={showSelectCategories}
                        message={<SelectCategories
                        close = {()=> setShowSelectCategories(false)}
                        />}
                        applyForm={() => setShowSelectCategories(false)}
                        skipAction={() => setShowSelectCategories(false)}
                        
                        hideActions={true}
                    />
                )
            }
            {
                showRecoveryModal && (
                    <Dialog
                        title={"Sign In"}
                        open={showRecoveryModal}
                        message={<RecoverAccount
                            showSuccess={() => { setShowRecoveryModal(false); setShowRecoverySuccess(true) }}
                        />}
                        applyForm={() => { setShowRecoveryModal(false); setShowSignIn(true) }}
                        backAction={() => { setShowRecoveryModal(false); setShowSignIn(true) }}
                        hideActions={true}
                    />
                )
            }
            {
                showRecoverySuccess && (
                    <Dialog
                        title={"Email Sent"}
                        open={showRecoverySuccess}
                        message={<Success />}
                        applyForm={() => setShowRecoverySuccess(false)}
                        cancelForm={() => setShowRecoverySuccess(false)}
                        hideActions={true}
                    />
                )
            }
            <Grid container className={classes.profileContainer}>
                {/* <Avatar className={classes.avatar} alt="Arslan Sajid" src={require("../../assets/images/Arslan.jpg")} /> */}
                <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                <Grid className={classes.verticalCenter}>
                    <Grid>
                        {!!user ? (
                            <Link to="/profile/lists">
                                <Typography>{user.name}</Typography>
                                <Typography variant='body2'>{!!user ? `@ ${user.user_name}` : null}</Typography>
                            </Link>
                        )
                            : (
                                <>
                                    <Grid container>
                                        <Typography onClick={() => setShowSignIn(true)}>Sign In</Typography>&nbsp; / &nbsp;
                            <Typography onClick={() => setShowSignUp(true)}>Register</Typography>
                                    </Grid>
                                </>
                            )}
                    </Grid>
                </Grid>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    verticalCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
    },
    profileContainer: {
        padding: theme.spacing(1, 2),
        cursor: "pointer",
    },
    avatar: {
        marginRight: 15,
        width: theme.spacing(6),
        height: theme.spacing(6),
    }
}))

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(UserProfile);