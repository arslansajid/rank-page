import React , {useState , useEffect} from 'react'
import { Typography, Grid, colors  , TextField , Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Colors from '../../../static/_colors';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select'

const style = {
  
}



const options = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'movies', label: 'Movies' }
]

const CreateListStep2 = (props) => {
    const classes = useStyles();
    // const { errors, handleSubmit, control } = useForm();
    const {continueNext} = props;
    const [ title , setTitle ] = useState(null);
    const [ titleError , setTitleError ] = useState(false);
    const [ categories , setCategories ] = useState(null);
    const [ categoriesError , setCategoriesError ] = useState(false);
    const [ description , setDescription ] = useState('');
    const [multiValue , setMultiValue ] = useState(null);
 
    const onSubmit = async (data) => {  
      console.log('handle submit called')
    }
    const onContinue = () => {
      if(title && categories){
        continueNext()
        console.log('bhaiaya all is well')
      }
      else if(!title){
        setTitleError(true)
      }
      else if (!categories){
        setCategoriesError(true)
      }
      else{
        console.log('something went wrong')
      }
    }
    const handleCategoryChange = (value) => {
      let categortyList = [];
      value && value.length && value.map((item) => {
        categortyList.push(item.value)
      })
      setCategories(categortyList)
    }

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


  return (
    <div className={classes.container}>
      <Typography className='space-4'>Please add the details of the list</Typography>
          <div className = 'space-4'>
            <InputLabel className ={`${classes.label} space-2`}>Title*</InputLabel> 
            <TextField
                type="text"
                name="title"
                placeholder="Enter title"
                defaultValue={''}
                fullWidth
                // className="text-field space-4"
                margin='dense'
                variant='outlined'
                onChange={(e) => {setTitleError(false) ; setTitle(e.target.value)}}
                className={'text-field space-4'}
                // className={classes.error}
                error = {titleError ? 'Title is required' : ''}
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
                onChange={handleCategoryChange}
                styles={colourStyles}
                
              />
              {categoriesError && <Typography className={classes.error}>Please fill in categories first</Typography>}
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
                // value={''}
                onChange={(e)=> {setDescription(e.target.value)}}
              />
              </div>
              <Button
                onClick={onContinue}
                className = {classes.buttonPosition}
              >
                <Typography> Continue </Typography>
              </Button>
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
    },
    buttonPosition : {
      position : 'absolute',
      top : 13,
      right : 13,

    },
    error : {
      color : Colors.red,
      textAlign: 'center',
      margin : '10px 0px'
    }
})
)


export default CreateListStep2;
