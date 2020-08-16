import React, { useEffect, useState } from 'react';
import { Paper, Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import Colors from "../../static/_colors";
import UserTile from "../../components/Search/UserTile";
import { getFans } from "./action"

const TrendingPage = () => {
    const classes = useStyles();
    const [fans, setFans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        getFans()
            .then((res) => {
                console.log("res", res)
                setFans(res.data.data ? res.data.data.followers : []);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("err", err);
                setIsLoading(false)
            })
    }, [])

    const unFollowSuccessHanlder = (index) => { //removing from the list
        const updatedUsers = fans.slice();
        updatedUsers.splice(index, 1);
        setFans(updatedUsers);
    }

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
            {activeTab === 1 && (
                <>
                <Paper elevation={0} className={classes.container}>
                    {fans.length > 0 ? fans.map((fan, index) => {
                        return (
                            <Grid key={index}>
                                <UserTile index={index} userFollow={fan.is_followed} userId={fan.id} name={fan.name} userName={fan.user_name} unFollowSuccessHanlder={() => unFollowSuccessHanlder()} />
                            </Grid>
                        )
                    })
                        :
                        <Typography variant="h5">No Fans Yet!</Typography>
                    }
                </Paper>
                </>
            )}

                    {activeTab === 2 && (
                        <>
                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Users</Typography>
                                {fans.length > 0 ? fans.map((fan, index) => {
                                    return (
                                        <Grid key={index}>
                                            <UserTile index={index} userFollow={fan.is_followed} userId={fan.id} name={fan.name} userName={fan.user_name} unFollowSuccessHanlder={() => unFollowSuccessHanlder()} />
                                        </Grid>
                                    )
                                })
                                :
                                <Typography variant="h6" gutterBottom>No Users found...</Typography>
                            }
                            </Paper>
                        </>
                    )}
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
    },
    buttons: {
        margin: theme.spacing(1, 0, 1, 0),
        fontSize: '1rem',
        borderRadius: '8px 0px 0px 8px',
    },
    tabSelected: {
        fontWeight: 400
    },
    tabselected: {
        fontWeight: 600
    },
})
)

export default TrendingPage;
