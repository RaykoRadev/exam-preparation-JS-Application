import { register } from '../data/users.js';
import { render, html, page } from '../libraty.js';
import { createSubmitHendler } from '../util.js';

const templete = (handler) => html`<section id="register">
    <div class="form">
        <h2>Register</h2>
        <form @submit=${handler} class="register-form">
            <input type="text" name="email" id="register-email" placeholder="email" />
            <input type="password" name="password" id="register-password" placeholder="password" />
            <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
            />
            <button type="submit">register</button>
            <p class="message">Already registered? <a href="/login">Login</a></p>
        </form>
    </div>
</section>`;

export async function registerView() {
    render(templete(createSubmitHendler(sendData)));
}

async function sendData({ email, password, 're-password': rePass }) {
    if (!email || !password || !rePass) {
        return alert('All fields are requiored!');
    }

    if (password !== rePass) {
        return alert("Passwords don't match!");
    }

    await register(email, password);
    page.redirect('/');
}
