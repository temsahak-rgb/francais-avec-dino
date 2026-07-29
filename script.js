const app = document.getElementById("app");

const texts = {

    fr: {

        title: "Français avec Dino",

        chooseLanguage: "Choisissez la langue",

        choosePath: "Choisissez votre parcours",

        french: "Français",

        persian: "فارسی",

        general: "Français général",

        travel: "Français Voyage",

        daily: "Français Quotidien",

        back: "Retour"

    },

    fa: {

        title: "Français avec Dino",

        chooseLanguage: "زبان خود را انتخاب کنید",

        choosePath: "مسیر یادگیری خود را انتخاب کنید",

        french: "Français",

        persian: "فارسی",

        general: "فرانسوی عمومی",

        travel: "فرانسوی در سفر",

        daily: "فرانسوی در زندگی روزمره",

        back: "بازگشت"

    }

};

showLanguage();

function showLanguage() {

    app.innerHTML = `

        const lang = localStorage.getItem("language") || "fr";

        const t = texts[lang];

        app.innerHTML = `

        <h1>${t.title}</h1>

        <p>${t.chooseLanguage}</p>

        <button id="fr">${t.french}</button>

        <button id="fa">${t.persian}</button>

    `;

    document.getElementById("fr").onclick = () => {

        localStorage.setItem("language", "fr");

        showPath();

    };

    document.getElementById("fa").onclick = () => {

        localStorage.setItem("language", "fa");

        showPath();

    };

}

function showPath() {

    const lang = localStorage.getItem("language") || "fr";

    const t = texts[lang];

    app.innerHTML = `

        <button id="back">${t.back}</button>

        <h1>${t.choosePath}</h1>

        <button id="general">${t.general}</button>

        <button id="travel">${t.travel}</button>

        <button id="daily">${t.daily}</button>

    `;

    document.getElementById("back").onclick = showLanguage;

}
