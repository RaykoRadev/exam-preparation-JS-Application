import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { post } from "../api/fetch.js";
import { notification } from "../utils/notification.js";
import { setUserData } from "../utils/userData.js";

const url = "/users/login";

const mainEl = document.getElementById("main-element");

export function loging(ctx) {
    // console.log("loging");

    render(generateHTML(), mainEl);
}

function generateHTML(err) {
    return html`
        <section id="login">
            ${err ? html`<p style="color:red">${err}</p>` : null}
            <div class="form">
                <h2>Login</h2>
                <form @submit=${sendData} class="login-form">
                    <input type="text" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <button type="submit">login</button>
                    <p class="message">Not registered? <a href="#">Create an account</a></p>
                </form>
            </div>
        </section>
    `;
}

async function sendData(e) {
    e.preventDefault();
    // console.log("send");

    const data = Object.fromEntries(new FormData(e.target));
    // console.log(data);

    try {
        if (data.email === "" || data.password === "") {
            notification("All fields have to be field!!!");
            return;
            // throw new Error("All fields have to be field!!!");
        }

        const credential = await post(url, data);

        const { email, _id, accessToken } = credential;
        setUserData(email, _id, accessToken);
        e.target.reset();
        page.redirect("/");
    } catch (error) {
        render(generateHTML(error), mainEl);
    }
}
