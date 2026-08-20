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
       OUVRIR
    ========================================= */

    function openGame() {

        welcomeWasVisible =
            body.classList.contains(
                "welcome-visible"
            );


        body.classList.remove(
            "welcome-visible"
        );


        /*
           L'overlay est rendu visible
           avant de charger le jeu.
        */

        body.classList.add(
            "game-open"
        );


        gameOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
           Le jeu n'est chargé qu'au premier
           déclenchement de l'easter egg.
        */

        if (!gameLoaded) {

            gameIframe.src =
                gameUrl;

            gameLoaded = true;

        }


        /*
           On donne le focus au jeu
           pour le clavier.
        */

        window.setTimeout(function () {

            gameIframe.focus();

        }, 300);

    }


    /* ========================================
       FERMER
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
           Sur la home, le logo
           ne recharge jamais index.html.
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
       Capture = true afin de neutraliser
       le lien du logo avant la navigation.
    */

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
