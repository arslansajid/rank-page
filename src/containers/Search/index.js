import React, { useEffect, useState } from 'react';
import { ButtonGroup, Button, Grid, Typography, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Colors from "../../static/_colors";
import SearchInput from "../../components/Common/SearchInput";
import SearchTile from "../../components/SearchTile";

const Search = () => {
    const classes = useStyles();
    const [activeTab, setActiveTab] = useState(1);

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

    return (
        <>
        <SearchInput handleSearch={() => console.log("send request to backend")} />
        <ButtonGroup className ={classes.buttons} fullWidth size ='large'>
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
                <Typography className={activeTab === 4 ? classes.tabselected : classes.tab}>Lists</Typography>
            </Button>
            <Button onClick={() => handleTabChange(5)}>
                <Typography className={activeTab === 5 ? classes.tabselected : classes.tab}>Pages</Typography>
            </Button>
        </ButtonGroup>
        
        <Paper elevation={0} className={classes.container}>
            <Typography variant="h6" gutterBottom>Users</Typography>
            {[...Array(5)].map((news, index) => {
                return (
                    <Grid key={index}>
                        <SearchTile />
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
    },
    tabSelected: {
        fontWeight: 400
    },
    tabselected: {
        fontWeight: 600
    },
    buttons: {
        margin: theme.spacing(1, 0, 1, 0),
        fontSize: '1rem',
        borderRadius: '8px 0px 0px 8px',
    },
    })
)

export default Search;
