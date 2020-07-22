import React , {useEffect, useState} from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../../PostCard";
import CreateList from "./createList";
import Dialog from "../../Common/Dialog";

const Lists = () => {
    const [showCreateList , setShowCreateList] = useState(true)
    const classes = useStyles();

    return (
        <>
            {[...Array(3)].map((list, index) => {
                return (
                    <Grid key={index}>
                        <PostCard />
                    </Grid>
                )
            })}
        {/* {
            showCreateList && (
            <Dialog
                title={"Create List"}
                open={showCreateList}
                message={
                    <CreateList/>
                }
                applyForm={() => setShowCreateList(false)}
                cancelForm={() => setShowCreateList(false)}
                continueNext = {() => setShowCreateList(false)}
                hideActions={true}
            />
        )
            } */}
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


export default Lists;