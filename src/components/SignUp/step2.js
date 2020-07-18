import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import {signUp} from './action.js'


const SignUpStep2 = props => {
  const {registerData , closeSignUp} = props;
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();
  const [value , setValue] = useState (null)

  const onSubmit = async (data) => {
    setIsLoading(true)
    registerData.country = registerData.country[0];
    let submitdata = {...registerData}
    submitdata.user_name = data.user_name;
    signUp(submitdata)
    .then((response) => {
      setIsLoading(false)
      setValue(response.data)
    })
    .catch((error) => {
      setIsLoading(false)
    })
  }

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" className ='space-4'>Please choose your username, it can be changed later</Typography>
        <div className="space-4">
          <TextField
            type="text"
            name="user_name"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.user_name ? true : false}
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
        {value && !value.success ?
        <Typography variant='body2' className = {classes.error}>
            {value.message}
        </Typography>
        :
        null
        }

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
    error : {
      color : Colors.red,
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

SignUpStep2.defaultProps = {};

export default SignUpStep2;
