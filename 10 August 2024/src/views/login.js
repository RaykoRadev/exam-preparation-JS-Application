import { login } from "../data/users.js";
import { html, page, render } from "../libraty.js";
import { updateNav } from "../navigation.js";
import { createSubmitHendler } from "../util.js";

const tamplete = (onLogin) => html`<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${onLogin} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
            />
            <button type="submit">login</button>
            <p class="message">
                Not registered? <a href="/register">Create an account</a>
            </p>
        </form>
    </div>
</section>`;

export function loginView() {
    render(tamplete(createSubmitHendler(sendData)));
}

async function sendData({ email, password }) {
    if (!email || !password) {
        return alert("All fields are required");
    }

    await login(email, password);
    // form.clear();
    updateNav();
    page.redirect("/");
}
