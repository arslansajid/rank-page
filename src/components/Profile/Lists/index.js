import React , {useEffect, useState} from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import PostCard from "../../PostCard";
import CreateList from "./createList";
import Dialog from "../../Common/Dialog";
import ListTile  from './listTile'
import CreateListStep2 from "./createListStep2";
import CreateListStep3 from "./createListStep3";



const Lists = () => {
    const [showCreateList , setShowCreateList] = useState(false)
    const [showCreateListStep2 , setShowCreateListStep2] = useState(true)
    const [showCreateListStep3 , setShowCreateListStep3] = useState(true)
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
             {/* {showCreateListStep2 && (
            <Dialog
                title={"Create List"}
                open={showCreateListStep2}
                message={
                    <CreateListStep2/>
                }
                applyForm={() => setShowCreateListStep2(false)}
                cancelForm={() => setShowCreateListStep2(false)}
                continueNext = {() => setShowCreateList(false)}
                hideActions={true}
            />
        )
            } */}

            {showCreateListStep3 && (
            <Dialog
                title={"Create List"}
                open={showCreateListStep3}
                message={
                    <CreateListStep3/>
                }
                applyForm={() => setShowCreateListStep3(false)}
                cancelForm={() => setShowCreateListStep3(false)}
                continueNext = {() => setShowCreateList(false)}
                hideActions={true}
            />
        )
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


export default Lists;