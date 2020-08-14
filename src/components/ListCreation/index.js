import React , {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import CreateList from "./createList";
import Dialog from "../Common/Dialog";
import { connect } from 'react-redux';
import CreateListStep2 from "./createListStep2";
import CreateListStep3 from "./createListStep3";
import Published from "./published";
import { showListDialog, hideListDialog } from "../../actions/ListCreateDialogActions";
import { reloadData } from "../../actions/ReloadDataAction";



const Lists = (props) => {
    const { dispatch, listCreateDialog } = props;
    const [showCreateListStep2 , setShowCreateListStep2] = useState(false)
    const [showCreateListStep3 , setShowCreateListStep3] = useState(false)
    const [showPublished, setShowPublished] = useState(false);
    const [ listItems , setListItems] = useState(null)
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
                    continueNext = {() => { dispatch(hideListDialog()) ; setShowCreateListStep2(true)}}
                    getData = {(value) =>  setListItems(value)}
                    />
                }
                applyForm={() => dispatch(hideListDialog())}
                cancelForm={() => dispatch(hideListDialog())}
                hideActions={true}
            />
        )
            }
        {showCreateListStep2 && (
            <Dialog
                title={"Create List"}
                open={showCreateListStep2}
                message={
                    <CreateListStep2 
                    listItems = {listItems}
                    getListData = {(value) => {setListItems(value)}}
                    continueNext = {() => {setShowCreateListStep2(false) ; setShowCreateListStep3(true) }}/>
                }
                applyForm={() => {dispatch(showListDialog()) ; setShowCreateListStep2(false) }}
                backAction={() => {dispatch(showListDialog()) ; setShowCreateListStep2(false) }}
                hideActions={true}
            />
        )
            }

            {showCreateListStep3 && (
            <Dialog
                title={"Create List"}
                open={showCreateListStep3}
                message={
                    <CreateListStep3 
                    listItems = {listItems}
                    getListData = {(value) => {setListItems(value)}}
                    continueNext = {() => {setShowCreateListStep3(false) ; setShowPublished(true)}}
                    publish = {() => {setShowCreateListStep3(false) ; setShowPublished(true)}}
                    />
                }
                applyForm={() => {setShowCreateListStep3(false) ; setShowCreateListStep2(true)}}
                backAction = {() => {setShowCreateListStep3(false) ; setShowCreateListStep2(true)}}
                hideActions={true}
            />
        )
            }
        {showPublished && (
            <Dialog
                title={"Published"}
                open={showPublished}
                message={
                    <Published createNewList={() => {dispatch(showListDialog()) ; setShowPublished(false)}} />
                }
                applyForm={() => {setShowPublished(false); dispatch(reloadData())}}
                cancelForm={() => {setShowPublished(false); dispatch(reloadData())}}
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