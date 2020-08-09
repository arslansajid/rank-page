
import React , {useState , useEffect}from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, colors  , TextField , Button } from "@material-ui/core";
import ListTile  from './listTile';
import Select , { components }  from 'react-select'
import {GetListItems}from './actions'
import { colourStyles } from "../../styles/ReactSelect";


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
    const [listItems , setListItems] = useState(null)
    const [selectedList  , setSelectedList] = useState(null)

    useEffect(() =>{
      GetListItems()
      .then(res => {setListItems(res.data.data.list_items)})
      .catch((err) => { console.log('error api ', err)})
    } , [])

    const handleUpdateList = () => {
      let listItemsObject = {}
      listItemsObject.list_items = selectedList
      getData(listItemsObject)
      continueNext()

    }
    const handleSelectd = (value) => {
      let List = [];
      value && value.length && value.map((item) => {
        List.push(item)
      })
      setSelectedList(List)

    }

    const { Option } = components;
    const IconOption = props => (
      <Option {...props}>
        <img
          src={'https://img.icons8.com/color/search/96'}
          style={{ width: 20 , marginRight : 10 , alignItems : 'center', }}
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
              <ListTile key={index} name = {item.title} number = {index}/>
            )
          })
          : null }
          {/* <div className = {classes.optionsMain}>
            <Grid container alignItems="center" justify="space-between">
                {listItems && listItems.length>0 && listItems.map((item, index) => {return(
                <Grid key={index} className={classes.row} item xs = {12}>
                  <Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                <Typography className={classes.text}>{item.title}</Typography>
                </Grid>
                )})}
                <Grid item xs = {12} className={`${classes.row} space-2`} onClick={createNew}>
                  <img src = {require('../../../assets/icons/plus-circle-black.png')}/>
                  <Typography variant="body1" className = {classes.marginL}>Create a new page for “Enter your new page”</Typography>
                </Grid>
            </Grid>
          </div> */}
          <div>
             <Select
              closeMenuOnSelect={false}
              isMulti = {true}
              placeholder = "Enter your new page"
              options={listItems}
              components={{ Option: IconOption ,  DropdownIndicator:() => null, IndicatorSeparator:() => null}}
              getOptionLabel={option => option.title}
              getOptionValue={option => option.id}
              styles={customStyles}
              onChange={handleSelectd}
              styles={colourStyles}
              // menuPlacement="top"
            />
          </div>
          <Button
            onClick={handleUpdateList}
            className = {classes.buttonPosition}
          >
            <Typography> Continue </Typography>
          </Button>
        </div>
        </>
    )

}

const useStyles = makeStyles((theme) => ({
    container : {

      padding : '3rem 0',
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
})
)


export default CreateList;
