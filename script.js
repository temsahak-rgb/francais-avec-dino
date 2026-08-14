// script.js

const app = document.getElementById("app");

// ===============================
// تابع تبدیل متن فارسی با کلمات لاتین
// ===============================
function renderFaText(text) {
  if (!text) return "";
  return text.replace(/[a-zA-ZÀ-ÿœŒæÆ'''\-]+/g, '<bdi>$&</bdi>');
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
  app.innerHTML = `<button id="back">${t.back}</button><h1>${t.choosePath}</h1><button id="general">${t.general}</button><button id="travel">${t.travel}</button><button id="daily">${t.daily}</button>`;
  document.getElementById("back").onclick = showLanguage;
  document.getElementById("general").onclick = showPlacementChoice;
  document.getElementById("travel").onclick = showHome;
  document.getElementById("daily").onclick = showHome;
}

function showPlacementChoice() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  app.innerHTML = `<button id="back">${t.back}</button><h1>${t.general}</h1><p>${t.levelQuestion}</p><button id="yes">${t.yes}</button><button id="later">${t.later}</button>`;
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
    
    let html = `<div style="max-width: 500px; margin: 0 auto; padding: 20px;">
        <div style="background-color: #e0e0e0; height: 8px; border-radius: 4px; margin-bottom: 30px; overflow: hidden;">
            <div style="background-color: #007bff; height: 100%; width: ${progress}%; transition: width 0.3s;"></div>
        </div>
        <div style="background-color: white; border-radius: 12px; padding: 30px 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <p style="font-size: 20px; margin: 0 0 30px 0; line-height: 1.6; color: #333;">${question.question}</p>
            <div style="display: flex; flex-direction: column; gap: 12px;">`;
    
    question.options.forEach((option, index) => {
        html += `<button class="option-btn" data-index="${index}" style="display: block; width: 100%; padding: 16px; font-size: 16px; border: 2px solid #e0e0e0; border-radius: 8px; background-color: white; color: #333; cursor: pointer; text-align: left; transition: all 0.2s;">${option}</button>`;
    });
    
    html += `</div><button id="dont-know" style="display: block; width: 100%; margin-top: 20px; padding: 14px; font-size: 15px; border: 2px solid #dc3545; border-radius: 8px; background-color: white; color: #dc3545; cursor: pointer;">${t.dontKnow}</button></div></div>`;
    app.innerHTML = html;
    
    document.querySelectorAll(".option-btn").forEach(btn => {
        btn.onclick = () => {
            const selectedIndex = parseInt(btn.getAttribute("data-index"));
            const isCorrect = selectedIndex === question.correctIndex;
            answerPlacement(isCorrect);
            if (isCorrect) { btn.style.backgroundColor = "#28a745"; btn.style.color = "white"; btn.style.borderColor = "#28a745"; } 
            else { btn.style.backgroundColor = "#dc3545"; btn.style.color = "white"; btn.style.borderColor = "#dc3545"; document.querySelectorAll(".option-btn")[question.correctIndex].style.backgroundColor = "#28a745"; document.querySelectorAll(".option-btn")[question.correctIndex].style.color = "white"; document.querySelectorAll(".option-btn")[question.correctIndex].style.borderColor = "#28a745"; }
            document.querySelectorAll(".option-btn").forEach(b => { b.onclick = null; b.style.cursor = "default"; });
            document.getElementById("dont-know").onclick = null; document.getElementById("dont-know").style.cursor = "default";
            setTimeout(() => { showQuestion(); }, 1500);
        };
    });
    document.getElementById("dont-know").onclick = () => {
        answerPlacement(null);
        document.getElementById("dont-know").style.backgroundColor = "#dc3545"; document.getElementById("dont-know").style.color = "white";
        document.querySelectorAll(".option-btn")[question.correctIndex].style.backgroundColor = "#28a745"; document.querySelectorAll(".option-btn")[question.correctIndex].style.color = "white"; document.querySelectorAll(".option-btn")[question.correctIndex].style.borderColor = "#28a745";
        document.querySelectorAll(".option-btn").forEach(b => { b.onclick = null; b.style.cursor = "default"; });
        document.getElementById("dont-know").onclick = null; document.getElementById("dont-know").style.cursor = "default";
        setTimeout(() => { showQuestion(); }, 1500);
    };
}

function showFinalResult() {
    const levelInfo = getEstimatedLevelRange();
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    app.innerHTML = `<div style="text-align: center; padding: 40px 20px; max-width: 500px; margin: 0 auto;">
        <h1 style="font-size: 28px; margin-bottom: 30px;">🎉 ${t.finalResult}</h1>
        <p style="font-size: 18px; color: #666; margin-bottom: 10px;">${t.yourLevel} :</p>
        <h2 style="font-size: 56px; color: #007bff; margin: 20px 0; font-weight: bold;">${levelInfo.range}</h2>
        <p style="font-size: 15px; color: #999; margin: 30px 0; line-height: 1.6;">${t.canModify}</p>
        <button id="accept-level" style="display: block; width: 100%; padding: 18px; font-size: 18px; border: none; border-radius: 8px; background-color: #28a745; color: white; cursor: pointer; font-weight: bold; margin-bottom: 15px;">${t.acceptLevel}</button>
        <button id="change-level" style="display: block; width: 100%; padding: 18px; font-size: 18px; border: 2px solid #007bff; border-radius: 8px; background-color: white; color: #007bff; cursor: pointer; font-weight: bold;">${t.changeLevel}</button>
    </div>`;
    document.getElementById("accept-level").onclick = () => { savePlacementResult(levelInfo.level); showHome(); };
    document.getElementById("change-level").onclick = showLevelSelection;
}

function showLevelSelection() {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const levels = ["A1", "A2", "B1", "B2", "C1"];
    let html = `<div style="text-align: center; padding: 40px 20px; max-width: 500px; margin: 0 auto;"><h1 style="font-size: 24px; margin-bottom: 30px;">${t.chooseYourLevel}</h1><div style="display: flex; flex-direction: column; gap: 12px;">`;
    levels.forEach(level => { html += `<button class="level-btn" data-level="${level}" style="display: block; width: 100%; padding: 20px; font-size: 20px; border: 2px solid #e0e0e0; border-radius: 8px; background-color: white; color: #333; cursor: pointer; font-weight: bold;">${level}</button>`; });
    html += `</div></div>`;
    app.innerHTML = html;
    document.querySelectorAll(".level-btn").forEach(btn => { btn.onclick = () => { savePlacementResult(btn.getAttribute("data-level")); showHome(); }; });
}

function showHome() {
  const lang = localStorage.getItem("language") || "fr";
  const t = texts[lang];
  const level = getPlacementResult() || "A2";
  app.innerHTML = `<div style="max-width: 500px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="font-size: 32px; margin-bottom: 10px;">${t.hello} 👋</h1>
        <p style="font-size: 18px; color: #007bff; font-weight: bold;">${t.level} : ${level}</p>
        <button id="change-level-home" style="background: none; border: none; color: #666; text-decoration: underline; cursor: pointer; font-size: 14px; margin-top: 5px;">${t.changeLevel}</button>
    </div>
    <h2 style="font-size: 20px; margin-bottom: 20px; color: #666;">${t.today}</h2>
    <div style="display: flex; flex-direction: column; gap: 15px;">
        <button class="home-card" data-section="vocabulary" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #007bff; color: white; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><span style="font-size: 32px; margin-right: 15px;">📚</span><div><div style="font-weight: bold; margin-bottom: 5px;">${t.vocabulary}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="grammar" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #28a745; color: white; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><span style="font-size: 32px; margin-right: 15px;">📖</span><div><div style="font-weight: bold; margin-bottom: 5px;">${t.grammar}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="listening" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #ffc107; color: #333; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><span style="font-size: 32px; margin-right: 15px;">🎧</span><div><div style="font-weight: bold; margin-bottom: 5px;">${t.listening}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div></button>
        <button class="home-card" data-section="revision" style="display: flex; align-items: center; width: 100%; padding: 20px; font-size: 18px; border: none; border-radius: 12px; background-color: #6c757d; color: white; cursor: pointer; text-align: left; box-shadow: 0 2px 8px rgba(0,0,0,0.1);"><span style="font-size: 32px; margin-right: 15px;">📝</span><div><div style="font-weight: bold; margin-bottom: 5px;">${t.revision}</div><div style="font-size: 14px; opacity: 0.9;">${t.continue} →</div></div></button>
    </div>
    <p style="text-align: center; color: #999; margin-top: 40px; font-size: 14px;">Version 0.1.1</p>
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
    
    app.innerHTML = `<div style="text-align: center; padding: 60px 20px;"><p style="font-size: 18px; color: #666;">⏳ در حال بارگذاری...</p></div>`;
    await loadGrammar(level);
    
    const allLessons = getGrammar(level);
    const recommended = getRecommendedGrammar(level);
    const levelNames = { "A1": "Débutant", "A2": "Élémentaire", "B1": "Intermédiaire", "B2": "Avancé", "C1": "Autonome" };
    
    const hasSeenPopup = localStorage.getItem("dino_seen_rec_popup") === "true";
    let popupHtml = "";
    if (!hasSeenPopup && recommended.length > 0) {
        popupHtml = `
            <div id="rec-popup" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 20px; backdrop-filter: blur(4px);">
                <div style="background: white; border-radius: 16px; padding: 30px 25px; max-width: 340px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
                    <div style="font-size: 48px; margin-bottom: 15px;">🦖</div>
                    <h3 style="margin: 0 0 10px 0; color: #333; font-size: 20px;">${lang === "fa" ? "پیشنهاد هوشمند داینو" : "Recommandation intelligente"}</h3>
                    <p style="color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 25px;">
                        ${lang === "fa" 
                            ? "بر اساس نتیجه آزمون تعیین سطح شما، این مباحث برای شروع یادگیری بهینه‌ترین گزینه‌ها هستند." 
                            : "Basé sur votre test de niveau, ces sujets sont les meilleurs pour commencer."}
                    </p>
                    <button id="close-popup" style="width: 100%; padding: 14px; background: #007bff; color: white; border: none; border-radius: 10px; font-size: 16px; font-weight: bold; cursor: pointer;">
                        ${lang === "fa" ? "متوجه شدم، بزن بریم!" : "Compris, c'est parti !"}
                    </button>
                </div>
            </div>
        `;
    }

    let html = popupHtml + `<div style="max-width: 500px; margin: 0 auto; padding: 20px;">
        <button id="back" style="background: none; border: none; color: #007bff; font-size: 16px; cursor: pointer; padding: 0; margin-bottom: 20px;">← ${t.back}</button>
        <h1 style="font-size: 24px; margin-bottom: 5px;">📖 ${t.grammar}</h1>
        <p style="font-size: 16px; color: #666; margin-bottom: 30px;">${level} – ${levelNames[level] || ""}</p>`;
    
    if (recommended.length > 0) {
        html += `<div style="background: #f0f4ff; border: 2px solid #d0d9ff; border-radius: 12px; padding: 20px; margin-bottom: 30px;">
            <h2 style="font-size: 16px; margin: 0 0 15px 0; color: #4a5568; display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 24px;">🦖</span>
                <span>${lang === "fa" ? "پیشنهاد داینو" : "Recommandé pour vous"}</span>
            </h2>`;
        
        recommended.slice(0, 3).forEach(item => {
            const title = lang === "fa" ? renderFaText(item.title_fa) : item.title;
            html += `<div style="background: white; border-radius: 8px; padding: 14px 15px; margin-bottom: 8px; cursor: pointer; border: 1px solid #e2e8f0; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05);" onclick="showGrammarLesson('${item.id}')">
                <p style="margin: 0; font-size: 15px; font-weight: 500; color: #2d3748;">${title}</p>
                <p style="margin: 4px 0 0 0; font-size: 13px; color: #718096;">⏱ ${item.estimatedTime} min</p>
            </div>`;
        });
        html += `</div>`;
    }
    
    html += `<h2 style="font-size: 18px; margin-bottom: 15px; color: #333;">${lang === "fa" ? "همه درس‌ها" : "Toutes les leçons"}</h2>`;
    
    allLessons.forEach(item => {
        const title = lang === "fa" ? renderFaText(item.title_fa) : item.title;
        const status = getLessonStatus(item.id);
        const statusIcon = getStatusIcon(status);
        
        html += `<div style="background: white; border: 1px solid #e0e0e0; border-radius: 8px; padding: 14px 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; transition: background 0.2s;" onclick="showGrammarLesson('${item.id}')">
            <div style="display: flex; align-items: center; gap: 12px; flex: 1;">
                <span style="font-size: 18px;">${statusIcon}</span>
                <div style="flex: 1;">
                    <p style="margin: 0; font-size: 15px; font-weight: 500; color: #333;">${title}</p>
                    <p style="margin: 4px 0 0 0; font-size: 13px; color: #999;">⏱ ${item.estimatedTime} min · ${item.exercises} ${lang === "fa" ? "تمرین" : "exercices"}</p>
                </div>
            </div>
            <span style="color: #ccc; font-size: 20px;">›</span>
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
    
    // بارگذاری درس از فایل JSON
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

    if (status === "not_started") setLessonStatus(lessonId, "in_progress");

    // ساخت HTML درس
    let sectionsHtml = "";
    
    if (lesson.sections && lesson.sections.length > 0) {
        lesson.sections.forEach((section, index) => {
            sectionsHtml += `
                <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px;">
                    <h3 style="margin-top: 0; color: #007bff; font-size: 18px;">${section.title}</h3>
            `;
            
            // رندر content با Markdown
            if (section.content) {
                sectionsHtml += `<div style="line-height: 1.8; color: #333; margin-bottom: 15px;">${renderMarkdown(section.content)}</div>`;
            }
            
            // رندر جدول
            if (section.table) {
                sectionsHtml += renderTable(section.table);
            }
            
            // رندر مثال‌ها
            if (section.examples && section.examples.length > 0) {
                sectionsHtml += `<div style="margin-top: 15px; padding: 15px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid #007bff;">`;
                section.examples.forEach(ex => {
                    sectionsHtml += `<p style="margin: 8px 0; font-size: 15px;">${renderMarkdown(ex.fr)}</p>`;
                });
                sectionsHtml += `</div>`;
            }
            
            // رندر note با Markdown
            if (section.note) {
                sectionsHtml += `<div style="margin-top: 15px; padding: 15px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #ffc107; color: #856404;">${renderMarkdown(section.note)}</div>`;
            }
            
            sectionsHtml += `</div>`;
        });
    }

    let html = `
        <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
            <button id="back" style="background: none; border: none; color: #007bff; font-size: 16px; cursor: pointer; padding: 0; margin-bottom: 20px;">← ${t.back}</button>
            
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 20px;">
                <div>
                    <span style="font-size: 12px; background: #e0e0e0; padding: 4px 8px; border-radius: 4px; color: #666;">${lesson.level} - ${lessonId}</span>
                    <h1 style="font-size: 24px; margin: 10px 0 5px 0;">${lesson.title}</h1>
                </div>
                <button id="bookmark-btn" style="background: none; border: none; font-size: 28px; cursor: pointer; padding: 0;">${bookmarked ? "⭐" : "☆"}</button>
            </div>

            <div style="background: #f8f9fa; border-radius: 8px; padding: 12px; margin-bottom: 25px; display: flex; align-items: center; gap: 10px;">
                <span style="font-size: 20px;">${getStatusIcon(status)}</span>
                <span style="font-size: 15px; font-weight: 500;">${getStatusText(status, lang)}</span>
            </div>

            ${sectionsHtml}

            <button id="complete-btn" style="display: block; width: 100%; padding: 16px; font-size: 16px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; background-color: ${status === "completed" ? "#6c757d" : "#28a745"}; color: white;">
                ${status === "completed" ? "✅ قبلاً تمام شده" : "علامت‌گذاری به عنوان پایان"}
            </button>
        </div>
    `;

    app.innerHTML = html;

    // اتصال رویدادها
    document.getElementById("back").onclick = showGrammarPage;
    
    document.getElementById("bookmark-btn").onclick = () => {
        document.getElementById("bookmark-btn").innerHTML = toggleBookmark(lessonId) ? "⭐" : "☆";
    };

    document.getElementById("complete-btn").onclick = () => {
        if (status !== "completed") {
            setLessonStatus(lessonId, "completed");
            showGrammarLesson(lessonId);
        }
    };
}

// تابع رندر جدول
function renderTable(table) {
    if (!table || !table.headers || !table.rows) return "";
    
    let html = `<div style="overflow-x: auto; margin: 15px 0;"><table style="width: 100%; border-collapse: collapse; font-size: 14px;">`;
    
    // Header
    html += `<thead><tr style="background: #007bff; color: white;">`;
    table.headers.forEach(h => {
        html += `<th style="padding: 12px 10px; text-align: left; border: 1px solid #ddd;">${renderMarkdown(h)}</th>`;
    });
    html += `</tr></thead>`;
    
    // Rows
    html += `<tbody>`;
    table.rows.forEach((row, i) => {
        const bgColor = i % 2 === 0 ? "#ffffff" : "#f8f9fa";
        html += `<tr style="background: ${bgColor};">`;
        row.forEach(cell => {
            html += `<td style="padding: 10px; border: 1px solid #ddd;">${renderMarkdown(cell)}</td>`;
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

function showLessonContent(lessonId, section) {
    const lang = localStorage.getItem("language") || "fr";
    const t = texts[lang];
    const title = lang === "fa" ? renderFaText(section.title_fa) : section.title;
    
    let html = `
        <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
            <button id="back" style="background: none; border: none; color: #007bff; font-size: 16px; cursor: pointer; padding: 0; margin-bottom: 20px;">← ${t.back}</button>
            <h1 style="font-size: 24px; margin-bottom: 20px;">${title}</h1>
            <div style="background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.05); margin-bottom: 20px;">
                <p style="line-height: 1.8; color: #333; white-space: pre-line;">${section.content}</p>
    `;
    
    if (section.table) {
        html += `<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 15px;">`;
        html += `<tr>`;
        section.table.headers.forEach(header => { html += `<th style="border: 1px solid #ddd; padding: 10px; background: #f8f9fa; text-align: left;">${header}</th>`; });
        html += `</tr>`;
        section.table.rows.forEach(row => {
            html += `<tr>`;
            row.forEach(cell => { html += `<td style="border: 1px solid #ddd; padding: 10px;">${cell}</td>`; });
            html += `</tr>`;
        });
        html += `</table>`;
    }
    
    if (section.examples && section.examples.length > 0) {
        html += `<h3 style="margin-top: 20px; color: #007bff;">${lang === "fa" ? "مثال‌ها" : "Exemples"}</h3>`;
        section.examples.forEach(example => {
            html += `<div style="background: #f8f9fa; padding: 12px; border-radius: 6px; margin: 8px 0;"><p style="margin: 0; font-weight: 500;">${example.fr}</p><p style="margin: 4px 0 0 0; font-size: 14px; color: #666;">${renderFaText(example.fa)}</p></div>`;
        });
    }
    
    if (section.note_fa) {
        html += `
            <div style="background: #fff3cd; border-radius: 8px; padding: 12px; margin-top: 15px;">
                <p style="margin: 0;">💡 ${renderFaText(section.note_fa)}</p>
            </div>
        `;
    }
    
    html += `
            </div>
            <button id="complete-btn" style="display: block; width: 100%; padding: 16px; font-size: 16px; font-weight: bold; border: none; border-radius: 8px; cursor: pointer; background-color: #28a745; color: white;">
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
    const title = lang === "fa" ? renderFaText(section.title_fa) : section.title;
    
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
            <div style="max-width: 500px; margin: 0 auto; padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <button id="back" style="background: none; border: none; color: #007bff; font-size: 16px; cursor: pointer; padding: 0;">← ${t.back}</button>
                    <span style="font-size: 14px; color: #666;">${currentQuestionIndex + 1} / ${questions.length}</span>
                </div>
                <div style="background: #e0e0e0; height: 6px; border-radius: 3px; margin-bottom: 30px; overflow: hidden;">
                    <div style="background: #007bff; height: 100%; width: ${((currentQuestionIndex + 1) / questions.length) * 100}%; transition: width 0.3s;"></div>
                </div>
                <h2 style="font-size: 18px; margin-bottom: 10px;">${title}</h2>
                <p style="font-size: 18px; line-height: 1.6; color: #333; margin-bottom: 30px;">${renderFaText(question.question)}</p>
                <div id="options-container" style="display: flex; flex-direction: column; gap: 12px;">
        `;
        
        if (question.type === "mcq" || question.type === "binary") {
            question.options.forEach((option, index) => {
                html += `<button class="option-btn" data-index="${index}" style="width: 100%; padding: 16px; font-size: 16px; border: 2px solid #dee2e6; border-radius: 10px; background: #f8f9fa; color: #495057; cursor: pointer; text-align: left; transition: all 0.2s;">${option}</button>`;
            });
        }
        
        html += `</div><div id="feedback" style="margin-top: 20px; min-height: 60px;"></div></div>`;
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
                    btn.style.background = "#d4edda"; btn.style.borderColor = "#28a745";
                    feedback.innerHTML = `<div style="background: #d4edda; padding: 12px; border-radius: 8px; color: #155724;"><p style="margin: 0; font-weight: bold;">✅ ${lang === "fa" ? "آفرین!" : "Bravo!"}</p><p style="margin: 8px 0 0 0; font-size: 14px;">${renderFaText(question.explanation)}</p></div>`;
                } else {
                    btn.style.background = "#f8d7da"; btn.style.borderColor = "#dc3545";
                    document.querySelectorAll(".option-btn")[question.correct].style.background = "#d4edda";
                    document.querySelectorAll(".option-btn")[question.correct].style.borderColor = "#28a745";
                    feedback.innerHTML = `<div style="background: #f8d7da; padding: 12px; border-radius: 8px; color: #721c24;"><p style="margin: 0; font-weight: bold;">❌ ${lang === "fa" ? "اشتباه!" : "Incorrect!"}</p><p style="margin: 8px 0 0 0; font-size: 14px;">${renderFaText(question.explanation)}</p></div>`;
                }
                
                document.querySelectorAll(".option-btn").forEach(b => { b.onclick = null; b.style.cursor = "default"; });
                
                feedback.innerHTML += `<button id="next-btn" style="display: block; width: 100%; margin-top: 15px; padding: 14px; font-size: 16px; font-weight: bold; border: none; border-radius: 8px; background: #007bff; color: white; cursor: pointer;">${lang === "fa" ? "سوال بعدی" : "Question suivante"}</button>`;
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
        <div style="max-width: 500px; margin: 0 auto; padding: 20px; text-align: center;">
            <p style="font-size: 60px; margin-bottom: 20px;">${emoji}</p>
            <h1 style="font-size: 28px; margin-bottom: 10px;">${message}</h1>
            <p style="font-size: 48px; font-weight: bold; color: #007bff; margin: 20px 0;">${correctCount} / ${totalCount}</p>
            <p style="font-size: 18px; color: #666; margin-bottom: 30px;">${percentage}%</p>
            <button onclick="showGrammarLesson('${lessonId}')" style="display: block; width: 100%; padding: 16px; font-size: 16px; font-weight: bold; border: none; border-radius: 8px; background: #007bff; color: white; cursor: pointer; margin-bottom: 10px;">${lang === "fa" ? "بازگشت به درس" : "Retour à la leçon"}</button>
        </div>
    `;
}

showLanguage();
loadPlacementQuestions().then(() => { console.log("موتور آماده است. تعداد سوالات:", getPlacementQuestions().length); });
