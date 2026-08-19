document.addEventListener("DOMContentLoaded", async function () {

    const navigationTarget = document.getElementById("site-navigation");

    if (!navigationTarget) {
        return;
    }


    /* ========================================
       CHARGEMENT DU COMPOSANT COMMUN
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


    if (menuButton && closeButton && menu) {

        /* ----------------------------------------
           FONCTION COMMUNE DE FERMETURE
        ---------------------------------------- */

        function closeMenu() {

            menu.classList.remove("active");

            document.body.classList.remove("menu-active");

        }


        /* ----------------------------------------
           OUVRIR
        ---------------------------------------- */

        menuButton.addEventListener("click", function (event) {

            event.stopPropagation();

            menu.classList.add("active");

            document.body.classList.add("menu-active");

        });


        /* ----------------------------------------
           FERMER AVEC LE BOUTON
        ---------------------------------------- */

        closeButton.addEventListener("click", function (event) {

            event.stopPropagation();

            closeMenu();

        });


        /* ----------------------------------------
           NE PAS FERMER SI ON CLIQUE DANS LE MENU
        ---------------------------------------- */

        menu.addEventListener("click", function (event) {

            event.stopPropagation();

        });


        /* ----------------------------------------
           FERMER SI ON CLIQUE À CÔTÉ
        ---------------------------------------- */

        document.addEventListener("click", function () {

            if (menu.classList.contains("active")) {

                closeMenu();

            }

        });


        /* ----------------------------------------
           ESC
        ---------------------------------------- */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                closeMenu();

            }

        });


        /* ----------------------------------------
           FERMER APRÈS CLIC SUR UN LIEN
        ---------------------------------------- */

        document.querySelectorAll(".menu-list a").forEach(function (link) {

            link.addEventListener("click", function () {

                closeMenu();

            });

        });

    }


    /* ========================================
       CONCERTS : DATES PASSÉES AUTOMATIQUES
    ========================================= */

    const showItems = document.querySelectorAll(".show-item");

    if (showItems.length > 0) {

        /*
           On récupère la date du jour
           et on la ramène à minuit.

           Ainsi, un concert prévu aujourd'hui
           reste considéré comme "à venir".
        */

        const today = new Date();

        today.setHours(0, 0, 0, 0);


        showItems.forEach(function (showItem) {

            const timeElement = showItem.querySelector("time[datetime]");

            if (!timeElement) {
                return;
            }


            const dateString = timeElement.getAttribute("datetime");

            if (!dateString) {
                return;
            }


            /*
               On construit la date en heure locale
               pour éviter les décalages de fuseau horaire.
            */

            const parts = dateString.split("-");

            if (parts.length !== 3) {
                return;
            }


            const year = Number(parts[0]);

            const month = Number(parts[1]) - 1;

            const day = Number(parts[2]);


            const showDate = new Date(
                year,
                month,
                day
            );

            showDate.setHours(0, 0, 0, 0);


            /*
               Si la date est antérieure à aujourd'hui,
               on ajoute automatiquement .past
            */

            if (showDate < today) {

                showItem.classList.add("past");

            } else {

                showItem.classList.remove("past");

            }

        });

    }

});document.addEventListener("DOMContentLoaded", async function () {

    const navigationTarget = document.getElementById("site-navigation");

    if (!navigationTarget) {
        return;
    }


    /* ========================================
       CHARGEMENT DU COMPOSANT COMMUN
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


    if (menuButton && closeButton && menu) {

        /* ----------------------------------------
           FONCTION COMMUNE DE FERMETURE
        ---------------------------------------- */

        function closeMenu() {

            menu.classList.remove("active");

            document.body.classList.remove("menu-active");

        }


        /* ----------------------------------------
           OUVRIR
        ---------------------------------------- */

        menuButton.addEventListener("click", function (event) {

            event.stopPropagation();

            menu.classList.add("active");

            document.body.classList.add("menu-active");

        });


        /* ----------------------------------------
           FERMER AVEC LE BOUTON
        ---------------------------------------- */

        closeButton.addEventListener("click", function (event) {

            event.stopPropagation();

            closeMenu();

        });


        /* ----------------------------------------
           NE PAS FERMER SI ON CLIQUE DANS LE MENU
        ---------------------------------------- */

        menu.addEventListener("click", function (event) {

            event.stopPropagation();

        });


        /* ----------------------------------------
           FERMER SI ON CLIQUE À CÔTÉ
        ---------------------------------------- */

        document.addEventListener("click", function () {

            if (menu.classList.contains("active")) {

                closeMenu();

            }

        });


        /* ----------------------------------------
           ESC
        ---------------------------------------- */

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {

                closeMenu();

            }

        });


        /* ----------------------------------------
           FERMER APRÈS CLIC SUR UN LIEN
        ---------------------------------------- */

        document.querySelectorAll(".menu-list a").forEach(function (link) {

            link.addEventListener("click", function () {

                closeMenu();

            });

        });

    }


    /* ========================================
       CONCERTS : DATES PASSÉES AUTOMATIQUES
    ========================================= */

    const showItems = document.querySelectorAll(".show-item");

    if (showItems.length > 0) {

        /*
           On récupère la date du jour
           et on la ramène à minuit.

           Ainsi, un concert prévu aujourd'hui
           reste considéré comme "à venir".
        */

        const today = new Date();

        today.setHours(0, 0, 0, 0);


        showItems.forEach(function (showItem) {

            const timeElement = showItem.querySelector("time[datetime]");

            if (!timeElement) {
                return;
            }


            const dateString = timeElement.getAttribute("datetime");

            if (!dateString) {
                return;
            }


            /*
               On construit la date en heure locale
               pour éviter les décalages de fuseau horaire.
            */

            const parts = dateString.split("-");

            if (parts.length !== 3) {
                return;
            }


            const year = Number(parts[0]);

            const month = Number(parts[1]) - 1;

            const day = Number(parts[2]);


            const showDate = new Date(
                year,
                month,
                day
            );

            showDate.setHours(0, 0, 0, 0);


            /*
               Si la date est antérieure à aujourd'hui,
               on ajoute automatiquement .past
            */

            if (showDate < today) {

                showItem.classList.add("past");

            } else {

                showItem.classList.remove("past");

            }

        });

    }

});
