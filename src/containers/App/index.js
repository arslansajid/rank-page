import React, {useEffect} from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// routes
import Routes from '../../routes';

// header and footer
import Header from '../Header';
import BottomNavigation from '../../components/BottomNavigation';

//sidebars
import LeftSidebar from '../../components/LeftSidebar';
import RightSidebar from '../../components/RightSidebar';

import { connect } from 'react-redux';
import { checkIfLoggedIn } from "../../api/actions";
import { userLogin } from "../../actions/LoginActions";

const AppContainer = (props) => {
    const classes = useStyles();
    const {history} = props;

    useEffect(() => {
        checkIfLoggedIn()
        .then((res) => {
            console.log("res ###", res.data.data.user)
            props.dispatch(userLogin(res.data.data.user));
        })
        .catch((err) => {
            console.log("### USER IS NOT SIGNED IN !!! ###")
        })
    }, [])

		return (
			<>
            <Grid container>
              <Grid className={classes.leftSidebar} item lg={3} md={3} sm={false} xs={false}>
                <LeftSidebar />
              </Grid>
              <Grid className={classes.routeContainer} item lg={6} md={12} sm={12} xs={12}>
                <Header />
                <Routes />
              </Grid>
              <Grid className={classes.rightSidebar} item lg={3} md={3} sm={false} xs={false}>
                <RightSidebar history={history} />
              </Grid>
            </Grid>
            <BottomNavigation history={history} />
            </>
		);
    }
    
const useStyles = makeStyles((theme) => ({
      routeContainer: {
        padding: '0 2em',
    
        [theme.breakpoints.down('sm')]: {
          padding: '0 1em',
        },
      },
      leftSidebar: {
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        }
      },
      rightSidebar: {
        [theme.breakpoints.down('sm')]: {
          display: 'none',
        }
      }
    })
)

function mapStateToProps(state) {
    return {
        user: state.user,
    };
  }
  

export default connect(mapStateToProps)(AppContainer);
