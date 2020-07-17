import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SidebarCard from "../SidebarCard";
import Dialog from "../Common/Dialog";
import SignIn from "../SignIn";
import SignUp from "../SignUp/step1.js";
import SignUpStep2 from "../SignUp/step2.js";
import RecoverAccount from "../RecoverAccount";
import Colors from '../../static/_colors';
import { Profile, Create, Menu, Account } from "../../static/_leftsidebar";

const LeftSidebar = (props) => {
    const classes = useStyles();
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showSignUpStep2, setShowSignUpStep2] = useState(false);
    const [showStep1, setShowStep1] = useState(true);
    const [showStep2, setShowStep2] = useState(false);
    const [showRecoveryModal, setShowRecoveryModal] = useState(false);
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
                                moveToNext = {() => {
                                    setShowSignUp(false);
                                    setShowSignUpStep2(true)
                                }}
                                getData = {(value) => registerData(value)}
                            />
                        }
                        applyForm={() => { setShowStep1(false) ; setShowSignIn(true)}}
                        backAction = {() => { setShowStep1(false) ; setShowSignIn(true)}}
                    />
                )
            }
               {
                showSignUpStep2 && (
                    <Dialog
                        title={"Sign Up"}
                        open={showSignUpStep2}
                        message={<SignUpStep2 
                        registerData = {value}
                        // moveToNext = {() => {setShowStep2(false) ; setShowStep3(true)}}
                         />}
                        applyForm={() => setShowSignUp(true)}
                        backAction = {() => setShowSignUpStep2(false)}
                        hideActions={true}
                    />
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