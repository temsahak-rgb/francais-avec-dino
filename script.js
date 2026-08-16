// script.js

const app = document.getElementById("app");

// ===============================
// تابع رندر متن فارسی (با حفظ جهت کلمات لاتین)
// ===============================
function renderFaText(text) {
  if (!text) return "";
  return `<span class="persian-text">${text}</span>`;
}

// ===============================
// تابع پیشرفته Markdown (امن و کامل)
// ===============================
function renderMarkdown(text) {
    if (!text) return "";
    let html = text
        // ۱. ایمن‌سازی HTML (جلوگیری از XSS)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // ۲. عناوین (Headings)
        .replace(/^### (.*$)/gm, '<h4 style="margin-top: 24px; margin-bottom: 12px; color: #007bff; font-size: 18px; font-weight: 700;">$1</h4>')
        .replace(/^## (.*$)/gm, '<h3 style="margin-top: 28px; margin-bottom: 14px; color: #007bff; font-size: 20px; font-weight: 700;">$1</h3>')
        .replace(/^# (.*$)/gm, '<h2 style="margin-top: 32px; margin-bottom: 16px; color: #1a202c; font-size: 24px; font-weight: 800;">$1</h2>')
        // ۳. لیست‌ها (Lists)
        .replace(/^- (.*$)/gm, '<li style="margin-bottom: 8px; line-height: 1.6;">$1</li>')
        .replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/gs, '<ul style="margin: 15px 0; padding-right: 25px; list-style-type: disc; color: #2d3748;">$1</ul>')
        // ۴. قالب‌بندی متن (Formatting)
        .replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight: 700; color: #1a202c;">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em style="font-style: italic; color: #4a5568;">$1</em>')
        .replace(/`(.*?)`/g, '<code style="background: #edf2f7; color: #d53f8c; padding: 3px 8px; border-radius: 6px; font-family: monospace; font-size: 0.9em;">$1</code>')
        .replace(/~~(.*?)~~/g, '<del style="color: #a0aec0; text-decoration: line-through;">$1</del>')
        // ۵. متن قرمز سفارشی
        .replace(/\[(.*?)\]\[red\]/g, '<span style="color: #e53e3e; font-weight: 700;">$1</span>')
        // ۶. خط جدید
        .replace(/\n/g, '<br>');
    
    return html;
}

const texts = {
  fr: {
    title: "Français avec Dino", chooseLanguage: "Choisissez la langue", choosePath: "Choisissez votre parcours",
    french: "Français", persian: "فارسی", general: "Français général", travel: "Français Voyage", daily: "Français Quotidien",
    levelQuestion: "Souhaitez-vous passer un test de niveau ?", yes: "Passer le test", later: "Plus tard",
    home: "Accueil", back: "Retour", dontKnow: "Je ne sais pas", finalResult: "Résultat du test",
    yourLevel: "Votre niveau estimé", canModify: "Vous pourrez toujours le modifier plus tard.",
    acceptLevel: "Accepter ce niveau", changeLevel: "Changer de niveau", chooseYourLevel: "Choisissez votre niveau",
    startJourney: "Commencer le parcours", restart: "Recommencer", hello: "Bonjour", today: "Aujourd'hui",
    vocabulary: "Vocabulaire", grammar: "Grammaire", listening: "Compréhension orale", revision: "Révision",
    continue: "Continuer", level: "Niveau"
  },
  fa: {
    title: "Français avec Dino", chooseLanguage: "زبان خود را انتخاب کنید", choosePath: "مسیر یادگیری خود را انتخاب کنید",
    french: "Français", persian: "فارسی", general: "فرانسوی عمومی", travel: "فرانسوی در سفر", daily: "فرانسوی در زندگی روزمره",
    levelQuestion: "آیا می‌خواهید ابتدا تعیین سطح انجام دهید؟", yes: "انجام تعیین سطح", later: "بعداً",
    home: "صفحه اصلی", back: "بازگشت", dontKnow: "نمی‌دانم", finalResult: "نتیجه تعیین سطح",
    yourLevel: "سطح تقریبی شما", canModify: "بعداً هم می‌توانید آن را تغییر دهید.",
    acceptLevel: "قبول این سطح", changeLevel: "تغییر سطح", chooseYourLevel: "سطح خود را انتخاب کنید",
    startJourney: "شروع مسیر", restart: "شروع مجدد", hello: "سلام", today: "امروز",
    vocabulary: "واژگان", grammar: "گرامر", listening: "درک شنیداری", revision: "مرور",
    continue: "ادامه", level: "سطح"
  }
};

function showLanguage() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  app.innerHTML = `<h1>${t.title}</h1><p>${t.chooseLanguage}</p><button id="fr">${t.french}</button><button id="fa">${t.persian}</button>`;
  document.getElementById("fr").onclick = () => { localStorage.setItem("language", "fr"); showPath(); };
  document.getElementById("fa").onclick = () => { localStorage.setItem("language", "fa"); showPath(); };
}

function showPath() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  app.innerHTML = `<button id="back" class="back-btn">← ${t.back}</button><h1 style="margin-top: 40px;">${t.choosePath}</h1><button id="general">${t.general}</button><button id="travel">${t.travel}</button><button id="daily">${t.daily}</button>`;
  document.getElementById("back").onclick = showLanguage;
  document.getElementById("general").onclick = showPlacementChoice;
  document.getElementById("travel").onclick = showHome;
  document.getElementById("daily").onclick = showHome;
}

function showPlacementChoice() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  app.innerHTML = `<button id="back" class="back-btn">← ${t.back}</button><h1 style="margin-top: 40px;">${t.general}</h1><p>${t.levelQuestion}</p><button id="yes">${t.yes}</button><button id="later">${t.later}</button>`;
  document.getElementById("back").onclick = showPath;
  document.getElementById("later").onclick = showHome;
  document.getElementById("yes").onclick = () => { resetPlacementState(); showQuestion(); };
}

