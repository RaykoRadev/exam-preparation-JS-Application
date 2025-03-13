import page from "../../node_modules/page/page.mjs";
import { get } from "../api/fetch.js";
import { clearUserData } from "../utils/userData.js";

const url = "/users/logout";

export async function logout() {
    // console.log("logout");

    try {
        await get(url);
        clearUserData();
        page.redirect("/");
    } catch (err) {
        alert(err.message);
    }
}
