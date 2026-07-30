let placementQuestions = [];

async function loadPlacementQuestions() {
    const response = await fetch("./data/placement.json");
    placementQuestions = await response.json();
}

function getPlacementQuestions() {
    return placementQuestions;
}
