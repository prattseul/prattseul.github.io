document.addEventListener("DOMContentLoaded", async function () {

    const navigationTarget = document.getElementById("site-navigation");

    if (!navigationTarget) {
        return;
    }


    /* ========================================
       CHARGEMENT DU COMPOSANT
    ========================================= */

    try {

        const response = await fetch("components/navigation.html");

        if (!response.ok) {
            throw new Error("Impossible de charger navigation.html");
        }

        const html = await response.text();

        navigationTarget.innerHTML = html;

    } catch (error) {

        console.error(error);

        return;
    }


    /* ========================================
       TITRE OU LOGO
    ========================================= */

    const body = document.body;

    const pageTitle = body.dataset.pageTitle || "";

    const isHome = body.dataset.home === "true";

    const siteLogo = document.getElementById("siteLogo");

    const titleElement = document.getElementById("pageTitle");


    if (isHome) {

        if (siteLogo) {
            siteLogo.style.display = "block";
        }

        if (titleElement) {
            titleElement.style.display = "none";
        }

    } else {

        if (siteLogo) {
            siteLogo.style.display = "none";
        }

        if (titleElement) {
            titleElement.textContent = pageTitle;
            titleElement.style.display = "block";
        }

    }


    /* ========================================
       MENU
    ========================================= */

    const menuButton = document.querySelector(".menu-button");

    const closeButton = document.querySelector(".close-button");

    const menu = document.querySelector(".menu");


    if (!menuButton || !closeButton || !menu) {
        return;
    }


    /* OUVRIR */

    menuButton.addEventListener("click", function () {

        menu.classList.add("active");

        document.body.classList.add("menu-active");

    });


    /* FERMER */

    closeButton.addEventListener("click", function () {

        menu.classList.remove("active");

        document.body.classList.remove("menu-active");

    });


    /* ESC */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            menu.classList.remove("active");

            document.body.classList.remove("menu-active");

        }

    });


    /* FERMETURE APRÈS CLIC SUR LIEN */

    document.querySelectorAll(".menu-list a").forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("active");

            document.body.classList.remove("menu-active");

        });

    });

});
