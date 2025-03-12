import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { get, put } from "../api/fetch.js";

const mainEl = document.getElementById("main-element");
const url = "/data/drones/";

export async function editItem(ctx) {
    // console.log(ctx.params);

    const { pageId } = ctx.params;
    const data = await get(url + pageId);

    render(generateHTML(data), mainEl);
}

function generateHTML(data) {
    return html`
        <section id="edit">
            <div class="form form-item">
                <h2>Edit Offer</h2>
                <form @submit=${sendUpdate} id="${data._id}" class="edit-form">
                    <input type="text" name="model" id="model" placeholder="Drone Model" value="${data.model}" />
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" value="${data.imageUrl}" />
                    <input type="number" name="price" id="price" placeholder="Price" value="${data.price}" />
                    <input type="number" name="weight" id="weight" placeholder="Weight" value="${data.weight}" />
                    <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" value="${data.phone}" />
                    <input type="text" name="condition" id="condition" placeholder="Condition" value="${data.condition}" />
                    <textarea name="description" id="description" placeholder="Description" value="${data.description}"></textarea>
                    <button type="submit">Edit</button>
                </form>
            </div>
        </section>
    `;
}

async function sendUpdate(e) {
    e.preventDefault();
    const id = e.target.id;
    const data = Object.fromEntries(new FormData(e.target));
    // console.log(e.target);

    put(url + id, data);
    page.redirect("/marketPlace");
}
