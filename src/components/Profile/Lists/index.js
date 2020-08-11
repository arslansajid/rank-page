import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../../PostCard";
import { getLists } from "./actions";
import { connect } from "react-redux";
import LoadingSpinner from "../../Common/LoadingSpinner"

const Lists = (props) => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();

    const { user } = props;

    useEffect(() => {
        if (!!user) {
            getLists({ 'user_id': user.id })
                .then((res) => {
                    console.log('res', res)
                    setLists(res.data.data.users_own_lists)
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.log('err', err);
                    setIsLoading(false);
                })
        }
    }, [user])

    return (
        <>
            {
                isLoading && (
                    <LoadingSpinner
                        loading={isLoading}
                        text="Fetching Lists..."
                        size="large"
                    />
                )
            }
            {lists.length ? lists.map((list, index) => {
                return (
                    <Grid key={index}>
                        <PostCard post={list} />
                    </Grid>
                )
            })
        :null }
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    moreText: {
        margin: theme.spacing(6, 0, 6, 0),
        textAlign: 'center'
    }
})
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(Lists);
