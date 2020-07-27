import React , {useState} from 'react'
import { Typography, Grid, colors , Button} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Colors from '../../../static/_colors';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select'

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
      let params = {...listItems};
      params.share_type = activeTabShare;
      params.allow_raarrangement = activeTabRearangement;
      params.display_images = activeTabDisplayImages;
      params.user_ids = selectedUser;
      console.log('published data' , params);


      // publish()
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
      <Typography className ='space-2' variant="body1">Confirm list settings</Typography>
          <div className ='space-4'>
          <InputLabel className ={`${classes.label} space-2`}>Share to</InputLabel>

          <div className='space-4'>
						<Button className={activeTabShare === 1 ? classes.choiceButtonActive : classes.choiceButton} variant="contained" onClick={() => setActiveTabShare(1)}>
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
            onClick={()=> handlePublish()}
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
})
)


export default CreateListStep3;
