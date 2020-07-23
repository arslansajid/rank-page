import React , {useState} from 'react'
import { useDrag } from 'react-dnd';
import { Typography, Grid, colors , Button} from "@material-ui/core";
import TextField from '../../Common/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Colors from '../../../static/_colors';
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select'
import TextFieldM from '@material-ui/core/TextField';

const style = {
  
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const CreateListStep3 = (props) => {
    const classes = useStyles();
    const { errors, handleSubmit, control } = useForm();
    const [activeTabShare , setActiveTabShare] = useState(1);
    const [activeTabRearangement , setActiveTabRearangement] = useState(1);
    const [activeTabDisplayImages , setActiveTabDisplayImages] = useState(1);
    

    // const [{ opacity }, drag] = useDrag({
    //     item: { name, type },
    //     collect: (monitor) => ({
    //     opacity: monitor.isDragging() ? 0.4 : 1,
    //     }),
    // })

  return (
    <div className={classes.container}>
      <Typography className = 'space-2' variant="body1">Confirm list settings</Typography>
          <div className = 'space-4'>
          <InputLabel className ='space-2'>Share to</InputLabel>

          <span className='space-4'>
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
					</span>

          <Select
            closeMenuOnSelect={false}
            // components={animatedComponents}
            // defaultValue={[colourOptions[4], colourOptions[5]]}
            isMulti
            options={options}
            className='space-4'
            placeholder = "Search Category"
          />
          <Divider/>

          <div className='space-2'>
            <Typography className='space-2'>Allow Re-Arrangment of list(users can submit their opnion)</Typography>
            <span className='space-4'>
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
            </span>
          </div>

          <div className='space-2'>
            <Typography className='space-2'>Display Page Images</Typography>
            <span className='space-4'>
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
            </span>
          </div>
            
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
})
)


export default CreateListStep3;
