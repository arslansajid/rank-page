import React , {useEffect, useState} from "react";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import CreateList from "./createList";
import Dialog from "../Common/Dialog";
import { connect } from 'react-redux';
import CreateListStep2 from "./createListStep2";
import CreateListStep3 from "./createListStep3";
import Published from "./published";
import { showListDialog, hideListDialog } from "../../actions/ListCreateDialogActions";



const Lists = (props) => {
    const { dispatch, listCreateDialog } = props;
    // const [showCreateList , setShowCreateList] = useState(true)
    const [showCreateListStep2 , setShowCreateListStep2] = useState(false)
    const [showCreateListStep3 , setShowCreateListStep3] = useState(false)
    const [showPublished, setShowPublished] = useState(false)
    const classes = useStyles();

    return (
        <>
        {
            listCreateDialog && (
            <Dialog
                title={"Create List"}
                open={listCreateDialog}
                message={
                    <CreateList 
                    createNew = {() => { dispatch(hideListDialog()) ; setShowCreateListStep2(true)}}
                    // continueNext = {() => {setShowCreateListStep2(false) ; setShowCreateListStep3(true)}}
                    />
                }
                // applyForm={() => setShowCreateList(false)}
                // cancelForm={() => setShowCreateList(false)}
                applyForm={() => dispatch(hideListDialog())}
                cancelForm={() => dispatch(hideListDialog())}
                // continueNext = {() => {setShowCreateList(false) ; setShowCreateListStep2(true) }}
                hideActions={true}
            />
        )
            }
             {showCreateListStep2 && (
            <Dialog
                title={"Create List"}
                open={showCreateListStep2}
                message={
                    <CreateListStep2 continueNext = {() => {setShowCreateListStep2(false) ; setShowCreateListStep3(true) }}/>
                }
                applyForm={() => { dispatch(hideListDialog()) ; setShowCreateListStep2(false) }}
                // cancelForm={() => setShowCreateListStep2(false)}
                // continueNext = {() => {setShowCreateList(false) ; setShowCreateListStep3(true) }}

                backAction={() => {dispatch(showListDialog())  ; setShowCreateListStep2(false) }}
                hideActions={true}
            />
        )
            }

            {showCreateListStep3 && (
            <Dialog
                title={"Create List"}
                open={showCreateListStep3}
                message={
                    <CreateListStep3 continueNext = {() => {setShowCreateListStep3(false) ; setShowPublished(true) }}/>
                }
                applyForm={() => {setShowCreateListStep3(false) ; setShowCreateListStep2(true)}}
                // cancelForm={() => setShowCreateListStep3(false)}
                // continueNext = {() => {setShowCreateListStep3(false) ; setShowPublished(true) }}
                backAction = {() => {setShowCreateListStep3(false) ; setShowCreateListStep2(true)}}
                hideActions={true}
            />
        )
            }
        {showPublished && (
            <Dialog
                title={"Published"}
                open={setShowPublished}
                message={
                    <Published/>
                }
                applyForm={() => setShowPublished(false)}
                cancelForm={() => setShowPublished(false)}
                // continueNext = {() => setShowCreateList(false)}
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

function mapStateToProps(state) {
    return {
        listCreateDialog: state.listCreateDialog,
    };
}

export default connect(mapStateToProps)(Lists);