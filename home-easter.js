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
       PETIT GLITCH — INDICE
    ========================================= */

    function triggerLogoHint(logo) {

        /*
           On retire d'abord la classe
           pour permettre de rejouer
           l'animation si nécessaire.
        */

        logo.classList.remove(
            "easter-hint"
        );


        /*
           On force un reflow pour que
           l'animation puisse redémarrer.
        */

        void logo.offsetWidth;


        logo.classList.add(
            "easter-hint"
        );


        window.setTimeout(function () {

            logo.classList.remove(
                "easter-hint"
            );

        }, 380);

    }


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
           Focus clavier sur le jeu.
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


        /*
           Premier clic :
           fenêtre de 1,2 seconde
           pour compléter les 3 clics.
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
           Deuxième clic :
           petit indice visuel.
        */

        if (clickCount === 2) {

            triggerLogoHint(
                logo
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
       Capture = true afin de neutraliser
       le lien du logo avant toute navigation.
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
       CLIC SUR LE FOND
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
