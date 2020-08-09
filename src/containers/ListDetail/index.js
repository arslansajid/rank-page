import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import {getListById} from "./actions"
import PostCard from "../../components/PostCard";
import {withRouter} from "react-router-dom";
import LoadingSpinner from "../../components/Common/LoadingSpinner"

const PostDetail = (props) => {
    const classes = useStyles();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        console.log('HAHAH', props)
        getListData();
    }, [])

    const getListData = () => {
        const data = {
            post_id: props.match.params.postId
        }
        getListById(data)
        .then((res) => {
            console.log("res", res)
            setPost(res.data.data)
            setIsLoading(false);
        })
        .catch((err) => {
            console.log("err", err)
            setIsLoading(false);
        })
    }

		return (
			<>
                {
                isLoading && (
                    <LoadingSpinner
                        loading={isLoading}
                        text="Fetching Post Data..."
                        size="large"
                    />
                )
            }
                {!isLoading && (
                    <PostCard showTabs={true} post={post} />
                )}
            </>
		);
    }
    
const useStyles = makeStyles((theme) => ({
    })
)

export default withRouter(PostDetail);
