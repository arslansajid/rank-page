import React from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store from './configureStore';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { theme } from './utils/MuiTheme';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import Colors from './static/_colors';
import AppContainer from "./containers/App";
import {Router} from "react-router-dom";
import {createBrowserHistory} from 'history';

// Styles
import './App.scss';
import './common.scss'

const App = () => {
  const classes = useStyles();

  const history = createBrowserHistory(); 
  return (
    <Provider store={store}>
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          <StylesProvider injectFirst>
            <AppContainer history={history} />
          </StylesProvider>
        </MuiThemeProvider>
      </Router>
    </Provider>
  );
}

const useStyles = makeStyles((theme) => ({
  
}))

export default App;
