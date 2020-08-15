import React, {useEffect, useState} from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCover from "../../components/Profile/Cover";
import PostCard from "../../components/PostCard";
import {getNewsFeed} from "./action";
import LoadingSpinner from "../../components/Common/LoadingSpinner";
import { connect } from "react-redux";
import { showListDialog } from "../../actions/ListCreateDialogActions";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add'

const Newsfeed = (props) => {
    const classes = useStyles();
    const {reloadData, dispatch} = props;
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleListShow = () => {
        dispatch(showListDialog());
        console.log('show list called')
    }

    useEffect(() => {
        setIsLoading(true)
        getNewsFeed()
        .then((res) => {
            console.log(res)
            setPosts(res.data.data.posts);
            setIsLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setIsLoading(false);
        })
    }, [reloadData])

		return (
			<>
            {
                isLoading && (
                    <LoadingSpinner
                        loading={isLoading}
                        text="Fetching News Feed..."
                        size="large"
                    />
                )
            }
            {posts.map((post, index) => {
                return (
                    <Grid key={index}>
                        <PostCard post={post} />
                    </Grid>
                )
            })}

            <div className = {classes.addIcon} onClick= {handleListShow}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
            </>
		);
    }
    
const useStyles = makeStyles((theme) => ({
    tabSelected: {
        fontWeight: 400
    },
    tabselected: {
        fontWeight: 600
    },
    buttons: {
        padding: '12px 21px',
        fontSize: '1rem'
    },
    addIcon : {
        display : 'none',
        position : 'fixed', 
        bottom : '10%',
        right : '5%',
        [theme.breakpoints.down('sm')]: {
           display: 'block',
       },
   },
    })
)


function mapStateToProps(state) {
    return {
        user: state.user,
        reloadData: state.reloadData,
    };
}

export default connect(mapStateToProps)(Newsfeed);
