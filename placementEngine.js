// placementEngine.js

// ===============================
// داده‌ها
// ===============================
let placementQuestions = [];

async function loadPlacementQuestions() {
    try {
        const response = await fetch("./data/placement.json");
        placementQuestions = await response.json();
    } catch (error) {
        console.error("خطا در بارگذاری سوالات:", error);
    }
}

function getPlacementQuestions() {
    return placementQuestions;
}

// ===============================
// وضعیت آزمون (State)
// ===============================
let currentQuestion = null;

let placementState = {
    asked: [],
    currentDifficulty: 25,
    correctStreak: 0,
    wrongStreak: 0,
    estimatedLevel: "A2",
    finished: false
};

// ===============================
// انتخاب سؤال بعدی
// ===============================
function getNextQuestion() {

    const candidates = placementQuestions.filter(q =>
        !placementState.asked.includes(q.id)
    );

    if (candidates.length === 0) {
        placementState.finished = true;
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

// ===============================
// پردازش جواب
// ===============================
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

    placementState.currentDifficulty =
        Math.max(8, Math.min(95, placementState.currentDifficulty));
}

// ===============================
// توابع دسترسی (Getters)
// ===============================
function getPlacementState() {
    return placementState;
}

function getCurrentQuestion() {
    return currentQuestion;
}
