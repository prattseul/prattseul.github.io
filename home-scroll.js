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

    let gifVisible =
        body.classList.contains(
            "welcome-visible"
        );


    let touchStartY = null;

    /*
       Empêche un même swipe de déclencher
       plusieurs changements contradictoires.
    */

    let touchDirectionHandled = false;


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
           Molette vers le bas :
           apparition du GIF.
        */

        if (event.deltaY > 4) {

            showWelcomeGif();

            return;
        }


        /*
           Molette vers le haut :
           retour au background.
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


        /*
           Nouveau swipe :
           on autorise une nouvelle décision.
        */

        touchDirectionHandled = false;

    }


    /* ========================================
       TACTILE — MOUVEMENT
    ========================================= */

    function handleTouchMove(event) {

        if (
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
           Le doigt monte :
           intention de descendre dans la page.

           → GIF.
        */

        if (distance > 20) {

            touchDirectionHandled = true;

            showWelcomeGif();

            return;
        }


        /*
           Le doigt descend :
           intention de remonter dans la page.

           → background.
        */

        if (distance < -20) {

            touchDirectionHandled = true;

            hideWelcomeGif();

        }

    }


    /* ========================================
       FIN DU GESTE TACTILE
    ========================================= */

    function handleTouchEnd() {

        touchStartY = null;

        touchDirectionHandled = false;

    }


    /* ========================================
       ANNULATION DU GESTE
    ========================================= */

    function handleTouchCancel() {

        touchStartY = null;

        touchDirectionHandled = false;

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


    window.addEventListener(
        "touchcancel",
        handleTouchCancel,
        {
            passive: true
        }
    );

});
