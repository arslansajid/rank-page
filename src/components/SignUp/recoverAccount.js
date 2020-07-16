import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import InputLabel from '@material-ui/core/InputLabel';


const RecoverAccount = props => {
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'}>
        <Typography variant="body1" className ='space-4'>Recover your account via your email</Typography>
        <div className="space-4">
          <InputLabel className=''>Email</InputLabel>
          <TextField
            type="email"
            name="email"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.email ? true : false}
            placeholder="Enter email address"
            defaultValue={''}
            className="text-field space-2"
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

RecoverAccount.defaultProps = {};

export default RecoverAccount;
