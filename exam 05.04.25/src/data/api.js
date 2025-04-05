import { clearUserData, getUserData } from '../util.js';

const host = 'http://localhost:3030';

async function reqest(method, url, data) {
    const options = {
        method,
        headers: {},
    };

    if (data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if (!response.ok) {
            const err = await response.json();

            if (response.status == 403 && err.message == 'Invalid access token') {
                clearUserData();
            }

            throw new Error(err.message);
        }

        if (response.status == 204) {
            return response;
        } else {
            return response.json();
        }
    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const get = (url) => reqest('GET', url);
export const post = (url, data) => reqest('POST', url, data);
export const put = (url, data) => reqest('PUT', url, data);
export const del = (url) => reqest('DELETE', url);
