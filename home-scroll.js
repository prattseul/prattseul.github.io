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

    let touchStartY = null;

    let gifVisible = false;

    let backgroundReady = false;

    let gifReady = false;

    let interactionsReady = false;


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
       État initial obligatoire :

       IMG02 visible.
       Le GIF n'a pas encore de src.
    */

    resetWelcomeGif();


    /* ========================================
       AFFICHER LE GIF
    ========================================= */

    function showWelcomeGif() {

        /*
           Impossible d'afficher le GIF
           tant que :

           - IMG02 n'est pas prête
           - le GIF n'est pas prêt
           - les interactions ne sont pas actives
        */

        if (
            !backgroundReady ||
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
       CHARGEMENT DU GIF
    ========================================= */

    function loadWelcomeGif() {

        /*
           Seulement maintenant on donne
           son fichier à la balise <img>.

           Le navigateur n'a donc pas pu
           télécharger / afficher le GIF
           avant IMG02.
        */

        welcomeGif.src =
            gifUrl;


        /*
           Si le GIF est déjà en cache.
        */

        if (
            welcomeGif.complete &&
            welcomeGif.naturalWidth > 0
        ) {

            gifReady = true;
            interactionsReady = true;

            return;
        }


        welcomeGif.addEventListener(
            "load",
            function () {

                gifReady = true;
                interactionsReady = true;

            },
            {
                once: true
            }
        );


        welcomeGif.addEventListener(
            "error",
            function () {

                /*
                   En cas de problème avec le GIF,
                   on conserve simplement IMG02.
                */

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

    function backgroundIsReady() {

        backgroundReady = true;


        /*
           Même lorsque l'image vient d'être
           décodée, on laisse au navigateur
           deux frames pour la peindre
           réellement à l'écran.

           Ensuite seulement :
           chargement du GIF.
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
       CHARGEMENT / DÉCODAGE DE IMG02
    ========================================= */

    function prepareBackground() {

        const backgroundImage =
            new Image();


        backgroundImage.src =
            backgroundUrl;


        /*
           Si l'image est déjà disponible
           dans le cache navigateur.
        */

        if (
            backgroundImage.complete &&
            backgroundImage.naturalWidth > 0
        ) {

            if (
                typeof backgroundImage.decode ===
                "function"
            ) {

                backgroundImage
                    .decode()
                    .catch(function () {

                        /*
                           decode() peut échouer
                           même si l'image est
                           parfaitement utilisable.
                        */

                    })
                    .finally(function () {

                        backgroundIsReady();

                    });

            } else {

                backgroundIsReady();

            }


            return;
        }


        /*
           Cache froid :
           on attend réellement IMG02.
        */

        backgroundImage.addEventListener(
            "load",
            function () {

                if (
                    typeof backgroundImage.decode ===
                    "function"
                ) {

                    backgroundImage
                        .decode()
                        .catch(function () {

                        })
                        .finally(function () {

                            backgroundIsReady();

                        });

                } else {

                    backgroundIsReady();

                }

            },
            {
                once: true
            }
        );


        backgroundImage.addEventListener(
            "error",
            function () {

                /*
                   Si IMG02 ne charge pas,
                   on n'autorise surtout pas
                   le GIF à prendre sa place.
                */

                backgroundReady = false;
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
           → BACKGROUND
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

    }


    /* ========================================
       TACTILE — MOUVEMENT
    ========================================= */

    function handleTouchMove(event) {

        if (
            !interactionsReady ||
            touchStartY === null ||
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
           Le doigt monte :
           intention de descendre.

           → GIF
        */

        if (distance > 14) {

            showWelcomeGif();


            touchStartY =
                currentY;


            return;

        }


        /*
           Le doigt descend :
           intention de remonter.

           → BACKGROUND
        */

        if (distance < -14) {

            hideWelcomeGif();


            touchStartY =
                currentY;

        }

    }


    /* ========================================
       FIN DU GESTE TACTILE
    ========================================= */

    function handleTouchEnd() {

        touchStartY = null;

    }


    /* ========================================
       CACHE DE NAVIGATION
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

            /*
               Retour via BFCache :
               toujours revenir sur IMG02.
            */

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


    /* ========================================
       DÉMARRAGE

       IMG02 est la toute première image
       que ce script autorise.
    ========================================= */

    prepareBackground();

});
