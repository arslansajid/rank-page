import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import BlockTile from "../../components/BlockTile"
import user from '../../reducers/UserReducer';
import {getBlockedUsers} from "./action";

const BlockedUsers = (props) => {
    const classes = useStyles();
    const [blockedUsers, setBlockedUsers] = useState([])
    const { user } = props;

    useEffect(() => {
        if(!!user) {
            const data = {
                user_id: user.id,
            }
            getBlockedUsers(data)
            .then((res) => {
                console.log("res")
                setBlockedUsers(res.data.data ? res.data.data : [])
            })
            .catch((err) => 
            console.log(err))
        }
    }, [user])

    const unBlockSuccessHanlder = (index) => { //removing from the list
        const updatedBlockedUsers = blockedUsers.slice();
        updatedBlockedUsers.splice(index, 1);
        setBlockedUsers(updatedBlockedUsers);
    }

		return (
			<>
            <Paper elevation={0} className={classes.container}>
                {blockedUsers.length > 0 ? blockedUsers.map((item, index) => {
                    return (
                        <Grid key={index}>
                            <BlockTile index={index} userId={item.id} showButton={true} name={item.name} userName={item.user_name} userImage={item.profile_image} unBlockSuccessHanlder={() => unBlockSuccessHanlder()} />
                        </Grid>
                    )
                })
                :
                <Typography variant="h6">No Blocked Users</Typography>
            }
            </Paper>
            </>
		);
    }
    
const useStyles = makeStyles((theme) => ({
    container: {
		// minHeight: 100,
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
		marginTop: 8,
		padding: "1em"
    },
    seperator: {
        // backgroundColor: 'rgba(38, 38, 38, 0.12)',
        width: '100%',
        height: 1,
        margin: "1em 0 1em"
    }
    })
)
function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(BlockedUsers);
