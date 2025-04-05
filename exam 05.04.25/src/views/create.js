import { createOne } from '../data/crud.js';
import { render, html, page } from '../libraty.js';
import { createSubmitHendler } from '../util.js';

const templete = (handler) => html`<section id="create">
    <div class="form">
        <h2>Add Post Stamp</h2>
        <form @submit=${handler} class="create-form">
            <input type="text" name="name-input" id="name-input" placeholder="Stamp Name" />
            <input
                type="text"
                name="image-url-input"
                id="image-url-input"
                placeholder="Image URL"
            />
            <input type="number" id="year-input" name="year-input" placeholder="year" />
            <textarea
                id="more-info-textarea"
                name="more-info-textarea"
                placeholder="More Info"
                rows="8"
                cols="10"
            ></textarea>
            <button type="submit">Add Stamp</button>
        </form>
    </div>
</section>`;

export async function createView() {
    render(templete(createSubmitHendler(sendData)));
}

async function sendData({
    'name-input': name,
    'image-url-input': imageUrl,
    'year-input': year,
    'more-info-textarea': learnMore,
}) {
    if (!name || !imageUrl || !year || !learnMore) {
        return alert('All fields are requiored!');
    }

    await createOne({ name, imageUrl, year, learnMore });
    page.redirect('/dashboard');
}
