import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';



const Step1 = props => {
  const [isLoading, setIsLoading] = React.useState (false);
  const {errors, handleSubmit, control} = useForm ();

  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'}>
        <Typography variant="body1" className ='space-4'>Please fill in the details to continue registration</Typography>
        <div className="space-2">
          <InputLabel>Full Name</InputLabel>
          <TextField
            type="email"
            name="email"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.email ? true : false}
            placeholder="Username or Email"
            defaultValue={''}
            className="text-field"
          />
        </div>
        <div className="space-2">
          <InputLabel>Email Address</InputLabel>
          <TextField
            type="password"
            name="password"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.password ? true : false}
            placeholder="Password"
            defaultValue={''}
            className="text-field"
          />
        </div>
        <div className="space-2">
          <InputLabel>Date of birth</InputLabel>
          <TextField
            type="date"
            name="date"
            rules={{required: 'This field is required'}}
            control={control}
            placeholder="Date"
            defaultValue={''}
            className="text-field"
          />
        </div>
        <div className="space-2">
          <InputLabel className='space-2'>Gender</InputLabel>
          <Select
            control={control}
            rules={{required: 'This field is required'}}
            margin="dense"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select>
        </div>

        <div className="space-4">
          <InputLabel className='space-2'>Country</InputLabel>
          {/* <Select
            control={control}
            rules={{required: 'This field is required'}}
            margin="dense"
            variant="outlined"
            fullWidth
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
          </Select> */}
           <CountryDropdown
           className = {classes.select}
            // value={country}
            // onChange={(val) => this.selectCountry(val)} 
            />
        </div>

        <div className={`${classes.center} space-4`}>
          <Button
            type="submit"
            disabled={isLoading}
            className={classes.submitButton}
            variant="outlined"
            color="primary"
          >
            <Typography className={classes.submitButtonText}>
              Continue
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
    select : {
        width: '100%',
        height: '40px',
        border: '1px solid #ddd',
        padding : '5px',
    }
  })
);

Step1.defaultProps = {};

export default Step1;
