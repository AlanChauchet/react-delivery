import { resettableReducer } from 'reduxsauce';
import { reducer as formReducer } from 'redux-form';
import { combineReducers } from 'redux';

const resettable = resettableReducer('RESET');

const rootReducer = combineReducers({
    form: resettable(formReducer),
});

export default rootReducer;
