import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/ExpandMore';
import PoolIcon from '@material-ui/icons/Pool';
import Colors from '../../../static/_colors'
const CategoryCard = (props) => {
  const { isSelected , category , showSubCategory, selectedCategoryCallback , followCategoryCallback , categoryToFollow} = props;
  const classes = useStyles();
  
  const handleShowSubCategory = () => {
    console.log('show subcategory function called' , category)
    selectedCategoryCallback(category.name)
    if(showSubCategory){
    showSubCategory(category.sub_categories)}
  }

  return (
    
    <Card className={isSelected ? classes.root: classes.rootFade} variant="outlined" onClick = {()=> !! followCategoryCallback && followCategoryCallback(category.id)}>
      <CardContent>
        <Grid className={classes.verticalCenter}>
          <PoolIcon fontSize={"large"} />
          <Typography>{category.name}</Typography>
        </Grid>
      </CardContent>
      <Grid container justify="space-between" alignItems="center" className={classes.actionContainer} onClick={handleShowSubCategory}>
        <Typography>Pro</Typography>
        <MoreIcon className={classes.moreIcon} />
        <Typography>{category.count} Lists</Typography>
      </Grid>
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
  }));

export default CategoryCard;