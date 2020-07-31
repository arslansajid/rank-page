import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';
import {forgotPassword} from './action'


const RecoverAccount = props => {
  const {showSuccess} = props;
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();
  const [value , setValue] = useState(null);

  
  const onSubmit = async (data) => {
    setIsLoading(true);
    forgotPassword(data)
    .then((response) => {
      setIsLoading(false);
      setValue(response.data)
      if(response.data && response.data.success){
        showSuccess()
      }
    }) 
    .catch((error) =>{
      setIsLoading(false);
      console.log('error' , error)
    })
  }

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" className ='space-4'>Recover your account via your email</Typography>
        <div className="space-4">
          <TextField
            type="email"
            name="email"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.email ? true : false}
            placeholder="Enter email address"
            defaultValue={''}
            className="text-field space-2"
            label='Email'
          />
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
              Recover
            </Typography>
          </Button>
        </div>
      </form>
      {value && !value.success ? 
        <div className = {classes.center}>
        <Typography className={classes.submitButtonText}>
          {value.message}
        </Typography>
        </div>
          :
        null}
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
      width: '100%',
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

RecoverAccount.defaultProps = {};

export default RecoverAccount;
