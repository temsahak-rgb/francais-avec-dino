// pathEngine.js

let pathsData = {};
let currentPathData = {};

// بارگذاری اطلاعات مسیرها
async function loadPaths() {
    try {
        const response = await fetch("./data/paths.json");
        pathsData = await response.json();
        console.log("✅ مسیرها بارگذاری شدند");
    } catch (error) {
        console.error("❌ خطا:", error);
    }
}

// بارگذاری محتوای یک مسیر خاص
async function loadPathContent(pathId) {
    try {
        const response = await fetch(`./data/${pathId}/lessons.json`);
        currentPathData[pathId] = await response.json();
        console.log(`✅ محتوای مسیر ${pathId} بارگذاری شد`);
        return currentPathData[pathId];
    } catch (error) {
        console.error(`❌ خطا در بارگذاری ${pathId}:`, error);
        return null;
    }
}

// گرفتن مسیر فعلی
function getCurrentPath() {
    return localStorage.getItem("currentPath") || "general";
}

// تغییر مسیر
function switchPath(newPath) {
    localStorage.setItem("currentPath", newPath);
    showHome(); // بارگذاری مجدد صفحه اصلی با مسیر جدید
}

// گرفتن لیست درس‌های مسیر فعلی
async function getCurrentPathLessons() {
    const currentPath = getCurrentPath();
    
    if (currentPath === "general") {
        const level = getPlacementResult() || "A1";
        await loadGrammar(level);
        return getGrammar(level);
    } else {
        const data = await loadPathContent(currentPath);
        return data || [];
    }
}
