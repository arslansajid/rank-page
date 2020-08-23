import React , {useEffect , useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
import GalleryIcon from '@material-ui/icons/CropOriginal';
import Colors from '../../static/_colors';
import {allConversations , sendMessage , messageListing} from './action'
import Dialog from "../../components/Common/Dialog";
import NewMessage from './newMessage'
import moment from "moment";
import Config from "../../api/config";
import Dropzone from "react-dropzone";

/*For images -> .jpg, .jpeg, .png*/
let imageTypes = `.jpg, .jpeg, .png`;

const Chat = () => {
  const classes = useStyles();
  const [ message , setMessage] = useState('')
  const [showNewMessageDialog , setShowNewMessageDialog] = useState(false)
  const [allListings , setAllListings] = useState(null)
  const [currentConversation , setCurrentConversation] = useState(null)
  const [messageListingData , setMessageListingData] = useState(null)
  const [selectedFile , setSelectedFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  let intervalCallHandler = null;

  useEffect(() => {
    fetchAllConversation()
    console.log('currentConversation', currentConversation)

    return () => clearInterval(intervalCallHandler);
  } , [])

  const fetchAllConversation = () => {
    allConversations()
    .then((res) => {
        if(res.data.success){
        setAllListings(res.data.data)
        setCurrentConversation(res.data.data[0]);
        fetchConversation(res.data.data[0].id);

        //check for new message after every 5 secs
        intervalCallHandler = setInterval(function(){
            fetchConversation(res.data.data[0].id)
        }, 5000);

        setTimeout(() => {
            scrollToBottom();
        }, 500)
        }
    })
    .catch((err)=> {
        console.log('fetch all listings error' , err)
    })
  }
  const handleSendMessage = () => {
    //1 for Image, 2 for Audio, 3 for Video, 4 for document

    var fd = new FormData();
    fd.append('body', message);
    fd.append('recipient_user_id', currentConversation.recipient_id);
    fd.append('file', selectedFile);
    fd.append('file_type', !!selectedFile && 1);
        
    sendMessage(fd)
    .then((res) =>{
        setMessage('')
        setSelectedFile(null)
        setFileName(null)
        fetchConversation(currentConversation.id);
        document.getElementById('message-area').scrollIntoView(false);
        setTimeout(() => {
            scrollToBottomSmooth();
        }, 500)
    })
  }

  const fetchConversation = (id, item) => {
    !!item && setCurrentConversation(item)
      let params = {}
      params.conversation_id = id;
      params.page = 1;
    messageListing(params)
    .then((res) =>{
        setMessageListingData(res.data.data);
        setTimeout(() => {
            scrollToBottom();
        }, 500)
    })
    .catch((err) =>{
        // console.log('message listing error ' , err)
    })
  }

  const scrollToBottomSmooth = () => {
    let messageList = document.getElementById('messages')
    !!messageList && messageList.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }

  const scrollToBottom = () => {
    let messageList = document.getElementById('messages')
    !!messageList && messageList.scrollIntoView({ block: 'end' });
  }

  const handleOnDrop = async (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length) {
        // setFileName(rejectedFiles[0].name);
        // setFileSize((rejectedFiles[0].size / (1024*1024)).toFixed(2));
        // setImage(rejectedFiles[0]);
        // setShowImageCanvas(false);
        // setImageError(true);
        // setImageErrorMessage(`Max file size upload limit is ${publicationType === 1 ? "1" : "2"} MB.`)
    } else if (acceptedFiles.length) {
        setFileName(acceptedFiles[0].name);
        // setFileSize((acceptedFiles[0].size / (1024*1024)).toFixed(2));
        // setImage(acceptedFiles[0]);
        setSelectedFile(acceptedFiles[0])
        // setShowImageCanvas(true);
        // const base64Url = await filetoBase64(acceptedFiles[0]);
        // setImageBase64(base64Url);
        // setImageError(false)
        // setImageErrorMessage(null)
    }
};

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
                        {!!currentConversation && `@ ${currentConversation.recipient.user_name}`}
                    </Typography>
                </Grid>
            </Grid>
 
            <Grid item xs={4} className={`${classes.borderRight500} ${classes.borderBottom500} ${classes.messageArea}`}>
            <List>
                {allListings && allListings.length > 0 ?  allListings.map((item , index) => {
                    return(
                        <Grid key = {index} onClick={()=>fetchConversation(item.id, item)} className = {!!currentConversation && currentConversation.recipient_id === item.recipient_id ? classes.selectedItem : classes.activeItem}>
                        <ListItem>
                            <ListItemIcon>
                            <Avatar alt="Remy Sharp" src={item.profile_image ? `${Config.BASE_APP_URL}${item.profile_image}` : require("../../assets/images/user.jpg")} />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant = 'body2' className ='mediumFont'>{item.recipient && item.recipient.name ? item.recipient.name : null}</Typography>
                                <Typography variant = 'body2' className ='smallFont'>@{item.recipient && item.recipient.user_name ? item.recipient.user_name : null }</Typography>
                            </ListItemText>
                            {
                                item && item.unread_count !== 0 && (
                                    <ListItemIcon className={classes.unreadCount}>
                                        <Grid className={`${classes.verticalCenter}`}>
                                            <Typography color="inherit">{item.unread_count}</Typography>
                                        </Grid>
                                    </ListItemIcon>
                                )
                            }
                        </ListItem>
                        <Grid container justify="space-between" className={classes.listingDate}>
                            <Typography variant = 'body2' className ='smallFont'>Last message goes here...</Typography>
                            <Typography variant = 'body2' className ='smallFont'>{moment(item.last_message).format("h:mm a")}</Typography>
                        </Grid>
                    </Grid>
                    )
                })
            : null }
            </List>
            </Grid>

            <Grid className={classes.borderTop500} id="message-area" item xs={8}>
                <Grid className={classes.messageArea}>
                <List id="messages">

                            {messageListingData && messageListingData.length > 0 ? messageListingData.map((item , index) =>{ 
                                return(
                                    <ListItem key={index}>
                                        {
                                            item.is_send
                                            ?
                                            <Grid container>
                                            <Grid item xs={12}>
                                                {!!item.body && item.body.length && (
                                                    <ListItemText align="right">
                                                        <Typography variant = 'body2' className ={classes.messageBackground}>{item.body}</Typography>
                                                    </ListItemText>
                                                )}
                                                {
                                                    !!item.file && (
                                                        <img className={classes.messageImageSend} src={`${Config.BASE_APP_URL}${item.file}`} />
                                                    )
                                                }
                                            </Grid>
                                            <Grid item xs={12}>
                                                <ListItemText  align="right" secondary ={moment(item.created_at).format("h:mm:ss a")}>
                                                </ListItemText>
                                            </Grid>
                                            </Grid>
                                            :
                                            <Grid container>
                                                <Grid item xs={12}>
                                                {!!item.body && item.body.length && (
                                                    <ListItemText align="left">
                                                        {/* <Typography variant = 'body2' className ={classes.messageBackground}>{recepientMessages[index].body}</Typography> */}
                                                        <Typography variant = 'body2' className ={classes.messageBackground}>{item.body}</Typography>
                                                    </ListItemText>
                                                )}
                                                {
                                                    !!item.file && (
                                                        <img className={classes.messageImageReceive} src={`${Config.BASE_APP_URL}${item.file}`} />
                                                    )
                                                }
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <ListItemText  align="left" secondary ={moment(item.created_at).format("h:mm:ss a")}>
                                                    </ListItemText>
                                                </Grid>
                                            </Grid>
                                        }
                                        
                                    </ListItem>
                             )
                        })
                            : null} 
                </List>
                </Grid>
                <Divider />
                <Grid container style={{ padding: "5px 20px" }} alignItems="center">
                    <Grid item xs={10}>
                        <TextField id="outlined-basic-email" placeholder="Type Something" fullWidth  value = {message}
                         onChange={(e)=> {setMessage(e.target.value)}}
                         onKeyPress={(event) => {
                            if(event.key === 'Enter' && event.target.value.length) {
                              handleSendMessage();
                            }
                          }}/>
                    </Grid>
                    <Grid item xs={1} align="start">
                    <Dropzone
                            // maxSize={maxSize}
                            accept={imageTypes}
                            onDrop={handleOnDrop}
                            multiple={false}>
                            {({ getRootProps, getInputProps }) => (
                                <div className={classes.uploadSectionDv}
                                    style={{ display: 'inline', width: '100%' }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <GalleryIcon />
                                </div>
                            )}
                        </Dropzone>
                        {/* <GalleryIcon /> */}
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab onClick = {handleSendMessage} color="primary" aria-label="add" className = {classes.send}><SendIcon className = {classes.sendIcon} /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
        {!!selectedFile && (
            <Typography className={classes.imageSelectionText}>Image Selected ({fileName})</Typography>
        )}

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

const useStyles = makeStyles((theme) => ({
    verticalCenter: {
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
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
  borderTop500: {
    borderTop: '1px solid #e0e0e0'
},
  borderRight500: {
      borderRight: '1px solid #e0e0e0'
  },
  borderBottom500: {
    borderBottom: '1px solid #e0e0e0',
    borderTop: '1px solid #e0e0e0',
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
unreadCount: {
    background: Colors.brandColor,
    color : Colors.white,
    height : '1.75rem',
    width : '1.75rem',
    borderRadius: "50%",
    minWidth: 20,
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
    borderBottom: '1px solid #e0e0e0',
    "&:hover": {
        borderRight : '2px solid #19A5D3'
    }
},
selectedItem: {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
    borderBottom: '1px solid #e0e0e0',
    borderRight: `3px solid ${theme.palette.primary.main}`,
    "&:hover": {
        borderRight : '2px solid #19A5D3'
    }
},
listingDate: {
    padding: "8px 16px"
},
messageImageSend: {
    width: 100,
    height: 100,
    objectFit: 'contain',
    float: 'right'
},
messageImageReceive: {
    width: 100,
    height: 100,
    objectFit: 'contain'
},
imageSelectionText: {
    textAlign: 'center',
    padding: "10px 0"
}
}));