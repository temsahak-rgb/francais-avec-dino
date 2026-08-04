// pathEngine.js

let pathsData = {};
let travelData = {};

async function loadPaths() {
    try {
        const response = await fetch("./data/paths.json");
        pathsData = await response.json();
        console.log("✅ مسیرها بارگذاری شدند");
    } catch (error) {
        console.error("❌ خطا در بارگذاری مسیرها:", error);
    }
}

async function loadTravelModule(moduleName) {
    try {
        const response = await fetch(`./data/travel/${moduleName}.json`);
        const data = await response.json();
        travelData[moduleName] = data;
        console.log(`✅ ماژول سفر ${moduleName} بارگذاری شد`);
        return data;
    } catch (error) {
        console.error(`❌ خطا در بارگذاری ماژول ${moduleName}:`, error);
        return [];
    }
}

function getPaths() {
    return pathsData;
}

function getCurrentPath() {
    return localStorage.getItem("currentPath") || "general";
}

function setCurrentPath(pathId) {
    localStorage.setItem("currentPath", pathId);
}

function getGrammarForPath(path, level) {
    const allGrammar = getGrammar(level);
    
    if (path === "general") {
        return allGrammar;
    } else if (path === "daily") {
        return allGrammar.filter(g => g.paths && g.paths.includes("daily"));
    } else if (path === "travel") {
        return [];
    }
    
    return allGrammar;
}

function getTravelLessons(moduleName) {
    return travelData[moduleName] || [];
}

function getRelatedGrammar(lessonId) {
    for (const module in travelData) {
        const lessons = travelData[module];
        const lesson = lessons.find(l => l.id === lessonId);
        if (lesson && lesson.relatedGrammar) {
            return lesson.relatedGrammar;
        }
    }
    return [];
}
