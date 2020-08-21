import React , {useEffect, useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import CreateList from "./createList";
import Dialog from "../Common/Dialog";
import { connect } from 'react-redux';
import CreateListStep2 from "./createListStep2";
import CreateListStep3 from "./createListStep3";
import Published from "./published";
import { showListDialog, hideListDialog } from "../../actions/ListCreateDialogActions";
import { showPoolDialog, hidePoolDialog } from "../../actions/PoolCreateDialogActions";
import { reloadData } from "../../actions/ReloadDataAction";



const Pools = (props) => {
    const { dispatch, poolCreateDialog } = props;
    const [showCreateListStep2 , setShowCreateListStep2] = useState(false)
    const [showCreateListStep3 , setShowCreateListStep3] = useState(false)
    const [showPublished, setShowPublished] = useState(false);
    const [ listItems , setListItems] = useState(null)
    const [listId , setListId] = useState(null)
    const classes = useStyles();

    return (
        <>
        {
            poolCreateDialog && (
            <Dialog
                title={"Create Pool"}
                open={poolCreateDialog}
                message={
                    <CreateList 
                        continueNext = {() => { dispatch(hidePoolDialog()) ; setShowCreateListStep2(true)}}
                        getData = {(value) =>  setListItems(value)}
                    />
                }
                applyForm={() => dispatch(hidePoolDialog())}
                cancelForm={() => dispatch(hidePoolDialog())}
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
                applyForm={() => {dispatch(showPoolDialog()) ; setShowCreateListStep2(false) }}
                backAction={() => {dispatch(showPoolDialog()) ; setShowCreateListStep2(false) }}
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
                    publish = {(listId) => {setShowCreateListStep3(false) ; setShowPublished(true) ; setListId(listId)}}
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
                    <Published 
                    listId = {listId}
                    createNewList={() => {dispatch(showPoolDialog()) ; setShowPublished(false)}} />
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
        poolCreateDialog: state.poolCreateDialog,
    };
}

export default connect(mapStateToProps)(Pools);