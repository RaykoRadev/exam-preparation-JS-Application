import { logout } from './data/users.js';
import { page } from './libraty.js';
import { updateNav } from './util.js';
import { createView } from './views/create.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

updateNav();

page('/', homeView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView);

page('/login', loginView);
page('/register', registerView);
page();

document.getElementById('logoutBtn').addEventListener('click', logoutF);
async function logoutF() {
    await logout();
    page.redirect('/');
}
