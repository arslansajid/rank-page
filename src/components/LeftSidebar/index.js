import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCard from "../SidebarCard";
import Colors from '../../static/_colors';
import { Profile, Create, Menu, Account } from "../../static/_leftsidebar";

const LeftSidebar = (props) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.main}>
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
        padding: '2em 2em 0 4em',
        position: 'fixed',
        top: 0,
        bottom: 0,
        overflow: 'hidden scroll',
        paddingBottom: 20,
        width: 'calc(100% - 81%)'
    }
}))

export default LeftSidebar;