
import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux'
import { Button, Typography , TextField} from '@material-ui/core';
import Colors from '../../static/_colors';
import { useForm } from 'react-hook-form';
// import TextField from "../../components/Common/TextField";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import Dialog from "../../components/Common/Dialog"
import ConformationDialog from './confirmation'
import {UpdateProfile} from './actions'

const Settings = (props) => {
	// const [user , setUser] = useState(props.user ? props.user : null);
	const [ name, setName] = useState('')
	const [ email , setEmail] = useState('')
	const [isLoading, setIsLoading] = React.useState(false);
	const { errors, handleSubmit, control } = useForm();
	const [activeTab, setActiveTab] = useState(1);
	const [activeTabAccountPrivacy, setActiveTabAccountPrivacy] = useState(1);
	const [activeTabFollowingPrivacy, setActiveTabFollowingPrivacy] = useState(1);
	const [activeDisable, setActiveDisable] = useState(false);
	const [showConfirmationDiallog, setShowConfirmationDiallog] = useState(false)
	const [ isLoadingName, setIsLoadingName] = useState(false);
	const [ isLoadingEmail, setIsLoadingEmail] = useState(false);
	const [messageName , setMessageName] = useState('');
	const [messageEmail , setMessageEmail] = useState('');

	// console.log('username here' , userName)
	const onSubmit = data => {
		setIsLoading(true);
	}
	useEffect(() => {
		//re-rendering when the user data changes
		if(!!props.user) {
			setName(props.user.name);
			setEmail(props.user.email);
			console.log('user here in useEffect' , props.user)
		}
	}, [props.user])
	

	const classes = useStyles();

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

	if (!!props.user) {
		return (
			<div className={classes.pageContainer}>
				<div className={classes.main}>
					<form form={'user_name'} onSubmit={handleSubmit(onSubmit)}>
						<div className='space-4'>
							<InputLabel className={`${classes.heading}`}>Username</InputLabel>
							{/* <TextField
								id='user-name'
								type='text'
								name='user_name'
								className={`${classes.greyInput} space-4`}
								// rules={{ required: 'This field is required' }}
								// control={control}
								// error={errors.user_name ? true : false}
								placeholder='Username'
								// defaultValue={!!props.user ? props.user.name : ''}
								value = {userName}
								// className='text-field'
							/> */}
							<TextField
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
							<Button form={'user_name'} type="submit" disabled={isLoadingName} className={classes.submitButton} variant="outlined" color="primary" onClick={updateName}>
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
						</div>
						{messageName && <Typography className={classes.message}>{messageName}</Typography>}
					</form>
				</div>

				<div className={classes.main}>
					<form  form={'password'} onSubmit={handleSubmit(onSubmit)}>
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
							<Button form={'password'} type="submit" disabled={isLoading} className={classes.submitButton} variant="outlined" color="primary">
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
						</div>
					</form>
				</div>

				<div className={classes.main}>
					<form  form={'email'} onSubmit={handleSubmit(onSubmit)}>
						<InputLabel className={`${classes.heading}`}>Email Address</InputLabel>
						<div className='space-4'>
							<TextField
								id='user-email'
								type='email'
								name='email'
								margin='dense'
								variant='outlined'
								fullWidth
								placeholder='Enter your email'
								value = {email}
								className='text-field'
							/>
						</div>
						<div className='space-4'>
							<Button  form={'email'} type="submit" disabled={isLoadingEmail} className={classes.submitButton} variant="outlined" color="primary" onClick={updateEmail}>
								<Typography className={classes.submitButtonText}>
									Change
							</Typography>
							</Button>
						</div>
						{messageEmail && <Typography className={classes.message}>{messageEmail}</Typography>}
					</form>
				</div>


				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Email Activity</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Recieve activity emails
					</Typography>

					<span className='space-4'>
						<Button className={activeTab === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTab(1)}>
							<Typography>
								yes
							</Typography>
						</Button>
						<Button className={activeTab === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTab(2)}>
							<Typography>
								no
							</Typography>
						</Button>
					</span>
				</div>

				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Account Privacy</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Set your profile’s visbility
					</Typography>

					<span className='space-4'>
						<Button className={activeTabAccountPrivacy === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabAccountPrivacy(1)}>
							<Typography>
								Public
							</Typography>
						</Button>
						<Button className={activeTabAccountPrivacy === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabAccountPrivacy(2)}>
							<Typography>
								Private
							</Typography>
						</Button>
						<Button className={activeTabAccountPrivacy === 3 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabAccountPrivacy(3)}>
							<Typography>
								Hidden
							</Typography>
						</Button>
					</span>
				</div>

				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Following Privacy</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Set your following visbility
					</Typography>

					<span className='space-4'>
						<Button className={activeTabFollowingPrivacy === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabFollowingPrivacy(1)}>
							<Typography>
								Public
							</Typography>
						</Button>
						<Button className={activeTabFollowingPrivacy === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabFollowingPrivacy(2)}>
							<Typography>
								Mutual
							</Typography>
						</Button>
						<Button className={activeTabFollowingPrivacy === 3 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabFollowingPrivacy(3)}>
							<Typography>
								Hidden
							</Typography>
						</Button>
					</span>
				</div>

				<div className={classes.main}>
					<InputLabel className={`${classes.heading}`}>Disable Account</InputLabel>
					<Typography className='body2 space-2 mediumFont'>
						Disballing your account will hide your profile from public, and you can’t use rankpage untill you enable it
					</Typography>

					<span className='space-4'>
						<Button className={activeDisable ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => { setActiveDisable(!activeDisable); setShowConfirmationDiallog(true) }}>
							<Typography>
								Disable
							</Typography>
						</Button>
					</span>
				</div>

				{showConfirmationDiallog &&
					<Dialog
						title={"Confirmation"}
						open={showConfirmationDiallog}
						message={<ConformationDialog
							cancelForm={() => setShowConfirmationDiallog(false)} />}
						applyForm={() => setShowConfirmationDiallog(false)}
						hideActions={true}
						cancelForm={() => setShowConfirmationDiallog(false)}
					// cancelForm={() => setShowConfirmationDiallog(false)}
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
	})
);


// export default connect(store => {
// 	return {
// 		user: store.user,
// 	}
// })(Settings)

function mapStateToProps(state) {
	return {
			user: state.user,
	};
}


export default connect(mapStateToProps)(Settings);