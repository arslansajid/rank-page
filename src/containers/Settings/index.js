
import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { Button, Typography} from '@material-ui/core';
import {TextField as TextFieldMaterial} from '@material-ui/core';
import Colors from '../../static/_colors';
import { useForm } from 'react-hook-form';
import TextField from "../../components/Common/TextField";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from "../../components/Common/Dialog"
import ConformationDialog from './confirmation'
import {UpdateProfile , UpdatePassword , EmailActivity , AccountPrivacy , AccountStatus} from './actions'
import {translateAccountPrivacy , translateAccountFollowingPrivacy} from '../../helper'

const Settings = (props) => {
	const [ name, setName] = useState('')
	const [ email , setEmail] = useState('')
	const [isLoading, setIsLoading] = React.useState(false);
	const { errors, handleSubmit, control } = useForm();
	const [activeTabEmailActivity, setActiveTabEmailActivity] = useState(1);
	const [activeTabAccountPrivacy, setActiveTabAccountPrivacy] = useState(1);
	const [activeTabFollowingPrivacy, setActiveTabFollowingPrivacy] = useState(1);
	const [disable, setDisable] = useState(false);
	const [showConfirmationDiallog, setShowConfirmationDiallog] = useState(false)
	const [ isLoadingName, setIsLoadingName] = useState(false);
	const [ isLoadingEmail, setIsLoadingEmail] = useState(false);
	const [ isLoadingAccountPrivacy, setIsLoadingAccountPrivacy] = useState(false);
	const [ isLoadingFollowingPrivacy, setIsLoadingFollowingPrivacy] = useState(false);
	const [ isLoadingEmailActivity, setIsLoadingEmailActivity] = useState(false);
	const [ isLoadingPassword, setIsLoadingPassword] = useState(false);
	const [messageName , setMessageName] = useState('');
	const [messageEmail , setMessageEmail] = useState('');
	const [messageEmailActivity , setMessageEmailActivity] = useState('');
	const [messageAccountPrivacy , setMessageAccountPrivacy] = useState('');
	const [messageFollowingPrivacy , setMessageFollowingPrivacy] = useState('');
	const [ passwordMessage , setPasswordMessage] = useState('');

	useEffect(() => {
		//re-rendering when the user data changes
		if(!!props.user) {
			setName(props.user.name);
			setEmail(props.user.email);
			setActiveTabEmailActivity(props.user.email_availability === true ? 1 : 2)
			setActiveTabAccountPrivacy(translateAccountPrivacy(props.user.account_visibility));
			setIsLoadingFollowingPrivacy(translateAccountFollowingPrivacy(props.user.following_visibility))
			setDisable(props.user.account_status === 'enable' ? true : false)
		}
	}, [props.user])
	

	const classes = useStyles();

	const onSubmit = data => {
		if(data.new_password === data.confirm_password){
			if(data.new_password.length < 7){
				setPasswordMessage('Password should be greater than 6 characters')
			}
			else{
			setIsLoadingPassword(true);
			UpdatePassword(data)
			.then((res) =>{
				setIsLoadingPassword(false);
				setPasswordMessage(res.data.message)
				console.log('response here' , res.data)
			})
			.catch((error) =>{
				setIsLoadingPassword(false);
				console.log('error' , error)
				// setPasswordMessage(error.data.message)
			})
		}
		}
		else {
			setPasswordMessage('New passwords does not match')
		}


	}

	const updateName = () => {
		setIsLoadingName(true);
		let user = {};
		user.name = name;
		UpdateProfile(user)
		.then((res) => {
			setIsLoadingName(false);
				setMessageName(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingName(false);
			console.log(err)
		})
	}

	const updateEmail = () => {
		setIsLoadingEmail(true);
		let user = {};
		user.email = email;
		UpdateProfile(user)
		.then((res) => {
			setIsLoadingEmail(false);
				setMessageEmail(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingEmail(false);
			console.log(err)
		})
	}

	const updateEmailActivity = () => {
		setIsLoadingEmail(true);
		let user = {};
		user.email_availability = activeTabEmailActivity;
		EmailActivity(user)
		.then((res) => {
			setIsLoadingEmailActivity(false);
				setMessageEmailActivity(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingEmailActivity(false);
			console.log(err)
		})
	}

	const updateAccountPrivacy = () => {
		setIsLoadingAccountPrivacy(true);
		let user = {};
		user.account_visibility = activeTabAccountPrivacy;
		AccountPrivacy(user)
		.then((res) => {
			setIsLoadingAccountPrivacy(false);
				setMessageAccountPrivacy(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingAccountPrivacy(false);
			console.log(err)
		})
	}

	const updateFollowingPrivacy = () => {
		setIsLoadingFollowingPrivacy(true);
		let user = {};
		user.following_visibility = activeTabFollowingPrivacy
		AccountPrivacy(user)
		.then((res) => {
			setIsLoadingFollowingPrivacy(false);
			setMessageFollowingPrivacy(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingFollowingPrivacy(false);
			// console.log(err.data , 'updateFollowingPrivacy')

			setMessageFollowingPrivacy('We re sorry, but something went wrong')
		})
	}

	const updateAccountStatus = () => {
		let user = {};
		user.account_status = disable ? 2 : 1;
		AccountStatus(user)
		.then((res) => {
			if(res.data.success){
				setDisable(!disable); 
			}
		})
		.catch((err) => { 
			console.log(err)
		})
	}

	if (!!props.user) {
		return (
			<div className={classes.pageContainer}>
				<div className={classes.main}>
						<div className='space-4'>
							<InputLabel className={`${classes.heading}`}>Username</InputLabel>
							<TextFieldMaterial
								className={`${classes.greyInput}`}
								id='user-name'
								type='text'
								name='user_name'
								margin='dense'
								variant='outlined'
								fullWidth
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
						</div>
						<div className='space-4'>
							<Button disabled={isLoadingName} className={classes.submitButton} variant="outlined" color="primary" onClick={updateName}>
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
						</div>
						{messageName && <Typography className={classes.message}>{messageName}</Typography>}
				</div>

				<div className={classes.main}>
					<form  key = {'form'} onSubmit={handleSubmit(onSubmit)}>
						<div className='space-1'>
							<InputLabel className={`${classes.heading}`}>Password</InputLabel>
							<TextField
								id='new_password'
								type='password'
								name='old_password'
								margin='dense'
								variant='outlined'
								fullWidth
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.old_password ? true : false}
								placeholder='Old password'
								defaultValue={''}
								className='text-field'
							/>
						</div>
						<div className='space-1'>
							<TextField
								id='new_password'
								type='password'
								name='new_password'
								margin='dense'
								variant='outlined'
								fullWidth
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.new_password ? true : false}
								placeholder='New password'
								defaultValue={''}
								className='text-field'
							/>
						</div>
						<div className='space-4'>
							<TextField
								id='confirm_passwrod'
								type='password'
								name='confirm_password'
								margin='dense'
								variant='outlined'
								fullWidth
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.confirm_password ? true : false}
								placeholder='Confirm new password'
								defaultValue={''}
								className='text-field'
							/>
						</div>
						<div className='space-4'>
							<Button  type="submit" disabled={isLoadingPassword} className={classes.submitButton} variant="outlined" color="primary">
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
						</div>
						{passwordMessage && <Typography className={classes.message}>{passwordMessage}</Typography>}
					</form>
				</div>

				<div className={classes.main}>
						<InputLabel className={`${classes.heading}`}>Email Address</InputLabel>
						<div className='space-4'>
							<TextFieldMaterial
								id='user-email'
								type='email'
								name='email'
								margin='dense'
								variant='outlined'
								fullWidth
								placeholder='Enter your email'
								value = {email}
								className='text-field'
								onChange={(e)=>setEmail(e.target.value)}
							/>
						</div>
						<div className='space-4'>
							<Button  disabled={isLoadingEmail} className={classes.submitButton} variant="outlined" color="primary" onClick={updateEmail}>
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
						</div>
						{messageEmail && <Typography className={classes.message}>{messageEmail}</Typography>}
				</div>


				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Email Activity</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Recieve activity emails
					</Typography>

					<div className='space-4'>
						<Button className={activeTabEmailActivity === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabEmailActivity(1) ; setMessageEmailActivity('')}}>
							<Typography>
								yes
							</Typography>
						</Button>
						<Button className={activeTabEmailActivity === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabEmailActivity(2) ; setMessageEmailActivity('')}}>
							<Typography>
								no
							</Typography>
						</Button>
					</div>

					<div className='space-4'>
							<Button  disabled={isLoadingEmailActivity} className={classes.submitButton} variant="outlined" color="primary" onClick= {updateEmailActivity}>
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
					</div>
					{messageEmailActivity && <Typography className={classes.message}>{messageEmailActivity}</Typography>}
				</div>

				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Account Privacy</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Set your profile’s visbility
					</Typography>

					<div className='space-4'>
						<Button className={activeTabAccountPrivacy === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabAccountPrivacy(1) ; setMessageAccountPrivacy('') }}>
							<Typography>
								Public
							</Typography>
						</Button>
						<Button className={activeTabAccountPrivacy === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabAccountPrivacy(2) ; setMessageAccountPrivacy('') }}>
							<Typography>
								Private
							</Typography>
						</Button>
						<Button className={activeTabAccountPrivacy === 3 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabAccountPrivacy(3) ; setMessageAccountPrivacy('') }}>
							<Typography>
								Hidden
							</Typography>
						</Button>
					</div>

					<div className='space-4'>
							<Button  disabled={isLoadingAccountPrivacy} className={classes.submitButton} variant="outlined" color="primary" onClick = {updateAccountPrivacy}>
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
					</div>

				</div>

				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Following Privacy</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Set your following visbility
					</Typography>

					<div className='space-4'>
						<Button className={activeTabFollowingPrivacy === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabFollowingPrivacy(1) ; setMessageFollowingPrivacy('')}}>
							<Typography>
								Public
							</Typography>
						</Button>
						<Button className={activeTabFollowingPrivacy === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabFollowingPrivacy(2) ; setMessageFollowingPrivacy('')}}>
							<Typography>
								Mutual
							</Typography>
						</Button>
						<Button className={activeTabFollowingPrivacy === 3 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabFollowingPrivacy(3) ; setMessageFollowingPrivacy('')}}>
							<Typography>
								Hidden
							</Typography>
						</Button>
					</div>
					<div className='space-4'>
							<Button  disabled={isLoadingFollowingPrivacy} className={classes.submitButton} variant="outlined" color="primary" onClick={updateFollowingPrivacy}>
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
					</div>
				</div>

				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Disable Account</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Disballing your account will hide your profile from public, and you can’t use rankpage untill you enable it
					</Typography>

					<span className='space-4'>
						<Button className={disable ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setShowConfirmationDiallog(true) }}>
							<Typography>
								{disable  ? 'Disable' : 'Enable'}
							</Typography>
						</Button>
					</span>
				</div>

				{showConfirmationDiallog &&
					<Dialog
						title={"Confirmation"}
						open={showConfirmationDiallog}
						message={<ConformationDialog
							status = {disable}
							onConfirm = {() => {updateAccountStatus()}}
							cancelForm={() => setShowConfirmationDiallog(false)} />}
						applyForm={() => setShowConfirmationDiallog(false)}
						hideActions={true}
						cancelForm={() => setShowConfirmationDiallog(false)}
					/>}
			</div>
		);
	} else {
		return <Typography variant="h5">You need to sign in to view this page!</Typography>
	}
}

