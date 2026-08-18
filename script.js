const menu = document.getElementById("menu");
const menuOpen = document.getElementById("menuOpen");
const menuClose = document.getElementById("menuClose");


/* ========================================
   OPEN MENU
======================================== */

menuOpen.addEventListener("click", () => {

    menu.classList.add("active");

    document.body.classList.add("menu-active");

});


/* ========================================
   CLOSE MENU
======================================== */

menuClose.addEventListener("click", () => {

    menu.classList.remove("active");

    document.body.classList.remove("menu-active");

});


/* ========================================
   CLOSE WITH ESC
======================================== */

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

        menu.classList.remove("active");

        document.body.classList.remove("menu-active");

    }

});


/* ========================================
   CLOSE WHEN CLICKING A LINK
======================================== */

document.querySelectorAll(".menu-list a").forEach((link) => {

    link.addEventListener("click", () => {

        menu.classList.remove("active");

        document.body.classList.remove("menu-active");

    });

});
