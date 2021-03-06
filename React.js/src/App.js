import React, { Component } from 'react';
import {create as createJss} from 'jss'
import { JssProvider, ThemeProvider } from 'react-jss';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import expand from 'jss-expand';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import configureStore from './store';
import theme from './theme';
import DeliveryCreate from './pages/DeliveryCreate';

const { store } = configureStore();

const jss = createJss();
jss.use(
  nested(),
  expand(),
  camelCase(),
  defaultUnit(),
  vendorPrefixer(),
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <JssProvider jss={jss}>
          <ThemeProvider theme={theme}>
            <div>
              <DeliveryCreate/>
              <ToastContainer
                autoClose={5000}
                closeButton={false}
                hideProgressBar
              />
            </div>
          </ThemeProvider>
        </JssProvider>
      </Provider>
    );
  }
}

export default App;
