import React from 'react'
import { Typography, Grid, colors  , TextField} from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Colors from '../../../static/_colors';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select'

const style = {
  
}

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

const CreateListStep2 = (props) => {
    const classes = useStyles();
    const { errors, handleSubmit, control } = useForm();

  return (
    <div className={classes.container}>
      <Typography className='space-4'>Please add the details of the list</Typography>
        {/* <Grid container> */}
          <div className = 'space-4'>
            <InputLabel className ={`${classes.label} space-2`}>Title*</InputLabel> 
            <TextField
                type="text"
                name="title"
                rules={{ required: 'This field is required' }}
                control={control}
                error={errors.title ? true : false}
                placeholder="Enter title"
                defaultValue={''}
                fullWidth
                className="text-field space-4"
                margin='dense'
				        variant='outlined'
              />
            <Divider/>
            </div>
            
            <div className = 'space-4'>
              <InputLabel className ={`${classes.label} space-2`}>Categories*</InputLabel>
              <Select
                closeMenuOnSelect={false}
                isMulti
                options={options}
                className='space-4'
                placeholder = "Search Category"
              />
              <Divider/>
            </div>
            <div className = 'space-4'>
              <InputLabel className ={`${classes.label} space-2`}>Description (optional)</InputLabel>
              <TextField
                className={classes.greyInput}
                margin='dense'
                variant='outlined'
                multiline={true}
                        rows={3}
                fullWidth
                value={''}
              />
              </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
    },
    greyInput: {
      borderRadius: 8,
      background: Colors.inputBg,
    },
    label : {
      color : Colors.black,
    }
})
)


export default CreateListStep2;