function showQuestion() {
    const question = getNextQuestion();
    if (!question) { showFinalResult(); return; }
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const progress = (placementState.asked.length / 15) * 100;
    
    let html = `<div style="margin: 0 auto; padding-top: 40px;">
        <div style="background-color: #e9ecef; height: 8px; border-radius: 4px; margin-bottom: 30px; overflow: hidden;">
            <div style="background-color: #007bff; height: 100%; width: ${progress}%; transition: width 0.3s;"></div>
        </div>
        <div style="background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
            <p class="ltr-lock" style="font-size: 22px; margin: 0 0 30px 0; line-height: 1.6; color: #212529;">${question.question}</p>
            <div style="display: flex; flex-direction: column; gap: 15px;">`;
    
    question.options.forEach((option, index) => {
        html += `<button class="option-btn ltr-lock" data-index="${index}" style="display: block; width: 100%; padding: 18px; font-size: 18px; border: 2px solid #e9ecef; border-radius: 10px; background-color: white; color: #212529; cursor: pointer; text-align: left; transition: all 0.2s;">${option}</button>`;
    });
    
    html += `</div><button id="dont-know" style="display: block; width: 100%; margin-top: 25px; padding: 16px; font-size: 16px; border: 2px solid #dc3545; border-radius: 10px; background-color: white; color: #dc3545; cursor: pointer;">${t.dontKnow}</button></div></div>`;
    app.innerHTML = html;
    
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => {
            const selectedIndex = parseInt(btn.getAttribute("data-index"));
            const isCorrect = selectedIndex === question.correctIndex;
            answerPlacement(isCorrect);
            if (isCorrect) { btn.style.backgroundColor = "#d4edda"; btn.style.color = "#155724"; btn.style.borderColor = "#28a745"; } 
            else { btn.style.backgroundColor = "#f8d7da"; btn.style.color = "#721c24"; btn.style.borderColor = "#dc3545"; document.querySelectorAll(".option-btn")[question.correctIndex].style.backgroundColor = "#d4edda"; document.querySelectorAll(".option-btn")[question.correctIndex].style.color = "#155724"; document.querySelectorAll(".option-btn")[question.correctIndex].style.borderColor = "#28a745"; }
            document.querySelectorAll(".option-btn").forEach(b => { b.onclick = null; b.style.cursor = "default"; });
            document.getElementById("dont-know").onclick = null; document.getElementById("dont-know").style.cursor = "default";
            setTimeout(() => { showQuestion(); }, 1500);
        };
    });
    document.getElementById("dont-know").onclick = () => {
        answerPlacement(null);
        document.getElementById("dont-know").style.backgroundColor = "#f8d7da"; document.getElementById("dont-know").style.color = "#721c24";
        document.querySelectorAll(".option-btn")[question.correctIndex].style.backgroundColor = "#d4edda"; document.querySelectorAll(".option-btn")[question.correctIndex].style.color = "#155724"; document.querySelectorAll(".option-btn")[question.correctIndex].style.borderColor = "#28a745";
        document.querySelectorAll(".option-btn").forEach(b => { b.onclick = null; b.style.cursor = "default"; });
        document.getElementById("dont-know").onclick = null; document.getElementById("dont-know").style.cursor = "default";
        setTimeout(() => { showQuestion(); }, 1500);
    };
}

function showFinalResult() {
    const levelInfo = getEstimatedLevelRange();
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    app.innerHTML = `<div style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto;">
        <h1 style="font-size: 36px; margin-bottom: 30px;">🎉 ${t.finalResult}</h1>
        <p style="font-size: 20px; color: #6c757d; margin-bottom: 10px;">${t.yourLevel} :</p>
        <h2 style="font-size: 64px; color: #007bff; margin: 20px 0; font-weight: 800;">${levelInfo.range}</h2>
        <p style="font-size: 18px; color: #6c757d; margin: 30px 0; line-height: 1.6;">${t.canModify}</p>
        <button id="accept-level" style="background-color: #28a745; margin-bottom: 15px;">${t.acceptLevel}</button>
        <button id="change-level" style="background-color: white; color: #007bff; border: 2px solid #007bff;">${t.changeLevel}</button>
    </div>`;
    document.getElementById("accept-level").onclick = () => { savePlacementResult(levelInfo.level); showHome(); };
    document.getElementById("change-level").onclick = showLevelSelection;
}

function showLevelSelection() {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const levels = ["A1", "A2", "B1", "B2", "C1"];
    let html = `<div style="text-align: center; padding: 60px 20px; max-width: 600px; margin: 0 auto;"><h1 style="font-size: 32px; margin-bottom: 40px;">${t.chooseYourLevel}</h1><div style="display: flex; flex-direction: column; gap: 15px;">`;
    levels.forEach(level => { html += `<button class="level-btn" data-level="${level}" style="font-size: 22px; padding: 20px;">${level}</button>`; });
    html += `</div></div>`;
    app.innerHTML = html;
    document.querySelectorAll(".level-btn").forEach(btn => { btn.onclick = () => { savePlacementResult(btn.getAttribute("data-level")); showHome(); }; });
}

// ===============================
// صفحه اصلی (تغییر مسیر بر اساس currentPath)
// ===============================
async function showHome() {
  const currentPath = getCurrentPath();
  
  if (currentPath === "daily") {
    showDailyHome();
  } else if (currentPath === "travel") {
    showTravelHome();
  } else {
    showGeneralHome();
  }
}

