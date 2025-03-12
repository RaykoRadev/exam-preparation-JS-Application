import page from "../../node_modules/page/page.mjs";

const userEl = document.querySelector("nav .user");
const guestEl = document.querySelector("nav .guest");

export function updateNav() {
    const userData = localStorage.getItem("userData");
    if (userData) {
        userEl.style.display = "block";
        guestEl.style.display = "none";
    } else {
        userEl.style.display = "none";
        guestEl.style.display = "block";
    }
}
