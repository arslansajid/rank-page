import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import {getListById} from "./actions"
import PostCard from "../../components/PostCard";
import {withRouter} from "react-router-dom";
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import {connect} from "react-redux"
import { setPostOrder } from "../../actions/SelectedPostAction";

const PostDetail = (props) => {
    const classes = useStyles();
    const [post, setPost] = useState(null);
    const [isLoading, setIsLoading] = useState(true)
    const { selectedPost, dispatch, match } = props;

    useEffect(() => {
        getListData();
    }, [match.params.postId])

    const getListData = () => {
        setIsLoading(true)
        const data = {
            post_id: match.params.postId ? match.params.postId : selectedPost.postId
        }
        getListById(data)
        .then((res) => {
            console.log("res", res)
            setPostData(res.data.data)
            setIsLoading(false)
        })
        .catch((err) => {
            console.log("err", err)
            setIsLoading(false);
        })
    }

    const setPostData = (data) => {
        setPost(data);
        setIsLoading(false);

        let reorderString = "";
        const items = data.list_items;
        items.forEach((item, index) => {
        reorderString = reorderString + item.id;
        if(index + 1 < items.length) {
            reorderString = reorderString + ","
        }
        })

        dispatch(setPostOrder(reorderString))
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

function mapStateToProps(state) {
	return {
		selectedPost: state.selectedPost,
	};
}

export default withRouter(connect(mapStateToProps)(PostDetail));
