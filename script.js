// script.js

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
    back: "Retour",
    question: "Question",
    of: "sur",
    stopTest: "Arrêter le test",
    finalResult: "Résultat du test",
    yourLevel: "Votre niveau",
    questionsAnswered: "Questions répondues",
    finalDifficulty: "Difficulté finale",
    correctStreak: "Bonnes réponses consécutives",
    restart: "Recommencer"
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
    back: "بازگشت",
    question: "سوال",
    of: "از",
    stopTest: "توقف آزمون",
    finalResult: "نتیجه تعیین سطح",
    yourLevel: "سطح شما",
    questionsAnswered: "تعداد سوالات پاسخ داده شده",
    finalDifficulty: "سختی نهایی",
    correctStreak: "جواب‌های درست متوالی",
    restart: "شروع مجدد"
  }
};

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
  document.getElementById("later").onclick = showHome;
  
  // 👇 اتصال به موتور واقعی 👇
  document.getElementById("yes").onclick = () => {
    showQuestion();
  };
}

// ===============================
// نمایش سوال واقعی
// ===============================

function showQuestion() {
    const question = getNextQuestion();
    
    if (!question) {
        showFinalResult();
        return;
    }
    
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    
    let html = `
        <button id="back">${t.back}</button>
        <h2>${t.question} ${placementState.asked.length} ${t.of} 25</h2>
        <p style="font-size: 18px; margin: 20px 0; line-height: 1.6;">${question.question}</p>
    `;
    
    question.options.forEach((option, index) => {
        html += `<button class="option-btn" data-index="${index}" style="display: block; width: 100%; max-width: 400px; margin: 10px auto; padding: 15px; font-size: 16px; border: none; border-radius: 8px; background-color: #007bff; color: white; cursor: pointer;">${option}</button>`;
    });
    
    html += `<br><button id="stop-test" style="display: block; width: 100%; max-width: 400px; margin: 20px auto; padding: 15px; font-size: 16px; border: none; border-radius: 8px; background-color: #dc3545; color: white; cursor: pointer;">${t.stopTest}</button>`;
    
    app.innerHTML = html;
    
    // اتصال دکمه‌ها
    document.getElementById("back").onclick = showPlacementChoice;
    document.getElementById("stop-test").onclick = showFinalResult;
    
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => {
            const selectedIndex = parseInt(btn.getAttribute("data-index"));
            const isCorrect = selectedIndex === question.correctIndex;
            
            answerPlacement(isCorrect);
            
            // نمایش بازخورد کوتاه
            if (isCorrect) {
                btn.style.backgroundColor = "#28a745";
            } else {
                btn.style.backgroundColor = "#dc3545";
                // نمایش جواب درست
                document.querySelectorAll(".option-btn")[question.correctIndex].style.backgroundColor = "#28a745";
            }
            
            // غیرفعال کردن همه دکمه‌ها
            document.querySelectorAll(".option-btn").forEach(b => {
                b.onclick = null;
                b.style.cursor = "default";
            });
            
            // رفتن به سوال بعدی بعد از ۱.۵ ثانیه
            setTimeout(() => {
                showQuestion();
            }, 1500);
        };
    });
}

// ===============================
// نمایش نتیجه نهایی
// ===============================

function showFinalResult() {
    const state = getPlacementState();
    
    let finalLevel = "A1";
    
    if (state.currentDifficulty >= 81) finalLevel = "C1";
    else if (state.currentDifficulty >= 61) finalLevel = "B2";
    else if (state.currentDifficulty >= 41) finalLevel = "B1";
    else if (state.currentDifficulty >= 21) finalLevel = "A2";
    else finalLevel = "A1";
    
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    
    app.innerHTML = `
        <h1>🎉 ${t.finalResult}</h1>
        <h2>${t.yourLevel}: <span style="color: #007bff; font-size: 32px;">${finalLevel}</span></h2>
        <p>${t.questionsAnswered}: ${state.asked.length}</p>
        <p>${t.finalDifficulty}: ${state.currentDifficulty}</p>
        <p>${t.correctStreak}: ${state.correctStreak}</p>
        <br>
        <button onclick="location.reload()" style="display: block; width: 100%; max-width: 400px; margin: 20px auto; padding: 15px; font-size: 16px; border: none; border-radius: 8px; background-color: #007bff; color: white; cursor: pointer;">${t.restart}</button>
    `;
}

// ===============================
// Temporary Home
// ===============================

function showHome() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];

  app.innerHTML = `
    <h1>${t.home}</h1>
    <p>Version 0.0.4</p>
  `;
}

// ===============================
// شروع برنامه
// ===============================
showLanguage();

// ===============================
// بارگذاری سوالات تعیین سطح
// ===============================
loadPlacementQuestions().then(() => {
    console.log("موتور آماده است. تعداد سوالات:", getPlacementQuestions().length);
});
