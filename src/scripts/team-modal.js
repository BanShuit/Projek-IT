document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector("#myModal");
    const modalTrigger = document.querySelector("#openModalText");
    const closeModalButton = document.querySelector(".close");
    modalTrigger.addEventListener('click', (event) => {
        event.preventDefault();
        modal.style.display = "block";
    });
    closeModalButton.addEventListener('click', () => {
        modal.style.display = "none";
    });
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});