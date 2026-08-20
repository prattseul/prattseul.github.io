document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       HOME UNIQUEMENT
    ========================================= */

    const body =
        document.body;


    if (
        body.dataset.home !== "true"
    ) {
        return;
    }


    /* ========================================
       ÉLÉMENTS
    ========================================= */

    const gameOverlay =
        document.getElementById(
            "gameOverlay"
        );


    const gameClose =
        document.getElementById(
            "gameClose"
        );


    if (
        !gameOverlay ||
        !gameClose
    ) {
        return;
    }


    /* ========================================
       ÉTAT
    ========================================= */

    let clickCount = 0;

    let clickTimer = null;

    let welcomeWasVisible = false;


    /* ========================================
       OUVRIR LE JEU
    ========================================= */

    function openGame() {

        /*
           On mémorise si le GIF d'accueil
           était visible.
        */

        welcomeWasVisible =
            body.classList.contains(
                "welcome-visible"
            );


        /*
           On masque le GIF de fond
           pendant le jeu.
        */

        body.classList.remove(
            "welcome-visible"
        );


        /*
           Ouverture overlay.
        */

        body.classList.add(
            "game-open"
        );


        gameOverlay.setAttribute(
            "aria-hidden",
            "false"
        );


        /*
           Focus sur fermer.
        */

        window.setTimeout(
            function () {

                gameClose.focus();

            },
            100
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
           On restaure le GIF d'accueil
           s'il était visible auparavant.
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


        /*
           Si le jeu est déjà ouvert,
           on ignore.
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
           on donne 1,2 seconde pour
           effectuer les trois clics.
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

            if (
                clickTimer !== null
            ) {

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
       On utilise la phase capture
       pour bloquer le lien du logo
       avant toute navigation.
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
        function () {

            closeGame();

        }
    );


    /* ========================================
       CLIC SUR LE FOND
    ========================================= */

    gameOverlay.addEventListener(
        "click",
        function (event) {

            /*
               On ferme uniquement si
               l'utilisateur clique sur
               l'overlay lui-même.

               Un clic dans le jeu
               ne doit évidemment rien faire.
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
