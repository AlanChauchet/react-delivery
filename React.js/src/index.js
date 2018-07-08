import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import 'flexboxgrid/dist/flexboxgrid.css';
import 'react-toastify/dist/ReactToastify.min.css';

import './index.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
