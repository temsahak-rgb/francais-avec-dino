// placementEngine.js

let placementQuestions = [];
let currentQuestion = null;

let placementState = {
    asked: [],
    currentDifficulty: 25,
    correctStreak: 0,
    wrongStreak: 0,
    estimatedLevel: "A2",
    finished: false,
    finishReason: null
};

async function loadPlacementQuestions() {
    try {
        const response = await fetch("./data/placement.json");
        placementQuestions = await response.json();
        console.log("سوالات بارگذاری شدند:", placementQuestions.length);
    } catch (error) {
        console.error("خطا در بارگذاری:", error);
        alert("خطا در خواندن فایل سوالات.");
    }
}

function getPlacementQuestions() {
    return placementQuestions;
}

function getNextQuestion() {
    // چک کردن شرایط پایان
    if (placementState.finished) {
        return null;
    }
    
    // حداکثر ۱۵ سوال
    if (placementState.asked.length >= 15) {
        placementState.finished = true;
        placementState.finishReason = "max_questions";
        return null;
    }

    const candidates = placementQuestions.filter(q => !placementState.asked.includes(q.id));

    if (candidates.length === 0) {
        placementState.finished = true;
        placementState.finishReason = "no_more_questions";
        return null;
    }

    candidates.sort((a, b) => 
        Math.abs(a.difficulty - placementState.currentDifficulty) - 
        Math.abs(b.difficulty - placementState.currentDifficulty)
    );

    currentQuestion = candidates[0];
    placementState.asked.push(currentQuestion.id);
    return currentQuestion;
}

function answerPlacement(correct) {
    if (correct) {
        placementState.correctStreak++;
        placementState.wrongStreak = 0;
        placementState.currentDifficulty += 8;
    } else {
        placementState.wrongStreak++;
        placementState.correctStreak = 0;
        placementState.currentDifficulty -= 8;
    }
    
    placementState.currentDifficulty = Math.max(8, Math.min(95, placementState.currentDifficulty));
    
    // چک کردن شرایط پایان
    
    // ۱. اگر به پایین‌ترین سطح A1 رسیده و ۳ غلط پشت سر هم زده
    if (placementState.currentDifficulty <= 16 && placementState.wrongStreak >= 3) {
        placementState.finished = true;
        placementState.finishReason = "bottom_reached";
    }
    
    // ۲. اگر به بالاترین سطح C1 رسیده و ۳ درست پشت سر هم زده
    if (placementState.currentDifficulty >= 90 && placementState.correctStreak >= 3) {
        placementState.finished = true;
        placementState.finishReason = "top_reached";
    }
}

function getPlacementState() {
    return placementState;
}

function getCurrentQuestion() {
    return currentQuestion;
}

// تابع جدید برای محاسبه بازه سطح
function getEstimatedLevelRange() {
    const diff = placementState.currentDifficulty;
    
    if (diff >= 90) return { level: "C1", range: "C1 - C2" };
    if (diff >= 75) return { level: "B2", range: "B2 - C1" };
    if (diff >= 60) return { level: "B2", range: "B1 - B2" };
    if (diff >= 45) return { level: "B1", range: "B1" };
    if (diff >= 30) return { level: "A2", range: "A2 - B1" };
    if (diff >= 15) return { level: "A2", range: "A1 - A2" };
    return { level: "A1", range: "A1" };
}

function resetPlacementState() {
    placementState = {
        asked: [],
        currentDifficulty: 25,
        correctStreak: 0,
        wrongStreak: 0,
        estimatedLevel: "A2",
        finished: false,
        finishReason: null
    };
    currentQuestion = null;
}
