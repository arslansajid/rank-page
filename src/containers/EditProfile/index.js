import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {Typography, TextField, IconButton, Grid, Paper, Button} from "@material-ui/core";
import Colors from "../../static/_colors";
import {GenderItems} from "../../static/_selectOptions";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CountrySelect from "../../components/Common/CountrySelect";
import { CountryRegionData } from "react-country-region-selector";
import MenuItem from "@material-ui/core/MenuItem";

const EditProfile = (props) => {
	const classes = useStyles();
	const {user} = props;
	const [country, setCountry] = useState('')

	console.log(country)

	return (
		<>
		<Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>Picture</Typography>
			<Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
		</Paper>
		
		<Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>Cover</Typography>
			<Grid className={classes.coverContainer}>

			</Grid>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>Full Name</Typography>
			<TextField
				margin='dense'
				variant='outlined'
				fullWidth
			/>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>Bio (140 Characters)</Typography>
			<TextField
				margin='dense'
				variant='outlined'
				multiline={true}
                rows={3}
				fullWidth
			/>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>Date of birth</Typography>
			<TextField
				type="date"
				name="date_of_birth"
				placeholder="Date"
				// value={''}
				// defaultValue={!!user && user.date_of_birth}
				className="text-field"
				margin='dense'
				variant='outlined'
				fullWidth
			/>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>Gender</Typography>
			<TextField
				margin='dense'
				variant='outlined'
				// value=""
				// defaultValue={!!user && user.gender}
				select
				fullWidth
			>
				{GenderItems.map((item, index) => (
					<MenuItem key={index} value={item.value}>{item.label}</MenuItem>
				))}
			</TextField>
		</Paper>

		<Paper elevation={0} className={classes.container}>
			<Typography variant="h6" gutterBottom>Country</Typography>
			{/* <CSelect handleChange={(value) => console.log(value)} /> */}
			<TextField
				margin='dense'
				variant='outlined'
				value={country}
				defaultValue={!!user ? user.country : ''}
				select
				fullWidth
				onChange={(e) => setCountry(e.target.value[0])}
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
		</>
	);
}

const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: 100,
        background: Colors.white,
        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: 8,
		marginTop: 8,
		padding: "1em"
	},
    coverContainer: {
        color: Colors.white,
        padding: '1em',
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
}))

export default connect()(EditProfile);