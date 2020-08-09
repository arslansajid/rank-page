import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import {getListById} from "./actions"
import PostCard from "../../components/PostCard"

const PostDetail = () => {
    const classes = useStyles();
    const [post, setPost] = useState(null);

    useEffect(() => {
        getListData();
    }, [])

    const getListData = () => {
        getListById()
        .then((res) => {
            console.log("res", res)
            setPost(res.data.data)
        })
        .catch((err) => {
            console.log("err", err)
        })
    }

		return (
			<>
                <Typography variant="h6" gutterBottom>List Detail</Typography>
                {/* <PostCard showTabs={true} post={post} /> */}
            </>
		);
    }
    
const useStyles = makeStyles((theme) => ({
    })
)

export default PostDetail;
