import {
    AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS,
} from 'react-admin';
import decodeJwt from 'jwt-decode';
import { setAuthToken, clearAuthToken } from './dataProvider';

import api from './api';



export default (type, params) => {
    // called when the user attempts to log in
    if (type === AUTH_LOGIN) {
        const { accessToken } = params;
        return api.post('/login',
            { accessToken, })
            .then((x) => {
                const { jwt } = x;
                const decodedToken = decodeJwt(jwt);
                localStorage.setItem('jwt', jwt);
                var permission = decodedToken.role.toString();
                var s = permission.split(',');
                console.log(s);
                localStorage.setItem('permissions', s);
                setAuthToken(jwt);
            });
    }
    // called when the user clicks on the logout button
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('jwt');
        localStorage.removeItem('permissions');
        clearAuthToken();
        return Promise.resolve();
    }

    // called when the API returns an error
    if (type === AUTH_ERROR) {
        const { status } = params;
        console.log(status);
        if (status === 401) {
            localStorage.removeItem('jwt');
            localStorage.removeItem('permissions');
            clearAuthToken();
            return Promise.reject();
        }
        if (status === 403) {
            return Promise.resolve();
        }
        return Promise.resolve();
    }

    // called when the user navigates to a new location
    if (type === AUTH_CHECK) {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            setAuthToken(jwt);
            return Promise.resolve();
        }
        return Promise.reject();
    }

    if (type === AUTH_GET_PERMISSIONS) {
        let role = localStorage.getItem('permissions');
        console.log(role);
        let roles = role.split(',');
        console.log(roles);
        return roles ? Promise.resolve(role) : Promise.reject();
    }



    return Promise.reject(new Error('Unknown method'));
};

