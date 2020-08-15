import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import Colors from '../../static/_colors';
import TextField from '../Common/TextField';
import { useForm } from 'react-hook-form';
import Select from '../Common/Select';
import InputLabel from '@material-ui/core/InputLabel';
import CountrySelect from '../Common/CountrySelect'
import StateSelect from '../Common/StateSelect';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { GenderItems } from '../../static/_selectOptions';
import ReactFlagsSelect from 'react-flags-select';
import 'react-flags-select/scss/react-flags-select.scss';
const SignUp = props => {
  const { moveToNext, values } = props;
  const { getData } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const { errors, handleSubmit, control } = useForm();
  const [passwordError, setPasswordError] = useState(null);
  const [message, setMessage] = useState('')
  const [userData, setUserData] = useState(values ? values : null);
  const [country, setCountry] = useState(userData && userData.country ? userData.country : '');
  const [region, setRegion] = useState(userData && userData.region ? userData.region : '');
  const [dateError, setDateError] = useState(null);

  const ageValidation = (data) => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const date1 = new Date(data.date_of_birth);
    const date2 = new Date(date);
    const diffTime = Math.abs(date2 - date1);
    const diffYears = (Math.ceil(diffTime / (1000 * 60 * 60 * 24))) / 365;
    if (diffYears < 16) {
      return false;
    }
    else return true;
  }

  const onSubmit = async (data) => {
    if (data.password === data.password_confirmation && data.password.length >= 6 && ageValidation(data)) {
      data.country = country;
      data.region = region;
      setPasswordError(false)
      setDateError(null)
      setUserData(data)
      moveToNext()
      getData(data)
    }
    else if (data.password !== data.password_confirmation) {
      setPasswordError(true)
      setMessage('Password does not match')
    }
    else if (data.password.length < 6) {
      setPasswordError(true)
      setMessage('Password should be greater than 6 characters')
    }
    else if (!ageValidation(data)) {
      if (data.password !== data.password_confirmation) {
        setPasswordError(false)
      }
      setDateError('Only 16+ are allowed')

    }

  }

  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <form id={'signup-form'} key={'form'} onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="body1" className='space-4'>Please fill in the details to continue registration</Typography>
          <div className="space-2">
            <InputLabel className='black'>Name*</InputLabel>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  name="first_name"
                  rules={{ required: 'This field is required' }}
                  control={control}
                  error={errors.first_name ? true : false}
                  placeholder="First Name"
                  defaultValue={userData && userData.first_name ? userData.first_name : ''}
                  className="text-field"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  type="text"
                  name="last_name"
                  rules={{ required: 'This field is required' }}
                  control={control}
                  error={errors.last_name ? true : false}
                  placeholder="Last Name"
                  defaultValue={userData && userData.last_name ? userData.last_name : ''}
                  className="text-field"
                />
              </Grid>
             </Grid> 


          </div>
          <div className="space-2">
            <TextField
              type="email"
              name="email"
              rules={{ required: 'This field is required' }}
              control={control}
              error={errors.email ? true : false}
              placeholder="Enter email address"
              defaultValue={userData && userData.email ? userData.email : ''}
              label='Email Address*'
              className="text-field"
              // required = {true}
            />
          </div>
          <div className="space-2">
            <InputLabel className = 'black'>Age*</InputLabel>
            <TextField
              type="date"
              name="date_of_birth"
              rules={{ required: 'This field is required' }}
              error={errors.date_of_birth ? true : false}
              control={control}
              placeholder="Age"
              // defaultValue={''}
              defaultValue={userData && userData.date_of_birth ? userData.date_of_birth : ''}
              className="text-field"
              // required = {true}
            />
          </div>
          {dateError ?
            <div className={classes.center}>
              <Typography variant="body2" className={classes.error}>
                {dateError}
              </Typography>
            </div>
            :
            null
          }
          <div className="space-2">
            <TextField
              type="password"
              name="password"
              rules={{ required: 'This field is required' }}
              control={control}
              error={errors.password ? true : false}
              placeholder="password"
              // defaultValue={''}
              defaultValue={userData && userData.password ? userData.password : ''}
              className="text-field"
              label='Password*'
              required = {true}
              // onChange = {() => console.log('password change called')}
            />
          </div>
          <div className="space-2">
            <TextField
              type="password"
              name="password_confirmation"
              rules={{ required: 'This field is required' }}
              control={control}
              error={errors.password_confirmation ? true : false}
              placeholder="Confirm Password"
              // defaultValue={''}
              defaultValue={userData && userData.password_confirmation ? userData.password_confirmation : ''}
              className="text-field"
              label='Confirm Password*'
              // required = {true}
            />
          </div>
          {passwordError ?
            <div className={classes.center}>
              <Typography variant="body2" className={classes.error}>
                {message}
              </Typography>
            </div>
            :
            null
          }

          <div className="space-2">
            <Select
              name="gender"
              // rules={{ required: 'This field is required' }}
              control={control}
              // error={errors.gender ? true : false}
              placeholder="Select Gender"
              label='Gender'
              items={GenderItems}
              defaultValue={userData && userData.gender ? userData.gender : ''}
              className="text-field"
              // required = {true}
            />
          </div>

          {/* <div className="space-4">
          <CountrySelect
            type="text"
            name="country"
            rules={{required: 'This field is required'}}
            error={errors.country ? true : false}
            control={control}
            placeholder="Country"
            label='Country'
            getCountry = {console.log('country here , ' , country)}
            // handleChange = {(value) => setCountry(value)}
            // defaultValue={''}
            defaultValue={userData && userData.country ? userData.country : ''}
            className="text-field"
          />
        </div> */}

          <div className="space-4">

            {/* <ReactFlagsSelect 
          onSelect={(label) => console.log(label)}
          showSelectedLabel={true}
          showOptionLabel={true}
          // selectedSize={18}
          selectLabel = {(label) => console.log(label)}
          className="menu-flags" /> */}

            <InputLabel className='space-2 black'>Country</InputLabel>
            <CountryDropdown
              className={classes.selectBox}
              value={country}
              placeholder="Select Country"
              onChange={(country) => setCountry(country)} />
              {/* onChange={(country) => console.log('country here' , country)} /> */}
          </div>

          {!!country && (
            <div className="space-4">
              <InputLabel className='space-2 black'>State</InputLabel>
              <RegionDropdown
                className={classes.selectBox}
                country={country}
                value={region}
                placeholder="Select Region"
                onChange={(region) => setRegion(region)} />
            </div>
          )}



          {/* <div className="space-4">
          <StateSelect
            type="text"
            name="state"
            rules={{required: 'This field is required'}}
            error={errors.state ? true : false}
            control={control}
            placeholder="State"
            label='State'
            region = {region}
            handleChange = {(value) => setRegion(value)}
            country = {country}
            // defaultValue={''}
            defaultValue={''}
            className="text-field"
          />
        </div> */}
        </form>
      </div>
      <Grid className={classes.fixedBottom}>
        <Button
          form={'signup-form'}
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
      </Grid>
    </>
  );
};

const useStyles = makeStyles(theme =>
  createStyles({
    container: {
      padding : '3rem 0',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      width: '100%',
      marginBottom: 50
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
      width: '100%'
    },
    center: {
      textAlign: 'center'
    },
    error: {
      color: Colors.red,
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
    select: {
      width: '100%',
      height: '40px',
      border: '1px solid #ddd',
      padding: '5px',
    },
    fixedBottom: {
      background: Colors.white,
      padding: '1.3em 3em',
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 'calc(100% - 6em)',
      boxShadow: "0px -4px 3px rgba(0, 0, 0, 0.08)",
      borderTop: '1px solid rgba(38, 38, 38, 0.12)',
    }
    ,
    selectBox: {
      width: '100%',
      border: '1px solid #ddd',
      border: '1px solid rgba(0, 0, 0, 0.23)',
      height: '42px',
      padding: '10px',
      borderRadius: '5px',
      '-webkit-appearance': 'none'
    },
  })
);

SignUp.defaultProps = {};

export default SignUp;
