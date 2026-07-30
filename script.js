const app = document.getElementById("app");

// ==========================
// Data
// ==========================

const texts = {

    fr: {

        title: "Français avec Dino",

        chooseLanguage: "Choisissez la langue de l'interface",

        choosePath: "Choisissez votre parcours",

        french: "Français",

        persian: "فارسی",

        general: "Français général",

        travel: "Français Voyage",

        daily: "Français Quotidien",

        back: "Retour",

        placementTitle: "Test de niveau",

        placementQuestion:
            "Souhaitez-vous passer un test de niveau avant de commencer ?",

        yes: "Passer le test",

        later: "Plus tard",

        home: "Accueil"

    },

    fa: {

        title: "Français avec Dino",

        chooseLanguage: "زبان رابط کاربری را انتخاب کنید",

        choosePath: "مسیر یادگیری خود را انتخاب کنید",

        french: "Français",

        persian: "فارسی",

        general: "فرانسوی عمومی",

        travel: "فرانسوی در سفر",

        daily: "فرانسوی روزمره",

        back: "بازگشت",

        placementTitle: "تعیین سطح",

        placementQuestion:
            "آیا قبل از شروع می‌خواهید تعیین سطح انجام دهید؟",

        yes: "شروع تعیین سطح",

        later: "بعداً",

        home: "صفحه اصلی"

    }

};

// ==========================
// Start
// ==========================

showLanguage();

// ==========================

function currentLanguage() {

    return localStorage.getItem("language") || "fr";

}

// ==========================

function showLanguage() {

    const t = texts[currentLanguage()];

    app.innerHTML = `

        <h1>${t.title}</h1>

        <p>${t.chooseLanguage}</p>

        <button id="fr">${t.french}</button>

        <button id="fa">${t.persian}</button>

    `;

    document.getElementById("fr").onclick = () => {

        localStorage.setItem("language","fr");

        showPath();

    };

    document.getElementById("fa").onclick = () => {

        localStorage.setItem("language","fa");

        showPath();

    };

}

// ==========================

function showPath() {

    const t = texts[currentLanguage()];

    app.innerHTML = `

        <button id="back">${t.back}</button>

        <h1>${t.choosePath}</h1>

        <button id="general">${t.general}</button>

        <button id="travel">${t.travel}</button>

        <button id="daily">${t.daily}</button>

    `;

    document.getElementById("back").onclick = showLanguage;

    document.getElementById("general").onclick = showPlacement;

    document.getElementById("travel").onclick = showHome;

    document.getElementById("daily").onclick = showHome;

}

// ==========================

function showPlacement() {

    const t = texts[currentLanguage()];

    app.innerHTML = `

        <button id="back">${t.back}</button>

        <h1>${t.placementTitle}</h1>

        <p>${t.placementQuestion}</p>

        <button id="test">${t.yes}</button>

        <button id="later">${t.later}</button>

    `;

    document.getElementById("back").onclick = showPath;

    document.getElementById("test").onclick = () => {

        alert("Le test sera ajouté dans la prochaine version.");

    };

    document.getElementById("later").onclick = showHome;

}

// ==========================

function showHome() {

    const t = texts[currentLanguage()];

    app.innerHTML = `

        <h1>${t.home}</h1>

        <p>Version 0.1</p>

        <button id="back">${t.back}</button>

    `;

    document.getElementById("back").onclick = showPath;

}
