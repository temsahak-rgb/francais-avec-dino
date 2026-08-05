// lessonEngine.js

let lessonsCache = {};

// بارگذاری درس بر اساس level و lessonId
async function loadLesson(level, lessonId) {
    // چک کردن cache
    if (lessonsCache[lessonId]) {
        return lessonsCache[lessonId];
    }
    
    try {
        const response = await fetch(`./data/lessons/${level}/${lessonId}.json`);
        const lessonData = await response.json();
        lessonsCache[lessonId] = lessonData;
        console.log(`✅ درس ${lessonId} بارگذاری شد`);
        return lessonData;
    } catch (error) {
        console.error(`❌ خطا در بارگذاری درس ${lessonId}:`, error);
        return null;
    }
}

// گرفتن درس از cache
function getLesson(lessonId) {
    return lessonsCache[lessonId] || null;
}

// گرفتن بخش‌های یک درس بر اساس نوع
function getSectionsByType(lessonData, type) {
    if (!lessonData || !lessonData.sections) return [];
    return lessonData.sections.filter(section => section.type === type);
}

// گرفتن همه درسنامه‌ها
function getLessons(lessonData) {
    return getSectionsByType(lessonData, "lesson");
}

// گرفتن همه تمرین‌ها
function getExercises(lessonData) {
    return getSectionsByType(lessonData, "exercise");
}

// گرفتن آزمون پایانی
function getQuiz(lessonData) {
    const quizzes = getSectionsByType(lessonData, "quiz");
    return quizzes.length > 0 ? quizzes[0] : null;
}

// گرفتن یک بخش خاص
function getSection(lessonData, sectionId) {
    if (!lessonData || !lessonData.sections) return null;
    return lessonData.sections.find(s => s.id === sectionId);
}
