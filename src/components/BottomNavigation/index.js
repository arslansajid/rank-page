import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListIcon from '@material-ui/icons/List';

const BottomNavigationBar = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [value, setValue] = React.useState('/');

  useEffect(() => {
        setValue(history.location.pathname);
  }, [history.location])

  const handleChange = (event, newValue) => {
    console.log(props);
    setValue(newValue);
    history.push(newValue)
  };

  return (
    <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
      <BottomNavigationAction label="Home" value="/" icon={<HomeIcon />} />
      <BottomNavigationAction label="Explore" value="/explore" icon={<ExploreIcon />} />
      <BottomNavigationAction label="Favorites" value="/favorites" icon={<FavoriteIcon />} />
      <BottomNavigationAction label="Menu" value="/menu" icon={<ListIcon />} />
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
        borderTop: '1px solid rgba(38, 38, 38, 0.12)',
      
        [theme.breakpoints.down('sm')]: {
            display: 'flex',
            justifyContent: 'space-between'
        },
    },
  }));

export default BottomNavigationBar;

