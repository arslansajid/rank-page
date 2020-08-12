
import React, { useState , useEffect} from 'react'
import { Typography, Grid, colors, Button } from "@material-ui/core";
import LoadingSpinner from "../../components/Common/LoadingSpinner"
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm, get } from 'react-hook-form';
import Colors from '../../static/_colors';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import { PostListItem  , getAllUsers} from './actions';
import { colourStyles } from "../../styles/ReactSelect";


const options = [
  { value: '1', label: 'Alizeh shah' },
  { value: '2', label: 'User 2' },
  { value: '3', label: 'Test user' }
]

const CreateListStep3 = (props) => {
  const classes = useStyles();
  const { publish, listItems, getListData } = props;
  const { errors, handleSubmit, control } = useForm();
  const [activeTabShare, setActiveTabShare] = useState(listItems.activeTabShare ? listItems.activeTabShare : 1);
  const [activeTabRearangement, setActiveTabRearangement] = useState(listItems.activeTabRearangement ? listItems.activeTabRearangement : 1);
  const [activeTabDisplayImages, setActiveTabDisplayImages] = useState(listItems.activeTabDisplayImages ? listItems.activeTabDisplayImages : 1);
  const [selectedUser, setSelectedUser] = useState(listItems.selectedUser ? listItems.selectedUser : null);
  const [userError, setUserError] = useState(false);
  const [message, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [users , setUsers] = useState() 

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

  const handlePublish = () => {
    if (activeTabShare === 2 && (!selectedUser || selectedUser.length < 1)) {
      setUserError(true);
    }
    else {
      setUserError(false);

      let retainData = { ...listItems }    // to retain previous state of retainData
      retainData.setActiveTabShare = activeTabShare;
      retainData.activeTabDisplayImages = activeTabDisplayImages;
      retainData.activeTabRearangement = activeTabRearangement;
      retainData.selected = selectedUser ? selectedUser : null;
      getListData(retainData);

      let params = { ...listItems };
      if (params.list_items && params.list_items.length > 0) {
        let ids = params.list_items.map((item, index) => { return (item.id) })
        params.list_item_ids = ids.join();
      }
      params.share_type = activeTabShare;
      params.allow_rearrangement = activeTabRearangement;
      params.display_images = activeTabDisplayImages;
      params.user_ids = activeTabShare === 2 ? (selectedUser ? selectedUser.join() : null) : '';
      params.categories = params.categories ? params.categories.join() : null;

      console.log('published data', params);
      setIsLoading(true);
      PostListItem(params)
        .then((res) => {
          console.log('success', res.data);
          setIsLoading(false);
          if (res.data.success) {
            publish()
          }
          else if (!res.data.success) {
            setErrorMessage(res.data.message)
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log('error in publishing', err)
        })
    }
  }

  const handleSelectd = (value) => {
    let userList = [];
    value && value.length && value.map((item) => {
      userList.push(item.value)
    })
    setSelectedUser(userList)
  }


  return (
    <>
      {
        isLoading && (
          <LoadingSpinner
            loading={isLoading}
            text="Creating List..."
            size="large"
          />
        )
      }
      <div className={classes.container}>
        {message && <Typography className={classes.error}>{message}</Typography>}
        <Typography className='space-2' variant="body1">Confirm list settings</Typography>
        <div className='space-4'>
          <InputLabel className={`${classes.label} space-2`}>Share to</InputLabel>

          <div className='space-4'>
            <Button className={activeTabShare === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => { setActiveTabShare(1); setUserError(false) }}>
              <Typography>
                Public
              </Typography>
            </Button>
            <Button className={activeTabShare === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabShare(2)}>
              <Typography>
                Private
              </Typography>
            </Button>
          </div>

          {activeTabShare === 2 && 
          <Select
            closeMenuOnSelect={false}
            isMulti
            // options={options}
            className='space-4'
            placeholder="Search Users"
            styles={colourStyles} 
            options={users ? users : []}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            onChange={handleSelectd}
          />
          }
          {userError && <Typography className={classes.error}>Select user first</Typography>}

          <Divider className='space-4' />

          <div className='space-2'>
            <InputLabel className={`${classes.label} space-2`}>Allow Re-Arrangment of list(users can submit their opnion)</InputLabel>
            <div className='space-4'>
              <Button className={activeTabRearangement === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabRearangement(1)}>
                <Typography>
                  Yes
                </Typography>
              </Button>
              <Button className={activeTabRearangement === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabRearangement(2)}>
                <Typography>
                  No
                </Typography>
              </Button>
            </div>
          </div>

          <div className='space-2'>
            <InputLabel className={`${classes.label} space-2`}>Display Page Images</InputLabel>
            <div className='space-4'>
              <Button className={activeTabDisplayImages === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabDisplayImages(1)}>
                <Typography>
                  Yes
                </Typography>
              </Button>
              <Button className={activeTabDisplayImages === 2 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabDisplayImages(2)}>
                <Typography>
                  No
                </Typography>
              </Button>
            </div>
          </div>

          <Button
            onClick={handlePublish}
            className={classes.buttonPosition}
          >
            <Typography> Publish </Typography>
          </Button>

        </div>
      </div>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  container: {
    padding : '3rem 0',
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
  buttonPosition: {
    position: 'absolute',
    top: 13,
    right: 13,

  },
  label: {
    color: Colors.black,
  },
  error: {
    color: Colors.red,
    textAlign: 'center',
    margin: '10px 0px'
  }
})
)


export default CreateListStep3;

