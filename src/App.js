import React, { Component } from "react";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import store, { history } from './configureStore';

// Styles
import 'bootstrap/dist/css/bootstrap.css';
import './App.scss';

// routes
import routes from './routes';

// header and footer
import Header from './containers/Header'
import Footer from './containers/Footer'

import { MuiThemeProvider, StylesProvider } from '@material-ui/core';
import { theme } from './utils/MuiTheme';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <StylesProvider injectFirst>
              <div className="App">
                <Header />
                <div className="wrap">
                  {routes}
                </div>
                <Footer />
              </div>
            </StylesProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
