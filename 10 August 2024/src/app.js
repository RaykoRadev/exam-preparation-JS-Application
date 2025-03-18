import { createView } from "./views/create.js";
import { logout } from "./data/users.js";
import { page } from "./libraty.js";
import { updateNav } from "./navigation.js";
import { dashboardView } from "./views/dashboard.js";
import { homeView } from "./views/home.js";
import { loginView } from "./views/login.js";
import { registerView } from "./views/register.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";

updateNav();

page("/", homeView);
page("/dashboard", dashboardView);
page("/login", loginView);
page("/register", registerView);
page("/create", createView);
page("/dashboard/:id", detailsView);
page("/edit/:id", editView);
page();

document.getElementById("logout").addEventListener("click", () => {
    logout();
    page.redirect("/");
});
