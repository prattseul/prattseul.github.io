const menu = document.getElementById("menu");
const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");


// OUVRIR LE MENU
menuOpen.addEventListener("click", () => {

    menu.classList.add("active");

    document.body.classList.add("menu-active");

});


// FERMER LE MENU
menuClose.addEventListener("click", () => {

    menu.classList.remove("active");

    document.body.classList.remove("menu-active");

});


// FERMER APRÈS AVOIR CLIQUÉ SUR UN LIEN
document.querySelectorAll(".menu-list a").forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

        document.body.classList.remove("menu-active");

    });

});


// FERMER AVEC ESC
document.addEventListener("keydown", event => {

    if (event.key === "Escape") {

        menu.classList.remove("active");

        document.body.classList.remove("menu-active");

    }

});
