document.addEventListener("DOMContentLoaded", function () {

    /* ========================================
       VÉRIFICATION PAGE D'ACCUEIL
    ========================================= */

    const body = document.body;

    if (body.dataset.home !== "true") {
        return;
    }


    /* ========================================
       CONDITIONS D'ACTIVATION
    ========================================= */

    const desktopPointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /* ========================================
       RÉGLAGES
    ========================================= */

    /*
       Déplacement maximum du fond
       dans chaque direction.
    */

    const maxMovement = 10;


    /*
       Plus cette valeur est petite,
       plus le mouvement est doux/lent.

       0.08 = mouvement assez feutré.
    */

    const smoothing = 0.08;


    /* ========================================
       POSITION
    ========================================= */

    let targetX = 0;
    let targetY = 0;

    let currentX = 0;
    let currentY = 0;

    let animationFrame = null;


    /* ========================================
       MISE À JOUR CSS
    ========================================= */

    function updateBackgroundPosition() {

        /*
           Interpolation progressive entre
           la position actuelle et la cible.
        */

        currentX += (targetX - currentX) * smoothing;
        currentY += (targetY - currentY) * smoothing;


        body.style.setProperty(
            "--home-bg-x",
            currentX.toFixed(2) + "px"
        );

        body.style.setProperty(
            "--home-bg-y",
            currentY.toFixed(2) + "px"
        );


        /*
           On continue l'animation tant que
           la différence reste perceptible.
        */

        const differenceX = Math.abs(targetX - currentX);
        const differenceY = Math.abs(targetY - currentY);


        if (
            differenceX > 0.01 ||
            differenceY > 0.01
        ) {

            animationFrame = window.requestAnimationFrame(
                updateBackgroundPosition
            );

        } else {

            currentX = targetX;
            currentY = targetY;

            body.style.setProperty(
                "--home-bg-x",
                currentX.toFixed(2) + "px"
            );

            body.style.setProperty(
                "--home-bg-y",
                currentY.toFixed(2) + "px"
            );

            animationFrame = null;
        }

    }


    /* ========================================
       DÉMARRER L'INTERPOLATION
    ========================================= */

    function startAnimation() {

        if (animationFrame !== null) {
            return;
        }

        animationFrame = window.requestAnimationFrame(
            updateBackgroundPosition
        );

    }


    /* ========================================
       MOUVEMENT DE LA SOURIS
    ========================================= */

    function handlePointerMove(event) {

        if (
            !desktopPointer.matches ||
            reducedMotion.matches
        ) {
            return;
        }


        /*
           Position de la souris entre -1 et +1.

           Centre écran :
           0 / 0

           Bord gauche :
           -1

           Bord droit :
           +1
        */

        const normalizedX =
            (event.clientX / window.innerWidth - 0.5) * 2;

        const normalizedY =
            (event.clientY / window.innerHeight - 0.5) * 2;


        /*
           Le fond bouge légèrement dans
           le sens opposé à la souris.

           Cela donne l'impression que
           l'interface se trouve devant
           la photographie.
        */

        targetX = normalizedX * -maxMovement;
        targetY = normalizedY * -maxMovement;

        startAnimation();

    }


    /* ========================================
       RETOUR AU CENTRE
    ========================================= */

    function resetBackground() {

        targetX = 0;
        targetY = 0;

        startAnimation();

    }


    /* ========================================
       ÉVÉNEMENTS
    ========================================= */

    window.addEventListener(
        "pointermove",
        handlePointerMove,
        { passive: true }
    );


    document.documentElement.addEventListener(
        "mouseleave",
        resetBackground
    );


    window.addEventListener(
        "blur",
        resetBackground
    );


    /* ========================================
       CHANGEMENT DE TYPE D'APPAREIL
    ========================================= */

    desktopPointer.addEventListener(
        "change",
        resetBackground
    );


    reducedMotion.addEventListener(
        "change",
        resetBackground
    );

});
