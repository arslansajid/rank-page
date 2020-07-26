import React, { useState } from 'react';
import axios from "axios";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from "../Common/TextField";
import { useForm } from 'react-hook-form';
import { signIn } from "./action";
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import { userLogin } from "../../actions/LoginActions";

const SignIn = (props) => {
    const {showSignUp , showRecoveryModal, closeSignIn} = props;
    const [isLoading, setIsLoading] = React.useState(false);
    const { errors, handleSubmit, control } = useForm();
    const [value , setValue] = useState(null)

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data)

        signIn(data)
            .then((res) => {
                console.log("res ###", res.data.data.user.auth_token)
                let token = res.data.data.user.auth_token;
                axios.defaults.headers.common['Authorization'] = `${token}`;
                Cookie.set('rankpage_access_token', `${token}`, { expires: 14 })
                props.dispatch(userLogin(res.data.data.user));
                setIsLoading(false);
                closeSignIn();
            })
            .catch((err) => {
                console.log("err ###", err)
                setIsLoading(false);
                setValue(err)
            })
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
                <div className='space-2'>
                    <TextField
                        id='user-email'
                        type='email'
                        name='email'
                        rules={{ required: 'This field is required' }}
                        control={control}
                        error={errors.email ? true : false}
                        // helperText={errors.email?.message}
                        // label='Email'
                        placeholder='Username or Email'
                        defaultValue={''}
                        className='text-field'
                    />
                </div>
                <div className='space-2'>
                    <TextField
                        id='user-password'
                        type='password'
                        name='password'
                        rules={{ required: 'This field is required' }}
                        control={control}
                        error={errors.password ? true : false}
                        // helperText={errors.password?.message}
                        // label='Password'
                        placeholder='Password'
                        defaultValue={''}
                        className='text-field'
                    />
                </div>
                <div className='space-4'>
                    <Button type="submit" disabled={isLoading} className={classes.submitButton} variant="contained" color="primary">
                        <Typography className={classes.submitButtonText}>
                            Sign In
                        </Typography>
                    </Button>
                </div>
                {value && value.data && value.data.error && value.data.error.user_authentication ? 
                    <div className={`${classes.center} space-2`}>
                        <Typography variant = 'body2' className = {classes.error}>
                            {value.data.error.user_authentication}
                        </Typography>
                    </div>
                    :
                    null
                }

                <div className={`${classes.center} space-2`}>
                    <Typography className={classes.registerText}>
                        Don't have an account!
                </Typography>
                </div>
                <div className={`${classes.center} space-4`}>
                    <Button onClick={showSignUp} variant="outlined" color="primary" className={classes.submitButton}>
                        <Typography className={classes.submitButtonText}>
                            Register
                    </Typography>
                    </Button>
                </div>
                <div className={`${classes.center} space-2`}>
                <Button onClick={showRecoveryModal} className={classes.fixedBottom}>
                    <Typography className={classes.recoveryText}>
                        Unable to Sign In?
                    </Typography>
                </Button>
                </div>
            </form>
        </div>
    )
};

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
        },
        heading: {
            alignSelf: "left",
            fontSize: "30px",
            fontWeight: 600,
            marginBottom: "45px"
        },
        submitButton: {
            minWidth: "100px",
            height: "40px",
            background: Colors.themeBlue,
            width: '100%',
        },
        submitButtonText: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            textTransform: "capitalize",
        },
        recoveryButton : {
            fontSize: "16px",
            fontWeight: 600,
            color : Colors.lighterText,
            "&:hover": {
                backgroundColor: 'none',
                background : 'none',
            }
        },
        recoveryText : {
            fontSize: "16px",
            fontWeight: 600,
            "&:hover": {
                color : Colors.brandColor,
            }
        },
        center: {
            textAlign: "center",
        },
        registerText: {
            textAlign: "center",
            fontWeight: '600',
        },
        error : {
            color : Colors.red,
        },
        fixedBottom: {
            background: Colors.white,
            padding: '1.3em 3em',
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            fontSize: "16px",
            fontWeight: 600,
            color : Colors.lighterText,
            "&:hover": {
                backgroundColor: 'none',
                background : 'none',
            }
          }
    })
);

SignIn.defaultProps = {};

export default connect(null)(SignIn);
