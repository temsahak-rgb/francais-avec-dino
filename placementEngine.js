// placementEngine.js

let placementQuestions = [];
let currentQuestion = null;

let placementState = {
    asked: [],
    currentDifficulty: 25,
    correctStreak: 0,
    wrongStreak: 0,
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
    }
}

function getPlacementQuestions() {
    return placementQuestions;
}

function getNextQuestion() {
    if (placementState.finished) return null;
    
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

    // ✅ منطق جدید: تعریف بازه تحمل (Tolerance Window)
    const tolerance = 12; 
    const validPool = candidates.filter(q => 
        Math.abs(q.difficulty - placementState.currentDifficulty) <= tolerance
    );

    // اگر تعداد سوالات در بازه کم بود، از کل سوالات باقی‌مانده استفاده کن
    const poolToUse = validPool.length >= 3 ? validPool : candidates;

    // ✅ بر زدن (Shuffle) سوالات برای جلوگیری از تکرار الگو
    const shuffled = poolToUse.sort(() => 0.5 - Math.random());

    currentQuestion = shuffled[0];
    placementState.asked.push(currentQuestion.id);
    return currentQuestion;
}

function answerPlacement(correct) {
    if (correct === null) {
        placementState.wrongStreak++;
        placementState.correctStreak = 0;
        placementState.currentDifficulty -= 8;
    } else if (correct) {
        placementState.correctStreak++;
        placementState.wrongStreak = 0;
        placementState.currentDifficulty += 8;
    } else {
        placementState.wrongStreak++;
        placementState.correctStreak = 0;
        placementState.currentDifficulty -= 8;
    }
    
    placementState.currentDifficulty = Math.max(8, Math.min(95, placementState.currentDifficulty));
    
    if (placementState.currentDifficulty <= 16 && placementState.wrongStreak >= 3) {
        placementState.finished = true;
        placementState.finishReason = "bottom_reached";
    }
    
    if (placementState.currentDifficulty >= 90 && placementState.correctStreak >= 3) {
        placementState.finished = true;
        placementState.finishReason = "top_reached";
    }
}

function getPlacementState() { return placementState; }
function getCurrentQuestion() { return currentQuestion; }

function getEstimatedLevelRange() {
    const diff = placementState.currentDifficulty;
    if (diff >= 90) return { level: "C1", range: "C1 - Autonome" };
    if (diff >= 75) return { level: "B2", range: "B2 - Avancé" };
    if (diff >= 60) return { level: "B2", range: "B1 - B2" };
    if (diff >= 45) return { level: "B1", range: "B1 - Intermédiaire" };
    if (diff >= 30) return { level: "A2", range: "A2 - Élémentaire" };
    if (diff >= 15) return { level: "A2", range: "A1 - A2" };
    return { level: "A1", range: "A1 - Débutant" };
}

function resetPlacementState() {
    placementState = { asked: [], currentDifficulty: 25, correctStreak: 0, wrongStreak: 0, finished: false, finishReason: null };
    currentQuestion = null;
}

function savePlacementResult(level) {
    localStorage.setItem("placementResult", level);
    localStorage.setItem("placementDate", new Date().toISOString());
}

function getPlacementResult() {
    return localStorage.getItem("placementResult");
}
