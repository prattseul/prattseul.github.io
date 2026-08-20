document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       HOME UNIQUEMENT
    ========================================= */

    const body = document.body;

    if (body.dataset.home !== "true") {
        return;
    }


    /* ========================================
       JEU
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
       URL DU JEU
    ========================================= */

    const gameUrl =
        "https://itch.io/embed-upload/16608196?color=000000";


    /* ========================================
       ÉTAT
    ========================================= */

    let clickCount = 0;

    let clickTimer = null;

    let gameLoaded = false;

    let welcomeWasVisible = false;


    /* ========================================
       OUVRIR LE JEU
    ========================================= */

    function openGame() {

        welcomeWasVisible =
            body.classList.contains(
                "welcome-visible"
            );


        body.classList.remove(
            "welcome-visible"
        );


        if (!gameLoaded) {

            gameIframe.src =
                gameUrl;

            gameLoaded = true;

        }


        body.classList.add(
            "game-open"
        );


        gameOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        window.setTimeout(function () {

            gameClose.focus();

        }, 100);

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
           Très important :
           on bloque immédiatement le lien
           vers index.html sur la home.
        */

        event.preventDefault();

        event.stopPropagation();


        /*
           Si le jeu est déjà ouvert,
           on ne compte pas les clics.
        */

        if (
            body.classList.contains(
                "game-open"
            )
        ) {
            return;
        }


        clickCount += 1;


        /*
           Premier clic :
           on ouvre une fenêtre de 1 seconde
           pour faire les 3 clics.
        */

        if (clickCount === 1) {

            clickTimer =
                window.setTimeout(
                    function () {

                        clickCount = 0;
                        clickTimer = null;

                    },
                    1000
                );

        }


        /*
           Troisième clic :
           ouverture du jeu.
        */

        if (clickCount >= 3) {

            if (clickTimer !== null) {

                window.clearTimeout(
                    clickTimer
                );

                clickTimer = null;

            }


            clickCount = 0;

            openGame();

        }

    }


    /*
       Capture = true.

       Cela permet de bloquer le clic
       avant que le lien <a href="index.html">
       ne puisse lancer la navigation.
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
                event.target ===
                gameOverlay
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
