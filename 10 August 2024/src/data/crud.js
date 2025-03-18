import { del, get, post, put } from "./api.js";

const endpoints = {
    allTattos: "/data/tattoos?sortBy=_createdOn%20desc",
    addTatto: "/data/tattoos",
    tattoById: "/data/tattoos/",
};

export async function getAllTattos() {
    return get(endpoints.allTattos);
}

export async function getTattosById(id) {
    return get(endpoints.tattoById + id);
}

export async function createTatto({ type, imageUrl, description, userType }) {
    return post(endpoints.addTatto, { type, imageUrl, description, userType });
}

export async function editTattosById(
    id,
    { type, imageUrl, description, userType },
) {
    return put(endpoints.tattoById + id, {
        type,
        imageUrl,
        description,
        userType,
    });
}

export async function deleteTatto(id) {
    return del(endpoints.tattoById + id);
}