// ===============================
// 🇫🇷 صفحه اصلی - فرانسوی عمومی (همان UI قبلی)
// ===============================
function showGeneralHome() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  const level = getPlacementResult() || "A2";
  
  app.innerHTML = `
    <div style="margin: 0 auto; padding-top: 20px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 40px;">
        <div>
          <h1 style="font-size: 42px; margin-bottom: 10px;">${t.hello} 👋</h1>
          <p style="font-size: 18px; color: #6c757d;">${t.level} : <strong style="color: #007bff;">${level}</strong></p>
        </div>
        <button id="profile-btn" style="width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); border: none; cursor: pointer; padding: 0; margin: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; box-shadow: 0 4px 12px rgba(102,126,234,0.3);">🦖</button>
      </div>
      
      <!-- دکمه تغییر مسیر -->
      <div style="background: linear-gradient(135deg, #f0f4ff 0%, #e0f2fe 100%); border-radius: 16px; padding: 20px; margin-bottom: 30px; display: flex; gap: 10px;">
        <button onclick="switchPath('general')" style="flex: 1; padding: 12px; background: #007bff; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">🇫🇷 ${lang === "fa" ? "عمومی" : "Général"}</button>
        <button onclick="switchPath('daily')" style="flex: 1; padding: 12px; background: white; color: #495057; border: 1px solid #dee2e6; border-radius: 10px; font-weight: 600; cursor: pointer;">🏘️ ${lang === "fa" ? "روزمره" : "Quotidien"}</button>
        <button onclick="switchPath('travel')" style="flex: 1; padding: 12px; background: white; color: #495057; border: 1px solid #dee2e6; border-radius: 10px; font-weight: 600; cursor: pointer;">✈️ ${lang === "fa" ? "سفر" : "Voyage"}</button>
      </div>
      
      <h2 style="font-size: 24px; margin-bottom: 25px; color: #212529;">${t.today}</h2>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
        <button class="home-card" data-section="vocabulary" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #007bff; color: white; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(0,123,255,0.2);"><span style="font-size: 40px; margin-right: 20px;">📚</span><div><div style="font-weight: bold; margin-bottom: 8px;">${t.vocabulary}</div><div style="font-size: 16px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="grammar" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #28a745; color: white; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(40,167,69,0.2);"><span style="font-size: 40px; margin-right: 20px;">📖</span><div><div style="font-weight: bold; margin-bottom: 8px;">${t.grammar}</div><div style="font-size: 16px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="listening" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #ffc107; color: #212529; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(255,193,7,0.2);"><span style="font-size: 40px; margin-right: 20px;">🎧</span><div><div style="font-weight: bold; margin-bottom: 8px;">${t.listening}</div><div style="font-size: 16px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="revision" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #6c757d; color: white; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(108,117,125,0.2);"><span style="font-size: 40px; margin-right: 20px;">📝</span><div><div style="font-weight: bold; margin-bottom: 5px;">${t.revision}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div></button>
      </div>
      <p style="text-align: left; color: #adb5bd; margin-top: 60px; font-size: 16px;">Version 1.0.0 Web</p>
    </div>
  `;
  
  document.querySelectorAll(".home-card").forEach(card => {
    card.onclick = () => { 
      const section = card.getAttribute("data-section"); 
      if (section === "grammar") { showGrammarPage(); } 
      else { alert("🚧 بخش " + section + " به زودی فعال می‌شود!"); } 
    };
  });
}

// ===============================
// 🏘️ صفحه اصلی - فرانسوی روزمره (طراحی کاملاً جدید)
// ===============================
async function showDailyHome() {
  const lang = localStorage.getItem("language") || "fr";
  
  // بارگذاری لیست ماژول‌های روزمره
  let modules = [];
  try {
    const response = await fetch("./data/daily/lessons.json");
    modules = await response.json();
  } catch (error) {
    console.error("خطا در بارگذاری:", error);
  }
  
  // دسته‌بندی ماژول‌ها
  const categories = {
    "installation": { 
      "icon": "🏠", 
      "title": lang === "fa" ? "نصب و راه‌اندازی زندگی" : "Installation",
      "color": "#8b5cf6",
      "ids": ["DL-001", "DL-002", "DL-003", "DL-007"]
    },
    "sante": { 
      "icon": "🏥", 
      "title": lang === "fa" ? "سلامت و بیمه" : "Santé & Assurance",
      "color": "#ec4899",
      "ids": ["DL-004", "DL-009"]
    },
    "quotidien": { 
      "icon": "🛒", 
      "title": lang === "fa" ? "زندگی روزمره" : "Vie Quotidienne",
      "color": "#f59e0b",
      "ids": ["DL-005", "DL-006", "DL-012"]
    },
    "travail": { 
      "icon": "💼", 
      "title": lang === "fa" ? "کار و تحصیل" : "Travail & Études",
      "color": "#10b981",
      "ids": ["DL-008", "DL-011", "DL-017"]
    },
    "social": { 
      "icon": "🤝", 
      "title": lang === "fa" ? "ارتباطات اجتماعی" : "Vie Sociale",
      "color": "#06b6d4",
      "ids": ["DL-010", "DL-013", "DL-014", "DL-015"]
    },
    "administratif": { 
      "icon": "📋", 
      "title": lang === "fa" ? "امور اداری" : "Administration",
      "color": "#6366f1",
      "ids": ["DL-016", "DL-018"]
    }
  };
  
  let html = `
    <div style="margin: 0 auto; padding-top: 20px;">
      <!-- هدر با گرادیان گرم -->
      <div style="background: linear-gradient(135deg, #f59e0b 0%, #ec4899 100%); border-radius: 24px; padding: 35px; margin-bottom: 30px; color: white; box-shadow: 0 10px 30px rgba(245,158,11,0.3);">
        <div style="display: flex; justify-content: space-between; align-items: start;">
          <div>
            <p style="font-size: 14px; opacity: 0.9; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">🏘️ ${lang === "fa" ? "فرانسوی روزمره" : "Français Quotidien"}</p>
            <h1 style="font-size: 36px; margin: 0; font-weight: 800; line-height: 1.2;">${lang === "fa" ? "راهنمای زندگی در فرانسه" : "Guide de vie en France"}</h1>
            <p style="font-size: 16px; margin-top: 15px; opacity: 0.95;">${lang === "fa" ? "هر آنچه برای زندگی روزمره نیاز دارید" : "Tout ce dont vous avez besoin au quotidien"}</p>
          </div>
          <button id="profile-btn" style="width: 60px; height: 60px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; padding: 0; margin: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; backdrop-filter: blur(10px);">🦖</button>
        </div>
      </div>
      
      <!-- دکمه تغییر مسیر -->
      <div style="background: #f8f9fa; border-radius: 16px; padding: 15px; margin-bottom: 30px; display: flex; gap: 10px;">
        <button onclick="switchPath('general')" style="flex: 1; padding: 12px; background: white; color: #495057; border: 1px solid #dee2e6; border-radius: 10px; font-weight: 600; cursor: pointer;">🇫🇷 ${lang === "fa" ? "عمومی" : "Général"}</button>
        <button onclick="switchPath('daily')" style="flex: 1; padding: 12px; background: #f59e0b; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">🏘️ ${lang === "fa" ? "روزمره" : "Quotidien"}</button>
        <button onclick="switchPath('travel')" style="flex: 1; padding: 12px; background: white; color: #495057; border: 1px solid #dee2e6; border-radius: 10px; font-weight: 600; cursor: pointer;">✈️ ${lang === "fa" ? "سفر" : "Voyage"}</button>
      </div>
      
      <!-- شماره‌های مفید -->
      <div style="background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 2px solid #fbbf24; border-radius: 16px; padding: 20px; margin-bottom: 30px;">
        <h3 style="margin: 0 0 15px 0; color: #78350f; font-size: 18px; display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 22px;">📞</span>
          <span>${lang === "fa" ? "شماره‌های ضروری" : "Numéros utiles"}</span>
        </h3>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;">
          <div style="background: white; padding: 12px; border-radius: 10px; text-align: center;">
            <div style="font-size: 20px; font-weight: 800; color: #dc2626;">112</div>
            <div style="font-size: 12px; color: #64748b;">${lang === "fa" ? "اورژانس" : "Urgences"}</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 10px; text-align: center;">
            <div style="font-size: 20px; font-weight: 800; color: #0284c7;">3646</div>
            <div style="font-size: 12px; color: #64748b;">CAF</div>
          </div>
          <div style="background: white; padding: 12px; border-radius: 10px; text-align: center;">
            <div style="font-size: 20px; font-weight: 800; color: #059669;">15</div>
            <div style="font-size: 12px; color: #64748b;">SAMU</div>
          </div>
        </div>
      </div>
  `;
  
  // نمایش دسته‌بندی‌ها
  for (const [catKey, cat] of Object.entries(categories)) {
    const catModules = modules.filter(m => cat.ids.includes(m.id));
    if (catModules.length === 0) continue;
    
    html += `
      <div style="margin-bottom: 35px;">
        <h2 style="font-size: 22px; margin-bottom: 15px; color: #1a202c; display: flex; align-items: center; gap: 10px;">
          <span style="background: ${cat.color}; width: 40px; height: 40px; border-radius: 10px; display: inline-flex; align-items: center; justify-content: center; font-size: 22px;">${cat.icon}</span>
          <span>${cat.title}</span>
        </h2>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
    `;
    
    catModules.forEach(mod => {
      const title = lang === "fa" ? mod.title_fa : mod.title;
      html += `
        <div onclick="showDailyLesson('${mod.id}')" style="
          background: white; 
          border: 2px solid #e9ecef; 
          border-radius: 16px; 
          padding: 20px; 
          cursor: pointer; 
          transition: all 0.2s;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        " onmouseover="this.style.borderColor='${cat.color}'; this.style.transform='translateY(-3px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.borderColor='#e9ecef'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'">
          <div style="font-size: 36px; margin-bottom: 10px;">${mod.icon}</div>
          <p class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="margin: 0; font-size: 16px; font-weight: 700; color: #1a202c; line-height: 1.4;">${title}</p>
          <p style="margin: 8px 0 0 0; font-size: 13px; color: #64748b;">⏱ ${mod.estimatedTime} min</p>
        </div>
      `;
    });
    
    html += `</div></div>`;
  }
  
  html += `</div>`;
  app.innerHTML = html;
}

