//! one of the test doesnt pass but i don't have any idea why

import { getUserData } from "../util.js";
import { get, post } from "./api.js";

//TODO put the replace the links with the ones from Description
const endpoints = {
    like: "/data/likes",
    likesItemById: (id) =>
        `/data/likes?where=tattooId%3D%22${id}%22&distinct=_ownerId&count`,
    likesByUserId: (itemId, userId) =>
        `/data/likes?where=tattooId%3D%22${itemId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function likeItem(id) {
    return post(endpoints.like, { id });
}
export async function getLikesByItemId(id) {
    const userData = getUserData();
    const request = [get(endpoints.likesItemById(id))];

    if (userData) {
        request.push(get(endpoints.likesByUserId(id, userData._id)));
    }

    const [likes, hasLikes] = await Promise.all(request);
    return { likes, hasLikes: Boolean(hasLikes) };
}
