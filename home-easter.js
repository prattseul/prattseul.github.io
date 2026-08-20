document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    if (body.dataset.home !== "true") {
        return;
    }


    const gameOverlay =
        document.getElementById("gameOverlay");

    const gameClose =
        document.getElementById("gameClose");


    if (
        !gameOverlay ||
        !gameClose
    ) {
        return;
    }


    let clickCount = 0;
    let clickTimer = null;

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


    gameOverlay.addEventListener(
        "click",
        function (event) {

            if (event.target === gameOverlay) {

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
