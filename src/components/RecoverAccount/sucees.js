import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
// import CodeNumberInput from './codeNumber'


const Success = props => {
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <div className = {`${classes.main} space-4`}>
        <img src = {require('../../assets/icons/recover mail.png')}  className = {classes.image}/>
        <Typography variant='h6' color ="primary" className = 'largeFont'>
          Verfication Code Sent to Email
        </Typography>
        <Typography variant='body2'>
          If valid, you’ll receive an email with an verfication code
        </Typography>
       </div>

          <div className = {`${classes.inputMain} space-4`}>
            <input type="text" className = {classes.input} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" className = {classes.input} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" className = {classes.input} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" className = {classes.input} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
            <input type="text" className = {classes.input} maxLength="1" size="1" min="0" max="9" pattern="[0-9]{1}" />
          </div>
          {/* <CodeNumberInput/> */}
          <div className = 'space-4'>
          <Button
            type="submit"
            disabled={isLoading}
            className={classes.submitButton}
            variant="contained"
            color="primary"
          >
            <Typography className={classes.submitButtonText}>
              Verfiy
            </Typography>
          </Button>
          </div>

          <div className = 'space-4'>
          <Button
            type="submit"
            disabled={isLoading}
            className={classes.submitButton}
            variant="outlined"
            color="primary"
          >
            <Typography className={classes.submitButtonText}>
              Resend Code
            </Typography>
          </Button>
          </div>
          
    </div>
  );
};

const useStyles = makeStyles (theme =>
  createStyles ({
    container: {
      padding : '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
    },
    main : {
      textAlign: 'center',
       padding : '0 7rem'
    },
    image : {
      height : '6rem'
    },
    inputMain : {
      textAlign : 'center',

    },
    input : {
      background: Colors.inputBg,
      border: '1px solid rgba(38, 38, 38, 0.12)',
      marginRight : 5,
      height : '44px',
      width : '44px',
      borderRadius : 8,
      textAlign : 'center',

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



  })
);

Success.defaultProps = {};

export default Success;
