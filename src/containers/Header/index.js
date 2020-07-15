import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { Link, withRouter } from 'react-router-dom';
import nav from '../../static/_nav';
import Colors from '../../static/_colors';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

function ElevationScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 1 : 0,
    });
}

const Header = (props) => {
    const classes = useStyles();
    const [sideCartOpen, setSideCartOpen] = React.useState(false);

    const toggleDrawer = () => {
        setSideCartOpen(!sideCartOpen)
    }

    const onDrawerItemPress = () => {
        setSideCartOpen(false);
    }

    React.useEffect(() => {
		console.log(props.location.pathname)
    }, []);

    return (
        <ElevationScroll {...props}>
            <AppBar position="static" classes={{ root: classes.headerBar }}>
                <Drawer
                    open={sideCartOpen}
                    onClose={() => toggleDrawer()}
                    className={classes.sideDrawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <div className={classes.drawerHeader}>
                        <Typography>Rank-App</Typography>
                        <IconButton onClick={toggleDrawer}>

                            <CloseIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        {
                            nav.items.map((item, index) => {
                                return (
                                    <Link key={index} to={item.url}>
                                        <ListItem onClick={() => onDrawerItemPress()} button>
                                            <ListItemText primary={item.name} />
                                        </ListItem>
                                    </Link>
                                )
                            })
                        }
                    </List>
                </Drawer>
                <Toolbar className={classes.container}>
                    <IconButton
                        edge='start'
                        onClick={() => toggleDrawer()}
                        className={classes.menuButton}
                        color='inherit'
                        aria-label='menu'>
                        <MenuIcon />
                    </IconButton>
                    <Link className={classes.logoContainer} to='/'>
                        Rank App
                    </Link>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    );
};

const useStyles = makeStyles((theme) => ({
    // root: {
    //     flexGrow: 1,
    // },
    menuButton: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block',
            marginRight: theme.spacing(1),
        },
    },
    logoContainer: {
        flexGrow: 1,
        [theme.breakpoints.down('sm')]: {
            marginTop: 5,
        },
    },
    logo: {
        width: 50,
        height: 28,
        objectFit: 'contain',
        flexGrow: 0.5,
    },
    headerBar: {
        backgroundColor: Colors.white,
        color: Colors.black,
        boxShadow: '#fff',
        minHeight: 64,
        justifyContent: 'center',
        alignItems: 'center',

        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: '8px',
    },
    navButton: {
        fontSize: 20,
        lineHeight: '29px',
        color: Colors.black,
        textTransform: 'capitalize',
        marginRight: '15px',
    },
    navButtonSelected: {
        fontSize: 20,
        lineHeight: '29px',
        color: Colors.appRed,
        textTransform: 'capitalize',
        marginRight: '15px',
    },
    container: {
        padding: '0px !important',
    },
    blackContainer: {
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    selectedBorder: {
        background: Colors.appRed,
        width: 4,
        height: 20,
        position: 'absolute',
        top: -12,
    },
    sideDrawer: {
        minWidth: "30vw",
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'space-between',
    },
    drawerPaper: {
        width: drawerWidth,
        background: "white"
    },
    drawerIcon: {
        width: "31px",
        height: "31px",
        objectFit: "contain"
    }
}));

Header.defaultProps = {};

export default withRouter(Header);
