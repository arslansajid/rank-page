import React , {useEffect , useState} from 'react';
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
import {allConversations , sendMessage , messageListing} from './action'
import Dialog from "../../components/Common/Dialog";
import NewMessage from './newMessage'
import moment from "moment";

const Chat = () => {
  const classes = useStyles();
  const [ message , setMessage] = useState('')
  const [showNewMessageDialog , setShowNewMessageDialog] = useState(false)
  const [allListings , setAllListings] = useState(null)
  const [currentConversation , setCurrentConversation] = useState(null)
  const [messageListingData , setMessageListingData] = useState(null)

  useEffect(() => {
    fetchAllConversation()
  } , [])

  const fetchAllConversation = () => {
    allConversations()
    .then((res) => {
        if(res.data.success){
        setAllListings(res.data.data)
        setCurrentConversation(res.data.data[0])
        fetchConversation(res.data.data[0].id)
        
        }
    })
    .catch((err)=> {
        console.log('fetch all listings error' , err)
    })
  }

  console.log('current convo' ,  messageListingData)


  const handleSendMessage = () => {
    let params = {}
    params.body = message;
    params.recipient_user_id = currentConversation.recipient_id;
    sendMessage(params)
    .then((res) =>{
        setMessage('')
        fetchConversation(currentConversation.id)

        // console.log('send message response here / /  / / / / / // // / //  // / / / /' , res.data.data.success)
    })
  }

  const fetchConversation = (id) => {
      let params = {}
      params.conversation_id = id;
      params.page = 1;
    messageListing(params)
    .then((res) =>{
        // console.log('message listing response ' , res.data.data)
        setMessageListingData(res.data.data)
    })
    .catch((err) =>{
        // console.log('message listing error ' , err)
    })
  }
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
                <Grid item xs={4} className={classes.newMessageGrid} onClick={()=> {setShowNewMessageDialog(true)}}>
                    <span>
                        <img src = {require('../../assets/icons/new-message-circle.svg')}  className={classes.userImage}/>
                        <Typography variat = 'h6' style = {{ display : 'inline' , marginLeft : '15px'}}>New Message</Typography>
                    </span>
                </Grid>
                <Grid item xs={8}>
                    <Typography variant = 'body1' className ='mediumFont'>
                        { currentConversation &&  currentConversation.recipient.name}
                    </Typography>
                    <Typography variant = 'body2' className = 'smallFont'>
                        {currentConversation && currentConversation.recipient.user_name}
                    </Typography>
                </Grid>
            </Grid>
 
            <Grid item xs={4} className={classes.borderRight500}>
                {allListings && allListings.length > 0 ?  allListings.map((item , index) => {
                    return(
                <List key = {index} onClick={()=>fetchConversation(item.id)}>
                    <ListItem button key="RemySharp" className = {classes.activeItem}>
                        <ListItemIcon>
                        <Avatar alt="Remy Sharp" src={item.firebase_profile_image_url ?  item.firebase_profile_image_url : "https://material-ui.com/static/images/avatar/1.jpg"}/>
                        </ListItemIcon>
                        <ListItemText>
                    <Typography variant = 'body2' className ='mediumFont'>{item.recipient && item.recipient.name ? item.recipient.name : null}</Typography>
                            <Typography variant = 'body2' className ='smallFont'>{item.recipient && item.recipient.user_name ? item.recipient.user_name : null }</Typography>
                        </ListItemText>
                    </ListItem>
                </List>
                    )
                })
            : null }
            </Grid>

            <Grid item xs={8}>
                <List className={classes.messageArea}>

                            {messageListingData && messageListingData.length > 0 ? messageListingData.map((item , index) =>{ 
                                return(
                                    <ListItem key={index}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                            <ListItemText align="right">
                                <Typography variant = 'body2' className ={classes.messageBackground}>{item.body}</Typography>
                                            </ListItemText>
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText  align="right" secondary ={moment(item.created_at).format("L")}>
                                                </ListItemText>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                             )
                        })
                            : null} 
                </List>
                <Divider />
                <Grid container style={{ padding: "5px 20px" }} alignItems="center">
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" placeholder="Type Something" fullWidth  value = {message}
                         onChange={(e)=> {setMessage(e.target.value)}}
                         onKeyPress={(event) => {
                            if(event.key === 'Enter' && event.target.value.length) {
                              handleSendMessage();
                            }
                          }}/>
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab onClick = {handleSendMessage} color="primary" aria-label="add" className = {classes.send}><SendIcon className = {classes.sendIcon} /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

        {showNewMessageDialog && (
            <Dialog
                title={"New Message"}
                open={showNewMessageDialog}
                message={<NewMessage closeDialog = {()=> {setShowNewMessageDialog(false) ; fetchAllConversation()}}/>}
                applyForm={() => setShowNewMessageDialog(false)}
                cancelForm={() => setShowNewMessageDialog(false)}
                hideActions={true}
            />
        )
            }

      </div>
  );
}


export default Chat;

const useStyles = makeStyles({
  
    messageBar : {
         margin : 0,
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
activeItem : {
    "&:hover": {
        borderRight : '2px solid #19A5D3'
    }
},
});