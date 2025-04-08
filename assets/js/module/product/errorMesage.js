export default function errorMesage(msgError, errorContainer) {
    const existingError = errorContainer.querySelector(".alert-error");
    if (existingError) {
        existingError.remove();
    };

    const div = document.createElement("div");
    div.classList.add("alert-error");

    const msg = document.createElement("p");
    msg.classList.add("error");
    msg.innerText = msgError;

    errorContainer.appendChild(div);
    div.appendChild(msg);
};