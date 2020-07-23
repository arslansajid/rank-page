import React from 'react'
import { useDrag } from 'react-dnd';
import { Typography, Grid, colors } from "@material-ui/core";
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

const CreateListStep2 = (props) => {
    const classes = useStyles();
    const { errors, handleSubmit, control } = useForm();

    // const [{ opacity }, drag] = useDrag({
    //     item: { name, type },
    //     collect: (monitor) => ({
    //     opacity: monitor.isDragging() ? 0.4 : 1,
    //     }),
    // })

  return (
    <div className={classes.container}>
      <Typography className = 'space-2' variant="">Please add the details of the list</Typography>
        {/* <Grid container> */}
          <div className = 'space-4'>
          <InputLabel className = 'space-2'>Share to</InputLabel>
          <TextField
              type="text"
              name="title"
              rules={{ required: 'This field is required' }}
              control={control}
              error={errors.title ? true : false}
              placeholder="Enter title"
              defaultValue={''}
              className="text-field space-4"
            />
            <Divider/>
            </div>
            
            <div className = 'space-4'>
              <InputLabel className = 'space-2'>Categories*</InputLabel>
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
            </div>
            <div className = 'space-4'>
              <InputLabel className = 'space-2'>Description (optional)</InputLabel>
              <textarea  rows = {4} placeholder = "Enter Description(140 characters)" style ={{width: '100%',  border : '1px solid rgba(38, 38, 38, 0.12)' , borderRadius: '5px' , padding : '10px'}}/>
            </div>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
    },
})
)


export default CreateListStep2;
