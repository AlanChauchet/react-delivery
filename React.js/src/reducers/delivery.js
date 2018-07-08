// @flow

import { createReducer } from 'reduxsauce';

import { Types } from '../actions/delivery';

export const INITIAL_STATE = {
  pickUp: {
    address: '',
    location: null,
  },
  dropOff: {
    address: '',
    location: null,
  },
};

export const setAddress = (state: any = INITIAL_STATE, action: any) => {
  return {
    ...state,
    [action.meta.type]: {
      ...state[action.meta.type],
      ...action.payload,
    }
  }
};

export const HANDLERS = {
  [Types.SET_ADDRESS]: setAddress,
};

export default createReducer(INITIAL_STATE, HANDLERS);
