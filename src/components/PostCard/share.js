import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid,  Button , TextField  } from '@material-ui/core';
import Colors from '../../static/_colors';
import  Typography  from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from "react-redux";
import Divider from '@material-ui/core/Divider';
import { sharePost } from "./action";
import Select , { components }  from 'react-select'
import { colourStyles } from "../../styles/ReactSelect";
import ShareSocialLinks from '../ShareSocialLinks'
import moment from "moment";
import {getAllUsers} from "./action"


const ShareCard = (props) => {
    const classes = useStyles();
    const { user, post, showTabs, close } = props;
    const [activeTab, setActiveTab] = useState(1);
    const [showComments, setShowComments] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [activeTabAccountPrivacy, setActiveTabAccountPrivacy] = useState(1);
    const [users , setUsers] = useState() 
    const [selectedUser, setSelectedUser] = useState(null);
    const [comment , setComment] = useState('')

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

    const handleUserChange = (value) => {
      console.log('values hre' , value)
      let userList = [];
      value && value.length > 0 && value.map((item) => {
      userList.push(item.id)
      })
      setSelectedUser(userList)
    }


    const sharePostHandler = () => {
        // const data = {
        //     'share_post_id': post ? post.id : null,
        //     'user_ids': activeTabAccountPrivacy === 2 ? (selectedUser ? selectedUser.join() : null) : '',
        //     'share_type': activeTabAccountPrivacy, //1 for public 2 for private
        // }
        // console.log('selected user ids' , selectedUser.join())
        let data = {};
        data.share_post_id = post ? post.id : null;
        data.user_ids = activeTabAccountPrivacy === 2 ? (selectedUser ? selectedUser.join() : null) : '';
        data.share_type = activeTabAccountPrivacy;

        sharePost(data)
        .then((res) => {
            console.log("res", res)
            // window.alert(res.data.message);
            close();
        })
        .catch((err) => {
            console.log("err", err)
            setShowShareDialog();
        })
    }


    return (
        <>
        <div className = {`${classes.container}`}>
          <Grid  container>
          <Grid item xs={12} className = 'space-4'>
            <InputLabel className ={`${classes.label} space-2`}>Share to</InputLabel>
              <Button className={activeTabAccountPrivacy === 1 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabAccountPrivacy(1)}>
                <Typography>
                  Public
                </Typography>
              </Button>
              <Button className={activeTabAccountPrivacy === 2 ?  classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabAccountPrivacy(2)}>
                <Typography>
                  Private
                </Typography>
              </Button>
            </Grid>

          {activeTabAccountPrivacy === 2 ? (
            <Grid item xs={12} className = 'space-4'>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={users ? users : []}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                className='space-4'
                placeholder = "Search User"
                onChange={handleUserChange}
                styles={colourStyles}
                
              />
            </Grid>
          )
          :
          null
        }
        <Divider/>
        <Grid item xs={12} className = {`${classes.center} space-4`}>
          <InputLabel className ={`${classes.label}`}>Add your comment</InputLabel>
            <TextField
                  className={classes.greyInput}
                  margin='dense'
                  variant='outlined'
                  multiline={true}
                  rows={2}
                  fullWidth
                  onChange={(e)=> {setComment(e.target.value)}}
                  defaultValue={''}
              />
        </Grid> 

        <Grid item xs = {12} className={`space-4`}>
          <Typography className={`${classes.label} space-2`}>Share to other social networks</Typography>
          <ShareSocialLinks Link = {`https://rank-page.web.app/list-detail/${post.id ? post.id : null}`}/>
        </Grid>

      </Grid>
      <Button
        onClick={() => sharePostHandler()}
        className = {classes.buttonPosition}
      >
        <Typography> Share </Typography>
      </Button>
    </div>
    </>
    )

}

const useStyles = makeStyles((theme) => ({
    container: {
      padding: '3rem 0',
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
    buttonPosition : {
      position : 'absolute',
      top : 13,
      right : 13,
  
    },
    label : {
      color : Colors.black,
    },
    greyInput: {
      borderRadius: 8,
      background: Colors.inputBg,
    },
    image : {
      marginRight : 10,
      width : '2rem',
    },
    center : {
      alignItems : "center",
    }
})
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(ShareCard);




