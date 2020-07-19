import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
import Colors from '../../static/_colors';

const useStyles = makeStyles({
  
    messageBar : {
         margin : 0 ,
         borderBottom : '1px solid #ddd' ,
         padding : '0px 15px'
    },
    newMessageGrid : {
        padding : 15 ,
        borderRight : '1px solid #ddd',
    },
    userImage : {
        verticalAlign : 'middle',
    },
  table: {
    minWidth: 650,
  },
  chatSection: {
    width: '100%',
    border: '1px solid rgba(38, 38, 38, 0.12)',
    // height: '90vh'
  },
  headBG: {
      backgroundColor: '#e0e0e0'
  },
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    height: '70vh',
    overflowY: 'auto'
  },
  messageBackground : {
    background: Colors.brandColor,
    display : 'inline-block',
    padding : 7,
    borderRadius : 7,
    color : Colors.white,
},
send : {
    height : '2.5rem',
    width : '2.5rem'
},
sendIcon : {
    height : '0.95rem',
    width : '0.95rem'
},
});

const Chat = () => {
  const classes = useStyles();

  return (
      <div>
        <Grid container>
            <Grid item xs={12} >
                <Typography variant="h5" className="header-message">
                </Typography>
                <Grid item xs={4} className={classes.borderRight500}></Grid>
                <Grid item xs={8} className={classes.borderRight500}></Grid>
            </Grid>
        </Grid>
        <Grid container component={Paper} className={classes.chatSection} elevation={0}>

            <Grid container spacing={3} className = {classes.messageBar}>
                <Grid item xs={4} className={classes.newMessageGrid}>
                    <span>
                        <img src = {require('../../assets/icons/new-message-circle.svg')}  className={classes.userImage}/>
                        <Typography variat = 'h6' style = {{ display : 'inline' , marginLeft : '15px'}}>New Message</Typography>
                    </span>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant = 'body1' className ='mediumFont'>
                        Maria Memon
                    </Typography>
                    <Typography variant = 'body2' className = 'smallFont'>
                        @meriamemon
                    </Typography>
                </Grid>
            </Grid>
 
            <Grid item xs={4} className={classes.borderRight500}>
                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant = 'body2' className ='mediumFont'>John Wick</Typography>
                            <Typography variant = 'body2' className ='smallFont'>@JohnWick</Typography>
                        </ListItemText>
                    </ListItem>
                </List>

                <List>
                    <ListItem button key="RemySharp">
                        <ListItemIcon>
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant = 'body2' className ='mediumFont'>Remy Sharp</Typography>
                            <Typography variant = 'body2' className ='smallFont'>@RemySharp</Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem button key="Alice">
                        <ListItemIcon>
                            <Avatar alt="Alice" src="https://material-ui.com/static/images/avatar/3.jpg" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant = 'body2' className ='mediumFont'>Alice</Typography>
                            <Typography variant = 'body2' className ='smallFont'>@Alice</Typography>
                        </ListItemText>
                    </ListItem>
                    <ListItem button key="CindyBaker">
                        <ListItemIcon>
                            <Avatar alt="Cindy Baker" src="https://material-ui.com/static/images/avatar/2.jpg" />
                        </ListItemIcon>
                        <ListItemText>
                            <Typography variant = 'body2' className ='mediumFont'>Cindy Baker</Typography>
                            <Typography variant = 'body2' className ='smallFont'>@CindyBaker</Typography>
                        </ListItemText>
                    </ListItem>
                </List>
            </Grid>
            <Grid item xs={8}>
                <List className={classes.messageArea}>
                    <ListItem key="1">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right">
                                    <Typography variant = 'body2' className ={classes.messageBackground}>Hey man! what's up?</Typography>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText  align="right" secondary ='09:30'>
                                </ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="2">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="left">
                                    <Typography variant = 'body2' className ={classes.messageBackground}>Hey, I am Good! What about you ?</Typography>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="left" secondary="09:31"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <ListItem key="3">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right">
                                    <Typography variant = 'body2' className ={classes.messageBackground}>Cool. i am good, let's catch up!</Typography>
                                </ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:30"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{ padding: "5px 20px" }} alignItems="center">
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" placeholder="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add" className = {classes.send}><SendIcon className = {classes.sendIcon} /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </div>
  );
}


export default Chat;