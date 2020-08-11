import React from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import BlockTile from "../../components/BlockTile"
import user from '../../reducers/UserReducer';

const BlockedUsers = () => {
    const classes = useStyles();
		return (
			<>
            <Paper elevation={0} className={classes.container}>
                {[...Array(3)].map((user, index) => {
                    return (
                        <Grid key={index}>
                            <BlockTile userId={1} showButton={true} />
                        </Grid>
                    )
                })}
            </Paper>
            </>
		);
    }
    
const useStyles = makeStyles((theme) => ({
    container: {
		minHeight: 100,
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

export default BlockedUsers;
