const menu = document.getElementById("menu");
const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");


/* OUVRIR */

menuOpen.addEventListener("click", () => {

    menu.classList.add("active");

    document.body.classList.add("menu-active");

});


/* FERMER */

menuClose.addEventListener("click", () => {

    menu.classList.remove("active");

    document.body.classList.remove("menu-active");

});


/* ESC */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        menu.classList.remove("active");

        document.body.classList.remove("menu-active");

    }

});
