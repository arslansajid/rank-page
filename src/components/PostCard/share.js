import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid,  Button } from '@material-ui/core';
import Colors from '../../static/_colors';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import { connect } from "react-redux";
import { sharePost } from "./action";
import Select , { components }  from 'react-select'
import { colourStyles } from "../../styles/ReactSelect";
import moment from "moment";
import {getAllUsers} from "./action"


const ShareCard = (props) => {
    const classes = useStyles();
    const { user, post, showTabs } = props;
    const [activeTab, setActiveTab] = useState(1);
    const [showComments, setShowComments] = useState(false);
    const [showShareDialog, setShowShareDialog] = useState(false);
    const [activeTabAccountPrivacy, setActiveTabAccountPrivacy] = useState(1);
    const [users , setUsers] = useState() 
    const [selectedUser, setSelectedUser] = useState(null);

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
        data.user_ids = selectedUser ? selectedUser.join() : null;
        data.share_type = activeTabAccountPrivacy;

        sharePost(data)
        .then((res) => {
            console.log("res", res)
            window.alert(res.data.message);
            setShowShareDialog(false);
        })
        .catch((err) => {
            console.log("err", err)
            setShowShareDialog(false);
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

          <Grid item xs={12} className = 'space-4'>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={users ? users : null}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                className='space-4'
                placeholder = "Search User"
                onChange={handleUserChange}
                styles={colourStyles}
                
              />
              {/* {categoriesError && <Typography className={classes.error}>Please fill in categories first</Typography>} */}
          </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={() => sharePostHandler()}>Share</Button>
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
})
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
}

export default connect(mapStateToProps)(ShareCard);




