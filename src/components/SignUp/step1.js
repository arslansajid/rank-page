import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {Button, Typography} from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import {useForm} from 'react-hook-form';
import Select from '../Common/Select';
import InputLabel from '@material-ui/core/InputLabel';
import { CountryDropdown } from 'react-country-region-selector';
import CountrySelect from '../Common/CountrySelect'
import { GenderItems } from '../../static/_selectOptions';

const SignUp = props => {
  const {moveToNext} = props;
  const {getData} = props;
  const [isLoading, setIsLoading] = React.useState (false);
  const {errors, handleSubmit, control} = useForm ();
  const [country , setCountry] = useState('');
  const [passwordError , setPasswordError] = useState(null);

  const onSubmit = async (data) => {
    if(data.password === data.password_confirmation){
      moveToNext()
      getData(data)
    }
    else{
      setPasswordError(true)
    }
   
  }

  console.log(errors)


  const classes = useStyles ();
  return (
    <div className={classes.container}>
      <form key={'form'} onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="body1" className ='space-4'>Please fill in the details to continue registration</Typography>      
        <div className="space-2">
          <TextField
            type="text"
            name="name"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.name ? true : false}
            placeholder="Enter full name"
            defaultValue={''}
            label='Full Name'
            className="text-field"
          />
        </div>
        <div className="space-2">
          <TextField
            type="email"
            name="email"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.email ? true : false}
            placeholder="Enter email address"
            defaultValue={''}
            label='Email Address'
            className="text-field"
          />
        </div>
        <div className="space-2">
          <InputLabel>Date of birth</InputLabel>
          <TextField
            type="date"
            name="date_of_birth"
            rules={{required: 'This field is required'}}
            error={errors.date_of_birth ? true : false}
            control={control}
            placeholder="Date"
            defaultValue={''}
            className="text-field"
          />
        </div>
        <div className="space-2">
          <TextField
            type="password"
            name="password"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.password ? true : false}
            placeholder="password"
            defaultValue={''}
            className="text-field"
            label='Password'
          />
        </div>
        <div className="space-2">
          <TextField
            type="password"
            name="password_confirmation"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.password_confirmation ? true : false}
            placeholder="Confirm Password"
            defaultValue={''}
            className="text-field"
            label='Confirm Password'
          />
        </div>
        { passwordError ?
          <div className={classes.center}>
            <Typography variant="body2" className = {classes.error}>
              Password does not match
            </Typography>
          </div>
          :
          null
        }

        <div className="space-2">
          <InputLabel className='space-2'>Gender</InputLabel>
          <Select
            name="gender"
            rules={{required: 'This field is required'}}
            control={control}
            error={errors.gender ? true : false}
            placeholder="Select Gender"
            // label='Gender'
            items={GenderItems}
            defaultValue={''}
            className="text-field"
          />
        </div>

        <div className="space-4">
          <CountrySelect
            type="text"
            name="country"
            rules={{required: 'This field is required'}}
            error={errors.country ? true : false}
            control={control}
            placeholder="Country"
            label='Country'
            defaultValue={''}
            className="text-field"
          />
          {/* <CountryDropdown
           className = {classes.select}
           name = 'country'
          //  rules={{required: 'This field is required'}}
          //  error={errors.country ? true : false}
           value = {country}
           onChange = {(value) => setCountry(value)}
           label='Country'
            /> */}
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
    error : {
      color : Colors.red,
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

SignUp.defaultProps = {};

export default SignUp;
