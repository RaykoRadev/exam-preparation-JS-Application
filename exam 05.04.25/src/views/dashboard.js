import { getAll } from '../data/crud.js';
import { render, html } from '../libraty.js';

const templete = (data) => html`<h2>Collection</h2>
    <section id="collection">
        <!-- Display a div with information about every post (if any)-->
        ${data.length === 0
            ? html`<h2 id="no-stamp">No Stamps Added.</h2>`
            : html`${data.map((el) => createCard(el))}`}

        <!-- Display an h2 if there are no posts -->
    </section>`;

function createCard(el) {
    return html`<div class="stamp">
        <img src=${el.imageUrl} alt="example3" />
        <div class="stamp-info">
            <h3 class="name">${el.name}</h3>
            <p class="year-description">
                Year of oldest stamps - <span class="year">${el.year}</span>
            </p>
            <a class="learn-more-btn" href="/details/${el._id}">Learn More</a>
        </div>
    </div>`;
}

export async function dashboardView() {
    const data = await getAll();
    console.log(data);
    render(templete(data));
}
