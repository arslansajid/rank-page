import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';


const Success = props => {
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <div className = {classes.main}>
        <img src = {require('../../assets/icons/recover mail.png')}  className = {classes.image}/>
        <Typography variant='h6' color ="primary" className ='space-2'>
          Recovery Email Sent
        </Typography>
        <Typography variant='body2'>
        If valid, you’ll receive an email shortly from us to reset your password
        </Typography>
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
    main : {
      textAlign: 'center',
       padding : '0 6rem'
    },
    image : {
      maxHeight : '10rem'
    }


  })
);

Success.defaultProps = {};

export default Success;
