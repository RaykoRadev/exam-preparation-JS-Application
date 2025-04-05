import { getLikesByItemId, likeItem } from '../data/bonus.js';
import { deleteOne, getOne } from '../data/crud.js';
import { render, html, page } from '../libraty.js';
import { getUserData } from '../util.js';

const templete = (data) => html`<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${data.info.imageUrl} alt="example1" />
        <div>
            <p id="details-name">${data.info.name}</p>
            <div id="info-wrapper">
                <div id="details-year-description">
                    <p id="year-description">
                        Year of oldest stamps - <span id="year">${data.info.year}</span>
                    </p>
                    <p id="more-info">${data.info.learnMore}</p>
                </div>
            </div>
            <h3>Stamp total likes:<span id="likes">${data.likes}</span></h3>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
                ${data.isOwner
                    ? html`<a href="/edit/${data.id}" id="edit-btn">Edit</a>
                          <a
                              @click=${(e) => deleteStamp(e, data.id)}
                              href="javascript:void(0)"
                              id="delete-btn"
                              >Delete</a
                          >`
                    : html`${data.isLogged
                          ? html`
                                ${data.hasLikes
                                    ? null
                                    : html`<a
                                          @click=${(e) => sendLike(e, data.id)}
                                          href="javascript:void(0)"
                                          id="like-btn"
                                          >Like</a
                                      >`}
                            `
                          : ''}`}

                <!--Bonus - Only for logged-in users ( not authors )-->
            </div>
        </div>
    </div>
</section>`;

export async function detailsView(ctx) {
    const { id } = ctx.params;

    const info = await getOne(id);
    const userData = getUserData();
    const likeInfo = await getLikesByItemId(id);

    const userId = userData?._id;
    const ownerId = info._ownerId;

    const isOwner = userId === ownerId;
    const isLogged = !!userData;
    const hasLikes = likeInfo.hasLikes || isOwner;
    const likes = likeInfo.likes;

    const data = { info, id, isOwner, isLogged, hasLikes, likes };
    render(templete(data));
}

async function deleteStamp(e, id) {
    const choice = confirm('Are you sure?');
    if (!choice) {
        return;
    }
    await deleteOne(id);
    page.redirect('/dashboard');
}

async function sendLike(e, id) {
    await await likeItem(id);
    page.redirect(`/details/${id}`);
}
