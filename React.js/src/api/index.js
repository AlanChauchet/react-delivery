// @flow

import axios from 'axios';
import isObject from 'lodash/isObject';
import humps from 'humps';

export class ApiService {
    static instance = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
        timeout: 15000,
        headers: {}
    });
    static testTokenInstance = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/api/v1`,
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

    static interceptUnauthorized(onNotAuth: Function, onNotAllowed: Function) {
        ApiService.instance.interceptors.response.use(
            response => {
                return response;
            },
            error => {
                let originalRequest = error.config;
                if (error.response && error.response.status === 401) {
                    if (!originalRequest._retry) {
                        originalRequest._retry = true;
                        if (ApiService.instance.defaults.headers.common['Authorization']) {
                            return ApiService.testTokenInstance.get('/users/me').then(
                                () => Promise.reject(error),
                                err => {
                                    onNotAuth && onNotAuth();
                                    return Promise.reject(err);
                                }
                            );
                        } else {
                            return Promise.reject(error);
                        }
                    } else {
                        onNotAllowed && onNotAllowed();
                    }
                }
                return Promise.reject(error);
            }
        );
    }

    static toSnakeCaseObj(obj: any): any {
        return humps.decamelizeKeys(obj);
    }

    static toCamelCaseObj(obj: any): any {
        return humps.camelizeKeys(obj);
    }

    static uploadFile(
        file: File,
        uploadUrl: string,
        callbacks: { onProgress?: Function } = {}
    ): Promise<any> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            const formData = new FormData();

            xhr.open(
                'POST',
                `${ApiService.instance.defaults.baseURL}${uploadUrl}`,
                true
            );
            xhr.setRequestHeader(
                'Authorization',
                ApiService.instance.defaults.headers.common['Authorization']
            );

            formData.append('file', file);

            xhr.onload = function() {
                if (xhr.status >= 200 && xhr.status < 300) {
                    callbacks.onProgress && callbacks.onProgress(file, file.size);
                    resolve(ApiService.toCamelCaseObj(JSON.parse(xhr.response)));
                } else {
                    reject(xhr);
                }
            };

            xhr.onerror = function() {
                reject(xhr);
            };

            xhr.upload.onprogress = function(e) {
                if (e.lengthComputable) {
                    callbacks.onProgress && callbacks.onProgress(file, e.loaded);
                }
            };

            xhr.send(formData);
        });
    }

    static setAuthToken(token?: string) {
    ApiService.instance.defaults.headers.common['Authorization'] = token
        ? `Bearer ${token}`
        : null;
    ApiService.testTokenInstance.defaults.headers.common[
        'Authorization'
        ] = token ? `Bearer ${token}` : null;
}
}