document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    if (body.dataset.home !== "true") {
        return;
    }


    /* ========================================
       ÉLÉMENTS
    ========================================= */

    const gameOverlay =
        document.getElementById("gameOverlay");

    const gameClose =
        document.getElementById("gameClose");

    const gameIframe =
        document.getElementById("gameIframe");


    if (
        !gameOverlay ||
        !gameClose ||
        !gameIframe
    ) {
        return;
    }


    /* ========================================
       JEU LOCAL
    ========================================= */

    const gameUrl =
        "game/index.html";


    /* ========================================
       ÉTAT
    ========================================= */

    let clickCount = 0;
    let clickTimer = null;

    let gameLoaded = false;

    let welcomeWasVisible = false;


    /* ========================================
       GLITCH — PETIT INDICE
       1er clic
    ========================================= */

    function triggerSmallGlitch(logo) {

        /*
           On retire les deux classes afin
           de pouvoir rejouer l'animation.
        */

        logo.classList.remove(
            "easter-hint-small",
            "easter-hint-big"
        );


        /*
           Force le navigateur à prendre en
           compte la suppression des classes.
        */

        void logo.offsetWidth;


        logo.classList.add(
            "easter-hint-small"
        );


        window.setTimeout(function () {

            logo.classList.remove(
                "easter-hint-small"
            );

        }, 320);

    }


    /* ========================================
       GLITCH — INDICE FORT
       2e clic
    ========================================= */

    function triggerBigGlitch(logo) {

        logo.classList.remove(
            "easter-hint-small",
            "easter-hint-big"
        );


        void logo.offsetWidth;


        logo.classList.add(
            "easter-hint-big"
        );


        window.setTimeout(function () {

            logo.classList.remove(
                "easter-hint-big"
            );

        }, 620);

    }


    /* ========================================
       OUVRIR LE JEU
    ========================================= */

    function openGame() {

        welcomeWasVisible =
            body.classList.contains(
                "welcome-visible"
            );


        /*
           Masquer le GIF d'accueil
           s'il est actuellement visible.
        */

        body.classList.remove(
            "welcome-visible"
        );


        /*
           Afficher l'overlay.
        */

        body.classList.add(
            "game-open"
        );


        gameOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
           Le jeu n'est chargé qu'une seule fois.
        */

        if (!gameLoaded) {

            gameIframe.src =
                gameUrl;

            gameLoaded = true;

        }


        /*
           Donner le focus au jeu pour
           permettre l'utilisation du clavier.
        */

        window.setTimeout(function () {

            gameIframe.focus();

        }, 300);

    }


    /* ========================================
       FERMER LE JEU
    ========================================= */

    function closeGame() {

        body.classList.remove(
            "game-open"
        );


        gameOverlay.setAttribute(
            "aria-hidden",
            "true"
        );


        /*
           Restaurer le GIF d'accueil
           s'il était visible avant
           l'ouverture du jeu.
        */

        if (welcomeWasVisible) {

            body.classList.add(
                "welcome-visible"
            );

        }

    }


    /* ========================================
       3 CLICS SUR LE LOGO
    ========================================= */

    function handleLogoClick(event) {

        const logo =
            event.target.closest(
                ".site-logo"
            );


        if (!logo) {
            return;
        }


        /*
           Sur la page d'accueil,
           le logo ne doit jamais
           recharger index.html.
        */

        event.preventDefault();
        event.stopPropagation();


        /*
           Aucun déclenchement supplémentaire
           lorsque le jeu est ouvert.
        */

        if (
            body.classList.contains(
                "game-open"
            )
        ) {
            return;
        }


        clickCount += 1;


        /* ====================================
           PREMIER CLIC
           Petit glitch
        ==================================== */

        if (clickCount === 1) {

            triggerSmallGlitch(
                logo
            );


            /*
               Fenêtre de 1,2 seconde pour
               effectuer les trois clics.
            */

            clickTimer =
                window.setTimeout(
                    function () {

                        clickCount = 0;
                        clickTimer = null;

                    },
                    1200
                );


            return;

        }


        /* ====================================
           DEUXIÈME CLIC
           Glitch beaucoup plus marqué
        ==================================== */

        if (clickCount === 2) {

            triggerBigGlitch(
                logo
            );


            return;

        }


        /* ====================================
           TROISIÈME CLIC
           Ouverture du jeu
        ==================================== */

        if (clickCount >= 3) {

            if (clickTimer !== null) {

                window.clearTimeout(
                    clickTimer
                );

                clickTimer = null;

            }


            clickCount = 0;


            /*
               Nettoyer les éventuelles
               animations encore actives.
            */

            logo.classList.remove(
                "easter-hint-small",
                "easter-hint-big"
            );


            openGame();

        }

    }


    /* ========================================
       ÉCOUTEUR SUR LE LOGO
    ========================================= */

    /*
       Capture = true afin de neutraliser
       le lien du logo avant que la navigation
       vers index.html puisse avoir lieu.
    */

    document.addEventListener(
        "click",
        handleLogoClick,
        true
    );


    /* ========================================
       BOUTON FERMER
    ========================================= */

    gameClose.addEventListener(
        "click",
        closeGame
    );


    /* ========================================
       CLIC SUR LE FOND NOIR
    ========================================= */

    gameOverlay.addEventListener(
        "click",
        function (event) {

            if (
                event.target === gameOverlay
            ) {

                closeGame();

            }

        }
    );


    /* ========================================
       TOUCHE ESCAPE
    ========================================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                body.classList.contains(
                    "game-open"
                )
            ) {

                closeGame();

            }

        }
    );

});
