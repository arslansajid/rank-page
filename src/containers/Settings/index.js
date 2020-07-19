import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@material-ui/core';
import Colors from '../../static/_colors';
import { useForm } from 'react-hook-form';
import TextField from "../../components/Common/TextField"
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';

const Settings = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const { errors, handleSubmit, control } = useForm();
	const [activeTab, setActiveTab] = useState(1);
	const [activeTabAccountPrivacy, setActiveTabAccountPrivacy] = useState(1);
	const [activeTabFollowingPrivacy, setActiveTabFollowingPrivacy] = useState(1);
	const [activeDisable, setActiveDisable] = useState(null);



	const onSubmit = data => {
		console.log('function called')
	}

	const classes = useStyles();

	return (
		<div>
			<div className = {classes.main}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='space-4'>
						<InputLabel className='space-2'>Username</InputLabel>
						<TextField
								id='user-name'
								type='text'
								name='user_name'
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.user_name ? true : false}
								placeholder='Username'
								defaultValue={''}
								className='text-field'
						/>
				</div>
				<div className='space-4'>
					<Button type="submit" disabled={isLoading} className={classes.submitButton} variant="outlined" color="primary">
							<Typography className={classes.submitButtonText}>
									Change
							</Typography>
					</Button>
				</div>
				</form>
			</div>

			<div className = {classes.main}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='space-1'>
						<InputLabel className='space-2'>Password</InputLabel>
						<TextField
								id='new_password'
								type='password'
								name='old_password'
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.old_password ? true : false}
								placeholder='old password'
								defaultValue={''}
								className='text-field'
						/>
				</div>
				<div className='space-1'>
						<TextField
								id='new_password'
								type='password'
								name='new_password'
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.new_password ? true : false}
								placeholder='old password'
								defaultValue={''}
								className='text-field'
						/>
				</div>
				<div className='space-4'>
						<TextField
								id='confirm_passwrod'
								type='password'
								name='confirm_password'
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.confirm_password ? true : false}
								placeholder=' confirm new password'
								defaultValue={''}
								className='text-field'
						/>
				</div>
				<div className='space-4'>
					<Button type="submit" disabled={isLoading} className={classes.submitButton} variant="outlined" color="primary">
							<Typography className={classes.submitButtonText}>
									Change
							</Typography>
					</Button>
				</div>
				</form>
			</div>

			<div className = {classes.main}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<InputLabel className='space-2'>Email Address</InputLabel>
					<div className='space-4'>
						<TextField
								id='user-email'
								type='email'
								name='email'
								rules={{ required: 'This field is required' }}
								control={control}
								error={errors.email ? true : false}
								placeholder='Enter your email'
								defaultValue={''}
								className='text-field'
						/>
				</div>
				<div className='space-4'>
					<Button type="submit" disabled={isLoading} className={classes.submitButton} variant="outlined" color="primary">
							<Typography className={classes.submitButtonText}>
									Change
							</Typography>
					</Button>
				</div>
				</form>
			</div>


			<div className = {classes.main}>
					<InputLabel className='space-2'>Email Activity</InputLabel>
					<Typography className ='body2 space-2'>
						Recieve activity emails
					</Typography>

				<span className='space-4'>
					<Button className={activeTab === 1 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
									yes
							</Typography>
					</Button>
					<Button  className={activeTab === 2 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
									no
							</Typography>
					</Button>					
				</span>
			</div>

			<div className = {classes.main}>
					<InputLabel className='space-2'>Account Privacy</InputLabel>
					<Typography className ='body2 space-2'>
					Set your profile’s visbility
					</Typography>

				<span className='space-4'>
					<Button className={activeTabAccountPrivacy === 1 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
								Public
							</Typography>
					</Button>
					<Button  className={activeTabAccountPrivacy === 2 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
								Private
							</Typography>
					</Button>
					<Button  className={activeTabAccountPrivacy === 3 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
								Hidden
							</Typography>
					</Button>					
				</span>
			</div>

			<div className = {classes.main}>
					<InputLabel className='space-2'>Following Privacy</InputLabel>
					<Typography className ='body2 space-2'>
						Set your following visbility
					</Typography>

				<span className='space-4'>
					<Button className={activeTabFollowingPrivacy === 1 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
								Public
							</Typography>
					</Button>
					<Button  className={activeTabFollowingPrivacy === 2 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
								Mutual
							</Typography>
					</Button>
					<Button  className={activeTabFollowingPrivacy === 3 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
								Hidden
							</Typography>
					</Button>					
				</span>
			</div>

			<div className = {classes.main}>
					<InputLabel className='space-2'>Following Privacy</InputLabel>
					<Typography className ='body2 space-2'>
						Set your following visbility
					</Typography>

				<span className='space-4'>
					<Button className={activeDisable === 1 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained">
							<Typography>
								Disable
							</Typography>
					</Button>				
				</span>
			</div>

		</div>
	);
}

const useStyles = makeStyles((theme) =>
    createStyles({
        container: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "100%",
				},
				main : {
					background: Colors.white,
					border: '1px solid rgba(38, 38, 38, 0.12)',
					boxSizing: 'border-box',
					borderRadius: 8,
					padding : '2rem',
					marginBottom : 5,
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
				choiceButton :{
					minWidth: "20px",
					height: "40px",
					background: Colors.inputBg,
					marginRight : 10,
					color : Colors.black,
				},
				choiceButtonActive :{
					minWidth: "20px",
					height: "40px",
					background: Colors.brandColor,
					marginRight : 10,
					color : Colors.white,
				},
        error : {
            color : Colors.red,
        }
    })
);


export default Settings;
