import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCover from "../../components/Profile/Cover";
import Lists from "../../components/Profile/Lists";
import Challenges from "../../components/Profile/Challenges";
import Categories from "../../components/Profile/Categories";
import {withRouter} from "react-router-dom"

const Profile = (props) => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(null);

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

    useEffect(() => {
        console.log('withRouter', props);
        if(props.match.params.tab === "lists") {
            setActiveTab(1)
        } else if (props.match.params.tab === "challenges") {
            setActiveTab(2)
        } else if(props.match.params.tab === "categories") {
            setActiveTab(3)
        }
    }, [])

		return (
			<div>
                <ProfileCover />
				<ButtonGroup fullWidth size ='large'>
                    <Button  className ={classes.buttons} onClick={() => handleTabChange(1)}>
                        <Typography className={activeTab === 1 ? classes.tabselected : classes.tab}>Lists</Typography>
                    </Button>
                    <Button onClick={() => handleTabChange(2)}>
                        <Typography className={activeTab === 2 ? classes.tabselected : classes.tab}>Challenges</Typography>
                    </Button>
                    <Button onClick={() => handleTabChange(3)}>
                        <Typography className={activeTab === 3 ? classes.tabselected : classes.tab}>Categories</Typography></Button>
                </ButtonGroup>
                {
                    activeTab === 1 ? (
                        <>
                            <Lists />
                        </>
                    )
                    :
                    activeTab === 2 ? (
                        <>
                            <Challenges />
                        </>
                    )
                    :
                    <>
                        <Categories />
                    </>
                }
                
			</div>
		);
    }
    
const useStyles = makeStyles((theme) => ({
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

export default withRouter(Profile);
