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
