/* ========================================
   DOWNLOAD — PRATTSEUL
======================================== */

const WORKER_URL =
    "https://prattseul-download.pratt-musique.workers.dev";


document.addEventListener("DOMContentLoaded", () => {

    const form =
        document.getElementById("downloadForm");

    const emailInput =
        document.getElementById("downloadEmail");

    const button =
        document.getElementById("downloadButton");

    const message =
        document.getElementById("downloadMessage");


    if (
        !form ||
        !emailInput ||
        !button ||
        !message
    ) {
        return;
    }


    /*
        Dès que l'utilisateur modifie son adresse,
        on revient à l'état visuel neutre.
    */

    emailInput.addEventListener(
        "input",
        () => {
            clearStatus();
        }
    );


    form.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            /*
                Nettoyage de l'adresse.
            */

            const email =
                emailInput.value
                    .trim()
                    .toLowerCase();


            clearStatus();


            /*
                Vérification minimale côté navigateur.
                La vraie vérification est faite
                côté Cloudflare Worker.
            */

            if (!email) {

                showError(
                    "Entrez votre adresse e-mail."
                );

                emailInput.focus();

                return;
            }


            if (!isValidEmail(email)) {

                showError(
                    "Cette adresse e-mail ne semble pas valide."
                );

                emailInput.focus();

                return;
            }


            /*
                État d'attente.
            */

            button.disabled = true;

            button.textContent =
                "vérification…";


            try {

                const response =
                    await fetch(
                        `${WORKER_URL}/authorize`,
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body: JSON.stringify({
                                email
                            })
                        }
                    );


                let data = null;


                try {

                    data =
                        await response.json();

                } catch {

                    data = null;

                }


                /*
                    Adresse non autorisée.
                */

                if (
                    response.status === 403
                ) {

                    showError(
                        "Cette adresse e-mail n'est pas associée à une contribution Ulule."
                    );

                    return;
                }


                /*
                    Mauvaise requête.
                */

                if (
                    response.status === 400
                ) {

                    showError(
                        data?.message ||
                        "Cette adresse e-mail ne semble pas valide."
                    );

                    return;
                }


                /*
                    Erreur serveur.
                */

                if (
                    !response.ok ||
                    !data ||
                    !data.downloadUrl
                ) {

                    throw new Error(
                        "Invalid server response"
                    );

                }


                /*
                    Adresse autorisée.
                */

                showSuccess(
                    "Accès autorisé. Le téléchargement démarre…"
                );


                window.location.href =
                    data.downloadUrl;

            }

            catch (error) {

                console.error(
                    "Download authorization error:",
                    error
                );


                showError(
                    "Impossible de lancer le téléchargement. Réessayez dans quelques instants."
                );

            }

            finally {

                button.disabled = false;

                button.textContent =
                    "télécharger l’album";

            }

        }
    );


    /* ========================================
       ÉTATS VISUELS
    ======================================== */

    function clearStatus() {

        emailInput.classList.remove(
            "is-success",
            "is-error"
        );

        message.classList.remove(
            "is-success",
            "is-error"
        );

        message.textContent = "";

    }


    function showSuccess(text) {

        clearStatus();

        emailInput.classList.add(
            "is-success"
        );

        message.classList.add(
            "is-success"
        );

        message.textContent =
            `✓ ${text}`;

    }


    function showError(text) {

        clearStatus();

        emailInput.classList.add(
            "is-error"
        );

        message.classList.add(
            "is-error"
        );

        message.textContent =
            `× ${text}`;

    }

});


/* ========================================
   VALIDATION E-MAIL
======================================== */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}
