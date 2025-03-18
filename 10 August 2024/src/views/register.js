import { register } from "../data/users.js";
import { html, page, render } from "../libraty.js";
import { updateNav } from "../navigation.js";
import { createSubmitHendler } from "../util.js";

const tamplete = (onRegister) => html` <section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${onRegister} class="register-form">
            <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
            />
            <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
            />
            <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
            />
            <button type="submit">register</button>
            <p class="message">
                Already registered? <a href="/login">Login</a>
            </p>
        </form>
    </div>
</section>`;

export function registerView() {
    render(tamplete(createSubmitHendler(sendData)));
}

async function sendData({ email, password, "re-password": rePass }) {
    if (!email || !password) {
        return alert("All fields are required");
    }

    if (password !== rePass) {
        return alert("Passwords don't match!");
    }

    await register(email, password);

    updateNav();
    page.redirect("/");
}
