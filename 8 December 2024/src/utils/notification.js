const notifEl = document.getElementById("errorBox");
const msgEl = document.querySelector("#errorBox span");

export function notification(message) {
    msgEl.textContent = message;
    notifEl.style.display = "block";

    setTimeout(() => {
        notifEl.style.display = "none";
    }, 3000);
}
