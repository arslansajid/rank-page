import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from "../Common/TextField";
import { useForm } from 'react-hook-form';
import { signIn } from "./action";

const SignIn = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const { errors, handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data)
        
        signIn(data)
        .then((res) => {
            console.log("res ###", res)
            setIsLoading(false);
        })
        .catch((err) => {
            console.log("err ###", err)
            setIsLoading(false);
        })
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
                <div className= 'space-2'>
                    <TextField
                        type='email'
                        name='email'
                        rules={{ required: 'This field is required' }}
                        control={control}
                        error={errors.email ? true : false}
                        // helperText={errors.email?.message}
                        // label='Email'
                        placeholder = 'Username or Email'
                        defaultValue={''}
                        className= 'text-field'
                    />
                </div>
                <div className= 'space-2'>
                    <TextField
                        type='password'
                        name='password'
                        rules={{ required: 'This field is required' }}
                        control={control}
                        error={errors.password ? true : false}
                        // helperText={errors.password?.message}
                        // label='Password'
                        placeholder = 'Password'
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

                <Typography className={classes.registerText}>
                        Unable to Sign In?
                </Typography>

                <Typography className={classes.registerText}>
                        Register
                </Typography>
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
            // alignItems: "center",
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
            width : '100%',
        },
        submitButtonText: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            textTransform: "capitalize",
        },
        registerText : {
            textAlign: "center",
            fontWeight : '600',
            color : '#333',
        }
    })
);

SignIn.defaultProps = {};

export default SignIn;
