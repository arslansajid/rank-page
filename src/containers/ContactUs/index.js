import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from "../../../src/components/Common/TextField";
import { useForm } from 'react-hook-form';
// import { signIn } from "../../../action";
import Cookie from 'js-cookie';
import { connect } from 'react-redux';
import { userLogin } from "../../actions/LoginActions";

const SignIn = (props) => {
    // const {showSignUp , showRecoveryModal, closeSignIn} = props;
    // const [isLoading, setIsLoading] = React.useState(false);
    // const { errors, handleSubmit, control } = useForm();
    // const [value , setValue] = useState(null)

    // const onSubmit = (data) => {
    //   console.log('data here' , data)
    // }

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h2 style = {{ fontWeight : 'normal'}}>Contact us at</h2>
            <a href="mailto:email@email.com">
                email@email.com
            </a>
        </div>


            // {/* <form key={'form'} onSubmit={handleSubmit(onSubmit)}>

            //       <div className='space-2'>
            //         <TextField
            //             id='name'
            //             name='name'
            //             rules={{ required: 'This field is required' }}
            //             control={control}
            //             error={errors.name ? true : false}
            //             placeholder='Name'
            //             defaultValue={''}
            //             className='text-field'
            //         />
            //     </div>
            //     <div className='space-2'>
            //         <TextField
            //             id='email'
            //             type='email'
            //             name='email'
            //             rules={{ required: 'This field is required' }}
            //             control={control}
            //             error={errors.email ? true : false}
            //             placeholder='Email'
            //             defaultValue={''}
            //             className='text-field'
            //         />
            //     </div>

            //     <div className='space-4'>
            //         <TextField
            //             name='message'
            //             rules={{ required: 'This field is required' }}
            //             control={control}
            //             error={errors.message ? true : false}
            //             placeholder='Message'
            //             defaultValue={''}
            //             className='text-field'
            //             rows={3}
            //             multiline={true}
            //         />
            //     </div>
            //     <div className='space-4'>
            //         <Button type="submit" disabled={isLoading} className={classes.submitButton} variant="contained" color="primary">
            //             <Typography className={classes.submitButtonText}>
            //                 Submit
            //             </Typography>
            //         </Button>
            //     </div>

            // </form> */}

    )
};

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            padding : '3rem 0',
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
