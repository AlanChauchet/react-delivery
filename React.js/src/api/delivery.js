// @flow

import { ApiService } from './index';

export class DeliveryApi {
  static fetchLocation(address: string) {
    return ApiService.post('/geocode', { address });
  }
  static createDelivery(pickup: string, dropoff: string) {
    return ApiService.post('/jobs', { pickup, dropoff });
  }
}
