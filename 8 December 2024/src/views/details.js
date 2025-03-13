import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { del, get } from "../api/fetch.js";
import { getUserData } from "../utils/userData.js";

const mainEl = document.getElementById("main-element");
const url = "/data/drones/";

export async function detailsView(ctx) {
    // console.log(ctx.params);
    // console.log(ctx);
    const pageId = ctx.params.pageId;
    // console.log(pageId);

    const data = await get(url + pageId);
    // console.log(data);

    let isOwner;

    const userData = await getUserData();

    if (userData) {
        isOwner = data._ownerId === userData._id;
    } else {
        isOwner = false;
    }

    render(generateHTML(data, isOwner, pageId), mainEl);
}

function generateHTML(data, isOwner, pageId) {
    return html`
        <section id="details">
            <div id="details-wrapper">
                <div>
                    <img id="details-img" src="${data.imageUrl}" />
                    <p id="details-model">DJI Avata</p>
                </div>
                <div id="info-wrapper">
                    <div id="details-description">
                        <p class="details-price">Price: €${data.price}</p>
                        <p class="details-condition">Condition: ${data.condition}</p>
                        <p class="details-weight">Weight: ${data.weight}g</p>
                        <p class="drone-description">${data.description}</p>
                        <p class="phone-number">Phone: ${data.phone}</p>
                    </div>
                    <!--Edit and Delete are only for creator-->
                    ${isOwner
                        ? html`
                              <div class="buttons">
                                  <a href="/marketPlace/${pageId}/edit" id="edit-btn">Edit</a>
                                  <a @click=${e => deleteItem(e, pageId)} href="#" id="delete-btn">Delete</a>
                              </div>
                          `
                        : ""}
                </div>
            </div>
        </section>
    `;
}

async function deleteItem(e, pageId) {
    e.preventDefault();
    // console.log("del");

    const confirmation = confirm("Are you sure?");
    if (confirmation) {
        del(url + pageId);
        page.redirect("/marketPlace");
    }
}

// function editFunk(e, id) {
//     e.preventDefault();
//     page.redirect(`/data/drones/${id}`);
// }
