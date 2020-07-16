import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


const Step3 = props => {
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();

  const classes = useStyles ();
  return (
    <div className={classes.container}>
        <Typography variant="body2" className ='space-4'>You have been registered, please choose categories you like</Typography>
        {/* <div className="space-4">
          <InputLabel className='space-2'>Username</InputLabel>
          <TextField
            type="email"
            name="email"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.email ? true : false}
            placeholder="Username or Email"
            defaultValue={''}
            className="text-field space-2"
          />
          <Typography variant="body2">Username can contain underscores, alphbets, numbers only!</Typography>
        </div> */}

        <div className={`${classes.center} space-4`}>
          <Button
            type="submit"
            disabled={isLoading}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            <Typography className={classes.submitButtonText}>
              Save
            </Typography>
          </Button>
        </div>
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
  })
);

Step3.defaultProps = {};

export default Step3;
