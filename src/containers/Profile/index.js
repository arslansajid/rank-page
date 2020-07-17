import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCover from "../../components/Profile/Cover";
import Lists from "../../components/Profile/Lists";
import Challenges from "../../components/Profile/Challenges";
import Categories from "../../components/Profile/Categories";

const Profile = () => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(1);

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

		return (
			<div>
                <ProfileCover />
				<ButtonGroup fullWidth size="large">
                    <Button onClick={() => handleTabChange(1)}>
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
    })
)

export default Profile;
