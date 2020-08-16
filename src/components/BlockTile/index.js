import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Typography, Grid, Button } from '@material-ui/core';
import { UnBlockUser } from "./action"

const BlockTile = (props) => {
    const classes = useStyles();
    const {showButton, userId, name, userName, unBlockSuccessHanlder, index} = props;

    const unBlockUserHandler = () => {
        const data = {
            'unblock_user_id': userId
        }
        UnBlockUser(data)
        .then((res) => {
            window.alert("Unblocked successfully")
            unBlockSuccessHanlder(index);
        })
        .catch((err) => {
            console.log(err)
            window.alert("ERROR while unblock")
        })
    }

    return (
        <>
            <Grid container alignItems="center" justify="space-between" className={classes.profileContainer}>
                <Link to={`/user-detail/${userId}/lists`}>
                    <div className={classes.row}>
                        <Avatar className={classes.avatar} alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        <div>
                            <Typography className={classes.bold}>
                                {!!name ? name : "Arslan Sajid"}
                            </Typography>
                            <Typography color="textSecondary" variant="body2">
                                {!!userName ? "@" + userName : "@arslansajid"}
                            </Typography>
                        </div>
                    </div>
                </Link>
                {
                    showButton && (
                        <Button onClick={() => unBlockUserHandler()} color="primary" variant="outlined">UnBlock</Button>
                    )
                }
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    verticalCenter: {
        display: "flex",
        flexDirection: "column",
        justifyContent: 'center',
    },
    row: {
        display: 'flex'
    },
    profileContainer: {
        padding: theme.spacing(2, 0),
        borderBottom: '1px solid rgba(38, 38, 38, 0.12)',
    },
    avatar: {
        marginRight: 15,
        width: theme.spacing(6),
        height: theme.spacing(6),
    },
    bold: {
        fontWeight: 'bold'
    }
}))

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(BlockTile);