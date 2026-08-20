document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /* ========================================
       ACCESSIBILITÉ
    ========================================= */

    if (reducedMotion.matches) {

        body.classList.add("intro-ready");

        return;
    }


    /* ========================================
       NAVIGATION COMMUNE
    ========================================= */

    const navigationTarget =
        document.getElementById("site-navigation");


    /* ========================================
       RÉVÉLATION
    ========================================= */

    let revealed = false;


    function revealPage() {

        if (revealed) {
            return;
        }

        revealed = true;


        /*
           Deux frames permettent au navigateur
           d'afficher l'état initial avant
           de lancer les transitions.
        */

        window.requestAnimationFrame(function () {

            window.requestAnimationFrame(function () {

                body.classList.add("intro-ready");

            });

        });

    }


    /* ========================================
       ATTENDRE LA NAVIGATION COMMUNE
    ========================================= */

    if (
        navigationTarget &&
        navigationTarget.children.length > 0
    ) {

        revealPage();

        return;
    }


    if (!navigationTarget) {

        revealPage();

        return;
    }


    const observer = new MutationObserver(function () {

        if (navigationTarget.children.length === 0) {
            return;
        }

        observer.disconnect();

        revealPage();

    });


    observer.observe(
        navigationTarget,
        {
            childList: true
        }
    );


    /*
       Sécurité :
       la page apparaît malgré tout
       si navigation.html ne se charge pas.
    */

    window.setTimeout(function () {

        if (!revealed) {

            observer.disconnect();

            revealPage();

        }

    }, 1200);

});