// ===============================
// ✈️ صفحه اصلی - فرانسوی در سفر (طراحی ماجراجویانه)
// ===============================
async function showTravelHome() {
  const lang = localStorage.getItem("language") || "fr";
  
  let lessons = [];
  try {
    const response = await fetch("./data/travel/lessons.json");
    lessons = await response.json();
  } catch (error) {
    console.error("خطا در بارگذاری:", error);
  }
  
  // دسته‌بندی بر اساس مرحله سفر
  const phases = {
    "preparation": {
      "title": lang === "fa" ? "🎒 قبل از سفر" : "🎒 Avant le voyage",
      "color": "#10b981",
      "ids": ["TR-001", "TR-002", "TR-003", "TR-009"]
    },
    "arrival": {
      "title": lang === "fa" ? "✈️ ورود به فرانسه" : "✈️ Arrivée en France",
      "color": "#3b82f6",
      "ids": ["TR-004", "TR-005", "TR-006"]
    },
    "city": {
      "title": lang === "fa" ? "🏙️ در شهر" : "🏙️ Dans la ville",
      "color": "#8b5cf6",
      "ids": ["TR-007", "TR-008", "TR-010", "TR-011", "TR-012"]
    },
    "activities": {
      "title": lang === "fa" ? "🎨 فعالیت‌ها" : "🎨 Activités",
      "color": "#f59e0b",
      "ids": ["TR-013", "TR-014", "TR-015"]
    },
    "emergencies": {
      "title": lang === "fa" ? "🚨 مواقع اضطراری" : "🚨 Urgences",
      "color": "#dc2626",
      "ids": ["TR-016", "TR-017"]
    },
    "departure": {
      "title": lang === "fa" ? "👋 بازگشت" : "👋 Départ",
      "color": "#6366f1",
      "ids": ["TR-018"]
    }
  };
  
  let html = `
    <div style="margin: 0 auto; padding-top: 20px;">
      <!-- هدر ماجراجویانه -->
      <div style="background: linear-gradient(135deg, #0ea5e9 0%, #6366f1 50%, #8b5cf6 100%); border-radius: 24px; padding: 40px; margin-bottom: 30px; color: white; box-shadow: 0 10px 30px rgba(99,102,241,0.4); position: relative; overflow: hidden;">
        <div style="position: absolute; top: -20px; right: -20px; font-size: 150px; opacity: 0.15;">✈️</div>
        <div style="position: relative; z-index: 1;">
          <div style="display: flex; justify-content: space-between; align-items: start;">
            <div>
              <p style="font-size: 14px; opacity: 0.9; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 2px;">✈️ ${lang === "fa" ? "فرانسوی در سفر" : "Français Voyage"}</p>
              <h1 style="font-size: 40px; margin: 0; font-weight: 800; line-height: 1.2;">${lang === "fa" ? "آماده‌ی ماجراجویی!" : "Prêt pour l'aventure !"}</h1>
              <p style="font-size: 16px; margin-top: 15px; opacity: 0.95;">${lang === "fa" ? "۱۸ درس برای سفری بی‌نقص به فرانسه" : "18 leçons pour un voyage parfait en France"}</p>
            </div>
            <button id="profile-btn" style="width: 60px; height: 60px; border-radius: 50%; background: rgba(255,255,255,0.2); border: none; cursor: pointer; padding: 0; margin: 0; display: flex; align-items: center; justify-content: center; font-size: 28px; backdrop-filter: blur(10px);">🦖</button>
          </div>
          
          <!-- نوار پیشرفت سفر -->
          <div style="margin-top: 25px; background: rgba(255,255,255,0.2); border-radius: 10px; padding: 15px; backdrop-filter: blur(10px);">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px;">
              <span>${lang === "fa" ? "پیشرفت سفر شما" : "Progression du voyage"}</span>
              <span style="font-weight: 700;">0 / 18</span>
            </div>
            <div style="background: rgba(255,255,255,0.3); height: 8px; border-radius: 4px; overflow: hidden;">
              <div style="background: white; height: 100%; width: 0%; border-radius: 4px;"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- دکمه تغییر مسیر -->
      <div style="background: #f8f9fa; border-radius: 16px; padding: 15px; margin-bottom: 30px; display: flex; gap: 10px;">
        <button onclick="switchPath('general')" style="flex: 1; padding: 12px; background: white; color: #495057; border: 1px solid #dee2e6; border-radius: 10px; font-weight: 600; cursor: pointer;">🇫🇷 ${lang === "fa" ? "عمومی" : "Général"}</button>
        <button onclick="switchPath('daily')" style="flex: 1; padding: 12px; background: white; color: #495057; border: 1px solid #dee2e6; border-radius: 10px; font-weight: 600; cursor: pointer;">🏘️ ${lang === "fa" ? "روزمره" : "Quotidien"}</button>
        <button onclick="switchPath('travel')" style="flex: 1; padding: 12px; background: #6366f1; color: white; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">✈️ ${lang === "fa" ? "سفر" : "Voyage"}</button>
      </div>
  `;
  
  // نمایش مراحل سفر
  for (const [phaseKey, phase] of Object.entries(phases)) {
    const phaseLessons = lessons.filter(l => phase.ids.includes(l.id));
    if (phaseLessons.length === 0) continue;
    
    html += `
      <div style="margin-bottom: 35px;">
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 18px; padding-bottom: 10px; border-bottom: 2px dashed ${phase.color}30;">
          <div style="background: ${phase.color}; color: white; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px;">${phaseLessons.length}</div>
          <h2 style="font-size: 22px; margin: 0; color: #1a202c; font-weight: 700;">${phase.title}</h2>
        </div>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 15px;">
    `;
    
    phaseLessons.forEach(lesson => {
      const title = lang === "fa" ? lesson.title_fa : lesson.title;
      html += `
        <div onclick="showTravelLesson('${lesson.id}')" style="
          background: linear-gradient(135deg, ${phase.color}15 0%, ${phase.color}05 100%);
          border: 2px solid ${phase.color}30;
          border-radius: 18px; 
          padding: 22px; 
          cursor: pointer; 
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        " onmouseover="this.style.borderColor='${phase.color}'; this.style.transform='translateY(-4px)'; this.style.boxShadow='0 10px 25px ${phase.color}30'" onmouseout="this.style.borderColor='${phase.color}30'; this.style.transform='translateY(0)'; this.style.boxShadow='none'">
          <div style="font-size: 42px; margin-bottom: 12px;">${lesson.icon}</div>
          <p class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="margin: 0; font-size: 17px; font-weight: 700; color: #1a202c; line-height: 1.4;">${title}</p>
          <div style="margin-top: 12px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 13px; color: #64748b;">⏱ ${lesson.estimatedTime} min</span>
            <span style="color: ${phase.color}; font-size: 20px;">→</span>
          </div>
        </div>
      `;
    });
    
    html += `</div></div>`;
  }
  
  html += `</div>`;
  app.innerHTML = html;
}

