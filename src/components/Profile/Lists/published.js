import React , {useState} from 'react'
import { Typography, Grid, colors , Button} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Colors from '../../../static/_colors';
import Divider from '@material-ui/core/Divider';


const Published = (props) => {
    const classes = useStyles();
    const { errors, handleSubmit, control } = useForm();
    

  return (
    <div className={classes.container}>
      <Grid container>
        <Grid item xs = {12} className={`${classes.textCenter} space-4`}>
          <img src = {require('../../../assets/icons/checked 1.png')}  className='space-4'/>
          <Typography className={classes.label}>Your List Published!</Typography>
        </Grid>
        <Divider/>
        <Grid item xs = {12} className={`${classes.textCenter} space-4`}>
          <Typography className={`${classes.label} space-4`}>Share to other social networks</Typography>
          <img src = {require('../../../assets/icons/socialMedia/facebook1.svg')} className = {classes.marginR}/>
          <img src = {require('../../../assets/icons/socialMedia/twitter.svg')} className = {classes.marginR}/>
          <img src = {require('../../../assets/icons/socialMedia/instagram1.svg')} className = {classes.marginR}/>
          <img src = {require('../../../assets/icons/socialMedia/email.svg')} className = {classes.marginR}/>
        </Grid>
        <Divider/>

        <Grid item xs = {6} className={classes.textCenter}>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className = {classes.button}
        >
          <Typography className={classes.submitButtonText}>
            Continue
        </Typography>
        </Button>
        </Grid>
        <Grid item xs = {6} className={classes.buttonMain}>
        <Button
          type="submit"
          variant="outlined"
          color="primary"
          className = {classes.button}
        >
          <Typography className={classes.submitButtonText}>
            View Similar lists
          </Typography>
        </Button>
        </Grid>

      </Grid>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
    },
    textCenter: {
      textAlign: 'center',
    },
    label : {
      color: Colors.black,
    },
    marginR : {
      marginRight: 15,
    },
    buttonMain : {
      textAlign: 'center',
    },
    submitButtonText : {
      fontWeight: 'bold',
      fontSize: '1rem',
    },
    button : {
      height: '2.75rem',
      width: '80%'
    },
})
)


export default Published;
