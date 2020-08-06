import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Typography, TextField, InputLabel, Grid, Paper, Button} from "@material-ui/core";
import Colors from "../../static/_colors";
import {GenderItems} from "../../static/_selectOptions";
import { makeStyles } from '@material-ui/core/styles';
import { CountryRegionData } from "react-country-region-selector";
import MenuItem from "@material-ui/core/MenuItem";
import ImagePicker from "../../components/Common/ImagePicker";
import { Capitalize } from "../../utils/Functions";
import moment from "moment"
import {UpdateProfile} from './action'

const EditProfile = (props) => {
	const classes = useStyles();
	const {user} = props;
	const [ userName , setUserName] = useState('')
	const [country, setCountry] = useState('')
	const [gender, setGender] = useState('')
	const [userDOB, setUserDOB] = useState('')
	const [bio , setBio] = useState('')
	const [ isLoadingName, setIsLoadingName] = useState(false);
	const [ isLoadingGender, setIsLoadingGender] = useState(false);
	const [ isLoadingDOB, setIsLoadingDOB] = useState(false);
	const [ isLoadingBio, setIsLoadingBio] = useState(false);
	const [ isLoadingCountry, setIsLoadingCountry] = useState(false);
	const [messageName , setMessageName] = useState('');
	const [messageBio , setMessageBio] = useState('');
	const [messageGender , setMessageGender] = useState('');
	const [messageDOB , setMessageDOB] = useState('');
	const [messageCountry , setMessageCountry] = useState('');

	const [message , setMessage] = useState('');
	let countryData = CountryRegionData.map((item , index) => { return {value : item[0] , label : item[0]}})
	
	useEffect(() => {
		//re-rendering when the user data changes
		if(!!user) {
			setUserName(user.name);
			if(user.country){
				setCountry(Capitalize(user.country))
			}  
			if(user.gender){
				setGender(Capitalize(user.gender))
			}
			setUserDOB(moment(user.date_of_birth).format("YYYY-MM-DD"));
			setBio(user.bio ? user.bio : '')
		}
	}, [props.user])

	const handleChange = (event) => {
    setCountry(event.target.value);
	};

	const translateGender = (gender) =>{
		let value = gender.toLowerCase();

		if(value == 'male' ){
			return 1;
		}
		else if(value == 'female' ){
			return 2;
		}
		else if (value == 'prefer not to answer'){
			return 3;
		}
		else return null;
	}

	// const updateProfile = () => {
	// 	setIsLoading(true);
	// 	let user = {};
	// 	user.gender = translateGender(gender);
	// 	user.name = userName;
	// 	user.country = country;
	// 	user.bio = bio;
	// 	UpdateProfile(user)
	// 	.then((res) => {
	// 		setIsLoading(false);
	// 			setMessage(res.data.message)
	// 	})
	// 	.catch((err) => { 
	// 		setIsLoading(false);
	// 		console.log(err)
	// 	})
	// }

	const updateName = () => {
		setIsLoadingName(true);
		let user = {};
		user.name = userName;
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
	const updateBio = () => {
		setIsLoadingBio(true);
		let user = {};
		user.bio = bio;
		UpdateProfile(user)
		.then((res) => {
			setIsLoadingBio(false);
				setMessageBio(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingBio(false);
			console.log(err)
		})
	}
	const updateGender = () => {
		setIsLoadingGender(true);
		let user = {};
		user.gender = translateGender(gender);
		UpdateProfile(user)
		.then((res) => {
			setIsLoadingGender(false);
				setMessageGender(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingGender(false);
			console.log(err)
		})
	}

	const updateDOB = () => {
		setIsLoadingDOB(true);
		let user = {};
		user.date_of_birth= userDOB;
		UpdateProfile(user)
		.then((res) => {
			setIsLoadingDOB(false);
				setMessageDOB(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingDOB(false);
			console.log(err)
		})
	}

	const updateCountry = () => {
		setIsLoadingCountry(true);
		let user = {};
		user.country= country;
		UpdateProfile(user)
		.then((res) => {
			setIsLoadingCountry(false);
				setMessageCountry(res.data.message)
		})
		.catch((err) => { 
			setIsLoadingCountry(false);
			console.log(err)
		})
	}



	if (!!props.user) {
	return (
		<>
		<Grid className={classes.main}>
		<Paper elevation={0} className={classes.container}>
			{/* <Typography variant="h6" gutterBottom></Typography> */}
			<InputLabel className='space-2'>Picture</InputLabel>
			{/* <Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" /> */}
			<ImagePicker image={[]} type = 'image' setImage={(value) => console.log(value)} />
		</Paper>
		
		<Paper elevation={0} className={classes.container}>
			<InputLabel className='space-2'>Cover</InputLabel>
			<Grid className={classes.coverContainer}>
				<ImagePicker image={[]} type = 'cover' setImage={(value) => console.log(value)} />
			</Grid>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<InputLabel className='space-2'>Full Name</InputLabel>
			<TextField
				className={`${classes.greyInput} space-4`}
				margin='dense'
				variant='outlined'
				fullWidth
				value={userName}
				onChange={(e) => setUserName(e.target.value)}
			/>
			<Button  disabled={isLoadingName} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateName}>
				<Typography>
					Change
				</Typography>
			</Button>
			{messageName && <Typography className={classes.message}>{messageName}</Typography>}
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<InputLabel className='space-2'>Bio (140 Characters)</InputLabel>
			<TextField
				className={`${classes.greyInput} space-4`}
				margin='dense'
				variant='outlined'
				multiline={true}
        rows={3}
				fullWidth
				value={bio}
				onChange={(e) => {setBio(e.target.value)}}
			/>
			<Button  disabled={isLoadingBio} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateBio}>
				<Typography>
					Change
				</Typography>
			</Button>
			{messageBio && <Typography className={classes.message}>{messageBio}</Typography>}
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<InputLabel className='space-2'>Date of Birth</InputLabel>
			<TextField
				className={`${classes.greyInput} space-4`}
				type="date"
				name="date_of_birth"
				placeholder="Date"
				value={userDOB}
				margin='dense'
				variant='outlined'
				fullWidth
				onChange={(e) => setUserDOB(e.target.value)}
			/>
			<Button  disabled={isLoadingDOB} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateDOB}>
				<Typography>
					Change
				</Typography>
			</Button>
			{messageDOB && <Typography className={classes.message}>{messageDOB}</Typography>}
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<InputLabel className='space-2'>Gender</InputLabel>
			<TextField
				className={`${classes.greyInput} space-4`}
				margin='dense'
				variant='outlined'
				value={gender}
				select
				fullWidth
				onChange={(e) => setGender(e.target.value)}
			>
				{GenderItems.map((item, index) => (
					<MenuItem key={index} value={item.label}>{item.label}</MenuItem>
				))}
			</TextField>
			<Button  disabled={isLoadingGender} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateGender}>
				<Typography>
					Change
				</Typography>
			</Button>
			{messageGender && <Typography className={classes.message}>{messageGender}</Typography>}
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<InputLabel className='space-2'>Country</InputLabel>
			<TextField
				className={`${classes.greyInput} space-4`}
				margin='dense'
				variant='outlined'
				value={country}
				select
				fullWidth
				onChange={handleChange}
			>
					{countryData && countryData.length > 0 && countryData.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
			</TextField>
			<Button  disabled={isLoadingCountry} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateCountry}>
				<Typography>
					Change
				</Typography>
			</Button>
			{messageCountry && <Typography className={classes.message}>{messageCountry}</Typography>}
		</Paper>
		</Grid>
		</>
	);
	} else {
	return <Typography variant="h5">You need to sign in to view this page!</Typography>
}
}

const useStyles = makeStyles((theme) => ({
	main: {
		marginBottom: 20,

		[theme.breakpoints.down('sm')]: {
			marginBottom: 70,
        },
	},	
	container: {
		minHeight: 80,
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
		marginTop: 8,
		padding: "1em",
	},
    coverContainer: {
        color: Colors.white,
        marginBottom: 8,
        backgroundColor: Colors.brandColor,
        background: 'linear-gradient(360deg, rgba(51, 51, 51, 0.81) 2.71%, rgba(255, 255, 255, 0) 97.71%, rgba(255, 255, 255, 0) 97.71%), url(.jpg)',
		borderRadius: 8,
		minHeight: 150,
		maxWidth: 350
	},
	avatar: {
        width: theme.spacing(8),
        height: theme.spacing(8),
	},
	greyInput: {
		borderRadius: 8,
		background: Colors.inputBg,
	},
	saveButtonActive : {
		textAlign: 'center',
		// background : 
	},
	submitButton : {
		textAlign: 'center',
		width: '100%',
	},
	message : {
		textAlign: 'center',
	},

}))

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}


export default connect(mapStateToProps)(EditProfile);