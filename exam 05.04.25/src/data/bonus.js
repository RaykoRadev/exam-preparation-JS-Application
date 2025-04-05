import { getUserData } from '../util.js';
import { get, post } from './api.js';

//TODO put the replace the links with the ones from Description
const endpoints = {
    sendLike: '/data/likes',
    getLikesId: (stampsId) =>
        `/data/likes?where=stampsId%3D%22${stampsId}%22&distinct=_ownerId&count`,
    likesByUserId: (stampsId, userId) =>
        `/data/likes?where=stampsId%3D%22${stampsId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export async function likeItem(stampsId) {
    return post(endpoints.sendLike, { stampsId });
}

export async function getLikesByItemId(id) {
    const userData = getUserData();
    const request = [get(endpoints.getLikesId(id))];

    if (userData) {
        request.push(get(endpoints.likesByUserId(id, userData._id)));
    }

    const [likes, hasLikes] = await Promise.all(request);
    return { likes, hasLikes: Boolean(hasLikes) };
}
