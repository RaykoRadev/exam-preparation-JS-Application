import { login } from '../data/users.js';
import { render, html, page } from '../libraty.js';
import { createSubmitHendler } from '../util.js';

const templete = (handler) => html`<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form @submit=${handler} class="login-form">
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
    </div>
</section>`;

export async function loginView() {
    render(templete(createSubmitHendler(sendData)));
}

async function sendData({ email, password }) {
    if (!email || !password) {
        return alert('All fields are requiored!');
    }

    await login(email, password);
    page.redirect('/');
}
