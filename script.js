const app = document.getElementById("app");

// ===============================
// Texts
// ===============================

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

    levelQuestion: "Souhaitez-vous passer un test de niveau ?",

    yes: "Passer le test",
    later: "Plus tard",

    home: "Accueil (temporaire)",

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

    levelQuestion: "آیا می‌خواهید ابتدا تعیین سطح انجام دهید؟",

    yes: "انجام تعیین سطح",
    later: "بعداً",

    home: "صفحه اصلی (موقت)",

    back: "بازگشت"
  }
};

// ===============================

showLanguage();

// ===============================
// Language
// ===============================

function showLanguage() {

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

// ===============================
// Path
// ===============================

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

  document.getElementById("general").onclick = showPlacementChoice;

  document.getElementById("travel").onclick = showHome;

  document.getElementById("daily").onclick = showHome;
}

// ===============================
// Placement Choice
// ===============================

function showPlacementChoice() {

  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];

  app.innerHTML = `
    <button id="back">${t.back}</button>

    <h1>${t.general}</h1>

    <p>${t.levelQuestion}</p>

    <button id="yes">${t.yes}</button>

    <button id="later">${t.later}</button>
  `;

  document.getElementById("back").onclick = showPath;

  document.getElementById("yes").onclick = () => {
    alert("Le test arrivera dans la prochaine version.");
  };

  document.getElementById("later").onclick = showHome;
}

// ===============================
// Temporary Home
// ===============================

function showHome() {

  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];

  app.innerHTML = `
    <h1>${t.home}</h1>

    <p>Version 0.0.3</p>
  `;
}
