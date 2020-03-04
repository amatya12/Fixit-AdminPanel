import axios from 'axios';
import update from 'immutability-helper';
import { API_ENDPOINT } from '../constants/constants';

const api = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
        'Content-Type': 'application/json',
    },
});

let jwtToken = null;

export default api;

export const setAuthToken = (token) => {
    jwtToken = token;
};

export const clearAuthToken = () => {
    jwtToken = null;
};

const customInterceptor = {
    response: (response) => {
        const { data: body, status, err } = response;
        if (status < 200 || status > 399) {
            err.code = status;
            throw new Error(err);
        }

        const { code, message, data } = body;

        if (code !== 0) {
            throw new Error(`Custom exception occured. (${code}) ${message}`);
        }
        return Promise.resolve(data);
    },
    request: (config) => {
        if (jwtToken) {
            return update(config, {
                headers: {
                    Authorization: {
                        $set: `Bearer ${jwtToken}`,
                    },
                },
            });
        }
        return config;
    }
};

api.interceptors.response.use(customInterceptor.response);
api.interceptors.request.use(customInterceptor.request);