import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SidebarCard from "../SidebarCard";
import Dialog from "../Common/Dialog";
import SignIn from "../SignIn";
import SignUp from "../SignUp/index";
import RecoverAccount from "../RecoverAccount";
import Colors from '../../static/_colors';
import { Profile, Create, Menu, Account } from "../../static/_leftsidebar";

const LeftSidebar = (props) => {
    const classes = useStyles();
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showRecoveryModal, setShowRecoveryModal] = useState(false);

    const switchToSignUp = () => {
        setShowSignIn(false);
        setShowSignUp(true);
    }
    const switchToSignIn = () => {
        setShowSignIn(true);
        setShowSignUp(false);
    }

    return (
        <>
            {
                showSignIn && (
                    <Dialog
                        title={"Sign In"}
                        open={showSignIn}
                        message={<SignIn showSignUp={() => switchToSignUp()} recoveryModal={() => {setShowRecoveryModal(true) ; setShowSignIn(false)}}/>}
                        applyForm={() => setShowSignIn(false)}
                        cancelForm={() => setShowSignIn(false)}
                        hideActions={true}
                    />
                )
            }
            {
                showSignUp && (
                    // <Dialog
                    //     title={"Sign Up"}
                    //     open={showSignUp}
                    //     message={<SignUp />}
                    //     applyForm={() => setShowSignUp(false)}
                    //     cancelForm={() => setShowSignUp(false)}
                    //     hideActions={true}
                    // />
                    <SignUp show = {true} showSignIp={() => switchToSignIn()} />
                )
            }
             {
                showRecoveryModal && (
                    <Dialog
                        title={"Sign Up"}
                        open={showRecoveryModal}
                        message={<RecoverAccount />}
                        applyForm={() => {setShowRecoveryModal(false) ; setShowSignIn(true)}}
                        // cancelForm={() => setShowSignUp(false)}
                        backAction = {() => {setShowRecoveryModal(false) ; setShowSignIn(true)}}
                        hideActions={true}
                    />
                )
            }
            <div className={classes.main}>
                <Button
                    onClick={() => setShowSignIn(true)}
                    variant="contained" color="primary">
                    Sign in
                </Button>
                <SidebarCard title={"Profile"} items={Profile} />
                <SidebarCard title={"Create"} items={Create} />
                <SidebarCard title={"Menu"} items={Menu} />
                <SidebarCard title={"Account"} items={Account} />
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    main: {
        background: Colors.white,
        height: '100%',
        padding: '2em 2em 0 4em'
    }
}))

export default LeftSidebar;