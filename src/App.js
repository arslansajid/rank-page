import React, { Component } from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './configureStore';
import { makeStyles } from '@material-ui/core/styles';
import Colors from './static/_colors';

// Styles
import './App.scss';
import './common.scss'

// routes
import Routes from './routes';

// header and footer
import Header from './containers/Header'
import { Grid } from '@material-ui/core';

import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { theme } from './utils/MuiTheme';

//sidebars
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <Grid className={classes.main} container>
              <Grid className={classes.leftSidebar} item lg={2} md={2} sm={false} xs={false}>
                <LeftSidebar />
              </Grid>
              <Grid className={classes.routeContainer} item lg={8} md={8} sm={12} xs={12}>
                <Header />
                <Routes />
              </Grid>
              <Grid className={classes.rightSidebar} item lg={2} md={2} sm={false} xs={false}>
                <RightSidebar />
              </Grid>
            </Grid>
          </StylesProvider>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    background: Colors.background,
  },
  routeContainer: {
    padding: '0 1em',
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
}))

export default App;
