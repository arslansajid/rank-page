import React, { useState, useEffect } from 'react';
import { Paper, Grid, Typography, Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import Colors from "../../static/_colors";
import UserTile from "../../components/Search/UserTile";
import { getFollowers } from "./action";

const ReportedUsers = () => {
    const classes = useStyles();
    const [followers, setFollowers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(1);

    useEffect(() => {
        getFollowers()
            .then((res) => {
                console.log("res", res)
                setFollowers(res.data.data ? res.data.data.followings : [])
                setIsLoading(false)
            })
            .catch((err) => {
                console.log("err", err)
                setIsLoading(false)
            })
    }, [])

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

    if (isLoading) {
        return (
            <LoadingSpinner
                loading={isLoading}
                text="Fetching Followers..."
                size="large"
            />
        )
    } else {
        return (
            <>
            <ButtonGroup className={classes.buttons} fullWidth size='large'>
                <Button onClick={() => handleTabChange(1)}>
                    <Typography className={activeTab === 1 ? classes.tabselected : classes.tab}>All</Typography>
                </Button>
                <Button onClick={() => handleTabChange(2)}>
                    <Typography className={activeTab === 2 ? classes.tabselected : classes.tab}>Users</Typography>
                </Button>
                <Button onClick={() => handleTabChange(3)}>
                    <Typography className={activeTab === 3 ? classes.tabselected : classes.tab}>Experts</Typography>
                </Button>
                <Button onClick={() => handleTabChange(4)}>
                    <Typography className={activeTab === 4 ? classes.tabselected : classes.tab}>Pages</Typography>
                </Button>
            </ButtonGroup>

            {activeTab === 1 && (
                <>
                <Paper elevation={0} className={classes.container}>
                    {followers.length > 0 ? followers.map((follower, index) => {
                        return (
                            <Grid key={index}>
                                <UserTile userId={follower.id} name={follower.name} userName={follower.user_name} />
                            </Grid>
                        )
                    })
                        :
                        <Typography variant="h5">No Followers Yet!</Typography>
                    }
                </Paper>
                </>
            )}

                {activeTab === 2 && (
                        <>
                            <Paper elevation={0} className={classes.container}>
                                <Typography variant="h6" gutterBottom>Users</Typography>
                                {followers.length > 0 ? followers.map((follower, index) => {
                                    return (
                                        <Grid key={index}>
                                            <UserTile userId={follower.id} name={follower.name} userName={follower.user_name} />
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

export default ReportedUsers;
