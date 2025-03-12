import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { post } from "../api/fetch.js";
import page from "../../node_modules/page/page.mjs";

const mainEl = document.getElementById("main-element");
const url = "/data/drones";

export function addDrone(ctx) {
    console.log("add");

    render(genereteHTML(), mainEl);
}

function genereteHTML() {
    return html`
        <section id="create">
            <div class="form form-item">
                <h2>Add Drone Offer</h2>
                <form @submit=${sendData} class="create-form">
                    <input type="text" name="model" id="model" placeholder="Drone Model" />
                    <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
                    <input type="number" name="price" id="price" placeholder="Price" />
                    <input type="number" name="weight" id="weight" placeholder="Weight" />
                    <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
                    <input type="text" name="condition" id="condition" placeholder="Condition" />
                    <textarea name="description" id="description" placeholder="Description"></textarea>
                    <button type="submit">Add</button>
                </form>
            </div>
        </section>
    `;
}

async function sendData(e) {
    e.preventDefault();
    console.log("send");

    const data = Object.fromEntries(new FormData(e.target));

    post(url, data);
    page.redirect("/marketPlace");
}
