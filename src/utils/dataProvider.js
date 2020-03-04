import simpleRestProvider from 'ra-data-simple-rest';
import { fetchUtils } from 'react-admin';
import { API_ENDPOINT } from '../constants/constants';

let jwtToken = null;

export const setAuthToken = (token) => {
    jwtToken = token;
};

export const clearAuthToken = () => {
    jwtToken = null;
};

const httpClient2 = async (url, options = {}) => {
    let { headers, user } = options;

    if (!headers) {
        headers = new Headers({ Accept: 'application/json' });
    }

    if (!user && jwtToken) {
        user = {
            authenticated: true,
            token: `Bearer ${jwtToken}`,
        };
    }

    const result = await fetchUtils.fetchJson(url, {
        ...options,
        headers,
        user,
    });

    const { status, headers: responseHeaders, json } = result;
    if (status < 299 && json.code === 0) {
        const { data } = json;
        return {
            json: data,
            headers: responseHeaders,
        }
    }
    throw new Error('something wrong');
};

const dataProvider = simpleRestProvider(API_ENDPOINT, httpClient2)

export default dataProvider;