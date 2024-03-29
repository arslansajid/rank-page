import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './configureStore';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { theme } from './utils/MuiTheme';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import Colors from './static/_colors';
import AppMain from "./containers/AppMain";

//drag an drop
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Styles
import './App.scss';
import './common.scss'

// routes
import Routes from './routes';

// header and footer
import Header from './containers/Header';
import BottomNavigation from './components/BottomNavigation';

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
          <DndProvider backend={HTML5Backend}>
            <AppMain />
            <Grid className={classes.main} container>
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
            </DndProvider>
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
}))

export default App;
