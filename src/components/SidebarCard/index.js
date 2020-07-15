import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import Colors from '../../static/_colors';

const SidebarCard = (props) => {
    const classes = useStyles();

    return (
        <>
            <Card className={classes.root} variant="outlined">
                <Grid className={classes.title}>
                    <Typography gutterBottom>
                        Title
                    </Typography>
                </Grid>
                <CardContent className={classes.cardContent}>
                    Items goes here...
                </CardContent>
            </Card>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 200,
        background: Colors.background,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
        marginTop: 8,
      },
      title: {
          textAlign: 'center',
          borderBottom: `1px solid ${Colors.border}`
      },
      cardContent: {
          padding: '0 1em 1em 1em',
      }
}))

export default SidebarCard;