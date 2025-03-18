import { getAllTattos } from "../data/crud.js";
import { html, render } from "../libraty.js";

const tamplete = (data) => html`<h2>Collection</h2>

    ${data.length === 0
        ? html`<h2 id="no-tattoo">
              Collection is empty, be the first to contribute
          </h2>`
        : html`<section id="tattoos">
              ${data.map(
                  (el) => html` <div class="tattoo">
                      <img src="${el.imageUrl}" alt="example1" />
                      <div class="tattoo-info">
                          <h3 class="type">${el.type}</h3>
                          <span>Uploaded by </span>
                          <p class="user-type">${el.userType}</p>
                          <a class="details-btn" href="/dashboard/${el._id}"
                              >Learn More</a
                          >
                      </div>
                  </div>`,
              )}
          </section>`}`;

export async function dashboardView() {
    const data = await getAllTattos();

    render(tamplete(data));
}
