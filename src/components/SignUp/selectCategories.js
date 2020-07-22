import React, { useState } from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography , Grid, ButtonBase} from '@material-ui/core';
import Colors from '../../static/_colors';
import {useForm} from 'react-hook-form';
import CategoryCard from "../Profile/CategoryCard";


const SelectCategories = props => {
  const {close} = props;
  const [isLoading, setIsLoading] = useState(false);
  const {errors, handleSubmit, control} = useForm ();

  const classes = useStyles();
  return (
    <div className={classes.container}>
        <Typography variant="body2" className ='space-4'>You have been registered, please choose categories you like</Typography>

        <Grid container spacing={2} className = 'space-4'>
          {[...Array(7)].map((category, index) => {
            return (
                <Grid key={index} item lg={6} md={6} sm={6} xs={12}>
                    <CategoryCard
                        isSelected={true}
                    />
                </Grid>
              )
          })}
      </Grid>


      <Grid className={classes.fixedBottom}>
        <Button
          onClick={()=>close()}
          className={classes.submitButton}
          variant="contained"
          color="primary"
        >
          <Typography className={classes.submitButtonText}>
            Save
          </Typography>
        </Button>
      </Grid>
    </div>
  );
};

const useStyles = makeStyles (theme =>
  createStyles ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
    },
    heading: {
      alignSelf: 'left',
      fontSize: '30px',
      fontWeight: 600,
      marginBottom: '45px',
    },
    submitButton: {
      minWidth: '100px',
      height: '40px',
      background: Colors.themeBlue,
      width: '80%',
    },
    center: {
        textAlign : 'center'
    },
    submitButtonText: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '19px',
      textTransform: 'capitalize',
    },
    registerText: {
      textAlign: 'center',
      fontWeight: '600',
      color: '#333',
    },
    fixedBottom: {
      background: Colors.white,
      padding: '1.3em 3em',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 'calc(100% - 6em)',
      borderTop: '1px solid rgba(38, 38, 38, 0.12)',
      textAlign : 'center',
    }
  })
);

SelectCategories.defaultProps = {};

export default SelectCategories;
