import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';

const BottomNavigationBar = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState('/');

  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.history.push(newValue)
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
      <BottomNavigationAction label="Favorites" value="favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Menu" value="menu" icon={<ListIcon />} />
        <BottomNavigationAction label="Profile" value="/profile/lists" icon={<AccountIcon />} />
    </BottomNavigation>
  );
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        display: 'none',
      
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-between'
        },
    },
  }));

export default BottomNavigationBar;

