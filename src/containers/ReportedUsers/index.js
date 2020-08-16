import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import BlockTile from "../../components/BlockTile";
import {getReportedUsers} from "./action";

const ReportedUsers = (props) => {
    const classes = useStyles();
    const { user } = props;
    const [reportedUsers, setReportedUsers] = useState([]);

    useEffect(() => {
        if(!!user) {
            const data = {
                user_id: '19',
            }
            getReportedUsers(data)
            .then((res) => {
                console.log("res");
                setReportedUsers(res.data.data ? res.data.data : [])
            })
            .catch((err) => 
            console.log(err))
        }
    }, [user])

    return (
        <>
            <Paper elevation={0} className={classes.container}>
                {reportedUsers.length > 0 ? reportedUsers.map((item, index) => {
                    return (
                        <Grid key={index}>
                            <BlockTile showButton={false} name={item.reported_user.name} userName={item.reported_user.user_name} userImage={item.reported_user.profile_image} />
                        </Grid>
                    )
                })
                :
                <Typography variant="h6">No Reported Users</Typography>
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

export default connect(mapStateToProps)(ReportedUsers);
