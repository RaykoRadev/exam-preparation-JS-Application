import { html, render } from "../../node_modules/lit-html/lit-html.js";
import page from "../../node_modules/page/page.mjs";
import { post } from "../api/fetch.js";
import { setUserData } from "../utils/userData.js";

const url = "/users/register";

const mainEl = document.getElementById("main-element");

export function register(ctx) {
    // console.log("register");
    // console.log(ctx);
    render(generateHTML(), mainEl);
}

function generateHTML(err) {
    return html`<section id="register">
        ${err ? html`<p style="color:red">${err}</p>` : null}
        <div class="form">
            <h2>Register</h2>
            <form @submit=${sendData} class="register-form">
                <input type="text" name="email" id="register-email" placeholder="email" />
                <input type="password" name="password" id="register-password" placeholder="password" />
                <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
                <button type="submit">register</button>
                <p class="message">Already registered? <a href="#">Login</a></p>
            </form>
        </div>
    </section>`;
}

async function sendData(e) {
    e.preventDefault();
    // console.log("send");

    try {
        const data = Object.fromEntries(new FormData(e.target));
        // console.log(data);
        if (data.email === "" || data.password === "" || data["re-password"] === "") {
            throw new Error("All fields have to be field!!!");
        }

        if (data.password !== data["re-password"]) {
            throw new Error("Passwords don't match");
        }
        const credential = await post(url, data);
        // console.log(credential);
        const { email, _id, accessToken } = credential;
        setUserData(email, _id, accessToken);

        e.target.reset();
        page.redirect("/");

        // const userData = userApi.register(data);
    } catch (error) {
        render(generateHTML(error), mainEl);
    }
}
