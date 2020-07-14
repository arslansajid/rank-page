import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Dialog from "../Common/Dialog";
import SignIn from "../SignIn";

const LeftSidebar = (props) => {
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
                    hideActions={false}
                />
            )
        }
        <Button
            onClick={() => setShowSignIn(true)}
            variant="contained" color="primary">
            Sign in
        </Button>
        </>
    )
}

export default LeftSidebar;