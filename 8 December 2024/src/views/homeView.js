import { html, render } from "../../node_modules/lit-html/lit-html.js";
import { updateNav } from "../navigationBar/navigation.js";

const mainEl = document.getElementById("main-element");

export function homeView(ctx) {
    updateNav();
    render(genereteHTML(), mainEl);
}

function genereteHTML() {
    return html`
        <section id="hero">
            <p>
                Discover the best deals on drones! Buy, sell, and trade top-quality drones with ease on Drone Deals - your trusted
                marketplace for all things drone.
            </p>
        </section>
    `;
}
