document.addEventListener("DOMContentLoaded", async function () {

    const navigationTarget = document.getElementById("site-navigation");
    const body = document.body;


    /* ========================================
       INTRO — FONCTION DE RÉVÉLATION
    ========================================= */

    function revealPage() {

        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


        if (reducedMotion.matches) {

            body.classList.add(
                "intro-ready",
                "intro-complete"
            );

            return;
        }


        /*
           Deux frames permettent au navigateur
           d'afficher l'état initial avant
           de lancer les transitions.
        */

        window.requestAnimationFrame(function () {

            window.requestAnimationFrame(function () {

                body.classList.add("intro-ready");

            });

        });


        /*
           Après l'intro, on supprime les transitions
           spécifiques afin de retrouver le comportement
           normal des hover du site.
        */

        window.setTimeout(function () {

            body.classList.add("intro-complete");

        }, 2100);

    }


    /* ========================================
       NAVIGATION
    ========================================= */

    if (!navigationTarget) {

        revealPage();

        return;
    }


    /* ========================================
       CHARGEMENT DU COMPOSANT COMMUN
    ========================================= */

    try {

        const response = await fetch(
            "components/navigation.html"
        );


        if (!response.ok) {

            throw new Error(
                "Impossible de charger navigation.html"
            );

        }


        const html = await response.text();

        navigationTarget.innerHTML = html;

    } catch (error) {

        console.error(error);


        /*
           Même en cas de problème avec la navigation,
           le contenu de la page reste visible.
        */

        revealPage();

        return;
    }


    /* ========================================
       LOGO + TITRE
    ========================================= */

    const pageTitle =
        body.dataset.pageTitle || "";

    const isHome =
        body.dataset.home === "true";


    const siteLogo =
        document.getElementById("siteLogo");

    const titleElement =
        document.getElementById("pageTitle");


    /*
       Le logo reste maintenant visible
       sur toutes les pages.
    */

    if (siteLogo) {

        siteLogo.style.display = "block";

    }


    if (titleElement) {

        if (isHome) {

            titleElement.style.display = "none";

        } else {

            titleElement.textContent = pageTitle;

            titleElement.style.display = "block";

        }

    }


    /* ========================================
       MENU
    ========================================= */

    const menuButton =
        document.querySelector(".menu-button");

    const closeButton =
        document.querySelector(".close-button");

    const menu =
        document.querySelector(".menu");


    if (
        menuButton &&
        closeButton &&
        menu
    ) {

        const desktopHover = window.matchMedia(
            "(hover: hover) and (pointer: fine)"
        );


        /* ========================================
           OUVRIR
        ========================================= */

        function openMenu() {

            menu.classList.add("active");

            body.classList.add("menu-active");

        }


        /* ========================================
           FERMER
        ========================================= */

        function closeMenu() {

            menu.classList.remove("active");

            body.classList.remove("menu-active");

        }


        /* ========================================
           DESKTOP — SURVOL
        ========================================= */

        let closeTimer = null;


        function cancelScheduledClose() {

            if (closeTimer !== null) {

                window.clearTimeout(closeTimer);

                closeTimer = null;

            }

        }


        function scheduleClose() {

            cancelScheduledClose();


            closeTimer = window.setTimeout(function () {

                if (
                    !menuButton.matches(":hover") &&
                    !menu.matches(":hover")
                ) {

                    closeMenu();

                }


                closeTimer = null;

            }, 120);

        }


        /* ----------------------------------------
           ENTRÉE SUR LE BOUTON
        ---------------------------------------- */

        menuButton.addEventListener(
            "mouseenter",
            function () {

                if (!desktopHover.matches) {
                    return;
                }


                cancelScheduledClose();

                openMenu();

            }
        );


        /* ----------------------------------------
           SORTIE DU BOUTON
        ---------------------------------------- */

        menuButton.addEventListener(
            "mouseleave",
            function () {

                if (!desktopHover.matches) {
                    return;
                }


                scheduleClose();

            }
        );


        /* ----------------------------------------
           ENTRÉE DANS LE MENU
        ---------------------------------------- */

        menu.addEventListener(
            "mouseenter",
            function () {

                if (!desktopHover.matches) {
                    return;
                }


                cancelScheduledClose();

                openMenu();

            }
        );


        /* ----------------------------------------
           SORTIE DU MENU
        ---------------------------------------- */

        menu.addEventListener(
            "mouseleave",
            function () {

                if (!desktopHover.matches) {
                    return;
                }


                scheduleClose();

            }
        );


        /* ========================================
           MOBILE / TACTILE — CLIC
        ========================================= */

        menuButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                if (desktopHover.matches) {
                    return;
                }


                openMenu();

            }
        );


        /* ========================================
           BOUTON FERMER
        ========================================= */

        closeButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                closeMenu();

            }
        );


        /* ========================================
           CLIC DANS LE MENU
        ========================================= */

        menu.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

            }
        );


        /* ========================================
           CLIC EXTÉRIEUR
           MOBILE / TACTILE
        ========================================= */

        document.addEventListener(
            "click",
            function () {

                if (
                    !desktopHover.matches &&
                    menu.classList.contains("active")
                ) {

                    closeMenu();

                }

            }
        );


        /* ========================================
           TOUCHE ESCAPE
        ========================================= */

        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    cancelScheduledClose();

                    closeMenu();

                }

            }
        );


        /* ========================================
           CLIC SUR LIEN DU MENU
        ========================================= */

        document
            .querySelectorAll(".menu-list a")
            .forEach(function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        cancelScheduledClose();

                        closeMenu();

                    }
                );

            });


        /* ========================================
           CHANGEMENT TYPE DE POINTE
        ========================================= */

        desktopHover.addEventListener(
            "change",
            function () {

                cancelScheduledClose();

                closeMenu();

            }
        );

    }


    /* ========================================
       CONCERTS — DATES PASSÉES
    ========================================= */

    const showItems =
        document.querySelectorAll(".show-item");


    if (showItems.length > 0) {

        const today = new Date();

        today.setHours(
            0,
            0,
            0,
            0
        );


        showItems.forEach(function (showItem) {

            const timeElement =
                showItem.querySelector(
                    "time[datetime]"
                );


            if (!timeElement) {
                return;
            }


            const dateString =
                timeElement.getAttribute(
                    "datetime"
                );


            if (!dateString) {
                return;
            }


            /*
               Création de la date en heure locale
               pour éviter les décalages de fuseau.
            */

            const parts =
                dateString.split("-");


            if (parts.length !== 3) {
                return;
            }


            const year =
                Number(parts[0]);

            const month =
                Number(parts[1]) - 1;

            const day =
                Number(parts[2]);


            const showDate =
                new Date(
                    year,
                    month,
                    day
                );


            showDate.setHours(
                0,
                0,
                0,
                0
            );


            if (showDate < today) {

                showItem.classList.add("past");

            } else {

                showItem.classList.remove("past");

            }

        });

    }


    /* ========================================
       LANCEMENT DE L'INTRO
    ========================================= */

    revealPage();

});
