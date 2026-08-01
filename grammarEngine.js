// grammarEngine.js

let grammarData = {};

async function loadGrammar(level) {
    try {
        const response = await fetch("./data/grammar-" + level + ".json");
        const data = await response.json();
        grammarData[level] = data;
        return data;
    } catch (error) {
        console.error("خطا در بارگذاری گرامر " + level + ":", error);
        return [];
    }
}

function getGrammar(level) {
    return grammarData[level] || [];
}

function getRecommendedGrammar(level) {
    const data = grammarData[level] || [];
    return data.filter(item => item.recommended === true);
}

function getGrammarByModule(level) {
    const data = grammarData[level] || [];
    const modules = {};
    
    data.forEach(item => {
        if (!modules[item.module]) {
            modules[item.module] = {
                icon: item.icon,
                items: []
            };
        }
        modules[item.module].items.push(item);
    });
    
    return modules;
}
// ===============================
// سیستم پیشرفت و بوک‌مارک (LocalStorage)
// ===============================

function getLessonStatus(lessonId) {
    const progress = JSON.parse(localStorage.getItem("dino_progress") || "{}");
    return progress[lessonId] || "not_started"; // "not_started", "in_progress", "completed"
}

function setLessonStatus(lessonId, status) {
    const progress = JSON.parse(localStorage.getItem("dino_progress") || "{}");
    progress[lessonId] = status;
    localStorage.setItem("dino_progress", JSON.stringify(progress));
}

function toggleBookmark(lessonId) {
    let bookmarks = JSON.parse(localStorage.getItem("dino_bookmarks") || "[]");
    if (bookmarks.includes(lessonId)) {
        bookmarks = bookmarks.filter(id => id !== lessonId);
    } else {
        bookmarks.push(lessonId);
    }
    localStorage.setItem("dino_bookmarks", JSON.stringify(bookmarks));
    return bookmarks.includes(lessonId);
}

function isBookmarked(lessonId) {
    const bookmarks = JSON.parse(localStorage.getItem("dino_bookmarks") || "[]");
    return bookmarks.includes(lessonId);
}

function getStatusIcon(status) {
    if (status === "completed") return "✅";
    if (status === "in_progress") return "⏳";
    return "▶️";
}

function getStatusText(status, lang) {
    if (status === "completed") return lang === "fa" ? "تمام شده" : "Terminé";
    if (status === "in_progress") return lang === "fa" ? "در حال مطالعه" : "En cours";
    return lang === "fa" ? "شروع نشده" : "Non commencé";
}