const useStyles = makeStyles((theme) =>
	createStyles({
		pageContainer: {
			marginBottom: 20,
	
			[theme.breakpoints.down('sm')]: {
				marginBottom: 70,
			},
		},
		container: {
			display: "flex",
			flexDirection: "column",
			justifyContent: "center",
			width: "100%",
		},
		main: {
			background: Colors.white,
			border: '1px solid rgba(38, 38, 38, 0.12)',
			boxSizing: 'border-box',
			borderRadius: 8,
			padding: '2rem',
			marginBottom: 5,
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
		choiceButton: {
			minWidth: "20px",
			height: "40px",
			background: Colors.inputBg,
			marginRight: 10,
			color: Colors.black,
			boxShadow: 'none',
			border: '1px solid rgba(38, 38, 38, 0.12)',
		},
		choiceButtonActive: {
			minWidth: "20px",
			height: "40px",
			background: Colors.brandColor,
			marginRight: 10,
			color: Colors.white,
			border: '1px solid rgba(38, 38, 38, 0.12)',
			"&:hover": {
				background: Colors.brandColor,
			}
		},
		error: {
			color: Colors.red,
		},
		heading: {
			fontWeight: 'normal',
			fontSize: '1rem',
			lineHeight: '1.2rem',
			color: Colors.black,

		},
		greyInput: {
			borderRadius: 8,
			background: Colors.inputBg,
		},
		message : {
			textAlign: 'center',
			// marginTop : 10,
		},
		errorMessage : {
			textAlign: 'center',
			color : Colors.red,
			// marginTop : 10,
		},
	})
);


function mapStateToProps(state) {
	return {
			user: state.user,
	};
}

export default connect(mapStateToProps)(Settings);