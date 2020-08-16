import React, {useState , useEffect} from 'react';
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
  const {registerData , closeSignUp , showCatergories , openLogin} = props;
  const [isLoading, setIsLoading] = useState (false);
  const {errors, handleSubmit, control} = useForm ();
  const [value , setValue] = useState (null);
  const [showError, setShowError] = useState (null)
  // const [user , setUser] = useState (props.user ? props.user : null);

  // useEffect(() => {
  //   if(props.user){
  //     setUser(props.user)
  //   }
  // }, [props.user])



  const validate = (data) => {
    let regex = /^[a-zA-Z0-9_]*$/
    if(data.match(regex)){
      // console.log('sending true')
      return true
    }
    else {
      return false
    }
  }
  const onSubmit = async (data) => {
    if(data.user_name && data.user_name.length > 4 && validate(data.user_name) == true){
      setShowError(false)
      setIsLoading(true)
      // registerData.country = registerData.country[0];
      let submitdata = {...registerData}
      submitdata.name = submitdata.first_name + " " + submitdata.last_name;
      submitdata.user_name = data.user_name;
      signUp(submitdata)
      .then((res) => {
        setIsLoading(false)
        setValue(res.data)
        if(res.data && res.data.success){
          let token = res.data.data.user.auth_token;
          Cookie.set('rankpage_access_token', `${token}`, { expires: 14 })
          props.dispatch(userLogin(res.data.data.user))
          // if(user){
          //   showCatergories();
          // }
          // // .then(()=>{
          // //   showCatergories();
          // // })
          showCatergories();
        }
        else if(res.data && !res.data.success && res.data.message === 'Email has already been taken'){
          openLogin()
        }
      })
      .catch((error) => {
        setIsLoading(false)
        setValue({message : 'Something went wrong'})
      })
    }
    else if(data.user_name && data.user_name.length < 7){
      setShowError('Username should be at least 6 characters')
    }

    else if(validate(data.user_name) == false){
      setShowError('Username can contain underscores, alphbets, numbers only!')
    }

  }

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'} onSubmit={handleSubmit(onSubmit)} className = {classes.main}>
        <Typography variant="body1" className ='space-4'>Please choose your username, it can be changed later</Typography>
        <div className="space-4">
          <InputLabel className={`${classes.title} space-2`}>Username*</InputLabel>
          <TextField
            type="text"
            name="user_name"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.user_name ? true : false}
            placeholder="Username"
            defaultValue={''}
            className="text-field space-2"
            // label='Username'
            required = {true}
          />
          <Typography variant="body2" className='smallFont'>Username can contain underscores, alphbets, numbers only!</Typography>
        </div>

        { showError ?
          <div className={classes.center}>
            <Typography variant="body2" className = {classes.error}>
              {showError}
            </Typography>
          </div>
          :
          null
        }

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
      padding : '3rem 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
    },
    main : {
      padding :'0 0 3rem 0',
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
    ,
    title : {
      color: Colors.black,
    },
    asteric : {
      color: Colors.red,
      marginLeft : 5,
  },
  })
);

SignUpStep2.defaultProps = {};

// export default connect(null)(SignUpStep2);

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}


export default connect(mapStateToProps)(SignUpStep2);
