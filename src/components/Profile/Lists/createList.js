import React , {useState , useEffect}from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Grid } from '@material-ui/core';
import ListTile  from './listTile';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import {GetListItems }from './actions'



const data = [
  {name : 'Zeeshan Sarwar'},
  {name : 'Arslan Sajid'},
  // {name : 'Leonardo DiCaprio'},
  // {name : 'Johnny Depp'},
]



const CreateList = (props) => {
    const { createNew } = props;
    const classes = useStyles();

    useEffect(() =>{
      GetListItems()
      .then(res => { console.log('list data', res.data)})
      .catch((err) => { console.log('errro api ', err)})

    })


    return (
        <>
        <div>
          {data && data.length > 0 ?  data.map((item , index) => {
            return(
              <ListTile name = {item.name} number = {index}/>
            )
          })
          : null }
          <div className = {classes.optionsMain}>
            <Grid container alignItems="center" justify="space-between">
                {[...Array(3)].map((item, index) => {return(
                <Grid className={classes.row} item xs = {12}>
                  <Avatar className={classes.avatar} alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                  <Typography className={classes.text}>Zeeshan Sarwar</Typography>
                </Grid>
                )})}
                <Grid item xs = {12} className={classes.row} onClick={createNew}>
                  <img src = {require('../../../assets/icons/plus-circle-black.png')}/>
                  <Typography variant="body1" className = {classes.marginL}>Create a new page for “Enter your new page”</Typography>
                </Grid>
            </Grid>
          </div>


        </div>



        </>
    )

}

const useStyles = makeStyles((theme) => ({
    container : {

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
  }
})
)


export default CreateList;