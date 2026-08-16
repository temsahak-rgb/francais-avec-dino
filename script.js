// script.js

const app = document.getElementById("app");

// ===============================
// تابع رندر متن فارسی (با حفظ جهت کلمات لاتین)
// ===============================
function renderFaText(text) {
  if (!text) return "";
  return `<span class="persian-text">${text}</span>`;
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

function showHome() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  const level = getPlacementResult() || "A2";
  app.innerHTML = `<div style="margin: 0 auto; padding-top: 20px;">
    <div style="text-align: left; margin-bottom: 50px;">
        <h1 style="font-size: 42px; margin-bottom: 15px;">${t.hello} 👋</h1>
        <p style="font-size: 22px; color: #007bff; font-weight: bold;">${t.level} : ${level}</p>
        <button id="change-level-home" style="background: none; border: none; color: #6c757d; text-decoration: underline; cursor: pointer; font-size: 16px; margin-top: 10px; width: auto; padding: 5px;">${t.changeLevel}</button>
    </div>
    <h2 style="font-size: 24px; margin-bottom: 25px; color: #495057;">${t.today}</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px;">
        <button class="home-card" data-section="vocabulary" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #007bff; color: white; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(0,123,255,0.2);"><span style="font-size: 40px; margin-right: 20px;">📚</span><div><div style="font-weight: bold; margin-bottom: 8px;">${t.vocabulary}</div><div style="font-size: 16px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="grammar" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #28a745; color: white; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(40,167,69,0.2);"><span style="font-size: 40px; margin-right: 20px;">📖</span><div><div style="font-weight: bold; margin-bottom: 8px;">${t.grammar}</div><div style="font-size: 16px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="listening" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #ffc107; color: #212529; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(255,193,7,0.2);"><span style="font-size: 40px; margin-right: 20px;">🎧</span><div><div style="font-weight: bold; margin-bottom: 8px;">${t.listening}</div><div style="font-size: 16px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="revision" style="display: flex; align-items: center; padding: 30px; font-size: 20px; border: none; border-radius: 16px; background-color: #6c757d; color: white; cursor: pointer; text-align: left; box-shadow: 0 4px 12px rgba(108,117,125,0.2);"><span style="font-size: 40px; margin-right: 20px;">📝</span><div><div style="font-weight: bold; margin-bottom: 8px;">${t.revision}</div><div style="font-size: 16px; opacity: 0.9;">${t.continue} →</div></div></button>
    </div>
    <p style="text-align: left; color: #adb5bd; margin-top: 60px; font-size: 16px;">Version 1.0.0 Web</p>
  </div>`;
  document.querySelectorAll(".home-card").forEach(card => {
      card.onclick = () => { const section = card.getAttribute("data-section"); if (section === "grammar") { showGrammarPage(); } else { alert("🚧 بخش " + section + " به زودی فعال می‌شود!"); } };
  });
  document.getElementById("change-level-home").onclick = showLevelSelection;
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

    // ساخت لیست کارت‌های بخش‌ها
    let sectionsListHtml = "";
    
    if (lesson.sections && lesson.sections.length > 0) {
        lesson.sections.forEach((section, index) => {
            const isCompleted = progress.completedSections.includes(section.id);
            const statusIcon = isCompleted ? "✅" : (section.type === "lesson" ? "📖" : section.type === "exercise" ? "✏️" : "🏆");
            const sectionType = section.type === "lesson" ? (lang === "fa" ? "درسنامه" : "Leçon") : 
                               section.type === "exercise" ? (lang === "fa" ? "تمرین" : "Exercice") : 
                               (lang === "fa" ? "آزمون" : "Quiz");
            
            sectionsListHtml += `
                <div onclick="showLessonSection('${lessonId}', '${section.id}')" style="
                    background: white; 
                    border: 1px solid #e9ecef; 
                    border-radius: 12px; 
                    padding: 20px 24px; 
                    margin-bottom: 12px; 
                    display: flex; 
                    align-items: center; 
                    gap: 16px; 
                    cursor: pointer; 
                    transition: all 0.2s;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.02);
                " onmouseover="this.style.background='#f8f9fa'" onmouseout="this.style.background='white'">
                    <span style="font-size: 24px;">${statusIcon}</span>
                    <div style="flex: 1;">
                        <p class="ltr-lock" style="margin: 0; font-size: 18px; font-weight: 600; color: #212529;">${section.title}</p>
                        <p style="margin: 6px 0 0 0; font-size: 15px; color: #6c757d;">${sectionType}</p>
                    </div>
                    <span style="color: #ced4da; font-size: 24px;">›</span>
                </div>
            `;
        });
    }

    let html = `
        <div style="margin: 0 auto; padding-top: 40px;">
            <button id="back" class="back-btn">← ${t.back}</button>
            
            <div style="margin-bottom: 30px;">
                <span class="ltr-lock" style="font-size: 14px; background: #e9ecef; padding: 6px 12px; border-radius: 6px; color: #6c757d; font-weight: 600;">${lesson.level} - ${lessonId}</span>
                <h1 class="ltr-lock" style="font-size: 36px; margin: 15px 0 5px 0;">${lesson.title}</h1>
                <p style="font-size: 18px; color: #6c757d; margin: 10px 0;">⏱ ${lesson.estimatedTime} min</p>
            </div>

            <div style="background: #f8f9fa; border-radius: 12px; padding: 16px 20px; margin-bottom: 35px; display: flex; align-items: center; gap: 15px;">
                <span style="font-size: 28px;">${getStatusIcon(status)}</span>
                <span class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="font-size: 18px; font-weight: 600; color: #495057;">${getStatusText(status, lang)}</span>
                <button id="bookmark-btn" style="background: none; border: none; font-size: 28px; cursor: pointer; padding: 0; width: auto; margin: 0 0 0 auto;">${bookmarked ? "⭐" : "☆"}</button>
            </div>

            <h2 style="font-size: 24px; margin-bottom: 20px; color: #212529;">${lang === "fa" ? "بخش‌های درس" : "Sections de la leçon"}</h2>
            
            ${sectionsListHtml}
        </div>
    `;

    app.innerHTML = html;

    document.getElementById("back").onclick = showGrammarPage;
    
    document.getElementById("bookmark-btn").onclick = () => {
        document.getElementById("bookmark-btn").innerHTML = toggleBookmark(lessonId) ? "⭐" : "☆";
    };
}

