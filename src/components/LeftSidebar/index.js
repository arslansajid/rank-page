import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SidebarCard from "../SidebarCard";
import Dialog from "../Common/Dialog";
import SignIn from "../SignIn";
import SignUp from "../SignUp/index";
import Colors from '../../static/_colors';
import { Profile, Create, Menu, Account } from "../../static/_leftsidebar";

const LeftSidebar = (props) => {
    const classes = useStyles();
    const [showSignIn, setShowSignIn] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

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
                        message={<SignIn showSignUp={() => switchToSignUp()} />}
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
                        message={<SignUp />}
                        applyForm={() => setShowSignUp(false)}
                        cancelForm={() => setShowSignUp(false)}
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
        padding: '1em 1em 0 3em'
    }
}))

export default LeftSidebar;