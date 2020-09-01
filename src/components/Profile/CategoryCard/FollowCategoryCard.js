import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/ExpandMore';
import PoolIcon from '@material-ui/icons/Pool';
import Colors from '../../../static/_colors';
import {followCategory} from "./action";

const CategoryCard = (props) => {
  const { selectedList , category, showSubCategory, followCategoryCallback, hideFollowIcon } = props;
  const classes = useStyles();

  const handleFollowCategory = (id) => {
    let data = {
      'follow_category_id': id
    };
    followCategory(data)
    .then((res) => {
      console.log('response here' , res.data)
      window.alert(res.data.message)
    })
    .catch((err) =>{
      window.alert("Error while following category")
    })
  }

  const handleMore = () => {
    if(showSubCategory){
      showSubCategory(category.sub_categories)}
  }

  return (
    
    <Card className={selectedList && selectedList.length && selectedList.includes(category.id) ?  classes.rootFade : classes.rootv} variant="outlined"  style = {{ position : 'relative'}}>
      <CardContent>
        <Grid className={classes.verticalCenter}>
          <PoolIcon fontSize={"large"} />
          <Typography>{category.name}</Typography>
        </Grid>
      </CardContent>
      <Grid container justify="space-between" alignItems="center" className={classes.actionContainer}>
        <Typography>Pro</Typography>
        <MoreIcon onClick={() => handleMore()} className={classes.moreIcon} />
        <Typography>{category.count} Lists</Typography>
      </Grid>
      {!hideFollowIcon && (
        <Grid onClick = {()=> handleFollowCategory(category.id)} className = {classes.plusIcon}><img className={"link"} src={require('../../../assets/icons/plus-circle-black.png')}/></Grid>
      )}
    </Card>
  );
}

const useStyles = makeStyles(theme => ({
    root: {
      border: '1px solid rgba(38, 38, 38, 0.12)',
      borderRadius: 8,
      margin: theme.spacing(1, 0, 0, 0),

      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1, 0, 0, 0),
      },
    },
    rootFade: {
      opacity: 0.6,
      filter: 'brightness(0.8)',
      border: '1px solid rgba(38, 38, 38, 0.12)',
      borderRadius: 8,
      margin: theme.spacing(1, 0, 0, 0),

      [theme.breakpoints.down('sm')]: {
        margin: theme.spacing(1, 0, 0, 0),
      },
    },
    actionContainer: {
      position: "relative",
      padding: "0.5em 1em",
      backgroundColor: "#EDF8FB"
    },
    moreIcon: {
      position: "absolute",
      left: 'calc(50% - 15px)',
      cursor: "pointer"
    },
    title: {
      fontSize: 14,
    },
    verticalCenter: {
      display: "flex",
      flexDirection: "column",
      alignItems: 'center',
      justifyContent: "center",
      minHeight: '5em',
    },
    followed : {
      background: Colors.brandColor,
    },
    plusIcon : {
       position : 'absolute',
       top : 10,
       right : 10,
    },
  }));

export default CategoryCard;