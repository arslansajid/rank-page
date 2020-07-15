import React, { useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from "../Common/TextField";
import { useForm } from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Dialog from "../Common/Dialog";
import Step1 from "./step1";
import Step2 from "./step2";


const SignUp = (props) => {
    const [showStep1, setShowStep1] = useState(true);


    return (
          <Dialog
            title={"Register"}
            open={showStep1}
            message={<Step1 />}
            // applyForm={() => setShowSignIn(false)}
            // cancelForm={() => setShowSignIn(false)}
            hideActions={true}
          />
    )
};

SignUp.defaultProps = {};

export default SignUp;
