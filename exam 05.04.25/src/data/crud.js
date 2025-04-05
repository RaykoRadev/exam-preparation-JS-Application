import { del, get, post, put } from './api.js';

const endpoints = {
    getAll: '/data/stamps?sortBy=_createdOn%20desc',
    getOne: '/data/stamps/',
    create: '/data/stamps',
};

export function getAll() {
    return get(endpoints.getAll);
}

export function getOne(id) {
    return get(endpoints.getOne + id);
}

export function editOne(id, data) {
    put(endpoints.getOne + id, data);
}

export function createOne(data) {
    post(endpoints.create, data);
}

export function deleteOne(id) {
    del(endpoints.getOne + id);
}
