import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCover from "../../components/Profile/Cover";
import Lists from "../../components/Profile/Lists";
import Challenges from "../../components/Profile/Challenges";
import Categories from "../../components/Profile/Categories";
import { withRouter, Switch, Route } from "react-router-dom";
import { connect } from 'react-redux';

const Profile = (props) => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(null);
   
    useEffect(() => {
        if (props.match.params.tab === "lists") {
            setActiveTab(1)
        } else if (props.match.params.tab === "challenges") {
            setActiveTab(2)
        } else if (props.match.params.tab === "categories") {
            setActiveTab(3)
        }
    }, [])

    const onTabChangeHandler = (selected) => {
        setActiveTab(selected);
        if(selected === 1) {
            props.history.push('/profile/lists');
        } else if(selected === 2) {
            props.history.push('/profile/challenges');
        } else if(selected === 3) {
            props.history.push('/profile/categories');
        }
    }

    return (
        <div className={classes.main}>
            {props.user &&  
            <ProfileCover info = {props.user}/> }
            <ButtonGroup fullWidth size='large'>
                <Button className={classes.buttons} onClick={() => onTabChangeHandler(1)}>
                    <Typography className={activeTab === 1 ? classes.tabselected : classes.tab}>Lists</Typography>
                </Button>
                <Button onClick={() => onTabChangeHandler(2)}>
                    <Typography className={activeTab === 2 ? classes.tabselected : classes.tab}>Challenges</Typography>
                </Button>
                <Button onClick={() => onTabChangeHandler(3)}>
                    <Typography className={activeTab === 3 ? classes.tabselected : classes.tab}>Categories</Typography></Button>
            </ButtonGroup>

            <Grid>
                <Switch>
                    <Route
                        path="/profile/lists"
                        render={props => (
                            <Lists {...props} />
                        )}
                    />
                    <Route
                        path="/profile/challenges"
                        render={props => <Challenges {...props} />}
                    />
                    <Route
                        path="/profile/categories"
                        render={props => <Categories {...props} />}
                    />
                </Switch>
            </Grid>
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

// export default withRouter(Profile);

// function mapStateToProps(state) {
//     return {
//         user: state.user,
//     };
// }


// export default connect(mapStateToProps)(Profile);
export default withRouter(connect(store => {
    return{
        user: store.user,
    }
  })(Profile))