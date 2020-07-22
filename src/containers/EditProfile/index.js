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

const EditProfile = (props) => {
	const classes = useStyles();
	const {user} = props;
	const [country, setCountry] = useState('')
	const [gender, setGender] = useState('')
	const [userDOB, setUserDOB] = useState('')

	useEffect(() => {
		//re-rendering when the user data changes
		if(!!user) {
			setCountry(user.country);
			setGender(Capitalize(user.gender));
			setUserDOB(moment(user.date_of_birth).format("YYYY-MM-DD"));
		}
	}, [props.user])

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
			{/* <Typography variant="h6" gutterBottom>Cover</Typography> */}
			<InputLabel className='space-2'>Cover</InputLabel>
			<Grid className={classes.coverContainer}>
				<ImagePicker image={[]} type = 'cover' setImage={(value) => console.log(value)} />
			</Grid>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			{/* <Typography variant="h6" gutterBottom>Full Name</Typography> */}
			<InputLabel className='space-2'>Full Name</InputLabel>
			<TextField
				className={classes.greyInput}
				margin='dense'
				variant='outlined'
				fullWidth
				value={!!user ? user.name : ''}
			/>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			{/* <Typography variant="h6" gutterBottom>Bio (140 Characters)</Typography> */}
			<InputLabel className='space-2'>Bio (140 Characters)</InputLabel>
			<TextField
				className={classes.greyInput}
				margin='dense'
				variant='outlined'
				multiline={true}
                rows={3}
				fullWidth
				value={!!user && user.bio ? user.bio : ''}
			/>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			{/* <Typography variant="h6" gutterBottom>Date of birth</Typography> */}
			<InputLabel className='space-2'>Date of Birth</InputLabel>
			<TextField
				className={classes.greyInput}
				type="date"
				name="date_of_birth"
				placeholder="Date"
				value={userDOB}
				// defaultValue={!!user ? user.date_of_birth : ''}
				className="text-field"
				margin='dense'
				variant='outlined'
				fullWidth
				onChange={(e) => console.log(e.target.value)}
			/>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			{/* <Typography variant="h6" gutterBottom>Gender</Typography> */}
			<InputLabel className='space-2'>Gender</InputLabel>
			<TextField
				className={classes.greyInput}
				margin='dense'
				variant='outlined'
				value={gender}
				// defaultValue={!!user ? user.gender : ''}
				select
				fullWidth
				onChange={(e) => setGender(e.target.value)}
			>
				{GenderItems.map((item, index) => (
					<MenuItem key={index} value={item.label}>{item.label}</MenuItem>
				))}
			</TextField>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			{/* <Typography variant="h6" gutterBottom>Country</Typography> */}
			<InputLabel className='space-2'>Country</InputLabel>
			<TextField
				className={classes.greyInput}
				margin='dense'
				variant='outlined'
				value={country}
				// defaultValue={!!user ? user.country : ''}
				select
				fullWidth
				onChange={(e) => setCountry(e.target.value)}
			>
				{CountryRegionData.map((option, index) => (
					<MenuItem key={option[0]} value={option[0]}>
						{option[0]}
					</MenuItem>
				))}
			</TextField>
		</Paper>

		{/* <Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>State</Typography>
			
		</Paper> */}
		</Grid>
		</>
	);
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
	}
}))

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}


export default connect(mapStateToProps)(EditProfile);