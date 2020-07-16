import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import {signUp} from './action.js'


const Step2 = props => {
  const {registerData} = props;
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();

  const onSubmit = async (data) => {
    let submitdata = Object.assign( {} , registerData )
    submitdata.username = data.username;
    console.log('onSubmit called', submitdata)
    signUp(submitdata)
    // moveToNext()
  }

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" className ='space-4'>Please choose your username, it can be changed later</Typography>
        <div className="space-4">
          <TextField
            type="text"
            name="username"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.username ? true : false}
            placeholder="Username or Email"
            defaultValue={''}
            className="text-field space-2"
            label='Username'
          />
          <Typography variant="body2">Username can contain underscores, alphbets, numbers only!</Typography>
        </div>

        <div className={`${classes.center} space-4`}>
          <Button
            type="submit"
            disabled={isLoading}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            <Typography className={classes.submitButtonText}>
              Register
            </Typography>
          </Button>
        </div>
      </form>
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

Step2.defaultProps = {};

export default Step2;
