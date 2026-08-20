document.addEventListener("DOMContentLoaded", function () {

    const body = document.body;

    if (body.dataset.home !== "true") {
        return;
    }


    /* ========================================
       ACCESSIBILITÉ
    ========================================= */

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );


    /*
       Si l'utilisateur préfère réduire
       les animations, on affiche immédiatement
       la page dans son état final.
    */

    if (reducedMotion.matches) {

        body.classList.add("home-ready");

        return;
    }


    /* ========================================
       NAVIGATION COMMUNE
    ========================================= */

    const navigationTarget =
        document.getElementById("site-navigation");


    /* ========================================
       DÉCLENCHEMENT
    ========================================= */

    function revealHome() {

        /*
           Deux frames permettent au navigateur
           d'afficher d'abord l'état initial CSS,
           puis de lancer proprement la transition.
        */

        window.requestAnimationFrame(function () {

            window.requestAnimationFrame(function () {

                body.classList.add("home-ready");

            });

        });

    }


    /*
       Le menu permanent de gauche existe déjà
       dans index.html.

       Le logo et les réseaux, eux, arrivent
       après le chargement de
       components/navigation.html par script.js.

       On attend donc que cette navigation soit
       réellement présente avant de lancer
       l'apparition générale.
    */

    if (
        navigationTarget &&
        navigationTarget.children.length > 0
    ) {

        revealHome();

        return;
    }


    if (!navigationTarget) {

        revealHome();

        return;
    }


    /* ========================================
       ATTENDRE L'INSERTION DE LA NAVIGATION
    ========================================= */

    const observer = new MutationObserver(function () {

        if (navigationTarget.children.length === 0) {
            return;
        }


        observer.disconnect();

        revealHome();

    });


    observer.observe(
        navigationTarget,
        {
            childList: true
        }
    );


    /*
       Sécurité :
       même si navigation.html rencontrait
       exceptionnellement un problème,
       on ne laisse jamais la home invisible.
    */

    window.setTimeout(function () {

        if (!body.classList.contains("home-ready")) {

            observer.disconnect();

            revealHome();

        }

    }, 1200);

});