// ===============================
// توابع نمایش درس برای روزمره و سفر
// ===============================
async function showDailyLesson(lessonId) {
  // فعلاً یک placeholder - بعداً با lessonEngine یکپارچه می‌شود
  alert(`🏘️ درس ${lessonId} به زودی فعال می‌شود!`);
}

async function showTravelLesson(lessonId) {
  // فعلاً یک placeholder - بعداً با lessonEngine یکپارچه می‌شود
  alert(`✈️ درس ${lessonId} به زودی فعال می‌شود!`);
}

async function showGrammarPage() {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const level = getPlacementResult() || "A1";
    
    app.innerHTML = `<div style="text-align: center; padding: 60px 20px;"><p style="font-size: 20px; color: #6c757d;">⏳ در حال بارگذاری...</p></div>`;
    await loadGrammar(level);
    
    const allLessons = getGrammar(level);
    const recommended = getRecommendedGrammar(level);
    const levelNames = { "A1": "Débutant", "A2": "Élémentaire", "B1": "Intermédiaire", "B2": "Avancé", "C1": "Autonome" };
    
    const hasSeenPopup = localStorage.getItem("dino_seen_rec_popup") === "true";
    let popupHtml = "";
    if (!hasSeenPopup && recommended.length > 0) {
        popupHtml = `
            <div id="rec-popup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px);">
                <div style="background: white; border-radius: 16px; padding: 40px; max-width: 400px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <div style="font-size: 56px; margin-bottom: 20px;">🦖</div>
                    <h3 style="margin: 0 0 15px 0; color: #212529; font-size: 24px;">${lang === "fa" ? "پیشنهاد هوشمند داینو" : "Recommandation intelligente"}</h3>
                    <p class="persian-text" style="color: #6c757d; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                        ${lang === "fa" ? "بر اساس نتیجه آزمون تعیین سطح شما، این مباحث برای شروع یادگیری بهینه‌ترین گزینه‌ها هستند." : "Basé sur votre test de niveau, ces sujets sont les meilleurs pour commencer."}
                    </p>
                    <button id="close-popup" style="width: 100%; padding: 16px; background: #007bff; color: white; border: none; border-radius: 10px; font-size: 18px; font-weight: bold; cursor: pointer;">
                        ${lang === "fa" ? "متوجه شدم، بزن بریم!" : "Compris, c'est parti !"}
                    </button>
                </div>
            </div>
        `;
    }

    let html = popupHtml + `<div style="margin: 0 auto; padding-top: 40px;">
        <button id="back" class="back-btn">← ${t.back}</button>
        <h1 style="font-size: 36px; margin-bottom: 10px;">📖 ${t.grammar}</h1>
        <p style="font-size: 20px; color: #6c757d; margin-bottom: 40px;">${level} – ${levelNames[level] || ""}</p>`;
    
    if (recommended.length > 0) {
        html += `<div style="background: linear-gradient(135deg, #e0f2fe 0%, #f0f9ff 100%); border: 2px solid #bae6fd; border-radius: 16px; padding: 30px; margin-bottom: 40px;">
            <h2 style="font-size: 20px; margin: 0 0 20px 0; color: #0369a1; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 28px;">🦖</span>
                <span>${lang === "fa" ? "پیشنهاد داینو" : "Recommandé pour vous"}</span>
            </h2>`;
        
        recommended.slice(0, 3).forEach(item => {
            const title = lang === "fa" ? item.title_fa : item.title;
            html += `<div style="background: white; border-radius: 10px; padding: 18px 20px; margin-bottom: 12px; cursor: pointer; border: 1px solid #e2e8f0; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05);" onclick="showGrammarLesson('${item.id}')">
                <p class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="margin: 0; font-size: 18px; font-weight: 600; color: #212529;">${title}</p>
                <p style="margin: 6px 0 0 0; font-size: 15px; color: #6c757d;">⏱ ${item.estimatedTime} min</p>
            </div>`;
        });
        html += `</div>`;
    }
    
    html += `<h2 style="font-size: 24px; margin-bottom: 20px; color: #212529;">${lang === "fa" ? "همه درس‌ها" : "Toutes les leçons"}</h2>`;
    
    allLessons.forEach(item => {
        const title = lang === "fa" ? item.title_fa : item.title;
        const status = getLessonStatus(item.id);
        const statusIcon = getStatusIcon(status);
        
        html += `<div style="background: white; border: 1px solid #e9ecef; border-radius: 12px; padding: 20px 24px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.02);" onclick="showGrammarLesson('${item.id}')">
            <div style="display: flex; align-items: center; gap: 16px; flex: 1;">
                <span style="font-size: 24px;">${statusIcon}</span>
                <div style="flex: 1;">
                    <p class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="margin: 0; font-size: 18px; font-weight: 600; color: #212529;">${title}</p>
                    <p style="margin: 6px 0 0 0; font-size: 15px; color: #6c757d;">⏱ ${item.estimatedTime} min · ${item.exercises} ${lang === "fa" ? "تمرین" : "exercices"}</p>
                </div>
            </div>
            <span style="color: #ced4da; font-size: 24px;">›</span>
        </div>`;
    });
    
    html += `</div>`;
    app.innerHTML = html;
    document.getElementById("back").onclick = showHome;
    
    const closeBtn = document.getElementById("close-popup");
    if (closeBtn) {
        closeBtn.onclick = () => {
            document.getElementById("rec-popup").style.display = "none";
            localStorage.setItem("dino_seen_rec_popup", "true");
        };
    }
}