function renderTable(table) {
    if (!table || !table.headers || !table.rows) return "";
    
    let html = `<div style="overflow-x: auto; margin: 25px 0;"><table class="ltr-lock" style="width: 100%; border-collapse: collapse; font-size: 16px;">`;
    
    html += `<thead><tr>`;
    table.headers.forEach(h => {
        html += `<th style="padding: 16px 20px; text-align: left; border: 1px solid #dee2e6;">${renderMarkdown(h)}</th>`;
    });
    html += `</tr></thead>`;
    
    html += `<tbody>`;
    table.rows.forEach((row, i) => {
        const bgColor = i % 2 === 0 ? "#ffffff" : "#f8f9fa";
        html += `<tr style="background: ${bgColor};">`;
        row.forEach(cell => {
            html += `<td style="padding: 14px 20px; border: 1px solid #dee2e6;">${renderMarkdown(cell)}</td>`;
        });
        html += `</tr>`;
    });
    html += `</tbody></table></div>`;
    
    return html;
}

function renderMarkdown(text) {
    if (!text) return "";
    return text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>');
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

function showLessonContent(lessonId, section) {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const title = lang === "fa" ? section.title_fa : section.title;
    
    let html = `
        <div style="margin: 0 auto; padding-top: 40px;">
            <button id="back" class="back-btn">← ${t.back}</button>
            <h1 class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="font-size: 32px; margin-bottom: 25px;">${title}</h1>
            <div style="background: white; border-radius: 16px; padding: 30px; box-shadow: 0 4px 12px rgba(0,0,0,0.05); margin-bottom: 30px;">
                <p class="ltr-lock" style="line-height: 1.8; color: #212529; white-space: pre-line; font-size: 18px;">${section.content}</p>
    `;
    
    if (section.table) {
        html += `<table class="ltr-lock" style="width: 100%; border-collapse: collapse; margin: 25px 0; font-size: 16px;">`;
        html += `<tr>`;
        section.table.headers.forEach(header => { html += `<th style="border: 1px solid #dee2e6; padding: 14px 20px; background: #f8f9fa; text-align: left;">${header}</th>`; });
        html += `</tr>`;
        section.table.rows.forEach(row => {
            html += `<tr>`;
            row.forEach(cell => { html += `<td style="border: 1px solid #dee2e6; padding: 14px 20px;">${cell}</td>`; });
            html += `</tr>`;
        });
        html += `</table>`;
    }
    
    if (section.examples && section.examples.length > 0) {
        html += `<h3 class="${lang === 'fa' ? 'persian-text' : 'ltr-lock'}" style="margin-top: 30px; color: #007bff; font-size: 20px; margin-bottom: 15px;">${lang === "fa" ? "مثال‌ها" : "Exemples"}</h3>`;
        section.examples.forEach(example => {
            html += `<div style="background: #f8f9fa; padding: 16px; border-radius: 10px; margin: 12px 0;"><p class="ltr-lock" style="margin: 0; font-weight: 600; font-size: 18px;">${example.fr}</p><p class="persian-text" style="margin: 8px 0 0 0; font-size: 16px; color: #6c757d;">${example.fa}</p></div>`;
        });
    }
    
    if (section.note_fa) {
        html += `
            <div class="persian-text" style="background: #fff3cd; border-radius: 12px; padding: 20px; margin-top: 25px; border-left: 5px solid #ffc107;">
                <p style="margin: 0; font-size: 16px;">💡 ${section.note_fa}</p>
            </div>
        `;
    }
    
    html += `
            </div>
            <button id="complete-btn" style="display: block; width: 100%; padding: 20px; font-size: 20px; font-weight: bold; border: none; border-radius: 12px; cursor: pointer; background-color: #28a745; color: white;">
                ${lang === "fa" ? "ادامه به بخش بعدی" : "Continuer"}
            </button>
        </div>
    `;
    
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
                    feedback.innerHTML = `<div style="background: #d4edda; padding: 20px; border-radius: 12px; color: #155724; border: 1px solid #c3e6cb;"><p class="persian-text" style="margin: 0; font-weight: bold; font-size: 20px;">✅ آفرین!</p><p class="persian-text" style="margin: 10px 0 0 0; font-size: 16px;">${question.explanation}</p></div>`;
                } else {
                    btn.style.background = "#f8d7da"; btn.style.borderColor = "#dc3545"; btn.style.color = "#721c24";
                    document.querySelectorAll(".option-btn")[question.correct].style.background = "#d4edda";
                    document.querySelectorAll(".option-btn")[question.correct].style.borderColor = "#28a745";
                    document.querySelectorAll(".option-btn")[question.correct].style.color = "#155724";
                    feedback.innerHTML = `<div style="background: #f8d7da; padding: 20px; border-radius: 12px; color: #721c24; border: 1px solid #f5c6cb;"><p class="persian-text" style="margin: 0; font-weight: bold; font-size: 20px;">❌ اشتباه!</p><p class="persian-text" style="margin: 10px 0 0 0; font-size: 16px;">${question.explanation}</p></div>`;
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
