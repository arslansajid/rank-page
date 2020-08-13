import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import BlockTile from "../../components/BlockTile";
import {getReportedUsers} from "./action";

const ReportedUsers = () => {
    const classes = useStyles();
    const [reportedUsers, setReportedUsers] = useState([])

    useEffect(() => {
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
    }, [])

    return (
        <>
            <Paper elevation={0} className={classes.container}>
                {reportedUsers.length > 0 ? reportedUsers.map((item, index) => {
                    return (
                        <Grid key={index}>
                            <BlockTile showButton={false} name={item.name} userName={item.user_name} />
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

export default ReportedUsers;
