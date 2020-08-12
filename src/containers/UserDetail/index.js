import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCover from "../../components/Profile/Cover";
import Lists from "../../components/Profile/Lists";
import Challenges from "../../components/Profile/Challenges";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';
import {getUserById} from "./action";

const UserDetail = (props) => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(null);
    const [user, setUser] = useState(null);
    console.log('props user detail', props)
    const { tab, id } = props.match.params
   
    useEffect(() => {
        if (tab === "lists") {
            setActiveTab(1)
        } else if (tab === "pools") {
            setActiveTab(2)
        }
        fetchUserData();
    }, [])

    const fetchUserData = () => {
        const params = {
            user_id: id
        };

        getUserById(params)
        .then((res) => {
            setUser(res.data.data && res.data.data.user ? res.data.data.user : null);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const onTabChangeHandler = (selected) => {
        setActiveTab(selected);
        if(selected === 1) {
            props.history.push(`/user-detail/${id}/lists`);
        } else if(selected === 2) {
            props.history.push(`/user-detail/${id}/pools`);
        }
    }

    return (
        <div className={classes.main}>
            <ProfileCover isUserDetail={true} userData={user}/>
            <ButtonGroup fullWidth size='large'>
                <Button className={classes.buttons} onClick={() => onTabChangeHandler(1)}>
                    <Typography className={activeTab === 1 ? classes.tabselected : classes.tab}>Lists</Typography>
                </Button>
                <Button onClick={() => onTabChangeHandler(2)}>
                    <Typography className={activeTab === 2 ? classes.tabselected : classes.tab}>Pools</Typography>
                </Button>
            </ButtonGroup>
            
            {!!user && (
            <Grid>
                <Switch>
                    <Route
                        path={`/user-detail/${id}/lists`}
                        render={props => <Lists userId={user.id} {...props} />}
                    />
                    <Route
                        path={`/user-detail/${id}/pools`}
                        render={props => <Challenges userId={user.id} {...props} />}
                    />
                </Switch>
            </Grid>
            )}
        </div>
    );
}

const useStyles = makeStyles((theme) => ({
    main: {
        marginBottom: 20,

        [theme.breakpoints.down('sm')]: {
            marginBottom: 70,
        },
    },
    tabSelected: {
        fontWeight: 400
    },
    tabselected: {
        fontWeight: 600
    },
    buttons: {
        padding: '12px 21px',
        fontSize: '1rem'
    },
})
)

export default withRouter(connect(store => {
    return{
        user: store.user,
    }
  })(UserDetail))