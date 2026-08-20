document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       HOME UNIQUEMENT
    ========================================= */

    const body = document.body;

    if (body.dataset.home !== "true") {
        return;
    }


    const welcomeGif =
        document.querySelector(".welcome-gif");


    if (!welcomeGif) {
        return;
    }


    /* ========================================
       ÉTAT
    ========================================= */

    let touchStartY = null;

    let gifVisible = false;


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
        */

        if (event.deltaY > 4) {

            showWelcomeGif();

            return;
        }


        /*
           deltaY négatif :
           tentative de revenir vers
           le haut de la page.
        */

        if (event.deltaY < -4) {

            hideWelcomeGif();

        }

    }


    /* ========================================
       CLAVIER
    ========================================= */

    function handleKeydown(event) {

        /*
           Descendre dans la page.
        */

        const downKeys = [
            "ArrowDown",
            "PageDown",
            "End",
            " "
        ];


        /*
           Remonter dans la page.
        */

        const upKeys = [
            "ArrowUp",
            "PageUp",
            "Home"
        ];


        if (downKeys.includes(event.key)) {

            showWelcomeGif();

            return;
        }


        if (upKeys.includes(event.key)) {

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
           on essaie de descendre dans la page.
           → afficher le GIF.
        */

        if (distance > 14) {

            showWelcomeGif();

            touchStartY = currentY;

            return;
        }


        /*
           Le doigt descend :
           on essaie de remonter dans la page.
           → retour au background.
        */

        if (distance < -14) {

            hideWelcomeGif();

            touchStartY = currentY;

        }

    }


    /* ========================================
       FIN DU GESTE TACTILE
    ========================================= */

    function handleTouchEnd() {

        touchStartY = null;

    }


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
