
import React , {useState , useEffect}from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, colors  , TextField , Button } from "@material-ui/core";
import ListTile  from './listTile';
import Colors from '../../static/_colors';
import Select , { components }  from 'react-select'
import InputLabel from '@material-ui/core/InputLabel';
import {GetListItems}from './actions'
import { colourStyles } from "../../styles/ReactSelect";
import Config from "../../api/config";

const customStyles = {
  control: base => ({
    ...base,
    height: 44,
    minHeight: 42,
  })
};


const CreateList = (props) => {
    const { createNew  , continueNext , getData} = props;
    const classes = useStyles();
    const [listItems , setListItems] = useState([])
    const [selectedList  , setSelectedList] = useState(null)
    const [emptyList , setEmptyList] = useState(false);
    const [isloadingListItems , setIsLoadingListItems] = useState(true);


    useEffect(() =>{
      GetListItems()
      .then(res => {
        setListItems(res.data.data.list_items)
        setIsLoadingListItems(false)
      })
      
      // .catch((err) => { console.log('error api ', err)})
    } , [])

    const handleUpdateList = () => {
      if(selectedList && selectedList.length > 0) {
        setEmptyList(false)
        let listItemsObject = {}
        listItemsObject.list_items = selectedList
        getData(listItemsObject)
        continueNext()
      }
      else {
        setEmptyList(true)
      }
    }

    const handleSelectd = (value) => {
      setEmptyList(false)
      let List = [];
      value && value.length && value.map((item) => {
        List.push(item)
      })
      setSelectedList(List)

    }

    const updateSelectedItems = (id) => {
      let list = [...selectedList];
      let newList = [];
      list.map((item , index) => {
        if(item.id !== id)
        newList.push(item);
      })
      setSelectedList(newList);
    }

    const { Option } = components;
    const IconOption = props => (
      <Option {...props}>
        <img
          // src={props.data.image_url ? props.data.image_url : require('../../assets/images/user.jpg')}
          src={props.data.image ? `${Config.BASE_APP_URL}${props.data.image}` : require("../../assets/images/user.jpg")}
          style={{ width: 20 , height : 20 , borderRadius : '50%' ,  marginRight : 10 , alignItems : 'center'}}
          alt={props.data.title}
        />
        {props.data.title}
      </Option>
    );

    return (
        <>
        <div className = {classes.container}>
          {selectedList && selectedList.length > 0 ?  selectedList.map((item , index) => {
            return(
              <ListTile key={index} image = {item.image_url} name = {item.title} number = {index} id = {item.id} deleteItemCallBack = {(id) => {updateSelectedItems(id)}}/>
            )
          })
          : null }
          <div className='space-2'>
             <Select
              closeMenuOnSelect={false}
              isMulti = {true}
              isLoading = {isloadingListItems}
              placeholder = "Enter your new page"
              options={listItems}
              components={{ Option: IconOption , IndicatorSeparator:() => null}}
              // DropdownIndicator:() => null,
              getOptionLabel={option => option.title}
              getOptionValue={option => option.id}
              styles={customStyles}
              onChange={handleSelectd}
              styles={colourStyles}
            />
          </div>
          {emptyList && <InputLabel className = {classes.error}>Select pages to continue</InputLabel>}
          <Button
            onClick={handleUpdateList}
            className = {classes.buttonPosition}
          >
            <Typography className = 'bold'> Continue </Typography>
          </Button>
        </div>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    container : {

      padding : '5rem 0',
    },
    optionsMain : {
      border: '1px solid rgba(38, 38, 38, 0.12)',
      boxSizing: 'border-box',
      boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.12)',
      borderRadius : 10,
    },
    row: {
      display: "flex",
      alignItems: 'center',
      padding : '10px 15px',
      borderBottom: '1px solid #ddd',
  },
    avatar: {
      marginRight: 10,
      width: theme.spacing(4),
      height: theme.spacing(4),
  },
    text: {
      fontSize: 18,
  },
  marginL : {
    marginLeft: theme.spacing(1),
  },
  buttonPosition : {
    position : 'absolute',
    top : 13,
    right : 13,

  },
  selectInput : {
    height: '42px',
  },
  error : {
    color : Colors.red,
    textAlign: 'center',
    margin : '5px 0px',
    fontSize : '12px',
  },
})
)


export default CreateList;
