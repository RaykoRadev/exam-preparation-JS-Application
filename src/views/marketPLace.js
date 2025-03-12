import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { get } from "../api/fetch.js";
import page from "../../node_modules/page/page.mjs";

const mainEl = document.getElementById("main-element");
const url = "/data/drones?sortBy=_createdOn%20desc";

// page("/details", detailsView);
// page.start();

export async function marketPlaceView(ctx) {
    // console.log("na pazara we");
    let data = undefined;
    try {
        data = await get(url);
        // console.log(data);
        render(generateHTML(data), mainEl);
    } catch (error) {}
}

function generateHTML(data) {
    return html`
        <h3 class="heading">Marketplace</h3>
        <section id="dashboard">
            ${typeof data === undefined
                ? html`<h3 class="no-drones">No Drones Available</h3>`
                : html` ${data.map(
                      el => html` 
                      <div class="drone">
                          <img src="${el.imageUrl}" alt="example1" />
                          <h3 class="model">${el.model}</h3>
                          <div class="drone-info">
                              <p class="price">Price: €${el.price}</p>
                              <p class="condition">Condition: ${el.condition}</p>
                              <p class="weight">Weight: ${el.weight}g</p>
                          </div>
                          <a @click=${e => sendID(e, el._id)} class="details-btn" href="/details">Details</a>
                      </div>
                  </section>`,
                  )}`}
        </section>
    `;
}

function sendID(e, id) {
    e.preventDefault();
    page.redirect(`/details/${id}`);
}
