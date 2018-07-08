import React, { Component } from 'react';
import {create as createJss} from 'jss'
import { JssProvider, ThemeProvider } from 'react-jss';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import expand from 'jss-expand';
import nested from 'jss-nested';
import vendorPrefixer from 'jss-vendor-prefixer';
import { Provider } from 'react-redux';

import configureStore from './store';
import theme from './theme';
import AddressBox from './components/AddressBox';

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
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-3">
                <AddressBox form="delivery" onSubmit={() => console.log('submit')} />
              </div>
            </div>
          </ThemeProvider>
        </JssProvider>
      </Provider>
    );
  }
}

export default App;
