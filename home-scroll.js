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

    let revealed = false;

    let touchStartY = null;


    /* ========================================
       AFFICHER LE GIF
    ========================================= */

    function revealWelcomeGif() {

        if (revealed) {
            return;
        }


        revealed = true;

        body.classList.add(
            "welcome-visible"
        );


        /*
           Une fois le GIF révélé,
           les écouteurs inutiles sont retirés.
        */

        window.removeEventListener(
            "wheel",
            handleWheel
        );

        window.removeEventListener(
            "keydown",
            handleKeydown
        );

        window.removeEventListener(
            "touchstart",
            handleTouchStart
        );

        window.removeEventListener(
            "touchmove",
            handleTouchMove
        );

    }


    /* ========================================
       SOURIS / TRACKPAD
    ========================================= */

    function handleWheel(event) {

        /*
           On déclenche uniquement lorsqu'on
           essaie de descendre dans la page.

           Un mouvement vers le haut ne fait rien.
        */

        if (event.deltaY > 2) {

            revealWelcomeGif();

        }

    }


    /* ========================================
       CLAVIER
    ========================================= */

    function handleKeydown(event) {

        const scrollKeys = [
            "ArrowDown",
            "PageDown",
            "End",
            " "
        ];


        if (
            scrollKeys.includes(event.key)
        ) {

            revealWelcomeGif();

        }

    }


    /* ========================================
       TACTILE
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


        /*
           Pour descendre dans une page,
           le doigt se déplace vers le haut.
        */

        const distance =
            touchStartY - currentY;


        if (distance > 12) {

            revealWelcomeGif();

        }

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

});
