import React , {useState} from 'react'
import { Typography, Grid, colors , Button} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Colors from '../../../static/_colors';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select';
import {PostListItem} from './actions'

const style = {
  
}

const options = [
  { value: '1', label: 'Alizeh shah' },
  { value: '2', label: 'User 2' },
  { value: '3', label: 'Test user' }
]

const CreateListStep3 = (props) => {
    const classes = useStyles();
    const {publish , listItems} = props;
    const { errors, handleSubmit, control } = useForm();
    const [activeTabShare , setActiveTabShare] = useState(1);
    const [activeTabRearangement , setActiveTabRearangement] = useState(1);
    const [activeTabDisplayImages , setActiveTabDisplayImages] = useState(1);
    const [selectedUser , setSelectedUser] = useState(null);
    const [ userError , setUserError] = useState(false);
    const [message , setErrorMessage] = useState(null);

    const colourStyles = {
      control: styles => ({ ...styles, backgroundColor: 'white' }),
      multiValue: (styles) => {
        return {
          ...styles,
          backgroundColor: Colors.brandColor,
          color: Colors.white,
        };
      },
      multiValueLabel: (styles) => ({
        ...styles,
        color: Colors.white,
      }),
      multiValueRemove: (styles) => ({
        ...styles,
        color: Colors.white,
        ':hover': {
          backgroundColor: Colors.brandColor,
          color: 'white',
        },
      }),
    };

    const handlePublish = () => {
      if(activeTabShare === 2 && (!selectedUser || selectedUser.length < 1)){
        setUserError(true);
      }
      else {
        setUserError(false);
        let params = {...listItems};
        if(params.list_items && params.list_items.length > 0) {
          let ids = params.list_items.map((item, index) => {return(item.id)})
          params.list_item_ids  = ids.join();
        }
        params.share_type = activeTabShare;
        params.allow_rearrangement = activeTabRearangement;
        params.display_images = activeTabDisplayImages;
        // params.user_ids = selectedUser ? selectedUser.join() : null;
        params.user_ids = activeTabAccountPrivacy === 2 ? (selectedUser ? selectedUser.join() : null) : '';
        params.categories = params.categories.join();

        PostListItem(params)
        .then((res)=>{
          if(res.data.success){
            publish()
          }
          else if (!res.data.success){
            setErrorMessage(res.data.message)
          }
        })
        .catch((err) => { console.log('error in publishing' , err)})

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
    <div className={classes.container}>
      {/* {message && <Typography>{message}</Typography>} */}
      <Typography className ='space-2' variant="body1">Confirm list settings</Typography>
          <div className ='space-4'>
          <InputLabel className ={`${classes.label} space-2`}>Share to</InputLabel>

          <div className='space-4'>
						<Button className={activeTabShare === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => {setActiveTabShare(1) ; setUserError(false)}}>
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

          <Select
            closeMenuOnSelect={false}
            isMulti
            options={options}
            className='space-4'
            placeholder = "Search Users"
            styles={colourStyles}
            getOptionLabel={option => option.label}
            getOptionValue={option => option.value}
            onChange={handleSelectd}
          />
          {userError && <Typography className={classes.error}>Select user first</Typography>}
          <Divider className='space-4'/>

          <div className='space-2'>
            <InputLabel className ={`${classes.label} space-2`}>Allow Re-Arrangment of list(users can submit their opnion)</InputLabel>
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
            <InputLabel className ={`${classes.label} space-2`}>Display Page Images</InputLabel>
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
            className = {classes.buttonPosition}
          >
            <Typography> Publish </Typography>
          </Button>
            
          </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
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
      color: Colors.black,
    },
    error : {
      color : Colors.red,
      textAlign: 'center',
      margin : '10px 0px'
    }
})
)


export default CreateListStep3;
