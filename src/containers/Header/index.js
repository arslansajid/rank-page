import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import BackIcon from '@material-ui/icons/ArrowBack';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withRouter, useHistory } from 'react-router-dom';
import Colors from '../../static/_colors';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 280;

const Header = (props) => {
    const classes = useStyles();
    const { location, history } = props;
    const [showBackButton, setShowBackButton] = React.useState(false);

    React.useEffect(() => {
        if (location.pathname !== "/") {
            setShowBackButton(true);
        } else {
            setShowBackButton(false);
        }
    }, [props.location])

    return (
            <AppBar elevation={0} position="static" classes={{ root: classes.headerBar }}>
                <Toolbar className={classes.container}>
                    {
                        showBackButton && (
                            <IconButton onClick={() => history.goBack()}>
                                <BackIcon />
                            </IconButton>
                        )
                    }
                    <Typography variant="h6" className={classes.routeTitle}>
                        {location.pathname === "/" ? "Rank Page" : location.pathname.split("/")[1]}
                    </Typography>
                </Toolbar>
            </AppBar>
    );
};

const useStyles = makeStyles((theme) => ({
    headerBar: {
        backgroundColor: Colors.white,
        color: Colors.black,
        boxShadow: '#fff',
        minHeight: 64,
        marginBottom: 10,
        padding: "0 5px",

        border: '1px solid rgba(38, 38, 38, 0.12)',
        borderRadius: '8px',
    },
    container: {
        padding: '0px !important',
        position: 'relative'
    },
    routeTitle: {
        textTransform: 'capitalize',
        position: "absolute",
        left: 'calc(50% - 2.5em)',

        // [theme.breakpoints.down('sm')]: {
        //     left: 'calc(50% - 30px)',
        // },
    }
}));

Header.defaultProps = {};

export default withRouter(Header);
