document.addEventListener("DOMContentLoaded", async function () {

    const navigationTarget =
        document.getElementById("site-navigation");

    const body =
        document.body;


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


        window.requestAnimationFrame(function () {

            window.requestAnimationFrame(function () {

                body.classList.add("intro-ready");

            });

        });


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


        const html =
            await response.text();


        navigationTarget.innerHTML =
            html;

    } catch (error) {

        console.error(error);

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
       Logo visible sur toutes les pages.
    */

    if (siteLogo) {

        siteLogo.style.display = "block";

    }


    /* ========================================
       LOGO SUR LA HOME
    ========================================= */

    if (
        isHome &&
        siteLogo
    ) {

        siteLogo.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

            }
        );

    }


    if (titleElement) {

        if (isHome) {

            titleElement.style.display = "none";

        } else {

            titleElement.textContent =
                pageTitle;

            titleElement.style.display =
                "block";

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


        /*
           Le menu peut être ouvert de deux façons :

           "hover"
           → ouverture temporaire au survol
           → pas de croix
           → fermeture quand la souris quitte la zone

           "click"
           → ouverture persistante
           → croix visible
           → fermeture manuelle
        */

        let menuOpenMode = null;


        /*
           La croix est masquée par défaut.
        */

        closeButton.hidden = true;


        /* ========================================
           OUVRIR
        ========================================= */

        function openMenu(mode) {

            menuOpenMode = mode;


            menu.classList.add("active");

            body.classList.add("menu-active");


            /*
               Croix uniquement si le menu
               a été ouvert par clic / tap.
            */

            closeButton.hidden =
                mode !== "click";

        }


        /* ========================================
           FERMER
        ========================================= */

        function closeMenu() {

            menu.classList.remove("active");

            body.classList.remove("menu-active");


            menuOpenMode = null;


            closeButton.hidden = true;

        }


        /* ========================================
           DESKTOP — SURVOL
        ========================================= */

        let closeTimer = null;


        function cancelScheduledClose() {

            if (closeTimer !== null) {

                window.clearTimeout(
                    closeTimer
                );

                closeTimer = null;

            }

        }


        function scheduleClose() {

            /*
               Si le menu a été verrouillé
               par un clic, la sortie de souris
               ne doit pas le fermer.
            */

            if (menuOpenMode === "click") {
                return;
            }


            cancelScheduledClose();


            closeTimer =
                window.setTimeout(function () {

                    if (
                        menuOpenMode === "hover" &&
                        !menuButton.matches(":hover") &&
                        !menu.matches(":hover")
                    ) {

                        closeMenu();

                    }


                    closeTimer = null;

                }, 120);

        }


        /* ========================================
           SURVOL DU BOUTON MENU
        ========================================= */

        menuButton.addEventListener(
            "mouseenter",
            function () {

                if (!desktopHover.matches) {
                    return;
                }


                /*
                   Un menu ouvert par clic
                   reste dans ce mode.
                */

                if (menuOpenMode === "click") {
                    return;
                }


                cancelScheduledClose();


                openMenu("hover");

            }
        );


        menuButton.addEventListener(
            "mouseleave",
            function () {

                if (!desktopHover.matches) {
                    return;
                }


                scheduleClose();

            }
        );


        /* ========================================
           SURVOL DU MENU OUVERT
        ========================================= */

        menu.addEventListener(
            "mouseenter",
            function () {

                if (!desktopHover.matches) {
                    return;
                }


                cancelScheduledClose();


                /*
                   Si le menu est déjà verrouillé
                   par clic, on ne change pas son mode.
                */

                if (menuOpenMode !== "click") {

                    openMenu("hover");

                }

            }
        );


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
           OUVERTURE AU CLIC / TAP
        ========================================= */

        menuButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                /*
                   Sur ordinateur :
                   un clic transforme l'ouverture
                   en ouverture persistante.

                   Sur tactile :
                   comportement normal au tap.
                */

                cancelScheduledClose();


                openMenu("click");

            }
        );


        /* ========================================
           BOUTON FERMER
        ========================================= */

        closeButton.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                cancelScheduledClose();


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
                    menuOpenMode === "click" &&
                    menu.classList.contains("active")
                ) {

                    closeMenu();

                }

            }
        );


        /* ========================================
           ESCAPE
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
           LIENS DU MENU
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
           CHANGEMENT DE TYPE DE POINTE
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
       CONCERTS
    ========================================= */

    const showItems =
        document.querySelectorAll(".show-item");


    if (showItems.length > 0) {


        /* ========================================
           PREMIÈRES PARTIES
        ========================================= */

        showItems.forEach(function (showItem) {

            const metaElement =
                showItem.querySelector(".show-meta");


            if (!metaElement) {
                return;
            }


            const metaText =
                metaElement.textContent
                    .trim()
                    .replace(/\s+/g, " ");


            /*
               On repère automatiquement
               toutes les mentions :

               "première partie ARTISTE"
            */

            const supportMatch =
                metaText.match(
                    /^première partie\s+(.+)$/i
                );


            if (!supportMatch) {
                return;
            }


            const artistName =
                supportMatch[1].trim();


            /*
               Classe appliquée à toute la date.
            */

            showItem.classList.add(
                "show-support"
            );


            /*
               On transforme la ligne en :

               PREMIÈRE PARTIE   Artiste
            */

            metaElement.classList.add(
                "show-support-meta"
            );


            metaElement.textContent = "";


            const label =
                document.createElement("span");


            label.className =
                "show-support-label";


            label.textContent =
                "première partie";


            const artist =
                document.createElement("span");


            artist.className =
                "show-support-artist";


            artist.textContent =
                artistName;


            metaElement.append(
                label,
                artist
            );

        });


        /* ========================================
           DATES PASSÉES
        ========================================= */

        const today =
            new Date();


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
               Date construite en heure locale
               pour éviter les décalages
               liés au fuseau horaire.
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

                showItem.classList.add(
                    "past"
                );

            } else {

                showItem.classList.remove(
                    "past"
                );

            }

        });

    }


    /* ========================================
       LANCEMENT INTRO
    ========================================= */

    revealPage();

});
