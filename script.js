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
    home: "Accueil",
    back: "Retour",
    dontKnow: "Je ne sais pas",
    finalResult: "Résultat du test",
    yourLevel: "Votre niveau estimé",
    canModify: "Vous pourrez toujours le modifier plus tard.",
    acceptLevel: "Accepter ce niveau",
    changeLevel: "Changer de niveau",
    chooseYourLevel: "Choisissez votre niveau",
    startJourney: "Commencer le parcours",
    restart: "Recommencer",
    hello: "Bonjour",
    today: "Aujourd'hui",
    vocabulary: "Vocabulaire",
    grammar: "Grammaire",
    listening: "Compréhension orale",
    revision: "Révision",
    continue: "Continuer",
    level: "Niveau"
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
    home: "صفحه اصلی",
    back: "بازگشت",
    dontKnow: "نمی‌دانم",
    finalResult: "نتیجه تعیین سطح",
    yourLevel: "سطح تقریبی شما",
    canModify: "بعداً هم می‌توانید آن را تغییر دهید.",
    acceptLevel: "قبول این سطح",
    changeLevel: "تغییر سطح",
    chooseYourLevel: "سطح خود را انتخاب کنید",
    startJourney: "شروع مسیر",
    restart: "شروع مجدد",
    hello: "سلام",
    today: "امروز",
    vocabulary: "واژگان",
    grammar: "گرامر",
    listening: "درک شنیداری",
    revision: "مرور",
    continue: "ادامه",
    level: "سطح"
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
  
  document.getElementById("yes").onclick = () => {
    resetPlacementState();
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
    
    const progress = (placementState.asked.length / 15) * 100;
    
    let html = `
        <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
            <div style="background-color: #e0e0e0; height: 8px; border-radius: 4px; margin-bottom: 30px; overflow: hidden;">
                <div style="background-color: #007bff; height: 100%; width: ${progress}%; transition: width 0.3s;"></div>
            </div>
            
            <div style="background-color: white; border-radius: 12px; padding: 30px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <p style="font-size: 20px; margin: 0 0 30px 0; line-height: 1.6; color: #333;">${question.question}</p>
                
                <div style="display: flex; flex-direction: column; gap: 12px;">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button class="option-btn" data-index="${index}" style="
                display: block; width: 100%; padding: 16px; font-size: 16px;
                border: 2px solid #e0e0e0; border-radius: 8px; background-color: white;
                color: #333; cursor: pointer; text-align: left; transition: all 0.2s;
            ">${option}</button>
        `;
    });
    
    html += `
                </div>
                <button id="dont-know" style="
                    display: block; width: 100%; margin-top: 20px; padding: 14px; font-size: 15px;
                    border: 2px solid #dc3545; border-radius: 8px; background-color: white;
                    color: #dc3545; cursor: pointer;
                ">${t.dontKnow}</button>
            </div>
        </div>
    `;
    
    app.innerHTML = html;
    
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => {
            const selectedIndex = parseInt(btn.getAttribute("data-index"));
            const isCorrect = selectedIndex === question.correctIndex;
            
            answerPlacement(isCorrect);
            
            if (isCorrect) {
                btn.style.backgroundColor = "#28a745";
                btn.style.color = "white";
                btn.style.borderColor = "#28a745";
            } else {
                btn.style.backgroundColor = "#dc3545";
                btn.style.color = "white";
                btn.style.borderColor = "#dc3545";
                document.querySelectorAll(".option-btn")[question.correctIndex].style.backgroundColor = "#28a745";
                document.querySelectorAll(".option-btn")[question.correctIndex].style.color = "white";
                document.querySelectorAll(".option-btn")[question.correctIndex].style.borderColor = "#28a745";
            }
            
            document.querySelectorAll(".option-btn").forEach(b => {
                b.onclick = null;
                b.style.cursor = "default";
            });
            
            document.getElementById("dont-know").onclick = null;
            document.getElementById("dont-know").style.cursor = "default";
            
            setTimeout(() => { showQuestion(); }, 1500);
        };
    });
    
    document.getElementById("dont-know").onclick = () => {
        answerPlacement(null);
        document.getElementById("dont-know").style.backgroundColor = "#dc3545";
        document.getElementById("dont-know").style.color = "white";
        document.querySelectorAll(".option-btn")[question.correctIndex].style.backgroundColor = "#28a745";
        document.querySelectorAll(".option-btn")[question.correctIndex].style.color = "white";
        document.querySelectorAll(".option-btn")[question.correctIndex].style.borderColor = "#28a745";
        
        document.querySelectorAll(".option-btn").forEach(b => { b.onclick = null; b.style.cursor = "default"; });
        document.getElementById("dont-know").onclick = null;
        document.getElementById("dont-know").style.cursor = "default";
        
        setTimeout(() => { showQuestion(); }, 1500);
    };
}

