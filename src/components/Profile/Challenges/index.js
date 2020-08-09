import React, {useState, useEffect} from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../../PostCard";
import { connect } from "react-redux";
import LoadingSpinner from "../../Common/LoadingSpinner"
import {getChallenges} from "./actions"

const Challenges = (props) => {
    const classes = useStyles();
    const [challenges, setChallenges] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { user } = props;

    useEffect(() => {
        if (!!user) {
            getChallenges({ 'user_id': user.id })
                .then((res) => {
                    console.log('res', res)
                    setChallenges(res.data.data.users_own_lists)
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
                        text="Fetching Challenges..."
                        size="large"
                    />
                )
            }
            {challenges.length
            ?
            challenges.map((challenge, index) => {
                return (
                    <Grid key={index}>
                        <PostCard post={challenge} />
                    </Grid>
                )
            })
        :
        "No Challenges Present"
        }
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

export default connect(mapStateToProps)(Challenges);
