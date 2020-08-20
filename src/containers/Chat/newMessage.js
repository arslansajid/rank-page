import React , {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import { Typography, Grid, colors, Button , TextField} from "@material-ui/core";
import Select from 'react-select'
import {getAllUsers , sendMessage} from './action'
import InputLabel from '@material-ui/core/InputLabel';
import Colors from '../../static/_colors';

const NewMessage = (props) => {
  const classes = useStyles();
  const { closeDialog} = props;
  const [ message , setMessage] = useState('')
  const [users , setUsers] = useState() 
  const [selectedUser, setSelectedUser] = useState(null);
  const [error , setError] = useState(null)

  console.log('user id here' , selectedUser)


  useEffect(() => {
    getAllUsers()
    .then((res)=> {
        if(res.data.success){
          setUsers(res.data.data)
        }
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])

  const handleSelectd = (value) => {
    setSelectedUser(value.id)
  }

  const handleSendMessage = () => {
    if(selectedUser && message){
      let params = {}
      params.body = message;
      params.recipient_user_id = selectedUser ? selectedUser : null;
      sendMessage(params)
      .then((res) =>{
        if(res.data.success){
          closeDialog()
      }
      })
    }
    else if(!selectedUser){
      setError('Select user first')
    }
    else if(!message){
      setError('Enter message first')
    }
    else {
      setError('Something went wrong')
    }
  }

  return (
      <div className = {classes.container}>
        <Grid  container>
            <Grid item xs={12} >
              <InputLabel className ={`${classes.label} space-2`}>Select User</InputLabel>
              <Select
                className='space-4'
                placeholder="Search Users"
                options={users ? users : []}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                onChange={handleSelectd}
              />
            </Grid>
            <Grid item xs={12} className = 'space-4'>
              <InputLabel className ={`${classes.label} space-2`}>Enter your message</InputLabel>
              <TextField
                className={classes.greyInput}
                margin='dense'
                variant='outlined'
                multiline={true}
                rows={3}
                fullWidth
                onChange={(e)=> {setMessage(e.target.value)}}
              />
            </Grid>
            {error && <Typography className={classes.error}>{error}</Typography>}
            <Button className={classes.submitButton} variant="contained" color="primary" onClick = {handleSendMessage}>
              <Typography className={classes.submitButtonText}>
                  Send
              </Typography>
            </Button>
        </Grid>
      </div>
  );
}


export default NewMessage;

const useStyles = makeStyles({
  
    container : {
      padding: '3rem 0',
      // borderBottom : '1px solid #ddd' ,
    },
    label: {
      color: Colors.black,
    },
    error: {
      color: Colors.red,
      textAlign: 'center',
      margin: '10px 0px'
    },
    greyInput: {
      borderRadius: 8,
      background: Colors.inputBg,
    },
    buttonPosition: {
      position: 'absolute',
      top: 13,
      right: 13,
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

});