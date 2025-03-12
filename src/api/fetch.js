import { getUserData } from "../utils/userData.js";

const baseURL = "http://localhost:3030";

async function fetchData(url, method, data) {
    // const token = localStorage.getItem("token");

    const option = {
        method,
        headers: {},
    };

    if (data) {
        option.headers["Content-Type"] = "application/json";
        option.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if (userData) {
        option.headers["X-Authorization"] = userData.accessToken;
    }

    try {
        const res = await fetch(baseURL + url, option);

        if (res.ok !== true) {
            const error = await res.json();
            throw new Error(error.message);
        }

        if (res.status == 204) {
            return res;
        } else {
            return res.json();
        }
    } catch (error) {
        alert(error);
    }
}

export function get(url) {
    return fetchData(url, "get");
}
export function post(url, data) {
    return fetchData(url, "post", data);
}
export function put(url, data) {
    return fetchData(url, "put", data);
}
export function del(url) {
    return fetchData(url, "delete");
}
