import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCard from "../SidebarCard";
import SearchInput from "../Common/SearchInput";
import FooterLinks from "../FooterLinks";
import Colors from '../../static/_colors';

const RightSidebar = (props) => {
    const classes = useStyles();

    const searchHandler = (value) => {
        window.alert(`send request for searching with ${value}`);
        props.history.push('/search')
    }

    return (
        <>
            <div className={classes.main}>
                <SearchInput
                    handleSearch={(value) => searchHandler(value)}
                />
                <SidebarCard showSeeMoreLink={true} />
                <SidebarCard showSeeMoreLink={true} />
                <SidebarCard showSeeMoreLink={true} />
                <FooterLinks showSeeMoreLink={true} />
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    main: {
        background: Colors.white,
        height: '100%',
        padding: '2em',
        position: 'fixed',
    }
}))

export default RightSidebar;