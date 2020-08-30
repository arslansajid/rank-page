import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCard from "../../components/SidebarCard";
import Colors from '../../static/_colors';
import { Profile, Create, Menu, Account } from "../../static/_leftsidebar";

const MobileMenu = (props) => {
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
        paddingBottom: '4.5em',
    }
}))

export default MobileMenu;