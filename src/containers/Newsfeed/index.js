import React, {useEffect, useState} from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCover from "../../components/Profile/Cover";
import PostCard from "../../components/PostCard";
import {getNewsFeed} from "./action";
import LoadingSpinner from "../../components/Common/LoadingSpinner"

const Newsfeed = () => {
    const classes = useStyles();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
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
    }, [])

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
    })
)

export default Newsfeed;
