document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.querySelector(".menu-button");
    const closeButton = document.querySelector(".close-button");
    const menu = document.querySelector(".menu");

    if (!menuButton || !closeButton || !menu) {
        return;
    }

    /* OUVRIR LE MENU */
    menuButton.addEventListener("click", function () {
        menu.classList.add("active");
        document.body.classList.add("menu-active");
    });

    /* FERMER LE MENU */
    closeButton.addEventListener("click", function () {
        menu.classList.remove("active");
        document.body.classList.remove("menu-active");
    });

    /* FERMER AVEC LA TOUCHE ESC */
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            menu.classList.remove("active");
            document.body.classList.remove("menu-active");
        }
    });

    /* FERMER LE MENU APRÈS AVOIR CLIQUÉ SUR UN LIEN */
    const menuLinks = document.querySelectorAll(".menu-list a");

    menuLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            menu.classList.remove("active");
            document.body.classList.remove("menu-active");
        });
    });

});
