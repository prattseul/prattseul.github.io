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

        /*
           On mémorise l'état du GIF de home.
        */

        welcomeWasVisible =
            body.classList.contains(
                "welcome-visible"
            );


        /*
           On masque temporairement le GIF
           plein écran derrière le jeu.
        */

        body.classList.remove(
            "welcome-visible"
        );


        /*
           Chargement différé de l'iframe.
        */

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


        /*
           Focus sur le bouton fermer.
        */

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


        /*
           On restaure l'état précédent
           de la home.
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

    document.addEventListener(
        "click",
        function (event) {

            const logo =
                event.target.closest(
                    "#siteLogo, .site-logo"
                );


            if (!logo) {
                return;
            }


            /*
               Si le jeu est déjà ouvert,
               on ignore les clics.
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
               fenêtre d'environ 1 seconde
               pour réaliser les trois clics.
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
               Troisième clic.
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

            /*
               Le clic doit être directement
               sur l'overlay, pas sur le jeu.
            */

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
