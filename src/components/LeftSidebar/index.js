import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SidebarCard from "../SidebarCard";
import Dialog from "../Common/Dialog";
import SignIn from "../SignIn";
import Colors from '../../static/_colors';
import {Menu} from "../../static/_leftsidebar";

const LeftSidebar = (props) => {
    const classes = useStyles();
    const [showSignIn, setShowSignIn] = useState(false);

    return (
        <>
            {
                showSignIn && (
                    <Dialog
                        title={"Sign In"}
                        open={showSignIn}
                        message={<SignIn />}
                        applyForm={() => setShowSignIn(false)}
                        cancelForm={() => setShowSignIn(false)}
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
                <SidebarCard title={"Profile"} />
                <SidebarCard title={"Create"} />
                <SidebarCard title={"Menu"} items={Menu} />
                <SidebarCard title={"Account"} />
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