async function showGrammarLesson(lessonId) {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const level = getPlacementResult() || "A1";
    
    let lesson = null;
    try {
        const response = await fetch(`./data/lessons/${level}/${lessonId}.json`);
        lesson = await response.json();
    } catch (error) {
        console.error("خطا در بارگذاری درس:", error);
        app.innerHTML = `<p>خطا در یافتن درس.</p><button onclick="showGrammarPage()">بازگشت</button>`;
        return;
    }

    const status = getLessonStatus(lessonId);
    const bookmarked = isBookmarked(lessonId);
    const progress = getLessonProgress(lessonId);

    if (status === "not_started") setLessonStatus(lessonId, "in_progress");

    const totalSections = lesson.sections ? lesson.sections.length : 0;
    const completedCount = progress.completedSections.length;
    const progressPercent = totalSections > 0 ? (completedCount / totalSections) * 100 : 0;

    let sectionsListHtml = "";
    
    if (lesson.sections && lesson.sections.length > 0) {
        lesson.sections.forEach((section, index) => {
            const isCompleted = progress.completedSections.includes(section.id);
            
            let icon, typeLabel, bgColor, borderColor, iconBg;
            if (section.type === "lesson") {
                icon = "📖"; typeLabel = lang === "fa" ? "درسنامه" : "Leçon";
                bgColor = "#eff6ff"; borderColor = "#3b82f6"; iconBg = "#dbeafe";
            } else if (section.type === "exercise") {
                icon = "✏️"; typeLabel = lang === "fa" ? "تمرین" : "Exercice";
                bgColor = "#f0fdf4"; borderColor = "#10b981"; iconBg = "#d1fae5";
            } else {
                icon = "🏆"; typeLabel = lang === "fa" ? "آزمون پایانی" : "Quiz final";
                bgColor = "#fef3c7"; borderColor = "#f59e0b"; iconBg = "#fde68a";
            }
            
            sectionsListHtml += `
                <div onclick="showLessonSection('${lessonId}', '${section.id}')" style="
                    background: ${isCompleted ? '#f0fdf4' : bgColor}; 
                    border: 2px solid ${isCompleted ? '#10b981' : borderColor}; 
                    border-radius: 16px; 
                    padding: 22px 26px; 
                    margin-bottom: 14px; 
                    display: flex; 
                    align-items: center; 
                    gap: 18px; 
                    cursor: pointer; 
                    transition: all 0.2s;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
                " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 20px rgba(0,0,0,0.08)'" onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 8px rgba(0,0,0,0.04)'">
                    <div style="width: 50px; height: 50px; background: ${iconBg}; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 26px; flex-shrink: 0;">
                        ${isCompleted ? '✅' : icon}
                    </div>
                    <div style="flex: 1;">
                        <p class="ltr-lock" style="margin: 0; font-size: 18px; font-weight: 700; color: #1a202c;">${section.title}</p>
                        <p style="margin: 6px 0 0 0; font-size: 14px; color: #64748b; font-weight: 500;">${typeLabel}${isCompleted ? (lang === "fa" ? " • انجام شد ✓" : " • Terminé ✓") : ""}</p>
                    </div>
                    <span style="color: ${isCompleted ? '#10b981' : '#94a3b8'}; font-size: 28px; font-weight: 300;">›</span>
                </div>
            `;
        });
    }

    let html = `
        <div style="margin: 0 auto; padding-top: 50px;">
            <button id="back" class="back-btn">← ${t.back}</button>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 40px; margin-bottom: 30px; color: white; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
                <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                    <div>
                        <span class="ltr-lock" style="display: inline-block; font-size: 13px; background: rgba(255,255,255,0.2); padding: 6px 14px; border-radius: 20px; color: white; font-weight: 600; backdrop-filter: blur(10px); margin-bottom: 15px;">${lesson.level} • ${lessonId}</span>
                        <h1 class="ltr-lock" style="font-size: 36px; margin: 0; font-weight: 800; line-height: 1.2;">${lesson.title}</h1>
                    </div>
                    <button id="bookmark-btn" style="background: rgba(255,255,255,0.2); border: none; font-size: 28px; cursor: pointer; padding: 10px; width: auto; margin: 0; border-radius: 12px; backdrop-filter: blur(10px);">${bookmarked ? "⭐" : "☆"}</button>
                </div>
                <div style="display: flex; gap: 20px; align-items: center; margin-top: 20px; font-size: 15px; opacity: 0.95;">
                    <span>⏱ ${lesson.estimatedTime} min</span>
                    <span>•</span>
                    <span>${totalSections} ${lang === "fa" ? "بخش" : "sections"}</span>
                </div>
            </div>

            <div style="background: white; border-radius: 14px; padding: 20px 24px; margin-bottom: 30px; box-shadow: 0 2px 12px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 15px; font-weight: 600; color: #475569;">${lang === "fa" ? "پیشرفت شما" : "Votre progression"}</span>
                    <span style="font-size: 15px; font-weight: 700; color: #007bff;">${completedCount} / ${totalSections}</span>
                </div>
                <div style="background: #e2e8f0; height: 10px; border-radius: 5px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #007bff 0%, #00c6ff 100%); height: 100%; width: ${progressPercent}%; transition: width 0.4s; border-radius: 5px;"></div>
                </div>
            </div>

            <h2 style="font-size: 22px; margin-bottom: 20px; color: #1a202c; font-weight: 700;">${lang === "fa" ? "بخش‌های درس" : "Sections de la leçon"}</h2>
            ${sectionsListHtml}
        </div>
    `;

    app.innerHTML = html;
    document.getElementById("back").onclick = showGrammarPage;
    document.getElementById("bookmark-btn").onclick = () => {
        document.getElementById("bookmark-btn").innerHTML = toggleBookmark(lessonId) ? "⭐" : "☆";
    };
}

