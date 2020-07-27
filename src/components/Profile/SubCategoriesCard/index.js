import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

const SubCategoryCard = (props) => {
  const { isSelected , subCategory } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardMedia
        className={classes.img}
        image={require('../../../assets/icons/categories/basketball.svg')}
      />
    </Card>
  );
}

const useStyles = makeStyles(theme => ({
    root: {
      height: 120,
      border: '1px solid rgba(38, 38, 38, 0.12)',
      borderRadius: 8,

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
    content : {
      padding : '0px',
      height: 110
    },
    img: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
  },
  }));

export default SubCategoryCard;