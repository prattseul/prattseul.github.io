/* ========================================
   DOWNLOAD — PRATTSEUL
======================================== */


/*
    À REMPLACER APRÈS LE DÉPLOIEMENT DU WORKER.

    Exemple :

    https://prattseul-download.nom-compte.workers.dev
*/

const WORKER_URL =
    "https://TON-WORKER.workers.dev";


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


            message.textContent = "";


            /*
                Vérification minimale côté navigateur.
                La vraie vérification est faite
                côté Cloudflare Worker.
            */

            if (!email) {

                message.textContent =
                    "Entrez votre adresse e-mail.";

                emailInput.focus();

                return;
            }


            if (!isValidEmail(email)) {

                message.textContent =
                    "Cette adresse e-mail ne semble pas valide.";

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

                    message.textContent =
                        "Cette adresse e-mail n'est pas associée à une contribution Ulule.";

                    return;
                }


                /*
                    Mauvaise requête.
                */

                if (
                    response.status === 400
                ) {

                    message.textContent =
                        data?.message ||
                        "Cette adresse e-mail ne semble pas valide.";

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

                    On navigue directement vers l'URL
                    temporaire fournie par le Worker.

                    Le navigateur télécharge ensuite
                    directement le ZIP depuis le Worker,
                    qui le diffuse depuis R2.
                */

                message.textContent =
                    "Accès autorisé. Le téléchargement démarre…";


                window.location.href =
                    data.downloadUrl;

            }

            catch (error) {

                console.error(
                    "Download authorization error:",
                    error
                );


                message.textContent =
                    "Impossible de lancer le téléchargement. Réessayez dans quelques instants.";

            }

            finally {

                button.disabled = false;

                button.textContent =
                    "télécharger l’album";

            }

        }
    );

});


/* ========================================
   VALIDATION E-MAIL
======================================== */

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}
