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


    const welcomeGif =
        document.querySelector(
            ".welcome-gif"
        );


    if (!welcomeGif) {
        return;
    }


    /* ========================================
       FICHIERS
    ========================================= */

    const backgroundUrl =
        "images/IMG02.jpg";


    const gifUrl =
        "images/welcomeGif.gif";


    /* ========================================
       ÉTAT
    ========================================= */

    let gifVisible = false;

    let gifReady = false;

    let interactionsReady = false;

    let touchStartY = null;

    let touchDirectionHandled = false;


    /* ========================================
       RESET
    ========================================= */

    function resetWelcomeGif() {

        gifVisible = false;


        body.classList.remove(
            "welcome-visible"
        );

    }


    /*
       La home commence TOUJOURS
       avec IMG02.
    */

    resetWelcomeGif();


    /* ========================================
       AFFICHER LE GIF
    ========================================= */

    function showWelcomeGif() {

        if (
            !gifReady ||
            !interactionsReady ||
            gifVisible
        ) {
            return;
        }


        gifVisible = true;


        body.classList.add(
            "welcome-visible"
        );

    }


    /* ========================================
       MASQUER LE GIF
    ========================================= */

    function hideWelcomeGif() {

        if (!gifVisible) {
            return;
        }


        gifVisible = false;


        body.classList.remove(
            "welcome-visible"
        );

    }


    /* ========================================
       ACTIVER LE GIF
    ========================================= */

    function activateWelcomeGif() {

        /*
           Le GIF est maintenant chargé,
           mais reste opacity: 0 grâce au CSS.

           On peut donc enfin supprimer
           l'attribut hidden sans provoquer
           de flash.
        */

        welcomeGif.hidden = false;


        /*
           Deux frames supplémentaires permettent
           au navigateur d'enregistrer proprement
           l'état opacity: 0 avant toute interaction.
        */

        window.requestAnimationFrame(
            function () {

                window.requestAnimationFrame(
                    function () {

                        gifReady = true;
                        interactionsReady = true;

                    }
                );

            }
        );

    }


    /* ========================================
       CHARGER LE GIF

       UNIQUEMENT APRÈS LE BACKGROUND
    ========================================= */

    function loadWelcomeGif() {

        /*
           Le GIF n'avait aucun src jusque-là.

           Le navigateur commence seulement
           maintenant à le télécharger.
        */

        welcomeGif.src =
            gifUrl;


        /*
           Cas où il est déjà en cache.
        */

        if (
            welcomeGif.complete &&
            welcomeGif.naturalWidth > 0
        ) {

            activateWelcomeGif();

            return;
        }


        welcomeGif.addEventListener(
            "load",
            function () {

                activateWelcomeGif();

            },
            {
                once: true
            }
        );


        welcomeGif.addEventListener(
            "error",
            function () {

                /*
                   Si le GIF échoue,
                   on conserve simplement
                   le background.
                */

                welcomeGif.hidden = true;

                gifReady = false;
                interactionsReady = false;

                resetWelcomeGif();

            },
            {
                once: true
            }
        );

    }


    /* ========================================
       BACKGROUND PRÊT
    ========================================= */

    function backgroundReady() {

        /*
           On attend deux frames.

           IMG02 est décodée à ce stade,
           mais ces frames laissent le temps
           au navigateur de la peindre réellement.
        */

        window.requestAnimationFrame(
            function () {

                window.requestAnimationFrame(
                    function () {

                        loadWelcomeGif();

                    }
                );

            }
        );

    }


    /* ========================================
       PRÉPARER IMG02
    ========================================= */

    function prepareBackground() {

        const image =
            new Image();


        image.src =
            backgroundUrl;


        /* ----------------------------------------
           IMAGE DÉJÀ EN CACHE
        ---------------------------------------- */

        if (
            image.complete &&
            image.naturalWidth > 0
        ) {

            if (
                typeof image.decode ===
                "function"
            ) {

                image
                    .decode()
                    .catch(function () {

                        /*
                           Certains navigateurs peuvent
                           rejeter decode() alors que
                           l'image reste utilisable.
                        */

                    })
                    .finally(function () {

                        backgroundReady();

                    });

            } else {

                backgroundReady();

            }


            return;
        }


        /* ----------------------------------------
           CACHE FROID
        ---------------------------------------- */

        image.addEventListener(
            "load",
            function () {

                if (
                    typeof image.decode ===
                    "function"
                ) {

                    image
                        .decode()
                        .catch(function () {

                        })
                        .finally(function () {

                            backgroundReady();

                        });

                } else {

                    backgroundReady();

                }

            },
            {
                once: true
            }
        );


        image.addEventListener(
            "error",
            function () {

                /*
                   Si IMG02 n'est pas disponible,
                   le GIF reste complètement caché.
                */

                welcomeGif.hidden = true;

                gifReady = false;
                interactionsReady = false;

                resetWelcomeGif();

            },
            {
                once: true
            }
        );

    }


    /* ========================================
       SOURIS / TRACKPAD
    ========================================= */

    function handleWheel(event) {

        if (!interactionsReady) {
            return;
        }


        /*
           Scroll vers le bas
           → GIF
        */

        if (event.deltaY > 4) {

            showWelcomeGif();

            return;
        }


        /*
           Scroll vers le haut
           → IMG02
        */

        if (event.deltaY < -4) {

            hideWelcomeGif();

        }

    }


    /* ========================================
       CLAVIER
    ========================================= */

    function handleKeydown(event) {

        if (!interactionsReady) {
            return;
        }


        const downKeys = [
            "ArrowDown",
            "PageDown",
            "End",
            " "
        ];


        const upKeys = [
            "ArrowUp",
            "PageUp",
            "Home"
        ];


        if (
            downKeys.includes(
                event.key
            )
        ) {

            showWelcomeGif();

            return;
        }


        if (
            upKeys.includes(
                event.key
            )
        ) {

            hideWelcomeGif();

        }

    }


    /* ========================================
       TACTILE — DÉBUT
    ========================================= */

    function handleTouchStart(event) {

        if (
            !interactionsReady ||
            !event.touches ||
            event.touches.length === 0
        ) {
            return;
        }


        touchStartY =
            event.touches[0].clientY;


        touchDirectionHandled =
            false;

    }


    /* ========================================
       TACTILE — MOUVEMENT
    ========================================= */

    function handleTouchMove(event) {

        if (
            !interactionsReady ||
            touchStartY === null ||
            touchDirectionHandled ||
            !event.touches ||
            event.touches.length === 0
        ) {
            return;
        }


        const currentY =
            event.touches[0].clientY;


        const distance =
            touchStartY - currentY;


        /*
           Doigt vers le haut :
           tentative de descendre.

           → GIF
        */

        if (distance > 20) {

            touchDirectionHandled =
                true;


            showWelcomeGif();

            return;
        }


        /*
           Doigt vers le bas :
           tentative de remonter.

           → IMG02
        */

        if (distance < -20) {

            touchDirectionHandled =
                true;


            hideWelcomeGif();

        }

    }


    /* ========================================
       FIN DU GESTE
    ========================================= */

    function handleTouchEnd() {

        touchStartY = null;

        touchDirectionHandled =
            false;

    }


    function handleTouchCancel() {

        touchStartY = null;

        touchDirectionHandled =
            false;

    }


    /* ========================================
       BFCache / RETOUR NAVIGATEUR
    ========================================= */

    window.addEventListener(
        "pagehide",
        function () {

            resetWelcomeGif();

        }
    );


    window.addEventListener(
        "pageshow",
        function (event) {

            if (event.persisted) {

                resetWelcomeGif();

            }

        }
    );


    /* ========================================
       ÉCOUTEURS
    ========================================= */

    window.addEventListener(
        "wheel",
        handleWheel,
        {
            passive: true
        }
    );


    window.addEventListener(
        "keydown",
        handleKeydown
    );


    window.addEventListener(
        "touchstart",
        handleTouchStart,
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchmove",
        handleTouchMove,
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchend",
        handleTouchEnd,
        {
            passive: true
        }
    );


    window.addEventListener(
        "touchcancel",
        handleTouchCancel,
        {
            passive: true
        }
    );


    /* ========================================
       DÉMARRAGE
    ========================================= */

    prepareBackground();

});
