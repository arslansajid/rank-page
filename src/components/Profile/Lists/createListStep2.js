import React , {useState , useEffect} from 'react'
import { Typography, Grid, colors  , TextField , Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';
import Colors from '../../../static/_colors';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select'
import {getAllCategories} from './actions'





const options = [
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'sports', label: 'Sports' },
  { value: 'movies', label: 'Movies' }
]

const CreateListStep2 = (props) => {
    const classes = useStyles();
    // const { errors, handleSubmit, control } = useForm();
    const {continueNext , getListData , listItems} = props;
    const [ title , setTitle ] = useState(null);
    const [ titleError , setTitleError ] = useState(false);
    const [allCategories , setAllCategories ] = useState(null);
    const [ categories , setCategories ] = useState(null);
    const [ categoriesError , setCategoriesError ] = useState(false);
    const [ description , setDescription ] = useState('');
    const [multiValue , setMultiValue ] = useState(null);
 
    const onSubmit = async (data) => {  
      console.log('handle submit called')
    }
    console.log('data in second comp' , listItems)

    useEffect(() =>{
      getAllCategories()
      .then((res)=>{setAllCategories(res.data.data.all_categories)})
      .catch((err) => console.log(err , 'categories error'))
    }, [])
    console.log(categories)


    const onContinue = () => {
      if(title && categories){
        let list_item = listItems
        list_item.title = title;
        list_item.categories = categories;
        list_item.description = description;
        continueNext()
        getListData(list_item)
        // PostListItem(list_item)
        // .then((res)=> {
        //   console.log('resuest sumbitted succesfully' , res.data)
        //   continueNext()
        // })
        // .catch((err)=> { console.log(err , 'error here')})
        
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
      console.log('handle categories' , value)
      setCategoriesError(false)
      let categoryList = [];
      value && value.length && value.map((item) => {
        categoryList.push(item.id)
      })
      setCategories(categoryList)
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
                margin='dense'
                variant='outlined'
                onChange={(e) => {setTitleError(false) ; setTitle(e.target.value)}}
                className={'text-field space-4'}
                error = {titleError ? 'Title is required' : ''}
              />
            <Divider/>
            </div>
            
            <div className = 'space-4'>
              <InputLabel className ={`${classes.label} space-2`}>Categories*</InputLabel>
              <Select
                closeMenuOnSelect={false}
                isMulti
                // options={options}
                options={allCategories ? allCategories : null}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
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
