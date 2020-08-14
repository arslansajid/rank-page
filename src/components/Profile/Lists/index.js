import React, { useEffect, useState } from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../../PostCard";
import { getLists } from "./actions";
import { connect } from "react-redux";
import LoadingSpinner from "../../Common/LoadingSpinner"
import AddIcon from '@material-ui/icons/Add'
import Fab from '@material-ui/core/Fab';
import { showListDialog } from "../../../actions/ListCreateDialogActions";

const Lists = (props) => {
    const [lists, setLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const { user, reloadData, dispatch, userId} = props;

    const handleListShow = () => {
        dispatch(showListDialog());
        console.log('show list called')
    }

    useEffect(() => {
        if(!!userId) {
            getLists({ 'user_id': userId })
            .then((res) => {
                console.log('res', res)
                setLists(res.data.data.users_own_lists ? res.data.data.users_own_lists : [])
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('err', err);
                setIsLoading(false);
            })
        } else if (!!user) {
            getLists({ 'user_id': user.id })
            .then((res) => {
                console.log('res', res)
                setLists(res.data.data.users_own_lists ? res.data.data.users_own_lists : [])
                setIsLoading(false);
            })
            .catch((err) => {
                console.log('err', err);
                setIsLoading(false);
            })
        }
    }, [user, reloadData])

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
            {lists.length > 0
                ?
                lists.map((list, index) => {
                    return (
                        <Grid key={index}>
                            <PostCard post={list} hideMenu={true} />
                        </Grid>
                    )
                })
                
                :
                null
            }

            <div className = {classes.addIcon} onClick= {handleListShow}>
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </div>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    moreText: {
        margin: theme.spacing(6, 0, 6, 0),
        textAlign: 'center'
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
        reloadData: state.reloadData
    };
}

export default connect(mapStateToProps)(Lists);