// ===============================
// نمایش نتیجه نهایی
// ===============================

function showFinalResult() {
    const levelInfo = getEstimatedLevelRange();
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    
    app.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; max-width: 500px; margin: 0 auto;">
            <h1 style="font-size: 28px; margin-bottom: 30px;">🎉 ${t.finalResult}</h1>
            <p style="font-size: 18px; color: #666; margin-bottom: 10px;">${t.yourLevel} :</p>
            <h2 style="font-size: 56px; color: #007bff; margin: 20px 0; font-weight: bold;">${levelInfo.range}</h2>
            <p style="font-size: 15px; color: #999; margin: 30px 0; line-height: 1.6;">${t.canModify}</p>
            
            <button id="accept-level" style="display: block; width: 100%; padding: 18px; font-size: 18px; border: none; border-radius: 8px; background-color: #28a745; color: white; cursor: pointer; font-weight: bold; margin-bottom: 15px;">${t.acceptLevel}</button>
            <button id="change-level" style="display: block; width: 100%; padding: 18px; font-size: 18px; border: 2px solid #007bff; border-radius: 8px; background-color: white; color: #007bff; cursor: pointer; font-weight: bold;">${t.changeLevel}</button>
        </div>
    `;
    
    document.getElementById("accept-level").onclick = () => {
        savePlacementResult(levelInfo.level);
        showHome();
    };
    
    document.getElementById("change-level").onclick = () => {
        showLevelSelection();
    };
}

function showLevelSelection() {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const levels = ["A1", "A2", "B1", "B2", "C1"];
    
    let html = `
        <div style="text-align: center; padding: 40px 20px; max-width: 500px; margin: 0 auto;">
            <h1 style="font-size: 24px; margin-bottom: 30px;">${t.chooseYourLevel}</h1>
            <div style="display: flex; flex-direction: column; gap: 12px;">
    `;
    
    levels.forEach(level => {
        html += `<button class="level-btn" data-level="${level}" style="display: block; width: 100%; padding: 20px; font-size: 20px; border: 2px solid #e0e0e0; border-radius: 8px; background-color: white; color: #333; cursor: pointer; font-weight: bold;">${level}</button>`;
    });
    
    html += `</div></div>`;
    app.innerHTML = html;
    
    document.querySelectorAll(".level-btn").forEach(btn => {
        btn.onclick = () => {
            savePlacementResult(btn.getAttribute("data-level"));
            showHome();
        };
    });
}

// ===============================
// Home واقعی
// ===============================

function showHome() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  const level = getPlacementResult() || "A2";

  app.innerHTML = `
    <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 32px; margin-bottom: 10px;">${t.hello} 👋</h1>
            <p style="font-size: 18px; color: #007bff; font-weight: bold;">${t.level} : ${level}</p>
        </div>
        
        <h2 style="font-size: 20px; margin-bottom: 20px; color: #666;">${t.today}</h2>
        
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <button class="home-card" data-section="vocabulary" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #007bff; color: white; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <span style="font-size: 32px; margin-right: 15px;">📚</span>
                <div><div style="font-weight: bold; margin-bottom: 5px;">${t.vocabulary}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div>
            </button>
            
            <button class="home-card" data-section="grammar" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #28a745; color: white; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <span style="font-size: 32px; margin-right: 15px;">📖</span>
                <div><div style="font-weight: bold; margin-bottom: 5px;">${t.grammar}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div>
            </button>
            
            <button class="home-card" data-section="listening" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #ffc107; color: #333; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <span style="font-size: 32px; margin-right: 15px;">🎧</span>
                <div><div style="font-weight: bold; margin-bottom: 5px;">${t.listening}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div>
            </button>
            
            <button class="home-card" data-section="revision" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #6c757d; color: white; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <span style="font-size: 32px; margin-right: 15px;">📝</span>
                <div><div style="font-weight: bold; margin-bottom: 5px;">${t.revision}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div>
            </button>
        </div>
        
        <p style="text-align: center; color: #999; margin-top: 40px; font-size: 14px;">Version 0.0.8</p>
    </div>
  `;
  
  // 👇 اینجا تغییر مهم اعمال شد 👇
  document.querySelectorAll(".home-card").forEach(card => {
      card.onclick = () => {
          const section = card.getAttribute("data-section");
          if (section === "grammar") {
              showGrammarPage();
          } else {
              alert("🚧 بخش " + section + " به زودی فعال می‌شود!");
          }
      };
  });
}

// ===============================
// صفحه گرامر (جدید)
// ===============================

async function showGrammarPage() {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const level = getPlacementResult() || "A2";
    
    app.innerHTML = `<div style="text-align: center; padding: 60px 20px;"><p style="font-size: 18px; color: #666;">⏳ در حال بارگذاری...</p></div>`;
    
    await loadGrammar(level);
    
    const recommended = getRecommendedGrammar(level);
    const modules = getGrammarByModule(level);
    
    const levelNames = { "A1": "Débutant", "A2": "Élémentaire", "B1": "Intermédiaire", "B2": "Avancé", "C1": "Autonome" };
    
    let html = `
        <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
            <button id="back" style="background: none; border: none; color: #007bff; font-size: 16px; cursor: pointer; padding: 0; margin-bottom: 20px;">← ${t.back}</button>
            <h1 style="font-size: 24px; margin-bottom: 5px;">📖 ${t.grammar}</h1>
            <p style="font-size: 16px; color: #666; margin-bottom: 30px;">${level} – ${levelNames[level] || ""}</p>
    `;
    
    if (recommended.length > 0) {
        html += `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; padding: 20px; margin-bottom: 30px; color: white;">
            <h2 style="font-size: 18px; margin: 0 0 15px 0;">🦕 ${lang === "fa" ? "پیشنهاد داینو" : "Recommandé par Dino"}</h2>`;
        
        recommended.slice(0, 5).forEach(item => {
            const title = lang === "fa" ? item.title_fa : item.title;
            html += `<div style="background: rgba(255,255,255,0.15); border-radius: 8px; padding: 12px 15px; margin-bottom: 8px; cursor: pointer;" onclick="alert('🚧 درس ${title} به زودی!')">
                <span style="font-size: 14px;">${"⭐".repeat(item.importance)}</span>
                <p style="margin: 5px 0 0 0; font-size: 15px;">${title}</p>
            </div>`;
        });
        html += `</div>`;
    }
    
    html += `<h2 style="font-size: 18px; margin-bottom: 15px; color: #333;">${lang === "fa" ? "همه گرامرهای" : "Toute la grammaire"} ${level}</h2>`;
    
    Object.keys(modules).forEach(moduleName => {
        const module = modules[moduleName];
        html += `<div style="margin-bottom: 25px;"><h3 style="font-size: 16px; color: #666; margin-bottom: 10px;">${module.icon} ${moduleName}</h3>`;
        
        module.items.forEach(item => {
            const title = lang === "fa" ? item.title_fa : item.title;
            const badge = item.recommended ? '<span style="font-size: 12px; background: #28a745; color: white; padding: 2px 8px; border-radius: 4px; margin-left: 8px;">🦕</span>' : '';
            
            html += `<div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 14px 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer;" onclick="alert('🚧 درس ${title} به زودی!')">
                <div>
                    <p style="margin: 0; font-size: 15px; font-weight: 500;">${title}${badge}</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #999;">⏱ ${item.estimatedTime} min · ${item.exercises} ${lang === "fa" ? "تمرین" : "exercices"}</p>
                </div>
                <span style="color: #ccc; font-size: 20px;">›</span>
            </div>`;
        });
        html += `</div>`;
    });
    
    html += `</div>`;
    app.innerHTML = html;
    
    document.getElementById("back").onclick = showHome;
}

// ===============================
// شروع برنامه
// ===============================
showLanguage();

loadPlacementQuestions().then(() => {
    console.log("موتور آماده است. تعداد سوالات:", getPlacementQuestions().length);
});
