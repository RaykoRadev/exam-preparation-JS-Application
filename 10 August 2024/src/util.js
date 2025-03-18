export function setUserData(data) {
    localStorage.setItem("user", JSON.stringify(data));
}
export function getUserData() {
    return JSON.parse(localStorage.getItem("user"));
}
export function clearUserData() {
    return localStorage.removeItem("user");
}

export function createSubmitHendler(callback) {
    return function (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        callback(data, e.target);
    };
}
