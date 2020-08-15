import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Typography, TextField, InputLabel, Grid, Paper, Button } from "@material-ui/core";
import Colors from "../../static/_colors";
import { GenderItems } from "../../static/_selectOptions";
import { makeStyles } from '@material-ui/core/styles';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import MenuItem from "@material-ui/core/MenuItem";
import { useForm } from 'react-hook-form';
import ImagePicker from "../../components/Common/ImagePicker";
import { Capitalize } from "../../utils/Functions";
import moment from "moment"
import { userLogin } from "../../actions/LoginActions";
import { UpdateProfile } from './action'

const EditProfile = (props) => {
	const classes = useStyles();
	const { user } = props;
	const [userName, setUserName] = useState('')
	const [country, setCountry] = useState('')
	const [region, setRegion] = useState('')
	const [gender, setGender] = useState('')
	const [userDOB, setUserDOB] = useState('')
	const [bio, setBio] = useState('')
	const [image, setImage] = useState('')
	const [cover, setCover] = useState('')
	const [isLoadingName, setIsLoadingName] = useState(false);
	const [isLoadingGender, setIsLoadingGender] = useState(false);
	const [isLoadingDOB, setIsLoadingDOB] = useState(false);
	const [isLoadingBio, setIsLoadingBio] = useState(false);
	const [isLoadingCountry, setIsLoadingCountry] = useState(false);
	const [isLoadingRegion, setIsLoadingRegion] = useState(false);
	const [messageName, setMessageName] = useState('');
	const [messageBio, setMessageBio] = useState('');
	const [messageGender, setMessageGender] = useState('');
	const [messageDOB, setMessageDOB] = useState('');
	const [messageCountry, setMessageCountry] = useState('');
	const [messageRegion, setMessageRegion] = useState('');
	const [value, setValue] = useState(new Date());
	const { errors, handleSubmit, control } = useForm();
	const [day, setDay] = useState('');
	const [month, setMonth] = useState('');
	const [year, setYear] = useState('');
	const [message, setMessage] = useState('');
	let countryData = CountryRegionData.map((item, index) => { return { value: item[0], label: item[0] } })
	useEffect(() => {
		//re-rendering when the user data changes
		if (!!user) {
			setUserName(user.name);
			if (user.country) {
				setCountry(Capitalize(user.country))
			}
			if (user.state) {
				setRegion(Capitalize(user.state))
			}
			if (user.gender) {
				setGender(translateGender(user.gender))
			}
			if (user.date_of_birth) {
				let dateArray = moment(user.date_of_birth).format("YYYY-MM-DD").split('-')
				setDay(dateArray[2])
				setMonth(dateArray[1])
				setYear(dateArray[0])
			}
			setBio(user.bio ? user.bio : '')

		}
	}, [props.user])

	const handleChange = (event) => {
		setMessageCountry('')
		setCountry(event.target.value);
	};

	const translateGender = (gender) => {
		let value = gender.toLowerCase();

		if (value == 'male') {
			return 1;
		}
		else if (value == 'female') {
			return 2;
		}
		else if (value == 'other') {
			return 3;
		}
		else if (value == 'prefer not to answer') {
			return 4;
		}
		else return null;
	}

	const updateName = () => {
		setIsLoadingName(true);
		let user = {};
		user.name = userName;
		UpdateProfile(user)
			.then((res) => {
				setIsLoadingName(false);
				setMessageName(res.data.message)
				if (res.data.success) {
					props.dispatch(userLogin(res.data.data.user));
				}
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
				if (res.data.success) {
					props.dispatch(userLogin(res.data.data.user));
				}
			})
			.catch((err) => {
				setIsLoadingBio(false);
				console.log(err)
			})
	}

	const updateDOB = () => {
		let date_of_birth = year + '-' + month + '-' + day;
		setIsLoadingDOB(true);
		let user = {};
		user.date_of_birth = date_of_birth;
		UpdateProfile(user)
			.then((res) => {
				setIsLoadingDOB(false);
				setMessageDOB(res.data.message)
				// if(res.data.success){
				// 	props.dispatch(userLogin(res.data.data.user));
				// }
			})
			.catch((err) => {
				setIsLoadingDOB(false);
				console.log(err)
			})
	}

	const updateCountry = () => {
		setIsLoadingCountry(true);
		let user = {};
		user.country = country;
		UpdateProfile(user)
			.then((res) => {
				setIsLoadingCountry(false);
				setMessageCountry(res.data.message)
				if (res.data.success) {
					props.dispatch(userLogin(res.data.data.user));
				}
			})
			.catch((err) => {
				setIsLoadingCountry(false);
				console.log(err)
			})
	}

	const updateRegion = () => {
		setIsLoadingRegion(true);
		let user = {};
		user.state = region;
		UpdateProfile(user)
			.then((res) => {
				setIsLoadingRegion(false);
				setMessageRegion(res.data.message)
				if (res.data.success) {
					props.dispatch(userLogin(res.data.data.user));
				}
			})
			.catch((err) => {
				setIsLoadingRegion(false);
				console.log(err)
			})
	}

	const updateGender = (value) => {
		// setGender(value)
		setIsLoadingGender(true);
		let user = {};
		user.gender = gender;
		UpdateProfile(user)
			.then((res) => {
				setIsLoadingGender(false);
				setMessageGender(res.data.message)
				// if(res.data.success){
				// 		props.dispatch(userLogin(res.data.data.user));
				// 	}
			})
			.catch((err) => {
				setIsLoadingGender(false);
				console.log(err)
			})
	}

	const updateImage = (value) => {
		var fd = new FormData();
		fd.append('profile_image', value[0])
		let user = {};
		user.profile_image = fd
		UpdateProfile(fd)
			.then((res) => {
				if (res.data.success) {
					props.dispatch(userLogin(res.data.data.user));
				}
			})
			.catch((err) => {
				setIsLoadingDOB(false);
				console.log(err)
			})
	}

	const updateCover = (value) => {
		var fd = new FormData();
		fd.append('cover_image', value[0])
		UpdateProfile(fd)
			.then((res) => {
				if(res.data.success){
					props.dispatch(userLogin(res.data.data.user));
				}
			})
			.catch((err) => {
				setIsLoadingDOB(false);
				console.log(err)
			})
	}



	const getArray = (length) => {
		return new Array(length).fill(undefined)
	}
	const handleDateChange = (value, index) => {
		setMessageDOB('')
		if (index === 'day') {
			setDay(value)
		}
		else if (index === 'month') {
			setMonth(value)
		}
		else if (index === 'year') {
			setYear(value)
		}

	}

	if (!!props.user) {
		return (
			<>
				<Grid className={classes.main}>
					<Paper elevation={0} className={classes.container}>
						<InputLabel className='space-2'>Picture</InputLabel>
						{/* <Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" /> */}
						{/* <ImagePicker image={[]} type = 'image' setImage={(value) => console.log(value)} /> */}
						<ImagePicker image={[]} type='image' setImage={(value) => updateImage(value)} />

					</Paper>

					<Paper elevation={0} className={classes.container}>
						<InputLabel className='space-2'>Cover</InputLabel>
						<Grid className={classes.coverContainer}>
							{/* <ImagePicker image={[]} type = 'cover' setImage={(value) => console.log(value)} /> */}
							<ImagePicker image={[]} type='cover' setImage={(value) => updateCover(value)} />
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
							// onChange={(e) => setUserName(e.target.value)}
							onChange={(e) => { setUserName(e.target.value); setMessageName('') }}
						/>
						<Button disabled={isLoadingName} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateName}>
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
							// onChange={(e) => {setBio(e.target.value)}}
							onChange={(e) => { setBio(e.target.value); setMessageBio('') }}
						/>
						<Button disabled={isLoadingBio} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateBio}>
							<Typography>
								Change
					</Typography>
						</Button>
						{messageBio && <Typography className={classes.message}>{messageBio}</Typography>}
					</Paper>

					<Paper elevation={0} className={classes.container}>
						<InputLabel className='space-4'>Date of Birth</InputLabel>
						<Grid container>
							<Grid item xs={2} className='space-4'>
								<select name="day" className={classes.select} value={day} onChange={(e) => handleDateChange(e.target.value, 'day')}>
									{getArray(31).map((val, index) => <option key={index} value={index + 1}>{index + 1}</option>)}
								</select>
							</Grid>
							<Grid item xs={2}>
								<select name="month" className={classes.select} value={month} onChange={(e) => handleDateChange(e.target.value, 'month')}>
									{['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map(
										(month, index) => <option key={index} value={index}>{month}</option>
									)}
								</select>
							</Grid>
							<Grid item xs={2}>
								<select name="year" className={classes.select} value={year} onChange={(e) => handleDateChange(e.target.value, 'year')}>
									{getArray(100).map((val, index) => <option key={index} value={2020 - index}>{2020 - index}</option>)}
								</select>
							</Grid>
						</Grid>
						<Button type='submit' disabled={isLoadingDOB} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateDOB}>
							<Typography>
								Change
							</Typography>
						</Button>
						{messageDOB && <Typography className={classes.message}>{messageDOB}</Typography>}
						{/* <TextField
					className={`${classes.greyInput} space-4`}
					type="date"
					name="date_of_birth"
					placeholder="Date"
					value={userDOB}
					margin='dense'
					variant='outlined'
					fullWidth
					onChange={(e) => setUserDOB(e.target.value)}
				/> */}

					</Paper>

					<Paper elevation={0} className={classes.container}>
						<InputLabel className='space-4'>Gender</InputLabel>
						<div className='space-4'>
							{/* <Button className={gender === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setGender(1)}> */}
							<Button className={gender === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => { setGender(1); setMessageGender('') }}>
								<Typography>
									male
							</Typography>
							</Button>
							{/* <Button className={gender === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setGender(2)}> */}
							<Button className={gender === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => { setGender(2); setMessageGender('') }}>
								<Typography>
									female
							</Typography>
							</Button>
							{/* <Button className={gender === 3 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setGender(3)}> */}
							<Button className={gender === 3 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => { setGender(3); setMessageGender('') }}>
								<Typography>
									other
							</Typography>
							</Button>
							{/* <Button className={gender === 4 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setGender(4)}> */}
							<Button className={gender === 4 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => { setGender(4); setMessageGender('') }}>
								<Typography>
									prefer not to answer
							</Typography>
							</Button>
						</div>
						<Button disabled={isLoadingGender} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateGender}>
							<Typography>
								Change
					</Typography>
						</Button>
						{messageGender && <Typography className={classes.message}>{messageGender}</Typography>}
						{/* <TextField
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
				{messageGender && <Typography className={classes.message}>{messageGender}</Typography>} */}
					</Paper>

					<Paper elevation={0} className={classes.container}>
						<InputLabel className='space-2'>Country</InputLabel>
						<TextField
							className={`${classes.greyInput} space-4`}
							margin='dense'
							variant='outlined'
							value={country}
							select
							// fullWidth
							onChange={handleChange}
						>
							{countryData && countryData.length > 0 && countryData.map((option) => (
								<MenuItem key={option.value} value={option.value}>
									{option.label}
								</MenuItem>
							))}
						</TextField>
						<Button disabled={isLoadingCountry} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateCountry}>
							<Typography>
								Change
					</Typography>
						</Button>
						{messageCountry && <Typography className={classes.message}>{messageCountry}</Typography>}
					</Paper>

					{!!country && (
						<Paper elevation={0} className={classes.container}>
							<InputLabel className='space-2 black'>State</InputLabel>
							<RegionDropdown
								className={`${classes.selectBox} space-4`}
								country={country}
								value={region}
								placeholder="Select Region"
								// onChange={(region) => setRegion(region)} />
								onChange={(region) => { setRegion(region); setMessageRegion('') }} />
							<Button disabled={isLoadingRegion} className={`${classes.submitButton} space-2`} variant="outlined" color="primary" onClick={updateRegion}>
								<Typography>
									Change
						</Typography>
							</Button>
							{messageRegion && <Typography className={classes.message}>{messageRegion}</Typography>}
						</Paper>
					)}
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
	saveButtonActive: {
		textAlign: 'center',
		// background : 
	},
	submitButton: {
		textAlign: 'center',
		width: '100%',
	},
	message: {
		textAlign: 'center',
	},
	datePicker: {
		height: '44px',
		border: '1px solid #ddd',
		// width: '100%',
		background: '#fafafa',
		borderRadius: '4px',
		marginBottom: '20px',
		padding: '10px',
		'& .react-date-picker__wrapper': {
			border: 'none',
		}
	},
	select: {
		height: '44px',
		width: '90%',
		border: '1px solid #ddd',
		borderRadius: '4px',
		padding: '0 10px',
	},
	selectBox: {
		border: '1px solid #ddd',
		border: '1px solid rgba(0, 0, 0, 0.23)',
		height: '42px',
		padding: '0px 10px',
		borderRadius: '5px',
		// '-webkit-appearance': 'none'
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

}))

function mapStateToProps(state) {
	return {
		user: state.user,
	};
}


export default connect(mapStateToProps)(EditProfile);