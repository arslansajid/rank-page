import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography , Grid} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import { userLogin } from "../../actions/LoginActions";
import {signUp} from './action.js'


const SignUpStep2 = props => {
  const {registerData , closeSignUp , showCatergories} = props;
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();
  const [value , setValue] = useState (null)

  const onSubmit = async (data) => {
    setIsLoading(true)
    registerData.country = registerData.country[0];
    let submitdata = {...registerData}
    submitdata.user_name = data.user_name;
    signUp(submitdata)
    .then((res) => {
      setIsLoading(false)
      setValue(res.data)
      if(res.data && res.data.success){
        let token = res.data.data.user.auth_token;
        Cookie.set('rankpage_access_token', `${token}`, { expires: 14 })
        props.dispatch(userLogin(res.data.data.user));
        showCatergories();
      }
    })
    .catch((error) => {
      setIsLoading(false)
      setValue({message : 'Something went wrong'})
    })
  }

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'} onSubmit={handleSubmit(onSubmit)} className = {classes.main}>
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

        {/* <div className={`${classes.center} space-4`}>
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
        </div> */}
        <Grid className={classes.fixedBottom}>
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
        </Grid>
        {value && value.message ?
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
    main : {
      padding :'1.3rem 0',
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
      textAlign : 'center'
    },
    submitButtonText: {
      fontSize: '16px',
      fontWeight: 600,
      lineHeight: '19px',
      textTransform: 'capitalize',
    },
    fixedBottom: {
      background: Colors.white,
      padding: '1.3em 3em',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 'calc(100% - 6em)',
      // boxShadow: "0px -4px 3px rgba(0, 0, 0, 0.12)",
      borderTop: '1px solid rgba(38, 38, 38, 0.12)',
      textAlign : 'center',
    }
  })
);

SignUpStep2.defaultProps = {};

// export default SignUpStep2;
export default connect(null)(SignUpStep2);
