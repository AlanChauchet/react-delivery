import { resettableReducer } from 'reduxsauce';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

import delivery from './delivery';

const resettable = resettableReducer('RESET');

const rootReducer = combineReducers({
  delivery: resettable(delivery),
  form: resettable(formReducer),
});

export default rootReducer;
