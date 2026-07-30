// script.js

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

function showLanguage() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  app.innerHTML = `
    <h1>${t.title}</h1>
    <p>${t.chooseLanguage}</p>
    <button id="fr">${t.french}</button>
    <button id="fa">${t.persian}</button>
  `;
  document.getElementById("fr").onclick = () => { localStorage.setItem("language", "fr"); showPath(); };
  document.getElementById("fa").onclick = () => { localStorage.setItem("language", "fa"); showPath(); };
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
  document.getElementById("general").onclick = showPlacementChoice;
  document.getElementById("travel").onclick = showHome;
  document.getElementById("daily").onclick = showHome;
}

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
  document.getElementById("later").onclick = showHome;

  // 👇 این بخش حیاتی با تست Alert 👇
  document.getElementById("yes").onclick = () => {
      alert("✅ دکمه کار می‌کند! در حال دریافت سوال...");
      
      try {
          const question = getNextQuestion();
          
          if (!question) {
              app.innerHTML = "<h2>سوالات تمام شدند!</h2><button onclick='location.reload()'>شروع مجدد</button>";
              return;
          }

          let result = "<h2>🧪 تست موتور موفق!</h2>";
          result += "<h3>🎯 سوال اول:</h3>";
          result += "<p><b>ID:</b> " + question.id + "</p>";
          result += "<p><b>سختی:</b> " + question.difficulty + "</p>";
          result += "<p><b>سوال:</b> " + question.question + "</p>";
          
          const state1 = getPlacementState();
          result += "<h3>📊 وضعیت موتور:</h3>";
          result += "<p><b>سختی فعلی:</b> " + state1.currentDifficulty + "</p>";
          
          answerPlacement(true);
          
          const state2 = getPlacementState();
          result += "<h3>✅ بعد از جواب درست:</h3>";
          result += "<p><b>سختی جدید:</b> " + state2.currentDifficulty + "</p>";
          
          const question2 = getNextQuestion();
          result += "<h3>🎯 سوال دوم:</h3>";
          result += "<p><b>ID:</b> " + question2.id + "</p>";
          result += "<p><b>سختی:</b> " + question2.difficulty + "</p>";
          
          result += "<br><button onclick='location.reload()'>بازگشت به شروع</button>";
          
          app.innerHTML = result;
      } catch (error) {
          alert("❌ خطا در اجرای موتور: " + error.message);
      }
  };
}

function showHome() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  app.innerHTML = `<h1>${t.home}</h1><p>Version 0.0.4</p>`;
}

// شروع برنامه
showLanguage();

// بارگذاری سوالات
loadPlacementQuestions().then(() => {
    console.log("موتور آماده است. تعداد سوالات:", getPlacementQuestions().length);
});
