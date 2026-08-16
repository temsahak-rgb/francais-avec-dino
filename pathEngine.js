// pathEngine.js

let pathsData = {};
let currentPathLessons = [];
let commonData = { avatars: [], themes: [] };

// ۱. بارگذاری اطلاعات کلی مسیرها (از data/paths.json)
async function loadPaths() {
    try {
        const response = await fetch("./data/paths.json");
        pathsData = await response.json();
        console.log("✅ اطلاعات مسیرها بارگذاری شدند");
    } catch (error) {
        console.error("❌ خطا در بارگذاری مسیرها:", error);
    }
}

// ۲. بارگذاری داده‌های مشترک (آواتارها، تم‌ها و...)
async function loadCommonData() {
    try {
        // مثال: const avatarsRes = await fetch("./data/common/avatars.json");
        // commonData.avatars = await avatarsRes.json();
        console.log("✅ داده‌های مشترک (Common) آماده‌سازی شدند");
    } catch (error) {
        console.error("❌ خطا در بارگذاری داده‌های مشترک:", error);
    }
}

// ۳. بارگذاری محتوای مسیر فعلی (هوشمند)
async function loadCurrentPathContent() {
    const path = getCurrentPath();
    
    try {
        if (path === "travel" || path === "daily") {
            // برای سفر و روزمره، فایل lessons.json را می‌خوانیم
            const response = await fetch(`./data/${path}/lessons.json`);
            currentPathLessons = await response.json();
        } else if (path === "general") {
            // برای عمومی، از همان grammarEngine که قبلاً ساختیم استفاده می‌کنیم
            const level = getPlacementResult() || "A1";
            await loadGrammar(level);
            currentPathLessons = getGrammar(level);
        }
        console.log(`✅ محتوای مسیر "${path}" با موفقیت بارگذاری شد`);
        return currentPathLessons;
    } catch (error) {
        console.error(`❌ خطا در بارگذاری محتوای مسیر ${path}:`, error);
        currentPathLessons = [];
        return [];
    }
}

// ۴. توابع کمکی مدیریت مسیر
function getPaths() {
    return pathsData;
}

function getCurrentPath() {
    return localStorage.getItem("currentPath") || "general";
}

function setCurrentPath(pathId) {
    localStorage.setItem("currentPath", pathId);
}

// ۵. تابع کلیدی: تغییر مسیر و به‌روزرسانی صفحه
async function switchPath(newPath) {
    if (pathsData[newPath]) {
        setCurrentPath(newPath);
        console.log(`🔄 تغییر مسیر به: ${newPath}`);
        
        // بارگذاری مجدد محتوای مسیر جدید
        await loadCurrentPathContent();
        
        // بازگشت به صفحه اصلی برای نمایش محتوای جدید
        if (typeof showHome === "function") {
            showHome();
        }
    } else {
        console.error("❌ مسیر نامعتبر است:", newPath);
    }
}

// ۶. دریافت درس‌های مسیر فعلی
function getCurrentPathLessons() {
    return currentPathLessons;
}

// ۷. دریافت گرامرهای مرتبط (برای استفاده در بخش سفر)
function getRelatedGrammar(lessonId) {
    // این تابع می‌تواند بعداً گسترش یابد تا گرامرهای عمومی مرتبط با درس سفر را پیدا کند
    return []; 
}
