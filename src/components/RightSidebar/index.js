import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SidebarCard from "../SidebarCard";
import Colors from '../../static/_colors';

const RightSidebar = (props) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.main}>
                <SidebarCard />
                <SidebarCard />
                <SidebarCard />
                <SidebarCard />
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    main: {
        background: Colors.white,
        height: '100%',
        padding: '1em'
    }
}))

export default RightSidebar;