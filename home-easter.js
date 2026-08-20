document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       HOME UNIQUEMENT
    ========================================= */

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
       URL DIRECTE DU BUILD HTML5
    ========================================= */

    const gameUrl =
        "https://html-classic.itch.zone/html/16608196/index.html?v=1782687302";


    /* ========================================
       ÉTAT
    ========================================= */

    let clickCount = 0;

    let clickTimer = null;

    let welcomeWasVisible = false;

    let gameLoaded = false;


    /* ========================================
       OUVRIR LE JEU
    ========================================= */

    function openGame() {

        /*
           Mémoriser l'état du GIF de home.
        */

        welcomeWasVisible =
            body.classList.contains(
                "welcome-visible"
            );


        /*
           Masquer le GIF plein écran.
        */

        body.classList.remove(
            "welcome-visible"
        );


        /*
           Afficher d'abord l'overlay.
        */

        body.classList.add(
            "game-open"
        );


        gameOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
           IMPORTANT :

           On charge le jeu une fois que
           son conteneur est réellement visible.

           Cela évite certains problèmes
           d'initialisation Canvas / WebAudio
           quand le jeu démarre dans un élément
           visibility:hidden.
        */

        if (!gameLoaded) {

            window.requestAnimationFrame(
                function () {

                    window.requestAnimationFrame(
                        function () {

                            gameIframe.src =
                                gameUrl;

                            gameLoaded = true;

                        }
                    );

                }
            );

        }


        /*
           Focus sur le jeu après son ouverture.
        */

        window.setTimeout(
            function () {

                gameIframe.focus();

            },
            400
        );

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
           s'il était affiché avant.
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
           Sur la home, le logo ne doit
           jamais recharger index.html.
        */

        event.preventDefault();

        event.stopPropagation();


        if (
            body.classList.contains(
                "game-open"
            )
        ) {
            return;
        }


        clickCount += 1;


        /*
           1,2 seconde pour effectuer
           les trois clics.
        */

        if (clickCount === 1) {

            clickTimer =
                window.setTimeout(
                    function () {

                        clickCount = 0;
                        clickTimer = null;

                    },
                    1200
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


    document.addEventListener(
        "click",
        handleLogoClick,
        true
    );


    /* ========================================
       FERMER
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
       ESCAPE
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
