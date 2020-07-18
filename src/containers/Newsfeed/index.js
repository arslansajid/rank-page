import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCover from "../../components/Profile/Cover";
import PostCard from "../../components/PostCard";

const Newsfeed = () => {
    const classes = useStyles();
		return (
			<>
            {[...Array(3)].map((news, index) => {
                return (
                    <Grid key={index}>
                        <PostCard />
                    </Grid>
                )
            })}
            </>
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

export default Newsfeed;
