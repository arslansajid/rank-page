import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from "../Common/TextField";
import { useForm } from 'react-hook-form';

const SignIn = (props) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const { errors, handleSubmit, control } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        console.log(data)
    }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    type='email'
                    name='email'
                    rules={{ required: 'This field is required' }}
                    control={control}
                    error={errors.email ? true : false}
                    // helperText={errors.email?.message}
                    label='Email'
                    defaultValue={''}
                    className='text-field'
                />
                <TextField
                    type='password'
                    name='password'
                    rules={{ required: 'This field is required' }}
                    control={control}
                    error={errors.password ? true : false}
                    // helperText={errors.password?.message}
                    label='Password'
                    defaultValue={''}
                    className='text-field'
                />
                <Button type="submit" disabled={isLoading} className={classes.submitButton} variant="contained" color="primary">
                    <Typography className={classes.submitButtonText}>
                        Sign In
                    </Typography>
                </Button>
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
            alignItems: "center",
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
        },
        submitButtonText: {
            fontSize: "16px",
            fontWeight: 600,
            lineHeight: "19px",
            textTransform: "capitalize",
        }
    })
);

SignIn.defaultProps = {};

export default SignIn;
