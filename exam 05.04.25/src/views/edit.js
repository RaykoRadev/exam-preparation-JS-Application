import { editOne, getOne } from '../data/crud.js';
import { render, html, page } from '../libraty.js';
import { createSubmitHendler } from '../util.js';

const templete = (handler, data) => html`<section id="edit">
    <div class="form">
        <h2>Edit Post Stamp</h2>
        <form @submit=${handler} class="edit-form">
            <input
                .value=${data.name}
                type="text"
                name="name-input"
                id="name"
                placeholder="Stamp Name"
            />
            <input
                .value=${data.imageUrl}
                type="text"
                name="image-url-input"
                id="image-url"
                placeholder="Image URL"
            />
            <input
                .value=${data.year}
                type="number"
                id="year-input"
                name="year-input"
                placeholder="Year"
            />
            <textarea
                id="more-info"
                name="more-info-textarea"
                placeholder="More Info"
                rows="8"
                cols="10"
            >
${data.learnMore}</textarea
            >
            <button type="submit">Edit</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
    const { id } = ctx.params;
    const data = await getOne(id);
    render(templete(createSubmitHendler(sendData.bind(ctx)), data));
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

    const { id } = this.params;

    await editOne(id, { name, imageUrl, year, learnMore });
    page.redirect(`/details/${id}`);
}
