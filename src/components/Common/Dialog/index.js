import React from 'react';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Colors from '../../../static/_colors';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DialogForm = ({
    title,
    open,
    message,
    applyForm,
    cancelForm,
    hideActions,
}) => {
    const classes = useStyles();
    return (
        <div>
            <Dialog open={open} onClose={cancelForm} fullWidth={true} maxWidth={'sm'} disableBackdropClick>
                 {hideActions ? null : (
                    <>
                        <DialogActions className = {classes.buttonClose}>
                            {/* {
                                applyForm && (
                                    <Button onClick={applyForm} color='primary' type='submit'>
                                        Save
                                    </Button>
                                )
                            } */}
                            {
                                cancelForm && (
                                    <Button onClick={cancelForm} color='secondary' type='submit'>
                                        Close
                                    </Button>
                                )
                            }
                        </DialogActions>
                    </>
                )}
                <DialogTitle className = {classes.title} id='form-dialog-title'>{title}</DialogTitle>
                <DialogContent className = {classes.content}>
                    <DialogContentText component={'div'}>{message}</DialogContentText>
                </DialogContent>
                {/* {hideActions ? null : (
                    <>
                        <DialogActions>
                            {
                                applyForm && (
                                    <Button onClick={applyForm} color='primary' type='submit'>
                                        Save
                                    </Button>
                                )
                            }
                            {
                                cancelForm && (
                                    <Button onClick={cancelForm} color='secondary' type='submit'>
                                        Cancel
                                    </Button>
                                )
                            }
                        </DialogActions>
                    </>
                )} */}
            </Dialog>
        </div>
    );
};

export default DialogForm;


const useStyles = makeStyles((theme) =>
    createStyles({
        title: {
            textAlign: 'center',
            borderBottom : '1px solid #ddd'
        },
        content: {
            padding : '35px',
        },
        buttonClose : {
            position : 'absolute',
            top : '10px',
        }
    })
);

