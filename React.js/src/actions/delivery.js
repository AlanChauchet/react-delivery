// @flow

import { createActions } from 'reduxsauce';

import { DeliveryApi } from '../api/delivery';

export const { Types, Creators } = createActions(
  {
    setAddress: ['payload', 'meta'], // payload: { address: string, location: -1 | null | Object }, meta: { type: 'pickUp' | 'dropOff' }
    reset: () => ({ type: 'RESET' }),
    fetchLocation: (address: string, type: 'pickUp' | 'dropOff') => (
      dispatch: Function,
      getState: Function
    ) => {
      if (!address) {
        dispatch(Creators.setAddress({ address, location: null }, { type }));
        return Promise.reject(new Error('Empty address'));
      }
      if (getState().delivery[type].address === address) {
        return Promise.resolve();
      }
      return DeliveryApi.fetchLocation(address)
        .then(response => {
          dispatch(Creators.setAddress({ address: response.address, location: { lat: response.latitude, lng: response.longitude } }, { type }));
        }, () => {
          dispatch(Creators.setAddress({ address, location: -1 }, { type }));
          return Promise.reject(new Error('Invalid address'));
        });
    },
    createDelivery: (pickUp: string, dropOff: string) => async (dispatch) => {
      await DeliveryApi.createDelivery(pickUp, dropOff);
      dispatch(Creators.reset());
    }
  },
  {
    prefix: 'DELIVERY.',
  }
);
