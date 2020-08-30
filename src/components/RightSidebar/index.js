import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SidebarCard from "../SidebarCard";
import SearchInput from "../Common/SearchInput";
import FooterLinks from "../FooterLinks";
import Colors from '../../static/_colors';
import {getTrending} from "./action"

const RightSidebar = (props) => {
    const classes = useStyles();
    const [trendingItems, setTrendingItems] = useState([]);

    useEffect(() => {
        getTrending()
        .then((res) => {
            setTrendingItems(res.data.data ? res.data.data : null)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }, [props.user])

    const searchHandler = (value) => {
        props.history.push(`/search/${value}`)
    }

    return (
        <>
            <div className={classes.main}>
                <SearchInput
                    handleSearch={(value) => searchHandler(value)}
                />
                <SidebarCard title={'Trending'} seeMoreLinkUrl={"/trending"} showSeeMoreLink={true} trendingLists={trendingItems.lists} />
                <FooterLinks showSeeMoreLink={true} />
            </div>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    main: {
        background: Colors.white,
        padding: '2em',
        position: 'fixed',
        top: 0,
        bottom: 0,
        overflow: 'hidden scroll',
        paddingBottom: 20,
    }
}))

export default connect(store => {
    return {
        user: store.user,
    }
})(RightSidebar)