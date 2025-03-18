import { deleteTatto, getTattosById } from "../data/crud.js";
import { getLikesByItemId, likeItem } from "../data/likes.js";
import { html, page, render } from "../libraty.js";
import { getUserData } from "../util.js";

const tamplete = (
    data,
    likes,
    hasUser,
    hasLikes,
    isOwner,
    onLike,
    deleteF,
) => html`<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${data.imageUrl}" alt="example1" />
        <div>
            <div id="info-wrapper">
                <p id="details-type">${data.type}</p>
                <div id="details-description">
                    <p id="user-type">${data.userType}</p>
                    <p id="description">${data.description}</p>
                </div>
                <h3>Like tattoo:<span id="like">${likes}</span></h3>

                ${hasUser
                    ? html` <div id="action-buttons">
                          ${isOwner
                              ? html` <a href="/edit/${data._id}" id="edit-btn"
                                        >Edit</a
                                    >
                                    <a
                                        @click=${deleteF}
                                        href="javascript:void(0)"
                                        id="delete-btn"
                                        >Delete</a
                                    >`
                              : null}
                          ${hasLikes
                              ? null
                              : html`<a
                                    @click=${onLike}
                                    href="javascript:void(0)"
                                    id="like-btn"
                                    >Like</a
                                >`}
                      </div>`
                    : null}
            </div>
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const id = ctx.params.id;

    const [data, likeInfo] = await Promise.all([
        getTattosById(id),
        getLikesByItemId(id),
    ]);

    const userData = await getUserData();

    const ownerId = data._ownerId;
    const userId = userData?._id;

    const isOwner = ownerId === userId;
    const hasLikes = likeInfo.hasLikes || isOwner;

    render(
        tamplete(
            data,
            likeInfo.likes,
            Boolean(userData),
            hasLikes,
            isOwner,
            onLike,
            deleteF,
        ),
    );

    async function onLike() {
        await likeItem(id);
        page.redirect(`/dashboard/${id}`);
    }

    async function deleteF() {
        const confirmed = confirm("Are you sure?");
        if (confirmed) {
            await deleteTatto(id);
            page.redirect("/dashboard");
        }
    }
}
