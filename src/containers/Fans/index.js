import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import Colors from "../../static/_colors";
import BlockTile from "../../components/BlockTile";
import { getFans } from "./action"

const ReportedUsers = () => {
    const classes = useStyles();
    const [fans, setFans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getFans()
            .then((res) => {
                console.log("res", res)
                setFans(res.data.data ? res.data.data.followings : []);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("err", err);
                setIsLoading(false)
            })
    }, [])

    if (isLoading) {
        return (
            <LoadingSpinner
                loading={isLoading}
                text="Fetching Fans..."
                size="large"
            />
        )
    } else {
        return (
            <>
                <Paper elevation={0} className={classes.container}>
                    {fans.length > 0 ? fans.map((fan, index) => {
                        return (
                            <Grid key={index}>
                                <BlockTile name={fan.name} userName={fan.user_name} showButton={false} />
                            </Grid>
                        )
                    })
                        :
                        <Typography variant="h5">No Fans Yet!</Typography>
                    }
                </Paper>
            </>
        );
    }
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

export default ReportedUsers;
