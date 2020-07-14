import React, { Component } from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './configureStore';

// Styles
import './App.scss';

// routes
import Routes from './routes';

// header and footer
import Header from './containers/Header'
import { Grid, Container } from '@material-ui/core';

import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { theme } from './utils/MuiTheme';

//sidebars
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <StylesProvider injectFirst>
                <Container maxWidth="xl">
                <Grid container spacing={1}>
                  <Grid item lg={2} md={2} sm={false} xs={false}>
                    <LeftSidebar />
                  </Grid>
                  <Grid item lg={8} md={8} sm={12} xs={12}>
                    <Header />
                    <Routes />
                  </Grid>
                  <Grid item lg={2} md={2} sm={false} xs={false}>
                    <RightSidebar />
                  </Grid>
                  </Grid>
                </Container>
            </StylesProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
