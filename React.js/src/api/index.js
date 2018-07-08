// @flow

import axios from 'axios';
import isObject from 'lodash/isObject';
import humps from 'humps';

export class ApiService {
  static instance = axios.create({
    baseURL: `http://localhost:4000`,
    timeout: 15000,
    headers: {}
  });

  static get(url: string, params: any = {}, config: any = {}): Promise<any> {
    return ApiService.instance
      .get(url, {
        params: params ? ApiService.toSnakeCaseObj(params) : {},
        ...config
      })
      .then(
        result =>
          result && isObject(result.data)
            ? ApiService.toCamelCaseObj(result.data)
            : result
      );
  }

  static post(url: string, params: any = {}, config: any = {}): Promise<any> {
    return ApiService.instance
      .post(url, ApiService.toSnakeCaseObj(params), config)
      .then(
        result =>
          result && isObject(result.data)
            ? ApiService.toCamelCaseObj(result.data)
            : result
      );
  }

  static put(url: string, params: any = {}, config: any = {}): Promise<any> {
    return ApiService.instance
      .put(url, ApiService.toSnakeCaseObj(params), config)
      .then(
        result =>
          result && isObject(result.data)
            ? ApiService.toCamelCaseObj(result.data)
            : result
      );
  }

  static delete(url: string, params: any = {}, config: any = {}): Promise<any> {
    return ApiService.instance
      .delete(url, { params: ApiService.toSnakeCaseObj(params), ...config })
      .then(
        result =>
          result && isObject(result.data)
            ? ApiService.toCamelCaseObj(result.data)
            : result
      );
  }

  static toSnakeCaseObj(obj: any): any {
    return humps.decamelizeKeys(obj);
  }

  static toCamelCaseObj(obj: any): any {
    return humps.camelizeKeys(obj);
  }
}
