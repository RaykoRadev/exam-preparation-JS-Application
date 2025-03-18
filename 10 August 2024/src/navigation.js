import { getUserData } from "./util.js";

export function updateNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector("nav .user").style.display = "block";
        document.querySelector("nav .guest").style.display = "none";
    } else {
        document.querySelector("nav .user").style.display = "none";
        document.querySelector("nav .guest").style.display = "block";
    }
}
