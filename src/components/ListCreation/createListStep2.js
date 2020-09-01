
import React , {useState , useEffect} from 'react'
import { Typography, Grid, colors  , TextField , Button } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Colors from '../../static/_colors';
import Divider from '@material-ui/core/Divider';
import Select from 'react-select'
import {getAllCategories} from './actions'
import { colourStyles } from "../../styles/ReactSelect";


const CreateListStep2 = (props) => {
    const classes = useStyles();
    const {continueNext , getListData , listItems} = props;
    const [ title , setTitle ] = useState(listItems.title ? listItems.title : null);
    const [ titleError , setTitleError ] = useState(false);
    const [allCategories , setAllCategories ] = useState(null);
    const [ categories , setCategories ] = useState(listItems.categories ? listItems.categories : null);
    const [ categoriesError , setCategoriesError ] = useState(false);
    const [ description , setDescription ] = useState(listItems.description ? listItems.description : '');
    const [multiValue , setMultiValue ] = useState(null);
    const [maxLimitError , setMaxLimitError ] = useState(false);


    useEffect(() =>{
      getAllCategories()
      .then((res)=>{setAllCategories(res.data.data.all_categories)})
      .catch((err) => console.log(err , 'categories error'))
    }, [])
    


    const onContinue = () => {
      if(!!title && !!categories){
        let list_item = listItems
        list_item.title = title;
        list_item.categories = categories;
        list_item.description = description;
        continueNext()
        getListData(list_item)
        
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
      setCategoriesError(false)
      let categoryList = [];
      value && value.length && value.map((item) => {
        categoryList.push(item.id)
      })
      setCategories(categoryList)
    }

    const getSelectedCategories = () => {
        let selectedCategories = []
        categories && categories.length > 0 && categories.map((item , index)=>{
          selectedCategories.push({name : item.title , id : item.id})
        })
        return selectedCategories;
    }

    const handleDescription = (description) => {
      if(description.length < 50){
      setMaxLimitError(false)
      setDescription(description)
      }
      else {
        setMaxLimitError(true)
      }
    }


  return (
    <div className={classes.container}>
      <Typography className='space-4'>Please add the details of the list</Typography>
          <div className = 'space-4'>
            <InputLabel className ={`${classes.label} space-2`}>Title*</InputLabel> 
            <TextField
                type="text"
                name="title"
                placeholder="Enter title"
                defaultValue={listItems.title ? listItems.title : null}
                fullWidth
                margin='dense'
                variant='outlined'
                onChange={(e) => {setTitleError(false) ; setTitle(e.target.value)}}
                className={'text-field space-4'}
              />
              {titleError && <Typography className={classes.error}>Please enter title first</Typography>}
            <Divider/>
            </div>
            
            <div className = 'space-4'>
              <InputLabel className ={`${classes.label} space-2`}>Categories*</InputLabel>
              <Select
                closeMenuOnSelect={false}
                isMulti
                // value={getSelectedCategories()}
                options={allCategories ? allCategories : null}
                getOptionLabel={option => option.name}
                getOptionValue={option => option.id}
                className='space-4'
                placeholder = "Search Category"
                onChange={handleCategoryChange}
                styles={colourStyles}
                
              />
              {categoriesError && <Typography className={classes.error}>Please fill in categories to continue</Typography>}
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
                placeholder = "Enter Description(50 characters)"
                onChange={(e)=> {handleDescription(e.target.value)}}
                defaultValue={listItems.description ? listItems.description : null}
              />
              </div>
              { maxLimitError && <Typography className = {classes.error}>Decription should not exceed 50 characters</Typography>}
              <Button
                onClick={onContinue}
                className = {classes.buttonPosition}
              >
                <Typography className = 'bold'> Continue </Typography>
              </Button>
    </div>
  )
}

const useStyles = makeStyles((theme) => ({
    container: {
      padding : '3rem 0',
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
      // textAlign: 'center',
      margin : '5px 0px',
      fontSize : '12px',
    }
})
)


export default CreateListStep2;

