document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       HOME UNIQUEMENT
    ========================================= */

    const body = document.body;


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
       ÉTAT
    ========================================= */

    let touchStartY = null;

    let gifVisible = false;


    /* ========================================
       REMISE À ZÉRO
    ========================================= */

    function resetWelcomeGif() {

        /*
           La home doit toujours commencer
           par IMG02.

           Cela synchronise également l'état
           JavaScript avec l'état CSS.
        */

        gifVisible = false;


        body.classList.remove(
            "welcome-visible"
        );

    }


    /*
       Important :

       on force l'état initial dès que
       le script démarre.
    */

    resetWelcomeGif();


    /* ========================================
       AFFICHER LE GIF
    ========================================= */

    function showWelcomeGif() {

        if (gifVisible) {
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
       SOURIS / TRACKPAD
    ========================================= */

    function handleWheel(event) {

        /*
           deltaY positif :
           tentative d'aller vers le bas
           de la page.

           → GIF
        */

        if (event.deltaY > 4) {

            showWelcomeGif();

            return;

        }


        /*
           deltaY négatif :
           tentative de revenir vers
           le haut de la page.

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
       TACTILE — DÉBUT DU GESTE
    ========================================= */

    function handleTouchStart(event) {

        if (
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
       BFCache
    ========================================= */

    /*
       C'est probablement ce qui provoquait
       ton flash.

       Avant que le navigateur mette la home
       en cache, on force le retour à IMG02.

       Ainsi, s'il restaure la page plus tard,
       il restaure directement le background,
       et non welcomeGif.gif.
    */

    window.addEventListener(
        "pagehide",
        function () {

            resetWelcomeGif();

        }
    );


    /*
       Safari / Chrome peuvent restaurer une
       page depuis leur Back-Forward Cache sans
       relancer DOMContentLoaded.

       On sécurise donc également le retour.
    */

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

});
