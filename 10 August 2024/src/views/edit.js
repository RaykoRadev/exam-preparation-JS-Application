import { editTattosById, getTattosById } from "../data/crud.js";
import { html, page, render } from "../libraty.js";
import { createSubmitHendler } from "../util.js";

const tamplete = (data, onEdit) => html`<section id="edit">
    <div class="form">
        <h2>Edit tattoo</h2>
        <form @submit=${onEdit} class="edit-form">
            <input
                type="text"
                name="type"
                id="type"
                placeholder="Tattoo Type"
                .value=${data.type}
            />
            <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${data.imageUrl}
            />
            <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
            >
${data.description}</textarea
            >
            <select id="user-type" name="user-type" .value=${data.userType}>
                <option value="" disabled selected>Select your role</option>
                <option value="Tattoo Artist">Tattoo Artist</option>
                <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                <option value="First Time in Tattoo">
                    First Time in Tattoo
                </option>
                <option value="Tattoo Collector">Tattoo Collector</option>
            </select>
            <button type="submit">Edit</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
    const id = ctx.params.id;
    const data = await getTattosById(id);

    render(tamplete(data, createSubmitHendler(sendData)));

    async function sendData({
        type,
        "image-url": imageUrl,
        description,
        "user-type": userType,
    }) {
        const id = ctx.params.id;
        console.log(id);

        if (!type || !imageUrl || !description || !userType) {
            return alert("All fields are required");
        }

        await editTattosById(id, { type, imageUrl, description, userType });

        page.redirect(`/dashboard/${id}`);
    }
}