// ===============================
// رندر جدول با هدر آبی پررنگ و خوانا (حل مشکل ۲)
// ===============================
function renderTable(table) {
    if (!table || !table.headers || !table.rows) return "";
    
    let html = `<div style="overflow-x: auto; margin: 25px 0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
        <table class="ltr-lock" style="width: 100%; border-collapse: collapse; font-size: 16px;">`;
    
    html += `<thead><tr style="background: linear-gradient(135deg, #007bff 0%, #0056b3 100%);">`;
    table.headers.forEach(h => {
        html += `<th style="padding: 16px 20px; text-align: left; color: white; font-weight: 600; font-size: 15px; letter-spacing: 0.3px;">${renderMarkdown(h)}</th>`;
    });
    html += `</tr></thead>`;
    
    html += `<tbody style="background: white;">`;
    table.rows.forEach((row, i) => {
        const bgColor = i % 2 === 0 ? "#ffffff" : "#f8fafc";
        html += `<tr style="background: ${bgColor}; border-bottom: 1px solid #e2e8f0; transition: background 0.2s;" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${bgColor}'">`;
        row.forEach(cell => {
            html += `<td style="padding: 14px 20px; color: #2d3748;">${renderMarkdown(cell)}</td>`;
        });
        html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    
    return html;
}

async function showLessonSection(lessonId, sectionId) {
    const level = lessonId.split("-")[0];
    const lessonData = await loadLessonWithExercises(level, lessonId);
    const section = getSection(lessonData, sectionId);
    
    if (!section) { alert("خطا در یافتن بخش"); return; }
    
    if (section.type === "lesson") {
        showLessonContent(lessonId, section);
    } else if (section.type === "exercise" || section.type === "quiz") {
        showExerciseContent(lessonId, section);
    }
}

// ===============================
// نمایش محتوای درس با طراحی مدرن و Markdown کامل (حل مشکل ۱ و ۳)
// ===============================
function showLessonContent(lessonId, section) {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const title = lang === "fa" ? section.title_fa : section.title;
    
    let html = `
        <div style="margin: 0 auto; padding-top: 50px;">
            <button id="back" class="back-btn">← ${t.back}</button>
            
            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 20px; padding: 35px 40px; margin-bottom: 30px; color: white; box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);">
                <p style="font-size: 14px; opacity: 0.9; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">
                    ${section.type === 'lesson' ? (lang === "fa" ? "📖 درسنامه" : "📖 Leçon") : (lang === "fa" ? "✏️ تمرین" : "✏️ Exercice")}
                </p>
                <h1 class="ltr-lock" style="font-size: 32px; margin: 0; font-weight: 700; line-height: 1.3;">${title}</h1>
            </div>
            
            <div style="background: white; border-radius: 16px; padding: 35px; box-shadow: 0 4px 20px rgba(0,0,0,0.06); margin-bottom: 25px;">
    `;
    
    if (section.content) {
        html += `<div class="ltr-lock" style="line-height: 1.9; color: #2d3748; font-size: 18px; margin-bottom: 25px;">${renderMarkdown(section.content)}</div>`;
    }
    
    if (section.table) {
        html += renderTable(section.table);
    }
    
    if (section.examples && section.examples.length > 0) {
        html += `<div style="margin-top: 30px;">
            <h3 style="font-size: 18px; color: #007bff; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; font-weight: 700;">
                <span style="font-size: 22px;">💡</span>
                <span>${lang === "fa" ? "مثال‌ها" : "Exemples"}</span>
            </h3>`;
        section.examples.forEach(example => {
            html += `<div style="background: #f0f7ff; padding: 18px 22px; border-radius: 12px; margin: 10px 0; border-left: 4px solid #007bff;">
                <p class="ltr-lock" style="margin: 0; font-weight: 600; font-size: 18px; color: #1a365d;">${renderMarkdown(example.fr)}</p>
                ${example.fa ? `<p class="persian-text" style="margin: 8px 0 0 0; font-size: 15px; color: #4a5568;">${example.fa}</p>` : ''}
            </div>`;
        });
        html += `</div>`;
    }
    
    if (section.note) {
        html += `<div style="margin-top: 25px; padding: 22px 25px; background: #fff9e6; border-radius: 12px; border-left: 4px solid #fbbf24; color: #78350f; font-size: 16px; line-height: 1.7;">
            <div style="display: flex; gap: 12px; align-items: start;">
                <span style="font-size: 24px; flex-shrink: 0;">💡</span>
                <div class="ltr-lock" style="flex: 1;">${renderMarkdown(section.note)}</div>
            </div>
        </div>`;
    }
    
    if (section.note_fa) {
        html += `<div class="persian-text" style="margin-top: 25px; padding: 22px 25px; background: #fff9e6; border-radius: 12px; border-left: 4px solid #fbbf24; color: #78350f; font-size: 16px; line-height: 1.7;">
            <div style="display: flex; gap: 12px; align-items: start;">
                <span style="font-size: 24px; flex-shrink: 0;">💡</span>
                <div style="flex: 1;">${section.note_fa}</div>
            </div>
        </div>`;
    }
    
    html += `</div>
        
        <button id="complete-btn" style="display: block; width: 100%; padding: 20px; font-size: 18px; font-weight: 700; border: none; border-radius: 14px; cursor: pointer; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3); transition: transform 0.2s;">
            ${lang === "fa" ? "✓ ادامه به بخش بعدی" : "✓ Continuer"}
        </button>
    </div>`;
    
    app.innerHTML = html;
    document.getElementById("back").onclick = () => showGrammarLesson(lessonId);
    document.getElementById("complete-btn").onclick = () => {
        markSectionCompleted(lessonId, section.id);
        showGrammarLesson(lessonId);
    };
}

function showExerciseContent(lessonId, section) {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const title = lang === "fa" ? section.title_fa : section.title;
    
    const questions = getRandomQuestions(section, section.displayCount);
    let currentQuestionIndex = 0;
    let correctCount = 0;
    
    function showCurrentQuestion() {
        if (currentQuestionIndex >= questions.length) {
            showExerciseResult(lessonId, section, correctCount, questions.length);
            return;
        }
        
        const question = prepareQuestion(questions[currentQuestionIndex]);
        
        let html = `
            <div style="margin: 0 auto; padding-top: 40px;">
                <button id="back" class="back-btn">← ${t.back}</button>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; margin-top: 20px;">
                    <span class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="font-size: 18px; color: #6c757d; font-weight: 600;">${currentQuestionIndex + 1} / ${questions.length}</span>
                </div>
                <div style="background: #e9ecef; height: 8px; border-radius: 4px; margin-bottom: 40px; overflow: hidden;">
                    <div style="background: #007bff; height: 100%; width: ${((currentQuestionIndex + 1) / questions.length) * 100}%; transition: width 0.3s;"></div>
                </div>
                <h2 class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="font-size: 24px; margin-bottom: 15px;">${title}</h2>
                <p class="ltr-lock" style="font-size: 22px; line-height: 1.6; color: #212529; margin-bottom: 40px;">${question.question}</p>
                <div id="options-container" style="display: flex; flex-direction: column; gap: 15px;">
        `;
        
        if (question.type === "mcq" || question.type === "binary") {
            question.options.forEach((option, index) => {
                html += `<button class="option-btn ltr-lock" data-index="${index}" style="width: 100%; padding: 20px; font-size: 18px; border: 2px solid #dee2e6; border-radius: 12px; background: #f8f9fa; color: #212529; cursor: pointer; text-align: left; transition: all 0.2s;">${option}</button>`;
            });
        }
        
        html += `</div><div id="feedback" style="margin-top: 30px; min-height: 80px;"></div></div>`;
        app.innerHTML = html;
        
        document.getElementById("back").onclick = () => showGrammarLesson(lessonId);
        
        document.querySelectorAll(".option-btn").forEach(btn => {
            btn.onclick = () => {
                const selectedIndex = parseInt(btn.getAttribute("data-index"));
                const isCorrect = checkAnswer(question, selectedIndex);
                
                if (isCorrect) correctCount++;
                else saveMistake(lessonId, section.id, currentQuestionIndex, selectedIndex, question.correct);
                
                const feedback = document.getElementById("feedback");
                if (isCorrect) {
                    btn.style.background = "#d4edda"; btn.style.borderColor = "#28a745"; btn.style.color = "#155724";
                    feedback.innerHTML = `<div style="background: #d4edda; padding: 20px; border-radius: 12px; color: #155724; border: 1px solid #c3e6cb;"><p class="persian-text" style="margin: 0; font-weight: bold; font-size: 20px;">✅ آفرین!</p><p class="persian-text" style="margin: 10px 0 0 0; font-size: 16px;">${renderMarkdown(question.explanation)}</p></div>`;
                } else {
                    btn.style.background = "#f8d7da"; btn.style.borderColor = "#dc3545"; btn.style.color = "#721c24";
                    document.querySelectorAll(".option-btn")[question.correct].style.background = "#d4edda";
                    document.querySelectorAll(".option-btn")[question.correct].style.borderColor = "#28a745";
                    document.querySelectorAll(".option-btn")[question.correct].style.color = "#155724";
                    feedback.innerHTML = `<div style="background: #f8d7da; padding: 20px; border-radius: 12px; color: #721c24; border: 1px solid #f5c6cb;"><p class="persian-text" style="margin: 0; font-weight: bold; font-size: 20px;">❌ اشتباه!</p><p class="persian-text" style="margin: 10px 0 0 0; font-size: 16px;">${renderMarkdown(question.explanation)}</p></div>`;
                }
                
                document.querySelectorAll(".option-btn").forEach(b => { b.onclick = null; b.style.cursor = "default"; });
                
                feedback.innerHTML += `<button id="next-btn" style="display: block; width: 100%; margin-top: 20px; padding: 18px; font-size: 18px; font-weight: bold; border: none; border-radius: 12px; background: #007bff; color: white; cursor: pointer;">${lang === "fa" ? "سوال بعدی" : "Question suivante"}</button>`;
                document.getElementById("next-btn").onclick = () => { currentQuestionIndex++; showCurrentQuestion(); };
            };
        });
    }
    showCurrentQuestion();
}

function showExerciseResult(lessonId, section, correctCount, totalCount) {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const percentage = Math.round((correctCount / totalCount) * 100);
    
    markSectionCompleted(lessonId, section.id);
    
    let emoji = "🎉", message = lang === "fa" ? "عالی بود!" : "Excellent!";
    if (percentage < 50) { emoji = "💪"; message = lang === "fa" ? "تلاش بیشتری لازم است!" : "Il faut plus d'effort!"; }
    else if (percentage < 80) { emoji = "👍"; message = lang === "fa" ? "خوب بود!" : "Bien!"; }
    
    app.innerHTML = `
        <div style="max-width: 600px; margin: 0 auto; padding: 60px 20px; text-align: center;">
            <p style="font-size: 80px; margin-bottom: 20px;">${emoji}</p>
            <h1 class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="font-size: 36px; margin-bottom: 15px;">${message}</h1>
            <p style="font-size: 64px; font-weight: 800; color: #007bff; margin: 30px 0;">${correctCount} / ${totalCount}</p>
            <p class="persian-text" style="font-size: 24px; color: #6c757d; margin-bottom: 40px;">${percentage}%</p>
            <button onclick="showGrammarLesson('${lessonId}')" style="display: block; width: 100%; padding: 20px; font-size: 20px; font-weight: bold; border: none; border-radius: 12px; background: #007bff; color: white; cursor: pointer; margin-bottom: 15px;">${lang === "fa" ? "بازگشت به درس" : "Retour à la leçon"}</button>
        </div>
    `;
}

showLanguage();
loadPlacementQuestions().then(() => { console.log("موتور آماده است. تعداد سوالات:", getPlacementQuestions().length); });
