const app = document.getElementById("app");

showLanguage();

function showLanguage() {

    app.innerHTML = `

        <h1>Français avec Dino</h1>

        <p>Choisissez la langue de l'interface</p>

        <button id="fr">
            Français
        </button>

        <button id="fa">
            فارسی
        </button>

    `;

    document
        .getElementById("fr")
        .addEventListener("click", () => {

            localStorage.setItem("language", "fr");

            showPath();

        });

    document
        .getElementById("fa")
        .addEventListener("click", () => {

            localStorage.setItem("language", "fa");

            showPath();

        });

}

function showPath(){

    app.innerHTML = `

        <h1>Choisissez votre parcours</h1>

        <button>Français général</button>

        <button>Français Voyage</button>

        <button>Français Quotidien</button>

    `;

}
